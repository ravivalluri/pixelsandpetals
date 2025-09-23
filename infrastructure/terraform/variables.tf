# Variables for Pixels & Petals Infrastructure

variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "prod"
}

variable "domain_name" {
  description = "Primary domain name"
  type        = string
  default     = "pixelsandpetals.com"
}

# Networking
variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

# ECS Configuration
variable "ecs_min_capacity" {
  description = "Minimum number of ECS tasks"
  type        = number
  default     = 2
}

variable "ecs_max_capacity" {
  description = "Maximum number of ECS tasks"
  type        = number
  default     = 10
}

variable "ecs_desired_capacity" {
  description = "Desired number of ECS tasks"
  type        = number
  default     = 3
}

variable "ecs_cpu" {
  description = "CPU units for ECS tasks"
  type        = number
  default     = 512
}

variable "ecs_memory" {
  description = "Memory (MB) for ECS tasks"
  type        = number
  default     = 1024
}

# Optional Features
variable "enable_database" {
  description = "Enable RDS database"
  type        = bool
  default     = false
}

variable "enable_cache" {
  description = "Enable ElastiCache Redis"
  type        = bool
  default     = false
}

variable "enable_backup" {
  description = "Enable automated backups"
  type        = bool
  default     = true
}

# Database Configuration (if enabled)
variable "db_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t3.micro"
}

variable "db_allocated_storage" {
  description = "RDS allocated storage (GB)"
  type        = number
  default     = 20
}

# Cache Configuration (if enabled)
variable "cache_node_type" {
  description = "ElastiCache node type"
  type        = string
  default     = "cache.t3.micro"
}

variable "cache_num_nodes" {
  description = "Number of cache nodes"
  type        = number
  default     = 1
}

# Monitoring and Alerting
variable "alert_email" {
  description = "Email for alerts and notifications"
  type        = string
  default     = "alerts@pixelsandpetals.com"
}

# Backup Configuration
variable "backup_retention_days" {
  description = "Number of days to retain backups"
  type        = number
  default     = 30
}

# Security
variable "enable_waf" {
  description = "Enable AWS WAF"
  type        = bool
  default     = true
}

variable "allowed_cidr_blocks" {
  description = "CIDR blocks allowed to access the application"
  type        = list(string)
  default     = ["0.0.0.0/0"] # Restrict this in production
}

# Performance
variable "cloudfront_price_class" {
  description = "CloudFront price class"
  type        = string
  default     = "PriceClass_100" # US, Canada, Europe
}

variable "cloudfront_cache_ttl" {
  description = "CloudFront default cache TTL (seconds)"
  type        = number
  default     = 86400 # 24 hours
}