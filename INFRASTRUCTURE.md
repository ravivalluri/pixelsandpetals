# Pixels & Petals Infrastructure Documentation

## Overview

This document outlines the scalable, production-ready infrastructure setup for Pixels & Petals. The infrastructure is designed to handle high traffic, ensure security, and provide excellent performance globally.

## Architecture

### 🏗️ High-Level Architecture

```
Internet
    ↓
CloudFront CDN
    ↓
Application Load Balancer (Multi-AZ)
    ↓
ECS Fargate Cluster (Multi-AZ)
    ↓
Private Subnets
    ↓
Database/Cache (Optional)
```

### 🌐 AWS Services Used

| Service | Purpose | Scalability Features |
|---------|---------|---------------------|
| **VPC** | Network isolation | Multi-AZ, 3 availability zones |
| **CloudFront** | Global CDN | Edge locations worldwide |
| **Application Load Balancer** | Load balancing | Auto-scaling, health checks |
| **ECS Fargate** | Container orchestration | Auto-scaling, serverless containers |
| **ECR** | Container registry | Secure, scalable image storage |
| **S3** | Static assets & backups | 99.999999999% durability |
| **Route 53** | DNS management | Global DNS resolution |
| **Certificate Manager** | SSL/TLS certificates | Auto-renewal |
| **CloudWatch** | Monitoring & logging | Real-time metrics, alarms |
| **WAF** | Web application firewall | DDoS protection, security rules |

## 📁 Directory Structure

```
infrastructure/
├── terraform/
│   ├── main.tf                 # Main infrastructure definition
│   ├── variables.tf            # Configuration variables
│   ├── outputs.tf              # Infrastructure outputs
│   └── modules/
│       ├── vpc/                # VPC networking module
│       ├── ecs/                # ECS container module
│       ├── alb/                # Load balancer module
│       ├── cloudfront/         # CDN module
│       ├── s3/                 # Storage module
│       ├── monitoring/         # CloudWatch module
│       └── security/           # Security groups module
├── scripts/
│   └── setup-infrastructure.sh # Automated setup script
└── docs/
    └── INFRASTRUCTURE.md       # This documentation
```

## 🚀 Quick Start

### Prerequisites

1. **AWS CLI** installed and configured
2. **Terraform** (>= 1.0) installed
3. **Docker** installed
4. **Git** repository with appropriate permissions

### Automated Setup

Run the setup script to deploy everything automatically:

```bash
./scripts/setup-infrastructure.sh \
  --environment prod \
  --region us-east-1 \
  --domain pixelsandpetals.com
```

### Manual Setup

1. **Configure AWS Backend**:

   ```bash
   # Create S3 bucket for Terraform state
   aws s3 mb s3://pixelsandpetals-terraform-state

   # Create DynamoDB table for state locking
   aws dynamodb create-table \
     --table-name pixelsandpetals-terraform-locks \
     --attribute-definitions AttributeName=LockID,AttributeType=S \
     --key-schema AttributeName=LockID,KeyType=HASH \
     --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
   ```

2. **Deploy Infrastructure**:

   ```bash
   cd infrastructure/terraform
   terraform init
   terraform plan
   terraform apply
   ```

3. **Build and Deploy Application**:

   ```bash
   # The CI/CD pipeline will handle this automatically
   # Or manually:
   docker build -t pixelsandpetals .
   docker tag pixelsandpetals:latest ${ECR_REPOSITORY_URL}:latest
   docker push ${ECR_REPOSITORY_URL}:latest
   ```

## 🔧 Configuration

### Environment Variables

Configure these in your CI/CD pipeline or local environment:

```bash
# Required
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1

# Optional
ENVIRONMENT=prod
DOMAIN_NAME=pixelsandpetals.com
```

### Terraform Variables

Key configuration options in `terraform.tfvars`:

```hcl
# Basic Configuration
environment = "prod"
aws_region = "us-east-1"
domain_name = "pixelsandpetals.com"

# Scaling Configuration
ecs_min_capacity = 2
ecs_max_capacity = 10
ecs_desired_capacity = 3

# Resource Sizing
ecs_cpu = 512
ecs_memory = 1024

# Optional Features
enable_database = false
enable_cache = false
enable_waf = true

# Monitoring
alert_email = "alerts@pixelsandpetals.com"
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

The pipeline includes:

1. **Code Quality**: ESLint, TypeScript checks
2. **Testing**: Unit tests, integration tests
3. **Security**: Vulnerability scanning
4. **Build**: Docker image creation
5. **Deploy**: ECS service update
6. **Static Assets**: S3/CloudFront deployment
7. **Monitoring**: Performance testing

### Required GitHub Secrets

```bash
AWS_ACCESS_KEY_ID              # AWS access key
AWS_SECRET_ACCESS_KEY          # AWS secret key
S3_STATIC_BUCKET              # S3 bucket for static assets
CLOUDFRONT_DISTRIBUTION_ID    # CloudFront distribution ID
SLACK_WEBHOOK_URL             # (Optional) Slack notifications
```

## 📊 Monitoring & Observability

### CloudWatch Dashboards

Automatically created dashboards for:

- Application performance metrics
- Infrastructure health
- Security monitoring
- Cost optimization

### Alarms & Notifications

- High CPU/Memory usage
- Error rate thresholds
- Availability monitoring
- Security incidents

### Log Aggregation

- Application logs in CloudWatch
- VPC Flow Logs for network monitoring
- ALB access logs
- CloudFront logs

## 🔒 Security Features

### Network Security

- **VPC**: Isolated network environment
- **Private Subnets**: Application runs in private subnets
- **Security Groups**: Least-privilege access control
- **NACLs**: Additional network-level security

### Application Security

- **WAF**: Web Application Firewall with OWASP rules
- **SSL/TLS**: End-to-end encryption
- **IAM Roles**: Least-privilege service access
- **Secrets Manager**: Secure credential storage

### Data Security

- **S3 Encryption**: Server-side encryption at rest
- **ECS Encryption**: Container data encryption
- **RDS Encryption**: Database encryption (if enabled)
- **CloudWatch Encryption**: Log encryption

## 💰 Cost Optimization

### Implemented Optimizations

- **VPC Endpoints**: Reduce NAT Gateway costs
- **S3 Lifecycle Policies**: Automatic storage class transitions
- **ECS Fargate**: Pay-per-use containers
- **CloudFront**: Reduce origin load
- **Auto Scaling**: Scale resources based on demand

### Cost Monitoring

- **AWS Cost Explorer**: Track spending
- **Budget Alerts**: Spending notifications
- **Resource Tagging**: Cost allocation tracking

## 🚀 Scaling Features

### Automatic Scaling

- **ECS Auto Scaling**: CPU/Memory based scaling
- **ALB**: Automatic load distribution
- **CloudFront**: Global edge caching
- **S3**: Unlimited storage scaling

### Performance Optimization

- **Multi-AZ Deployment**: High availability
- **CDN**: Global content delivery
- **Load Balancing**: Traffic distribution
- **Container Optimization**: Efficient resource usage

## 🛠️ Maintenance

### Regular Tasks

- **Security Updates**: Container image updates
- **Certificate Renewal**: Automatic via ACM
- **Backup Monitoring**: S3 lifecycle management
- **Performance Review**: CloudWatch metrics analysis

### Disaster Recovery

- **Multi-AZ Setup**: Automatic failover
- **S3 Cross-Region Replication**: Data backup
- **Infrastructure as Code**: Quick recovery
- **Automated Backups**: Point-in-time recovery

## 📚 Additional Resources

### Documentation

- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [ECS Best Practices](https://docs.aws.amazon.com/AmazonECS/latest/bestpracticesguide/)
- [CloudFront Developer Guide](https://docs.aws.amazon.com/cloudfront/)

### Monitoring Dashboards

- CloudWatch: Infrastructure metrics
- Application: Performance monitoring
- Security: AWS Security Hub
- Cost: AWS Cost Explorer

### Support Contacts

- **Infrastructure Issues**: <engineering@pixelsandpetals.com>
- **Security Incidents**: <security@pixelsandpetals.com>
- **Emergency**: Follow incident response procedures

## 🔄 Deployment Workflow

### Development to Production

1. **Feature Branch**: Create feature branch
2. **Development**: Code and test locally
3. **Pull Request**: Create PR with tests
4. **CI Checks**: Automated testing and security
5. **Code Review**: Team review process
6. **Merge**: Merge to main branch
7. **Production Deploy**: Automatic deployment
8. **Monitoring**: Monitor deployment health

### Rollback Procedure

1. **Identify Issue**: Monitor alerts
2. **Stop Deployment**: Halt current deployment
3. **Rollback**: Deploy previous stable version
4. **Verify**: Confirm system stability
5. **Investigate**: Analyze root cause
6. **Fix Forward**: Implement fix and redeploy

---

## 📞 Support

For infrastructure support and questions:

- **Email**: <engineering@pixelsandpetals.com>
- **Documentation**: This README and inline code comments
- **Emergency**: Follow incident response procedures in security runbook
