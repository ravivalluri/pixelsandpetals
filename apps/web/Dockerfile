# Multi-stage build for production optimization
ARG NODE_VERSION=20

# Base stage with Node.js
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache \
    libc6-compat \
    dumb-init \
    && addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Dependencies stage
FROM base AS deps
COPY package*.json ./
COPY apps/web/package*.json ./apps/web/
RUN npm ci --only=production --ignore-scripts

# Build stage
FROM base AS builder
COPY package*.json ./
COPY apps/web/package*.json ./apps/web/
RUN npm ci

# Copy source code
COPY . .

# Build the application
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production stage
FROM base AS production

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Security: Run as non-root user
USER nextjs

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "const http = require('http'); http.get('http://localhost:3000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); });"

# Expose port
EXPOSE 3000

# Start the application with dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "apps/web/server.js"]