#!/bin/bash
# Deploy backend to AWS EC2 via Terraform

set -e

echo "🚀 Starting Backend Deployment to AWS..."

# Check if required tools are installed
check_dependencies() {
    echo "📋 Checking dependencies..."

    if ! command -v terraform &> /dev/null; then
        echo "❌ Terraform is not installed. Please install it first."
        exit 1
    fi

    if ! command -v aws &> /dev/null; then
        echo "❌ AWS CLI is not installed. Please install it first."
        exit 1
    fi

    echo "✅ Dependencies check passed"
}

# Validate AWS credentials
check_aws_credentials() {
    echo "🔐 Checking AWS credentials..."

    if ! aws sts get-caller-identity &> /dev/null; then
        echo "❌ AWS credentials not configured. Please run 'aws configure'"
        exit 1
    fi

    echo "✅ AWS credentials validated"
}

# Build backend application
build_backend() {
    echo "🔨 Building backend application..."

    cd apps/backend
    npm ci
    npm run build
    cd ../..

    echo "✅ Backend build completed"
}

# Deploy infrastructure with Terraform
deploy_infrastructure() {
    echo "🏗️ Deploying infrastructure with Terraform..."

    cd infrastructure/terraform

    # Initialize Terraform
    terraform init

    # Plan the deployment
    echo "📝 Planning infrastructure changes..."
    terraform plan -out=tfplan

    # Ask for confirmation
    read -p "Do you want to apply these changes? (y/N): " confirm
    if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
        echo "🚀 Applying infrastructure changes..."
        terraform apply tfplan

        # Get outputs
        echo "📊 Getting deployment information..."
        terraform output > ../../deployment-info.txt

        echo "✅ Infrastructure deployment completed!"
        echo "📋 Deployment info saved to deployment-info.txt"
    else
        echo "❌ Deployment cancelled"
        exit 1
    fi

    cd ../..
}

# Update application code on EC2 instances
update_application() {
    echo "🔄 Updating application on EC2 instances..."

    # Get ALB DNS from Terraform output
    ALB_DNS=$(terraform output -raw backend_alb_dns 2>/dev/null || echo "")

    if [ -z "$ALB_DNS" ]; then
        echo "❌ Could not get ALB DNS. Please check Terraform outputs."
        exit 1
    fi

    echo "🔍 Backend URL: http://$ALB_DNS"
    echo "⏳ Waiting for instances to be ready (this may take a few minutes)..."

    # Wait for health check
    for i in {1..30}; do
        if curl -s "http://$ALB_DNS/health" > /dev/null; then
            echo "✅ Backend is healthy!"
            break
        fi
        echo "⏳ Attempt $i/30: Waiting for backend to be ready..."
        sleep 30
    done
}

# Main deployment flow
main() {
    echo "🎯 Pixels & Petals Backend Deployment"
    echo "====================================="

    check_dependencies
    check_aws_credentials
    build_backend
    deploy_infrastructure
    update_application

    echo ""
    echo "🎉 Backend deployment completed successfully!"
    echo ""
    echo "📍 Backend API URL: http://$(cd infrastructure/terraform && terraform output -raw backend_alb_dns)"
    echo "📊 Health Check: http://$(cd infrastructure/terraform && terraform output -raw backend_alb_dns)/health"
    echo ""
    echo "Next steps:"
    echo "1. Update frontend environment variables with the new API URL"
    echo "2. Deploy frontend to CloudFront"
    echo "3. Test the complete application"
}

# Run the deployment
main "$@"