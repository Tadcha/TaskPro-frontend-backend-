# 📚 API Documentation - Swagger Integration

## 🎯 Overview

TaskPro Backend API includes comprehensive Swagger/OpenAPI 3.0 documentation for all endpoints. The documentation is optimized for both development and Docker deployment scenarios with real MongoDB Atlas and Cloudinary integration.

## 🐳 Docker Access

When running the application in Docker containers, Swagger UI is accessible at:

### Local Docker Development

```bash
# Ensure .env is configured with real credentials
# Start containers (connects to MongoDB Atlas)
docker compose up -d

# Access Swagger UI
http://localhost:5000/api-docs
```

### Docker Container URLs

The Swagger configuration includes multiple server environments:

1. **Local Development**: `http://localhost:5000`
2. **Docker Container**: `http://localhost:5000` (connects to MongoDB Atlas)
3. **Production**: `https://taskpro-api.herokuapp.com`

**Important**: Docker deployment now uses your real cloud database and services configured in `.env`.

## 📋 Key Features Documented

### System Monitoring

- **Health Check Endpoint** (`/api/health`)
  - Database connectivity status
  - System uptime and memory usage
  - **Docker health check integration**
  - Environment information

### Authentication Endpoints

- User registration with email confirmation
- JWT login with refresh tokens
- Token refresh mechanisms
- Google OAuth integration

### Task Management

- Dashboard CRUD operations
- Column management
- Card management with drag-drop support
- File upload capabilities

## 🔧 Docker Health Check Integration

The `/api/health` endpoint is specifically configured for Docker health checks:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/api/health || exit 1
```

### Health Check Response

```json
{
  "status": "✅ OK",
  "message": "TaskPro API is running smoothly",
  "timestamp": "2025-10-09T17:54:16.052Z",
  "uptime": "7 minutes 13 seconds",
  "environment": "production",
  "database": {
    "status": "🟢 Connected",
    "message": "Database is healthy",
    "readyState": 1
  },
  "version": "1.0.0",
  "memory": {
    "used": "41 MB",
    "total": "44 MB"
  }
}
```

## 🎯 Usage in Different Environments

### Development

```bash
npm run dev
# Swagger UI: http://localhost:5000/api-docs
```

### Docker Development

```bash
docker compose up -d
# Swagger UI: http://localhost:5000/api-docs
```

### Production

```bash
# Access via production URL in swagger.json servers config
# Swagger UI: https://your-production-domain.com/api-docs
```

## 📊 API Testing

Swagger UI provides interactive testing capabilities:

1. **Try It Out** - Test endpoints directly from the documentation
2. **Authentication** - JWT token support for protected endpoints
3. **Request/Response Examples** - Comprehensive examples for all endpoints
4. **Schema Validation** - Real-time validation of request/response data

## 🔐 Security Documentation

All security features are documented including:

- JWT authentication flow
- Rate limiting configurations
- CORS settings
- Input validation schemas
- Error handling patterns

---

**The Swagger documentation is fully Docker-ready and provides comprehensive API testing capabilities for development, staging, and production environments.**
