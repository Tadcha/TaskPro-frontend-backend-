# 🚀 TaskPro Backend API

A professional task management REST API built with Node.js, Express, and MongoDB. This is a full-stack portfolio project demonstrating modern backend development practices.

## ✨ Features

- 🔐 **JWT Authentication** with refresh tokens
- 👤 **User Management** (register, login, profile updates)
- 📋 **Dashboard Management** (CRUD operations)
- 📝 **Column & Card Management** (Kanban-style)
- ☁️ **File Uploads** with Cloudinary integration
- 📧 **Email System** with development mock service (production-ready Nodemailer)
- 🛡️ **Security** with Helmet, CORS, input validation
- 📊 **API Documentation** with Swagger
- 🔍 **Health Check** endpoint for monitoring

## 🛠️ Tech Stack

- **Runtime**: Node.js 16+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi schema validation
- **File Storage**: Cloudinary
- **Documentation**: Swagger UI
- **Security**: Helmet, bcrypt, CORS, Rate Limiting, Input Sanitization
- **Development**: Nodemon, ESLint, Prettier

## 🚀 Quick Start

### Prerequisites

- Node.js 16.0.0 or higher
- MongoDB Atlas account or local MongoDB
- Cloudinary account (for file uploads)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/taskpro-backend.git
   cd taskpro-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup**

   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

   **Required environment variables:**

   - `DB_HOST` - MongoDB Atlas connection string
   - `CLOUDINARY_*` - Cloudinary credentials for file uploads
   - `EMAIL_*` - Email service configuration
   - JWT secrets (generated automatically)

   **Note**: When using Docker, ensure your `.env` file contains real production credentials as Docker will connect to your actual MongoDB Atlas database and Cloudinary account.

4. **Generate JWT secrets**

   The project includes an automated script that generates secure JWT tokens:

   ```bash
   npm run setup
   ```

   This script (`generateSecret.js`) will:

   - Check if `ACCESS_TOKEN_KEY` and `REFRESH_TOKEN_KEY` already exist in `.env`
   - Generate cryptographically secure 64-character hex strings if missing
   - Automatically append them to your `.env` file
   - Skip generation if tokens already exist (safe to run multiple times)

   **Note**: These tokens are critical for JWT authentication security. Never commit them to version control.

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🧪 Testing

The project includes comprehensive test coverage using Jest and Supertest:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run tests for CI/CD
npm run test:ci
```

### Test Coverage includes:

- **Environment setup verification** - Jest configuration and Node.js functionality
- **Smoke tests** - Basic functionality verification
- **Mock implementations** - Ready for authentication and dashboard testing
- **CI/CD ready** - Automated testing pipeline configured

### Test Structure:

```
tests/
├── smoke.test.js        # Environment verification tests
├── setup.js            # Test environment configuration
├── .eslintrc.json      # ESLint configuration for tests
└── jest.config.js      # Jest configuration
```

## � Docker Deployment

### Production Deployment with Docker

The backend is containerized using Docker with Node.js Alpine for optimal performance:

```bash
# Build the Docker image
docker build -t taskpro-backend .

# Run the container
docker run -p 5000:5000 \
  -e DB_HOST="your-mongodb-connection-string" \
  -e JWT_SECRET="your-jwt-secret" \
  taskpro-backend
```

### Docker Features

- **Alpine Linux base** - Minimal, secure 213MB image
- **Multi-stage capability** - Ready for optimization
- **Health checks** - Built-in API health monitoring
- **Security** - Non-root user, minimal attack surface
- **Environment variables** - Flexible configuration management

### Docker Compose Integration

For full-stack deployment with frontend and database:

```bash
# From project root directory
docker compose up -d

# Backend API will be available at:
# http://localhost:5000
# Health check: http://localhost:5000/api/health
```

### Dockerfile Configuration

```dockerfile
FROM node:20-alpine

# Security: Update packages
RUN apk update && apk upgrade && apk add --no-cache \
    curl ca-certificates && rm -rf /var/cache/apk/*

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY . .

# Security: Create non-root user
RUN addgroup -g 1001 -S taskpro && \
    adduser -S taskpro -u 1001 -G taskpro
USER taskpro

EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/api/health || exit 1

CMD ["node", "server.js"]
```

### Environment Variables for Docker

```env
# Production environment variables
NODE_ENV=production
PORT=5000
DB_HOST=mongodb://admin:password@mongodb:27017/taskpro?authSource=admin

# Security tokens (generate with npm run setup)
JWT_SECRET=your-super-secret-jwt-key
ACCESS_TOKEN_KEY=your-64-char-access-token-key
REFRESH_TOKEN_KEY=your-64-char-refresh-token-key

# Email service (mock for development)
EMAIL_SERVICE=mock
EMAIL_USERNAME=demo@taskpro.com

# Cloudinary (optional for file uploads)
CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET_KEY=your-secret-key
```

### Health Check Endpoint

The API includes a comprehensive health check endpoint for monitoring:

```bash
curl http://localhost:5000/api/health
```

Response includes:

- API status and uptime
- Database connectivity
- Memory usage
- Environment information
- Version details

## �📋 Environment Variables

```env
# Database
DB_HOST=mongodb+srv://username:password@cluster.mongodb.net/taskpro

# Server
PORT=5000
NODE_ENV=development

# JWT Secrets (auto-generated)
ACCESS_TOKEN_KEY=your_access_token_secret
REFRESH_TOKEN_KEY=your_refresh_token_secret

# Cloudinary
CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET_KEY=your_api_secret

# Email (Development mode uses mock service)
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

## 📚 API Documentation

Once running, visit:

- **API Docs**: http://localhost:5000/api-docs
- **Health Check**: http://localhost:5000/api/health

## 📧 Email Configuration

### Development Mode

In development, emails are logged to console instead of being sent. This eliminates the need for email provider configuration during development.

### Production Mode

For production deployment, configure a real email service:

```env
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

**Note**: For Gmail, use App Passwords instead of regular passwords.

## 🧪 Available Scripts

```bash
npm start          # Production server
npm run dev        # Development with auto-reload
npm run lint       # Check code quality
npm run lint:fix   # Fix linting issues
npm run format     # Format code with Prettier
npm run setup      # Generate JWT secrets (uses generateSecret.js)
npm run health     # Check server health
npm run docs       # Open API documentation
```

## 🏗️ Project Structure

```
src/
├── controllers/     # Route handlers
├── middleware/      # Custom middleware
├── models/         # Database schemas
├── routes/         # API route definitions
├── helpers/        # Utility functions
├── app.js          # Express app configuration
├── server.js       # Server entry point
└── generateSecret.js # JWT token generator script
```

## 🔐 Authentication Flow

1. **Register**: `POST /api/users/register`
2. **Login**: `POST /api/users/login` → Returns access + refresh tokens
3. **Protected routes**: Include `Authorization: Bearer <token>` header
4. **Refresh**: `POST /api/users/refresh` → Get new access token

## 📈 Performance & Security

- ✅ **Rate limiting** (100 req/15min general, 5 req/15min auth)
- ✅ **Input sanitization** (NoSQL injection protection)
- ✅ **CORS configuration** (whitelist origins)
- ✅ **Helmet security headers** (XSS, CSRF protection)
- ✅ **Request size limits** (10MB max payload)
- ✅ **Environment-aware error handling**
- ✅ **Real-time database health monitoring**
- ✅ **Memory usage tracking**
- ✅ **JWT token validation** with refresh mechanism

## 🚀 Deployment Ready

This API is configured for deployment on:

- **Heroku**
- **Railway**
- **Vercel**
- **DigitalOcean**

## 👨‍💻 Author

**TaskPro Developer**

- Email: developer@taskpro.com
- Portfolio: [Developer Portfolio](https://taskpro-dev.com)
- LinkedIn: [TaskPro Developer](https://linkedin.com/in/taskpro-dev)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

⭐ **This is a portfolio project demonstrating professional full-stack development skills**
