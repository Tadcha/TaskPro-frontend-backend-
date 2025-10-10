# Multi-stage build for production optimization
# NOTE: This Dockerfile is optimized for portfolio demonstration
# In production, use organization-approved base images with vulnerability scanning

# Stage 1: Build stage - Use latest LTS Node.js version
FROM node:20-alpine AS builder

# Security: Update packages to fix known vulnerabilities
# NOTE: Some base image vulnerabilities may persist - use approved images in production
RUN apk update && apk upgrade && apk add --no-cache \
    ca-certificates \
    && rm -rf /var/cache/apk/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci && npm cache clean --force

# Copy source code
COPY . .

# Set PUBLIC_URL for absolute asset paths
ENV PUBLIC_URL=/

# Build the application
RUN npm run build

# Stage 2: Production stage - Use stable nginx alpine
# NOTE: Base image vulnerabilities detected - in production use:
# - Organization-approved base images
# - Private registry with scanned images  
# - Regular vulnerability monitoring and patching
FROM nginx:stable-alpine

# Security: Update packages and install only necessary tools
RUN apk update && apk upgrade && apk add --no-cache \
    curl \
    ca-certificates \
    && rm -rf /var/cache/apk/*

# Copy built app from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create non-root user
RUN adduser -S taskpro -u 1001

# Change ownership
RUN chown -R taskpro:nginx /usr/share/nginx/html && \
    chown -R taskpro:nginx /var/cache/nginx && \
    chown -R taskpro:nginx /var/log/nginx && \
    chown -R taskpro:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R taskpro:nginx /var/run/nginx.pid

USER taskpro

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]