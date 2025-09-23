#!/bin/bash

# Pixels & Petals Infrastructure Setup Script
# This script sets up the complete AWS infrastructure for scalable deployment

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${ENVIRONMENT:-prod}
AWS_REGION=${AWS_REGION:-us-east-1}
DOMAIN_NAME=${DOMAIN_NAME:-pixelsandpetals.com}
TERRAFORM_STATE_BUCKET="pixelsandpetals-terraform-state"
TERRAFORM_LOCK_TABLE="pixelsandpetals-terraform-locks"

# Helper functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_dependencies() {
    log_info "Checking dependencies..."

    # Check if AWS CLI is installed
    if ! command -v aws &> /dev/null; then
        log_error "AWS CLI is not installed. Please install it first."
        exit 1
    fi

    # Check if Terraform is installed
    if ! command -v terraform &> /dev/null; then
        log_error "Terraform is not installed. Please install it first."
        exit 1
    fi

    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install it first."
        exit 1
    fi

    # Check AWS credentials
    if ! aws sts get-caller-identity &> /dev/null; then
        log_error "AWS credentials not configured. Please run 'aws configure' first."
        exit 1
    fi

    log_success "All dependencies are installed and configured."
}

create_terraform_backend() {
    log_info "Setting up Terraform backend..."

    # Create S3 bucket for Terraform state
    if ! aws s3 ls "s3://${TERRAFORM_STATE_BUCKET}" &> /dev/null; then
        log_info "Creating Terraform state bucket: ${TERRAFORM_STATE_BUCKET}"
        aws s3 mb "s3://${TERRAFORM_STATE_BUCKET}" --region "${AWS_REGION}"

        # Enable versioning
        aws s3api put-bucket-versioning \
            --bucket "${TERRAFORM_STATE_BUCKET}" \
            --versioning-configuration Status=Enabled

        # Enable server-side encryption
        aws s3api put-bucket-encryption \
            --bucket "${TERRAFORM_STATE_BUCKET}" \
            --server-side-encryption-configuration '{
                "Rules": [{
                    "ApplyServerSideEncryptionByDefault": {
                        "SSEAlgorithm": "AES256"
                    }
                }]
            }'

        # Block public access
        aws s3api put-public-access-block \
            --bucket "${TERRAFORM_STATE_BUCKET}" \
            --public-access-block-configuration \
            BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
    else
        log_info "Terraform state bucket already exists."
    fi

    # Create DynamoDB table for state locking
    if ! aws dynamodb describe-table --table-name "${TERRAFORM_LOCK_TABLE}" &> /dev/null; then
        log_info "Creating Terraform lock table: ${TERRAFORM_LOCK_TABLE}"
        aws dynamodb create-table \
            --table-name "${TERRAFORM_LOCK_TABLE}" \
            --attribute-definitions AttributeName=LockID,AttributeType=S \
            --key-schema AttributeName=LockID,KeyType=HASH \
            --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
            --region "${AWS_REGION}"

        # Wait for table to be active
        aws dynamodb wait table-exists --table-name "${TERRAFORM_LOCK_TABLE}"
    else
        log_info "Terraform lock table already exists."
    fi

    log_success "Terraform backend setup complete."
}

setup_aws_infrastructure() {
    log_info "Setting up AWS infrastructure with Terraform..."

    cd infrastructure/terraform

    # Initialize Terraform
    log_info "Initializing Terraform..."
    terraform init

    # Create terraform.tfvars if it doesn't exist
    if [[ ! -f terraform.tfvars ]]; then
        log_info "Creating terraform.tfvars file..."
        cat > terraform.tfvars <<EOF
# Pixels & Petals Infrastructure Configuration
environment = "${ENVIRONMENT}"
aws_region = "${AWS_REGION}"
domain_name = "${DOMAIN_NAME}"

# Scaling configuration
ecs_min_capacity = 2
ecs_max_capacity = 10
ecs_desired_capacity = 3

# Optional features
enable_database = false
enable_cache = false
enable_waf = true

# Monitoring
alert_email = "alerts@${DOMAIN_NAME}"
EOF
        log_warning "Please review and customize terraform.tfvars before proceeding."
        log_warning "Press Enter to continue or Ctrl+C to exit."
        read -r
    fi

    # Plan infrastructure
    log_info "Planning infrastructure changes..."
    terraform plan -out=tfplan

    # Ask for confirmation
    log_warning "The above plan will be applied. Do you want to continue? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        log_info "Infrastructure deployment cancelled."
        exit 0
    fi

    # Apply infrastructure
    log_info "Applying infrastructure changes..."
    terraform apply tfplan

    # Save outputs
    terraform output -json > ../outputs.json

    log_success "AWS infrastructure setup complete!"

    cd ../..
}

setup_github_secrets() {
    log_info "GitHub secrets need to be configured manually."
    log_info "Please add the following secrets to your GitHub repository:"
    echo ""
    echo "AWS_ACCESS_KEY_ID"
    echo "AWS_SECRET_ACCESS_KEY"
    echo "S3_STATIC_BUCKET (from Terraform outputs)"
    echo "CLOUDFRONT_DISTRIBUTION_ID (from Terraform outputs)"
    echo "SLACK_WEBHOOK_URL (optional)"
    echo ""
    log_warning "GitHub secrets configuration is required for CI/CD to work."
}

build_and_push_initial_image() {
    log_info "Building and pushing initial Docker image..."

    # Get ECR repository URL from Terraform outputs
    ECR_REPOSITORY_URL=$(terraform -chdir=infrastructure/terraform output -raw ecr_repository_url)

    if [[ -z "$ECR_REPOSITORY_URL" ]]; then
        log_error "Could not get ECR repository URL from Terraform outputs."
        exit 1
    fi

    # Login to ECR
    aws ecr get-login-password --region "${AWS_REGION}" | \
        docker login --username AWS --password-stdin "${ECR_REPOSITORY_URL}"

    # Build and tag image
    log_info "Building Docker image..."
    docker build -t pixelsandpetals:latest -f apps/web/Dockerfile .
    docker tag pixelsandpetals:latest "${ECR_REPOSITORY_URL}:latest"

    # Push image
    log_info "Pushing Docker image to ECR..."
    docker push "${ECR_REPOSITORY_URL}:latest"

    log_success "Initial Docker image pushed successfully!"
}

display_deployment_info() {
    log_success "🚀 Pixels & Petals infrastructure is now deployed!"
    echo ""
    echo "=== Deployment Information ==="

    if [[ -f infrastructure/outputs.json ]]; then
        WEBSITE_URL=$(jq -r '.environment_summary.value.website_url' infrastructure/outputs.json)
        CDN_ENDPOINT=$(jq -r '.environment_summary.value.cdn_endpoint' infrastructure/outputs.json)
        API_ENDPOINT=$(jq -r '.environment_summary.value.api_endpoint' infrastructure/outputs.json)

        echo "🌐 Website URL: ${WEBSITE_URL}"
        echo "⚡ CDN Endpoint: https://${CDN_ENDPOINT}"
        echo "🔧 API Endpoint: https://${API_ENDPOINT}"
        echo ""
    fi

    echo "=== Next Steps ==="
    echo "1. Configure your domain's DNS to point to CloudFront"
    echo "2. Set up GitHub secrets for CI/CD pipeline"
    echo "3. Push code changes to trigger automatic deployment"
    echo "4. Monitor your application through AWS CloudWatch"
    echo ""
    echo "=== Important Files ==="
    echo "📊 Infrastructure outputs: infrastructure/outputs.json"
    echo "🔧 Terraform state: S3 bucket ${TERRAFORM_STATE_BUCKET}"
    echo "📝 Logs: CloudWatch log groups"
    echo ""
}

main() {
    echo "🚀 Pixels & Petals Infrastructure Setup"
    echo "======================================="
    echo ""

    log_info "Environment: ${ENVIRONMENT}"
    log_info "AWS Region: ${AWS_REGION}"
    log_info "Domain: ${DOMAIN_NAME}"
    echo ""

    check_dependencies
    create_terraform_backend
    setup_aws_infrastructure
    build_and_push_initial_image
    setup_github_secrets
    display_deployment_info

    log_success "Setup completed successfully! 🎉"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --environment|-e)
            ENVIRONMENT="$2"
            shift 2
            ;;
        --region|-r)
            AWS_REGION="$2"
            shift 2
            ;;
        --domain|-d)
            DOMAIN_NAME="$2"
            shift 2
            ;;
        --help|-h)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  -e, --environment    Environment name (default: prod)"
            echo "  -r, --region         AWS region (default: us-east-1)"
            echo "  -d, --domain         Domain name (default: pixelsandpetals.com)"
            echo "  -h, --help          Show this help message"
            exit 0
            ;;
        *)
            log_error "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Run main function
main