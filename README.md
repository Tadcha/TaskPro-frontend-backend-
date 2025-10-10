# 🚀 TaskPro - Full-Stack Task Management Application

## 📋 Project Overview

**TaskPro** is a professional-grade task management application built with modern technologies and containerized with Docker for seamless deployment. This portfolio project demonstrates full-stack development skills, Docker containerization, and production-ready deployment practices.

## 🛠️ Technology Stack

### Frontend

- **React 18.1.0** - Modern React with hooks and functional components
- **Redux Toolkit** - State management with modern Redux patterns
- **Styled Components** - CSS-in-JS for component styling
- **React Router DOM** - Client-side routing
- **Responsive Design** - Mobile-first approach

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT Authentication** - Secure token-based authentication
- **bcrypt** - Password hashing and security
- **RESTful API** - Well-structured API design

### DevOps & Deployment

- **Docker** - Multi-stage containerization
- **Docker Compose** - Multi-container orchestration
- **MongoDB Atlas** - Cloud database integration
- **Cloudinary** - Cloud image storage and processing
- **Nginx** - Reverse proxy and static file serving
- **Multi-stage builds** - Optimized production images
- **Environment Configuration** - Secure credential management

## 🐳 Docker Implementation

### Architecture

- **2-container setup**: Frontend (React + Nginx), Backend (Node.js)
- **Cloud Database**: MongoDB Atlas integration
- **Multi-stage builds** for optimized images
- **Health checks** implemented for reliability
- **Environment-based configuration** for development and production
- **Custom networking** for secure inter-container communication
- **Real-time cloud data synchronization**

### Quick Start with Docker

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/TaskPro.git
cd TaskPro

# Configure environment variables
cp TaskPro_BackEnd_v0.0\ backend/.env.example TaskPro_BackEnd_v0.0\ backend/.env
# Edit .env file with your real credentials:
# - MongoDB Atlas connection string
# - Cloudinary credentials for file uploads
# - Email service credentials
# - JWT secrets

# Start all services
docker compose up -d

# Access the application
open http://localhost:3000
```

**Note**: Docker now connects to your real MongoDB Atlas database and Cloudinary account when properly configured in the `.env` file.

### Demo Credentials

Use these credentials to test the application, or create your own account:

- **Email**: `demo@taskpro.com`
- **Password**: `password123`

**Note**: These credentials work with the demo data that gets created when using a fresh database.

## 📁 Project Structure

```
TaskPro/
├── frontend/                        # React frontend application
│   ├── src/                         # Source code
│   ├── public/                      # Static assets
│   ├── Dockerfile                   # Multi-stage Docker build
│   ├── nginx.conf                   # Nginx configuration
│   └── package.json                 # Frontend dependencies
├── backend/                         # Node.js backend API
│   ├── controllers/                 # API controllers
│   ├── models/                      # Database models
│   ├── routes/                      # API routes
│   ├── middlewares/                 # Custom middlewares
│   ├── Dockerfile                   # Backend Docker build
│   ├── swagger.json                 # API documentation
│   └── package.json                 # Backend dependencies
├── docker/                          # Docker configuration
│   └── mongodb/                     # MongoDB initialization
│       └── init-mongo.js            # Database seed script
├── docker-compose.yml              # Multi-container orchestration
├── DEPLOYMENT_GUIDE.md             # Detailed deployment instructions
└── DOCKER_SECURITY.md              # Security considerations
```

## 🚀 Features

### Core Functionality

- **User Authentication** - Secure registration and login
- **Dashboard Management** - Create and manage project boards
- **Task Organization** - Columns and cards for task management
- **Drag & Drop Interface** - Intuitive task movement
- **Responsive Design** - Works on all devices
- **Real-time Updates** - Dynamic UI updates

### Technical Features

- **JWT Authentication** - Secure token-based auth
- **Password Security** - bcrypt hashing
- **API Documentation** - Well-documented REST endpoints
- **Error Handling** - Comprehensive error management
- **Input Validation** - Data validation and sanitization
- **CORS Configuration** - Proper cross-origin setup

## 🎯 Portfolio Highlights

### Docker Expertise

- **Multi-stage builds** for production optimization
- **Container orchestration** with Docker Compose
- **Volume management** for data persistence
- **Health checks** and monitoring
- **Security best practices** (non-root users, minimal attack surface)

### Full-Stack Development

- **Modern React patterns** with hooks and functional components
- **RESTful API design** with proper HTTP methods and status codes
- **Database design** with MongoDB and Mongoose
- **Authentication flow** with JWT tokens
- **Responsive UI/UX** with styled-components

### Production-Ready Practices

- **Environment configuration** with proper secrets management
- **Error handling and logging** throughout the application
- **Security measures** implemented at all levels
- **Performance optimization** with chunked loading and caching
- **Documentation** for deployment and maintenance

## 🏃‍♂️ Local Development

### Prerequisites

- Docker Desktop installed and running
- Git for version control

### Setup Steps

1. **Clone and navigate to project**

   ```bash
   git clone https://github.com/YOUR_USERNAME/TaskPro.git
   cd TaskPro
   ```

2. **Start all services**

   ```bash
   docker compose up -d
   ```

3. **Verify all containers are running**

   ```bash
   docker ps
   ```

4. **Access the application**

   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

5. **Login with demo credentials**
   - Email: `ion@mail.com`
   - Password: `123456qQ!`

### Development Commands

```bash
# View container logs
docker compose logs -f

# Stop all services
docker compose down

# Rebuild and restart
docker compose up -d --build

# Access container shell
docker exec -it taskpro-backend sh
docker exec -it taskpro-frontend sh
```

## 🔧 Configuration

### Environment Variables

The application uses environment variables for configuration:

**Backend (.env)**

```env
NODE_ENV=production
PORT=5000
DB_HOST=mongodb://admin:taskpro123@mongodb:27017/taskpro?authSource=admin
JWT_SECRET=your-jwt-secret
ACCESS_TOKEN_KEY=your-access-token-key
REFRESH_TOKEN_KEY=your-refresh-token-key
```

**Frontend**

```env
REACT_APP_API_URL=http://localhost:5000
PUBLIC_URL=/
```

### Docker Compose Services

**Frontend Service**

- Port: 3000
- Multi-stage build (Node.js build + Nginx serve)
- Health checks enabled
- Volume mounts for nginx configuration

**Backend Service**

- Port: 5000
- Node.js Alpine image
- Health checks via API endpoint
- Environment variables for configuration

**MongoDB Service**

- Port: 27017
- Persistent volume for data storage
- Initialization scripts for demo data

## 📊 Performance Metrics

- **Frontend Image Size**: 66.8MB (optimized with multi-stage build)
- **Backend Image Size**: 213MB (Alpine-based for minimal footprint)
- **Startup Time**: ~30 seconds for all services
- **Health Check Response**: <100ms average

## 🛡️ Security Considerations

### Implemented Security Measures

- **Non-root users** in all containers
- **Environment variables** for sensitive data
- **bcrypt password hashing** with salt rounds
- **JWT token authentication** with expiration
- **CORS configuration** for cross-origin requests
- **Input validation** and sanitization

### Production Recommendations

- Use organization-approved base images
- Implement vulnerability scanning
- Regular security updates and patches
- Secrets management with HashiCorp Vault or similar
- Network segmentation and firewalls

## 🤝 Contributing

This is a portfolio project, but feedback and suggestions are welcome! The project demonstrates:

- Modern full-stack development practices
- Docker containerization expertise
- Production-ready deployment strategies
- Security-conscious development
- Comprehensive documentation

## 📄 License

MIT License - feel free to use this project as a reference for your own Docker and full-stack implementations.

## 🎓 Learning Outcomes

This project demonstrates proficiency in:

- **Full-Stack JavaScript Development** (React, Node.js, MongoDB)
- **Docker Containerization** (Multi-stage builds, Compose orchestration)
- **DevOps Practices** (CI/CD ready, Environment management)
- **Security Implementation** (Authentication, Authorization, Data protection)
- **API Design** (RESTful endpoints, Error handling, Documentation)
- **Database Design** (MongoDB schemas, Relationships, Indexing)
- **Frontend Architecture** (State management, Routing, Responsive design)

---

**Ready for production deployment and portfolio demonstration!** 🚀

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
For Docker security considerations, see [DOCKER_SECURITY.md](./DOCKER_SECURITY.md)
