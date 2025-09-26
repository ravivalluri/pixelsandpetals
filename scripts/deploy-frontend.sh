#!/bin/bash
# Deploy frontend to AWS S3 + CloudFront

set -e

echo "🚀 Starting Frontend Deployment to AWS..."

# Configuration
BACKEND_URL=""
ENVIRONMENT="production"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --backend-url)
            BACKEND_URL="$2"
            shift 2
            ;;
        --environment)
            ENVIRONMENT="$2"
            shift 2
            ;;
        --help)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --backend-url URL    Backend API URL (required)"
            echo "  --environment ENV    Environment (default: production)"
            echo "  --help              Show this help message"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Check if required tools are installed
check_dependencies() {
    echo "📋 Checking dependencies..."

    if ! command -v aws &> /dev/null; then
        echo "❌ AWS CLI is not installed. Please install it first."
        exit 1
    fi

    if ! command -v terraform &> /dev/null; then
        echo "❌ Terraform is not installed (needed to get S3 bucket name)."
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

# Get backend URL from deployment if not provided
get_backend_url() {
    if [ -z "$BACKEND_URL" ]; then
        echo "🔍 Getting backend URL from Terraform..."

        if [ -f "infrastructure/terraform/terraform.tfstate" ]; then
            cd infrastructure/terraform
            BACKEND_URL="http://$(terraform output -raw backend_alb_dns)"
            cd ../..
            echo "✅ Backend URL: $BACKEND_URL"
        else
            echo "❌ Backend URL not provided and Terraform state not found."
            echo "Please provide --backend-url parameter or deploy backend first."
            exit 1
        fi
    fi
}

# Build frontend application
build_frontend() {
    echo "🔨 Building frontend application..."

    cd apps/web

    # Create production environment file
    cat > .env.production.local << EOF
NEXT_PUBLIC_API_BASE_URL=${BACKEND_URL}
NEXT_PUBLIC_ENVIRONMENT=${ENVIRONMENT}
EOF

    # Install dependencies and build
    npm ci
    npm run build

    echo "✅ Frontend build completed"
    cd ../..
}

# Get S3 bucket name from Terraform
get_s3_bucket() {
    echo "🪣 Getting S3 bucket name..."

    cd infrastructure/terraform
    S3_BUCKET=$(terraform output -raw s3_bucket_name)
    CLOUDFRONT_DOMAIN=$(terraform output -raw cloudfront_distribution_domain)
    cd ../..

    if [ -z "$S3_BUCKET" ]; then
        echo "❌ Could not get S3 bucket name. Please check Terraform outputs."
        exit 1
    fi

    echo "✅ S3 bucket: $S3_BUCKET"
    echo "✅ CloudFront domain: $CLOUDFRONT_DOMAIN"
}

# Deploy to S3
deploy_to_s3() {
    echo "☁️ Deploying to S3..."

    # Sync files to S3 bucket
    aws s3 sync apps/web/out/ s3://$S3_BUCKET/ --delete --exact-timestamps

    # Set proper content types and cache headers
    echo "🔧 Setting content types and cache headers..."

    # HTML files - no cache
    aws s3 cp s3://$S3_BUCKET/ s3://$S3_BUCKET/ \
        --recursive --exclude "*" --include "*.html" \
        --metadata-directive REPLACE \
        --cache-control "no-cache, no-store, must-revalidate" \
        --content-type "text/html"

    # JavaScript files - long cache with versioning
    aws s3 cp s3://$S3_BUCKET/ s3://$S3_BUCKET/ \
        --recursive --exclude "*" --include "*.js" \
        --metadata-directive REPLACE \
        --cache-control "max-age=31536000" \
        --content-type "application/javascript"

    # CSS files - long cache with versioning
    aws s3 cp s3://$S3_BUCKET/ s3://$S3_BUCKET/ \
        --recursive --exclude "*" --include "*.css" \
        --metadata-directive REPLACE \
        --cache-control "max-age=31536000" \
        --content-type "text/css"

    # Images - medium cache
    aws s3 cp s3://$S3_BUCKET/ s3://$S3_BUCKET/ \
        --recursive --exclude "*" --include "*.jpg" --include "*.jpeg" --include "*.png" --include "*.gif" --include "*.svg" \
        --metadata-directive REPLACE \
        --cache-control "max-age=86400"

    echo "✅ Files uploaded to S3"
}

# Invalidate CloudFront cache
invalidate_cloudfront() {
    echo "🔄 Invalidating CloudFront cache..."

    cd infrastructure/terraform
    CLOUDFRONT_ID=$(terraform output -raw cloudfront_distribution_id 2>/dev/null || echo "")
    cd ../..

    if [ -z "$CLOUDFRONT_ID" ]; then
        echo "⚠️ Could not get CloudFront distribution ID. Cache not invalidated."
        return
    fi

    # Create invalidation
    INVALIDATION_ID=$(aws cloudfront create-invalidation \
        --distribution-id $CLOUDFRONT_ID \
        --paths "/*" \
        --query 'Invalidation.Id' \
        --output text)

    echo "✅ CloudFront invalidation created: $INVALIDATION_ID"
    echo "⏳ Invalidation will complete in a few minutes..."
}

# Test deployment
test_deployment() {
    echo "🧪 Testing deployment..."

    # Test S3 direct access
    if curl -s "https://$S3_BUCKET.s3.amazonaws.com/" > /dev/null; then
        echo "✅ S3 bucket accessible"
    else
        echo "⚠️ S3 bucket not accessible (this may be expected)"
    fi

    # Test CloudFront
    if curl -s "https://$CLOUDFRONT_DOMAIN/" > /dev/null; then
        echo "✅ CloudFront distribution accessible"
    else
        echo "⚠️ CloudFront distribution not yet accessible (may need time to propagate)"
    fi

    # Test API connectivity from frontend
    echo "🔍 Testing API connectivity..."
    if curl -s "$BACKEND_URL/health" > /dev/null; then
        echo "✅ Backend API accessible from frontend"
    else
        echo "⚠️ Backend API not accessible - check CORS settings"
    fi
}

# Main deployment flow
main() {
    echo "🎯 Pixels & Petals Frontend Deployment"
    echo "======================================"
    echo "Environment: $ENVIRONMENT"
    echo ""

    check_dependencies
    check_aws_credentials
    get_backend_url
    build_frontend
    get_s3_bucket
    deploy_to_s3
    invalidate_cloudfront
    test_deployment

    echo ""
    echo "🎉 Frontend deployment completed successfully!"
    echo ""
    echo "🌐 Frontend URL: https://$CLOUDFRONT_DOMAIN"
    echo "⚡ Backend API: $BACKEND_URL"
    echo ""
    echo "📝 Note: CloudFront changes may take 5-15 minutes to propagate globally."
    echo ""
    echo "Next steps:"
    echo "1. Test the application at https://$CLOUDFRONT_DOMAIN"
    echo "2. Set up custom domain (optional)"
    echo "3. Set up monitoring and alerts"
}

# Run the deployment
main "$@"