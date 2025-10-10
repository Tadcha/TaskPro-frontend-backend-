# 🐳 TaskPro Docker Setup

## Prerequisites

Before starting, ensure you have a properly configured `.env` file in the backend directory:

```bash
# Copy the example environment file
cp "TaskPro_BackEnd_v0.0 backend/.env.example" "TaskPro_BackEnd_v0.0 backend/.env"

# Edit .env with your real credentials:
# - MongoDB Atlas connection string
# - Cloudinary credentials
# - Email service configuration
# - JWT secrets (auto-generated with npm run setup)
```

## Quick Start

```bash
# Clone the repository
git clone https://github.com/florinfire80/TaskPro.git
cd TaskPro

# Configure environment (see Prerequisites above)

# Start all services with Docker Compose
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Docs**: http://localhost:5000/api-docs
- **Database**: Your MongoDB Atlas cluster (cloud-based)

**Note**: Docker now connects to your real MongoDB Atlas database and Cloudinary account instead of using local containers.

## Demo Credentials

- **Email**: demo@taskpro.com
- **Password**: password123

## Individual Services

```bash
# Build and run backend only
cd TaskPro_BackEnd_v0.0
docker build -t taskpro-backend .
docker run -p 5000:5000 taskpro-backend

# Build and run frontend only
cd TaskPro_FrontEnd_v0.0
docker build -t taskpro-frontend .
docker run -p 3000:3000 taskpro-frontend
```

## Development vs Production

```bash
# Development with hot reload
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production optimized
docker-compose up --build
```

## Useful Commands

```bash
# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Remove all data (including database)
docker-compose down -v

# Rebuild specific service
docker-compose build frontend
docker-compose up -d frontend

# Access container shell
docker exec -it taskpro-backend sh
docker exec -it taskpro-frontend sh

# Check service health
docker-compose ps
```

## Environment Variables

Create `.env` files in each service directory or use docker-compose environment settings.

## Production Deployment

```bash
# Using Docker Swarm
docker stack deploy -c docker-compose.yml taskpro

# Using Kubernetes
kubectl apply -f k8s/
```
