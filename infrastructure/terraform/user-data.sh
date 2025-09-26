#!/bin/bash
# User data script for Pixels & Petals backend EC2 instances

# Update system
yum update -y

# Install Node.js 20
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
yum install -y nodejs

# Install Git
yum install -y git

# Install Docker (for future use)
yum install -y docker
systemctl start docker
systemctl enable docker
usermod -a -G docker ec2-user

# Install PM2 globally
npm install -g pm2

# Create application directory
mkdir -p /opt/pixelsandpetals
cd /opt/pixelsandpetals

# Clone the repository
git clone https://github.com/yourusername/pixelsandpetals.git .

# Install backend dependencies
cd apps/backend
npm ci --production

# Set up environment variables
cat > .env << EOF
NODE_ENV=production
PORT=3001
AWS_REGION=us-west-2
DYNAMODB_TABLE_NAME=pixelsandpetals-content
CORS_ORIGIN=https://pixelsandpetals.com
EOF

# Build the application
npm run build

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'pixelsandpetals-backend',
    script: 'dist/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    error_file: '/var/log/pixelsandpetals/error.log',
    out_file: '/var/log/pixelsandpetals/out.log',
    log_file: '/var/log/pixelsandpetals/combined.log',
    time: true
  }]
};
EOF

# Create log directory
mkdir -p /var/log/pixelsandpetals

# Start application with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Install PM2 startup script
env PATH=$PATH:/usr/bin pm2 startup systemd -u ec2-user --hp /home/ec2-user

# Configure log rotation
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
pm2 set pm2-logrotate:compress true

# Create health check script
cat > /opt/pixelsandpetals/health-check.sh << 'EOF'
#!/bin/bash
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/health)
if [ $response -eq 200 ]; then
    echo "Service is healthy"
    exit 0
else
    echo "Service is unhealthy (HTTP $response)"
    pm2 restart pixelsandpetals-backend
    exit 1
fi
EOF

chmod +x /opt/pixelsandpetals/health-check.sh

# Set up health check cron job
echo "*/5 * * * * /opt/pixelsandpetals/health-check.sh >> /var/log/pixelsandpetals/health-check.log 2>&1" | crontab -

# Install CloudWatch agent (optional)
wget https://s3.amazonaws.com/amazoncloudwatch-agent/amazon_linux/amd64/latest/amazon-cloudwatch-agent.rpm
rpm -U amazon-cloudwatch-agent.rpm

# Create CloudWatch config
cat > /opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json << 'EOF'
{
    "logs": {
        "logs_collected": {
            "files": {
                "collect_list": [
                    {
                        "file_path": "/var/log/pixelsandpetals/combined.log",
                        "log_group_name": "/aws/ec2/pixelsandpetals/backend",
                        "log_stream_name": "{instance_id}-combined"
                    },
                    {
                        "file_path": "/var/log/pixelsandpetals/error.log",
                        "log_group_name": "/aws/ec2/pixelsandpetals/backend",
                        "log_stream_name": "{instance_id}-error"
                    }
                ]
            }
        }
    },
    "metrics": {
        "metrics_collected": {
            "cpu": {
                "measurement": ["cpu_usage_idle", "cpu_usage_iowait", "cpu_usage_user", "cpu_usage_system"],
                "metrics_collection_interval": 60
            },
            "disk": {
                "measurement": ["used_percent"],
                "metrics_collection_interval": 60,
                "resources": ["*"]
            },
            "mem": {
                "measurement": ["mem_used_percent"],
                "metrics_collection_interval": 60
            }
        }
    }
}
EOF

# Start CloudWatch agent
systemctl enable amazon-cloudwatch-agent
systemctl start amazon-cloudwatch-agent

echo "Backend deployment completed successfully!"