# Pixels & Petals Infrastructure
# Scalable, production-ready AWS infrastructure

terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    bucket         = "pixelsandpetals-terraform-state"
    key            = "infrastructure/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "pixelsandpetals-terraform-locks"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region
}

# Data sources
data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

# Local values
locals {
  account_id = data.aws_caller_identity.current.account_id
  region     = data.aws_region.current.name

  common_tags = {
    Project     = "PixelsAndPetals"
    Environment = var.environment
    ManagedBy   = "Terraform"
    Owner       = "Engineering"
  }
}

# VPC and Networking
module "vpc" {
  source = "./modules/vpc"

  environment = var.environment
  vpc_cidr    = var.vpc_cidr

  tags = local.common_tags
}

# Security Groups
module "security" {
  source = "./modules/security"

  environment = var.environment
  vpc_id      = module.vpc.vpc_id

  tags = local.common_tags
}

# Application Load Balancer
module "alb" {
  source = "./modules/alb"

  environment       = var.environment
  vpc_id           = module.vpc.vpc_id
  public_subnets   = module.vpc.public_subnets
  security_groups  = [module.security.alb_security_group_id]
  certificate_arn  = module.ssl.certificate_arn

  tags = local.common_tags
}

# ECS Cluster for containerized applications
module "ecs" {
  source = "./modules/ecs"

  environment         = var.environment
  vpc_id             = module.vpc.vpc_id
  private_subnets    = module.vpc.private_subnets
  security_groups    = [module.security.ecs_security_group_id]
  target_group_arn   = module.alb.target_group_arn
  ecr_repository_url = module.ecr.repository_url

  # Scaling configuration
  min_capacity     = var.ecs_min_capacity
  max_capacity     = var.ecs_max_capacity
  desired_capacity = var.ecs_desired_capacity

  tags = local.common_tags
}

# Elastic Container Registry
module "ecr" {
  source = "./modules/ecr"

  environment = var.environment

  tags = local.common_tags
}

# CloudFront CDN for static assets
module "cloudfront" {
  source = "./modules/cloudfront"

  environment       = var.environment
  s3_bucket_domain  = module.s3.bucket_domain_name
  alb_domain_name   = module.alb.dns_name
  certificate_arn   = module.ssl.certificate_arn

  tags = local.common_tags
}

# S3 buckets for static assets and backups
module "s3" {
  source = "./modules/s3"

  environment = var.environment

  tags = local.common_tags
}

# SSL/TLS Certificate
module "ssl" {
  source = "./modules/ssl"

  domain_name = var.domain_name

  tags = local.common_tags
}

# Route 53 DNS
module "route53" {
  source = "./modules/route53"

  domain_name              = var.domain_name
  cloudfront_domain_name   = module.cloudfront.domain_name
  cloudfront_hosted_zone_id = module.cloudfront.hosted_zone_id

  tags = local.common_tags
}

# RDS Database (optional - for future use)
module "rds" {
  source = "./modules/rds"
  count  = var.enable_database ? 1 : 0

  environment       = var.environment
  vpc_id           = module.vpc.vpc_id
  private_subnets  = module.vpc.private_subnets
  security_groups  = [module.security.rds_security_group_id]

  tags = local.common_tags
}

# ElastiCache Redis (optional - for caching)
module "elasticache" {
  source = "./modules/elasticache"
  count  = var.enable_cache ? 1 : 0

  environment       = var.environment
  vpc_id           = module.vpc.vpc_id
  private_subnets  = module.vpc.private_subnets
  security_groups  = [module.security.redis_security_group_id]

  tags = local.common_tags
}

# CloudWatch monitoring and logging
module "monitoring" {
  source = "./modules/monitoring"

  environment = var.environment

  # ECS monitoring
  ecs_cluster_name = module.ecs.cluster_name
  ecs_service_name = module.ecs.service_name

  # ALB monitoring
  alb_arn_suffix = module.alb.arn_suffix
  target_group_arn_suffix = module.alb.target_group_arn_suffix

  # CloudFront monitoring
  cloudfront_distribution_id = module.cloudfront.distribution_id

  tags = local.common_tags
}

# WAF for application security
module "waf" {
  source = "./modules/waf"

  environment = var.environment
  alb_arn     = module.alb.arn

  tags = local.common_tags
}

# Auto Scaling
module "autoscaling" {
  source = "./modules/autoscaling"

  environment         = var.environment
  ecs_cluster_name    = module.ecs.cluster_name
  ecs_service_name    = module.ecs.service_name

  # Scaling thresholds
  cpu_target_value    = 70
  memory_target_value = 80

  tags = local.common_tags
}