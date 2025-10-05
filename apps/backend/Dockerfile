# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install --production=false

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S backend -u 1001

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

# Copy built application
COPY --from=builder /app/dist ./dist

# Change ownership of the app directory
RUN chown -R backend:nodejs /app
USER backend

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (res) => { \
    process.exit(res.statusCode === 200 ? 0 : 1) \
  }).on('error', () => process.exit(1))"

# Start the application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server.js"]