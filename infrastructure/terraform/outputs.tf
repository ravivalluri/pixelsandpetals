# Outputs for Pixels & Petals Infrastructure

output "vpc_id" {
  description = "ID of the VPC"
  value       = module.vpc.vpc_id
}

output "cloudfront_domain_name" {
  description = "Domain name of the CloudFront distribution"
  value       = module.cloudfront.domain_name
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution"
  value       = module.cloudfront.distribution_id
}

output "alb_dns_name" {
  description = "DNS name of the Application Load Balancer"
  value       = module.alb.dns_name
}

output "ecr_repository_url" {
  description = "URL of the ECR repository"
  value       = module.ecr.repository_url
}

output "s3_static_bucket_name" {
  description = "Name of the S3 bucket for static assets"
  value       = module.s3.static_bucket_name
}

output "s3_backup_bucket_name" {
  description = "Name of the S3 bucket for backups"
  value       = module.s3.backup_bucket_name
}

output "ecs_cluster_name" {
  description = "Name of the ECS cluster"
  value       = module.ecs.cluster_name
}

output "ecs_service_name" {
  description = "Name of the ECS service"
  value       = module.ecs.service_name
}

output "certificate_arn" {
  description = "ARN of the SSL certificate"
  value       = module.ssl.certificate_arn
}

# Database outputs (if enabled)
output "database_endpoint" {
  description = "RDS instance endpoint"
  value       = var.enable_database ? module.rds[0].endpoint : null
  sensitive   = true
}

output "database_port" {
  description = "RDS instance port"
  value       = var.enable_database ? module.rds[0].port : null
}

# Cache outputs (if enabled)
output "redis_endpoint" {
  description = "ElastiCache Redis endpoint"
  value       = var.enable_cache ? module.elasticache[0].endpoint : null
}

output "redis_port" {
  description = "ElastiCache Redis port"
  value       = var.enable_cache ? module.elasticache[0].port : null
}

# Monitoring outputs
output "cloudwatch_log_group" {
  description = "CloudWatch log group name"
  value       = module.monitoring.log_group_name
}

output "sns_topic_arn" {
  description = "SNS topic ARN for alerts"
  value       = module.monitoring.sns_topic_arn
}

# Security outputs
output "waf_web_acl_arn" {
  description = "WAF Web ACL ARN"
  value       = module.waf.web_acl_arn
}

# Environment summary
output "environment_summary" {
  description = "Summary of the deployed environment"
  value = {
    environment = var.environment
    region      = var.aws_region
    domain      = var.domain_name

    # Infrastructure endpoints
    website_url    = "https://${var.domain_name}"
    api_endpoint   = module.alb.dns_name
    cdn_endpoint   = module.cloudfront.domain_name

    # Container info
    ecr_repository = module.ecr.repository_url
    ecs_cluster    = module.ecs.cluster_name

    # Storage
    static_bucket  = module.s3.static_bucket_name
    backup_bucket  = module.s3.backup_bucket_name

    # Optional services
    database_enabled = var.enable_database
    cache_enabled    = var.enable_cache
    waf_enabled      = var.enable_waf
  }
}