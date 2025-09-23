# S3 Module for Static Content and Backups
# Optimized for CloudFront distribution and backup storage

# Static Assets Bucket
resource "aws_s3_bucket" "static_assets" {
  bucket = "${var.environment}-pixelsandpetals-static-assets-${random_string.bucket_suffix.result}"

  tags = merge(var.tags, {
    Name    = "${var.environment}-static-assets"
    Purpose = "Static Content"
  })
}

# Backup Bucket
resource "aws_s3_bucket" "backups" {
  bucket = "${var.environment}-pixelsandpetals-backups-${random_string.bucket_suffix.result}"

  tags = merge(var.tags, {
    Name    = "${var.environment}-backups"
    Purpose = "Backups"
  })
}

# Random string for bucket naming uniqueness
resource "random_string" "bucket_suffix" {
  length  = 8
  special = false
  upper   = false
}

# Static Assets Bucket Configuration
resource "aws_s3_bucket_versioning" "static_assets" {
  bucket = aws_s3_bucket.static_assets.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "static_assets" {
  bucket = aws_s3_bucket.static_assets.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
    bucket_key_enabled = true
  }
}

resource "aws_s3_bucket_public_access_block" "static_assets" {
  bucket = aws_s3_bucket.static_assets.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# CloudFront Origin Access Identity
resource "aws_cloudfront_origin_access_identity" "static_assets" {
  comment = "OAI for ${var.environment} static assets"
}

# Bucket policy for CloudFront access
resource "aws_s3_bucket_policy" "static_assets" {
  bucket = aws_s3_bucket.static_assets.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontAccess"
        Effect = "Allow"
        Principal = {
          AWS = aws_cloudfront_origin_access_identity.static_assets.iam_arn
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.static_assets.arn}/*"
      }
    ]
  })
}

# Lifecycle configuration for static assets
resource "aws_s3_bucket_lifecycle_configuration" "static_assets" {
  bucket = aws_s3_bucket.static_assets.id

  rule {
    id     = "static_assets_lifecycle"
    status = "Enabled"

    # Move old versions to IA after 30 days
    noncurrent_version_transition {
      noncurrent_days = 30
      storage_class   = "STANDARD_IA"
    }

    # Delete old versions after 90 days
    noncurrent_version_expiration {
      noncurrent_days = 90
    }

    # Delete multipart uploads after 7 days
    abort_incomplete_multipart_upload {
      days_after_initiation = 7
    }
  }
}

# Backup Bucket Configuration
resource "aws_s3_bucket_versioning" "backups" {
  bucket = aws_s3_bucket.backups.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "backups" {
  bucket = aws_s3_bucket.backups.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
    bucket_key_enabled = true
  }
}

resource "aws_s3_bucket_public_access_block" "backups" {
  bucket = aws_s3_bucket.backups.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Lifecycle configuration for backups
resource "aws_s3_bucket_lifecycle_configuration" "backups" {
  bucket = aws_s3_bucket.backups.id

  rule {
    id     = "backup_lifecycle"
    status = "Enabled"

    # Move to IA after 30 days
    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }

    # Move to Glacier after 90 days
    transition {
      days          = 90
      storage_class = "GLACIER"
    }

    # Move to Deep Archive after 365 days
    transition {
      days          = 365
      storage_class = "DEEP_ARCHIVE"
    }

    # Delete after 7 years
    expiration {
      days = 2555
    }

    # Clean up old versions
    noncurrent_version_expiration {
      noncurrent_days = 30
    }

    # Delete multipart uploads after 1 day
    abort_incomplete_multipart_upload {
      days_after_initiation = 1
    }
  }
}

# Notification configuration for backup bucket
resource "aws_s3_bucket_notification" "backups" {
  bucket = aws_s3_bucket.backups.id

  topic {
    topic_arn = aws_sns_topic.backup_notifications.arn
    events    = ["s3:ObjectCreated:*", "s3:ObjectRemoved:*"]
  }

  depends_on = [aws_sns_topic_policy.backup_notifications]
}

# SNS topic for backup notifications
resource "aws_sns_topic" "backup_notifications" {
  name = "${var.environment}-backup-notifications"

  tags = var.tags
}

resource "aws_sns_topic_policy" "backup_notifications" {
  arn = aws_sns_topic.backup_notifications.arn

  policy = jsonencode({
    Version = "2012-10-17"
    Id      = "backup-notifications-policy"
    Statement = [
      {
        Sid    = "AllowS3Publish"
        Effect = "Allow"
        Principal = {
          Service = "s3.amazonaws.com"
        }
        Action   = "sns:Publish"
        Resource = aws_sns_topic.backup_notifications.arn
        Condition = {
          StringEquals = {
            "aws:SourceAccount" = data.aws_caller_identity.current.account_id
          }
        }
      }
    ]
  })
}

# CloudWatch metrics for S3
resource "aws_cloudwatch_metric_alarm" "static_assets_4xx_errors" {
  alarm_name          = "${var.environment}-s3-static-4xx-errors"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "4xxErrors"
  namespace           = "AWS/S3"
  period              = "300"
  statistic           = "Sum"
  threshold           = "10"
  alarm_description   = "This metric monitors 4xx errors on static assets S3 bucket"
  alarm_actions       = [aws_sns_topic.backup_notifications.arn]

  dimensions = {
    BucketName = aws_s3_bucket.static_assets.bucket
  }

  tags = var.tags
}

# Data sources
data "aws_caller_identity" "current" {}