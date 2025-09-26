# Backend Service

Backend API service for Pixels & Petals with DynamoDB integration.

## Features

- RESTful API for content management
- AWS DynamoDB integration for data persistence
- TypeScript with strict type checking
- Express.js framework with security middleware
- Containerized deployment with Docker
- Automated CI/CD with GitHub Actions

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Create DynamoDB table**:
   ```bash
   npm run setup
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3001`

## API Endpoints

### Content Management

- `POST /api/content` - Create new content item
- `POST /api/content/bulk` - Create multiple content items
- `GET /api/content` - Get all content (with optional filtering)
- `GET /api/content/:id` - Get content by ID
- `GET /api/content/slug/:slug` - Get content by slug
- `PUT /api/content/:id` - Update content item
- `DELETE /api/content/:id` - Delete content item

### Health Check

- `GET /health` - Service health status

## Content Schema

```typescript
{
  id: string;                    // Auto-generated
  type: 'page' | 'post' | 'project' | 'service' | 'team-member';
  title: string;
  slug: string;                  // URL-friendly identifier
  content: any;                  // Flexible content structure
  metadata?: Record<string, any>; // Additional metadata
  status: 'draft' | 'published' | 'archived';
  createdAt: string;             // ISO timestamp
  updatedAt: string;             // ISO timestamp
}
```

## Environment Variables

```bash
# Server Configuration
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_access_key_here

# DynamoDB Configuration
DYNAMODB_TABLE_NAME=pixelsandpetals-content
DYNAMODB_ENDPOINT=http://localhost:8000  # For local DynamoDB
```

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking
- `npm run create-table` - Create DynamoDB table
- `npm run setup` - Initial setup (creates table)

### Local DynamoDB

For local development, you can use DynamoDB Local:

```bash
# Using Docker
docker run -p 8000:8000 amazon/dynamodb-local

# Then set DYNAMODB_ENDPOINT=http://localhost:8000 in your .env
```

## Deployment

The service is automatically deployed via GitHub Actions when changes are pushed to the main branch.

### Manual Deployment

1. **Build Docker image**:
   ```bash
   docker build -t pixelsandpetals-backend .
   ```

2. **Run container**:
   ```bash
   docker run -p 3001:3001 --env-file .env pixelsandpetals-backend
   ```

## Example Usage

### Create Content

```bash
curl -X POST http://localhost:3001/api/content \
  -H "Content-Type: application/json" \
  -d '{
    "type": "page",
    "title": "About Us",
    "slug": "about-us",
    "content": {
      "sections": [
        {
          "type": "hero",
          "title": "Welcome to Pixels & Petals",
          "subtitle": "Creating beautiful digital experiences"
        }
      ]
    },
    "status": "published"
  }'
```

### Get Content

```bash
# Get all published content
curl "http://localhost:3001/api/content?status=published"

# Get content by slug
curl "http://localhost:3001/api/content/slug/about-us"
```

### Bulk Create Content

```bash
curl -X POST http://localhost:3001/api/content/bulk \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "type": "service",
        "title": "Web Design",
        "slug": "web-design",
        "content": {"description": "Custom web design services"},
        "status": "published"
      },
      {
        "type": "service",
        "title": "Branding",
        "slug": "branding",
        "content": {"description": "Brand identity and design"},
        "status": "published"
      }
    ]
  }'
```