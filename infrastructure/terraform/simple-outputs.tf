# Outputs for Simple Deployment Configuration

output "backend_alb_dns" {
  description = "DNS name of the backend Application Load Balancer"
  value       = aws_lb.backend.dns_name
}

output "backend_api_url" {
  description = "Complete backend API URL"
  value       = "http://${aws_lb.backend.dns_name}"
}

output "cloudfront_distribution_domain" {
  description = "Domain name of the CloudFront distribution"
  value       = aws_cloudfront_distribution.frontend.domain_name
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution for cache invalidation"
  value       = aws_cloudfront_distribution.frontend.id
}

output "frontend_url" {
  description = "Complete frontend URL"
  value       = "https://${aws_cloudfront_distribution.frontend.domain_name}"
}

output "s3_bucket_name" {
  description = "Name of the S3 bucket hosting the frontend"
  value       = aws_s3_bucket.frontend.id
}

output "s3_bucket_domain" {
  description = "Domain name of the S3 bucket"
  value       = aws_s3_bucket.frontend.bucket_regional_domain_name
}

output "dynamodb_table_name" {
  description = "Name of the DynamoDB table for content storage"
  value       = aws_dynamodb_table.content.name
}

output "auto_scaling_group_arn" {
  description = "ARN of the Auto Scaling Group"
  value       = aws_autoscaling_group.backend.arn
}

output "launch_template_id" {
  description = "ID of the Launch Template"
  value       = aws_launch_template.backend.id
}

# Deployment summary
output "deployment_info" {
  description = "Summary of deployed resources"
  value = {
    # URLs
    frontend_url = "https://${aws_cloudfront_distribution.frontend.domain_name}"
    backend_url  = "http://${aws_lb.backend.dns_name}"
    api_health   = "http://${aws_lb.backend.dns_name}/health"

    # Resources
    s3_bucket           = aws_s3_bucket.frontend.id
    dynamodb_table      = aws_dynamodb_table.content.name
    cloudfront_id       = aws_cloudfront_distribution.frontend.id
    load_balancer_dns   = aws_lb.backend.dns_name

    # Configuration
    aws_region     = var.aws_region
    project_name   = var.project_name
    environment    = var.environment

    # Next steps
    next_steps = [
      "1. Update frontend environment with backend URL: ${aws_lb.backend.dns_name}",
      "2. Deploy frontend code to S3 bucket: ${aws_s3_bucket.frontend.id}",
      "3. Test application at: https://${aws_cloudfront_distribution.frontend.domain_name}",
      "4. Monitor health at: http://${aws_lb.backend.dns_name}/health"
    ]
  }
}