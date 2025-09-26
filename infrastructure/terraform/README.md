# 🏗️ Terraform Infrastructure

This directory contains Infrastructure as Code (IaC) configurations for deploying Pixels & Petals to AWS.

## File Structure

### 📁 **Core Configuration Files (.tf)**
- `simple-deployment.tf` - **Main configuration** for EC2-based deployment
- `simple-variables.tf` - Variable definitions for simple deployment
- `simple-outputs.tf` - Output definitions for simple deployment
- `user-data.sh` - **Bootstrap script** for EC2 instances (referenced by Terraform)

### 📁 **Alternative/Legacy Files**
- `main.tf` - Complex modular setup with ECS (alternative approach)
- `variables.tf` - Variables for modular setup
- `outputs.tf` - Outputs for modular setup
- `modules/` - Terraform modules (for modular approach)

### 📁 **Configuration Templates**
- `terraform.tfvars.example` - Example variables file (copy to `terraform.tfvars`)

## 🚀 **Recommended Approach: Simple Deployment**

Use the **simple-deployment.tf** configuration for straightforward deployment:

```bash
# 1. Copy example variables
cp terraform.tfvars.example terraform.tfvars

# 2. Edit variables for your environment
vim terraform.tfvars

# 3. Initialize Terraform
terraform init

# 4. Plan deployment
terraform plan

# 5. Apply changes
terraform apply
```

## 📋 **What Gets Deployed**

### Backend Infrastructure
- **Application Load Balancer** (ALB) with health checks
- **Auto Scaling Group** with EC2 instances
- **Launch Template** with user data script
- **Security Groups** for proper network access

### Frontend Infrastructure
- **S3 Bucket** for static website hosting
- **CloudFront Distribution** for global CDN
- **Origin Access Identity** for secure S3 access

### Database & Storage
- **DynamoDB Table** for content storage
- **Global Secondary Indexes** for efficient queries

## 🔧 **File Purposes Explained**

### Why `user-data.sh` is in Terraform Directory
The `user-data.sh` script is **referenced by Terraform** configuration:
```hcl
user_data = base64encode(file("${path.module}/user-data.sh"))
```

This script:
- ✅ Installs Node.js, PM2, and dependencies on EC2 instances
- ✅ Clones and builds the backend application
- ✅ Configures PM2 process management
- ✅ Sets up health checks and monitoring

### Why Separate Variable Files
- `simple-variables.tf` - Variables for EC2-based deployment
- `variables.tf` - Variables for modular ECS-based deployment
- Allows maintaining both approaches without conflicts

## 🏃‍♂️ **Quick Start**

For the fastest deployment, use the deployment scripts:

```bash
# Deploy everything automatically
./scripts/deploy-backend.sh
./scripts/deploy-frontend.sh --backend-url YOUR_BACKEND_URL
```

## 🔄 **CI/CD Integration**

The GitHub Actions workflow (`.github/workflows/deploy.yml`) uses these Terraform files:
- Runs `terraform init`, `plan`, and `apply`
- Reads outputs to get deployment URLs
- Handles both backend and frontend deployment

## 📊 **Outputs Available**

After deployment, get important URLs:
```bash
# Backend API URL
terraform output backend_api_url

# Frontend URL
terraform output frontend_url

# S3 bucket name (for deployments)
terraform output s3_bucket_name

# Complete deployment summary
terraform output deployment_info
```

## 🔒 **Security Notes**

- Security groups restrict access to necessary ports only
- S3 bucket access controlled via CloudFront OAI
- EC2 instances can be accessed via Session Manager (no SSH key needed)
- All resources tagged for proper resource management

## 🧹 **Clean Up**

To destroy all infrastructure:
```bash
terraform destroy
```

⚠️ **Warning**: This will delete all resources and data. Make sure to backup important data first.

---

**Choose Your Deployment Method:**
- **Simple & Fast**: Use `scripts/deploy-backend.sh`
- **Customized**: Use `terraform` commands directly
- **Automated**: Push to main branch (GitHub Actions)