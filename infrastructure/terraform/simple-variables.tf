# Variables for Simple EC2-based Deployment

variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
  default     = "us-west-2"
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "pixelsandpetals"

  validation {
    condition     = can(regex("^[a-z][a-z0-9-]*[a-z0-9]$", var.project_name))
    error_message = "Project name must start with a letter, contain only lowercase letters, numbers, and hyphens."
  }
}

variable "environment" {
  description = "Environment name (dev/staging/prod)"
  type        = string
  default     = "prod"

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be one of: dev, staging, prod."
  }
}

variable "instance_type" {
  description = "EC2 instance type for backend servers"
  type        = string
  default     = "t3.micro"
}

# Auto Scaling Configuration
variable "min_size" {
  description = "Minimum number of EC2 instances"
  type        = number
  default     = 1

  validation {
    condition     = var.min_size >= 1
    error_message = "Minimum size must be at least 1."
  }
}

variable "max_size" {
  description = "Maximum number of EC2 instances"
  type        = number
  default     = 3

  validation {
    condition     = var.max_size >= 1
    error_message = "Maximum size must be at least 1."
  }
}

variable "desired_capacity" {
  description = "Desired number of EC2 instances"
  type        = number
  default     = 1

  validation {
    condition     = var.desired_capacity >= 1
    error_message = "Desired capacity must be at least 1."
  }
}

# Database Configuration
variable "dynamodb_table_name" {
  description = "Name of the DynamoDB table for content storage"
  type        = string
  default     = "pixelsandpetals-content"
}

# Domain Configuration (optional)
variable "domain_name" {
  description = "Custom domain name for the application (leave empty for default CloudFront domain)"
  type        = string
  default     = ""
}

variable "api_domain" {
  description = "Custom domain name for the API (leave empty for ALB DNS)"
  type        = string
  default     = ""
}

# Optional: SSH Key for EC2 access
variable "ssh_key_name" {
  description = "Name of existing AWS key pair for EC2 SSH access (optional)"
  type        = string
  default     = ""
}

# Tags
variable "additional_tags" {
  description = "Additional tags to apply to all resources"
  type        = map(string)
  default     = {}
}