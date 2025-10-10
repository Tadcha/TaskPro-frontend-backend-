# 🎨 TaskPro Frontend

A modern, responsive task management application built with React, Redux Toolkit, and Styled Components. This frontend application provides an intuitive Kanban-style interface for managing projects, boards, columns, and tasks.

## ✨ Features

- 🎯 **Kanban Board Interface** - Drag & drop functionality for tasks
- 👤 **User Authentication** - JWT-based auth with Google OAuth integration
- 🎨 **Multiple Themes** - Light, Dark, and Violet theme options
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🔔 **Real-time Updates** - Live task updates and notifications
- 📊 **Task Management** - Create, edit, delete tasks with priorities and deadlines
- 🔍 **Task Filtering** - Filter tasks by priority and other criteria
- 📤 **File Uploads** - Avatar upload with Cloudinary integration
- 🎭 **Professional UI/UX** - Modern design with smooth animations

## 🛠️ Tech Stack

- **Framework**: React 18.1.0
- **State Management**: Redux Toolkit + Redux Persist
- **Styling**: Styled Components + Emotion
- **Routing**: React Router DOM v6
- **Forms**: Formik + Yup validation
- **HTTP Client**: Axios with interceptors
- **UI Components**: Material UI components
- **Icons**: React Icons
- **Date Picker**: React DatePicker
- **Drag & Drop**: React Beautiful DnD
- **Notifications**: React Toastify
- **Development**: ESLint + Prettier

## 🚀 Quick Start

### Prerequisites

- Node.js 16.0.0 or higher (recommended: 18+)
- npm 8.0.0 or higher
- **TaskPro Backend API running on port 5000**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/TaskPro.git
   cd TaskPro/TaskPro_FrontEnd_v0.0
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup**

   ```bash
   # Copy the example environment file
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**

   ```bash
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## � Docker Deployment

### Production Deployment with Docker

The frontend is containerized using a multi-stage Docker build optimized for production:

```bash
# Build the Docker image
docker build -t taskpro-frontend .

# Run the container
docker run -p 3000:3000 taskpro-frontend
```

### Multi-stage Build Features

- **Stage 1**: Node.js build environment for compiling React app
- **Stage 2**: Nginx Alpine for serving static files (only 66.8MB final image)
- **Optimized**: Only production files included in final image
- **Security**: Non-root user, minimal attack surface
- **Performance**: Gzip compression, caching headers, static asset optimization

### Docker Compose Integration

For full-stack deployment with backend connected to real cloud database:

```bash
# From project root directory
docker compose up -d

# This will start:
# - Frontend on http://localhost:3000
# - Backend on http://localhost:5000 (connected to MongoDB Atlas)
# - All services using real cloud credentials from .env
```

**Note**: Ensure the backend `.env` file is properly configured with your MongoDB Atlas, Cloudinary, and other service credentials before running Docker Compose.

# From project root directory

docker compose up -d

# Frontend will be available at:

# http://localhost:3000

````

### Dockerfile Configuration

```dockerfile
# Multi-stage build for production optimization
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .
ENV PUBLIC_URL=/
RUN npm run build

FROM nginx:stable-alpine
RUN apk update && apk upgrade
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN adduser -S taskpro -u 1001
USER taskpro
EXPOSE 3000
````

### Nginx Configuration

Custom nginx.conf includes:

- **React Router support** - Handle client-side routing
- **Gzip compression** - Optimize asset delivery
- **Security headers** - XSS protection, CSRF prevention
- **Caching** - Optimal cache headers for static assets
- **API proxy** - Backend API routing

## �📋 Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_VERSION=v1
REACT_APP_ENV=development

# App Configuration
REACT_APP_NAME=TaskPro
REACT_APP_VERSION=1.0.0
REACT_APP_DEBUG=false
REACT_APP_ENABLE_ANALYTICS=false

# Performance optimizations for faster development
GENERATE_SOURCEMAP=false
DISABLE_ESLINT_PLUGIN=false
FAST_REFRESH=true
TSC_COMPILE_ON_ERROR=true
ESLINT_NO_DEV_ERRORS=true
INLINE_RUNTIME_CHUNK=false
IMAGE_INLINE_SIZE_LIMIT=0

# File watching optimizations
CHOKIDAR_USEPOLLING=false
WATCHPACK_POLLING=false
```

## 🧪 Available Scripts

```bash
npm start            # Start development server
npm run build        # Build for production
npm run build:analyze # Build and serve locally for analysis
npm test             # Run tests in interactive mode
npm run test:coverage # Run tests with coverage report
npm run test:ci      # Run tests for CI/CD
npm run lint         # Check code quality
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
npm run preview      # Preview production build locally
npm run deploy       # Deploy to GitHub Pages
```

## 🧪 Testing Strategy

The frontend includes comprehensive testing with React Testing Library and Jest:

```bash
# Run tests in interactive mode
npm test

# Generate coverage report
npm run test:coverage

# Run tests for CI/CD
npm run test:ci
```

### Test Coverage:

- **Component Testing** - React components with React Testing Library
- **Environment Setup** - Jest and testing infrastructure verification
- **Mock Implementations** - Ready for Redux and API integration testing
- **UI Testing** - User interaction and DOM assertion testing

### Test Structure:

```
src/
├── __tests__/              # Main app tests
│   └── setup.test.js      # Environment verification tests
└── setupTests.js          # Test environment configuration
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AuthPage/       # Authentication components
│   ├── Boards/         # Board management components
│   ├── Cards/          # Task card components
│   ├── Header/         # Application header
│   ├── Layout/         # Layout components
│   ├── Modals/         # Modal components
│   ├── Sidebar/        # Navigation sidebar
│   └── ...
├── constants/          # App constants and themes
├── fonts/             # Custom fonts
├── images/            # Static images and icons
├── pages/             # Page components
├── redux/             # State management
│   ├── auth/          # Authentication state
│   ├── dashboards/    # Dashboard state
│   ├── menuMode/      # UI state
│   └── store.js       # Redux store configuration
├── __tests__/         # Test files
│   └── setup.test.js  # Environment verification tests
├── App.jsx            # Main App component
├── index.js           # App entry point
└── setupTests.js      # Test environment configuration
```

## 🎨 Features Deep Dive

### Authentication System

- JWT token management with automatic refresh
- Google OAuth integration
- Protected routes and route guards
- Persistent login state

### Theme System

- **Light Theme**: Clean, minimal design
- **Dark Theme**: Professional dark mode
- **Violet Theme**: Branded color scheme
- Theme persistence across sessions

### Task Management

- **Drag & Drop**: Intuitive task movement between columns
- **Priority System**: Visual priority indicators (low, medium, high)
- **Deadlines**: Date picker with deadline tracking
- **Rich Descriptions**: Full text editing for task details

### Responsive Design

- **Mobile First**: Optimized for touch interfaces
- **Tablet Support**: Perfect for productivity on tablets
- **Desktop Power**: Full feature set on large screens
- **Breakpoints**: 375px, 768px, 1280px

## 🔧 API Integration

The frontend communicates with the TaskPro Backend API:

- **Base URL**: `http://localhost:5000/api`
- **Authentication**: JWT Bearer tokens
- **Rate Limiting**: Handles 429 responses gracefully
- **Error Handling**: User-friendly error messages
- **Loading States**: Professional loading indicators

### API Endpoints Used

- `POST /users/register` - User registration
- `POST /users/login` - User authentication
- `GET /users/current` - Get current user
- `GET /dashboard` - Get user dashboards
- `POST /dashboard` - Create new dashboard
- `GET /health` - API health check

## 📱 Mobile Experience

- **Touch Optimized**: All interactions work perfectly on touch devices
- **Swipe Gestures**: Natural mobile navigation
- **Responsive Layout**: Adapts to any screen size
- **Fast Loading**: Optimized bundle size and lazy loading

## 🚀 Performance Optimizations

- **Code Splitting**: Lazy loading for optimal bundle size
- **Image Optimization**: Optimized images and icons
- **Memoization**: React.memo and useMemo for performance
- **Bundle Analysis**: Webpack bundle analyzer integration
- **Caching**: Redux persist for state management

## 🚀 Deployment

### GitHub Pages (Current)

```bash
npm run deploy
```

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify

```bash
# Build and deploy
npm run build
# Upload dist folder to Netlify
```

## 🔍 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile Safari**: iOS 14+
- **Chrome Mobile**: Android 10+

## 👨‍💻 Author

**Florin Racila**

- Email: developer@taskpro.com
- GitHub: [@taskpro-dev](https://github.com/taskpro-dev)
- Portfolio: [Your Portfolio URL]

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

⭐ **This is a portfolio project demonstrating modern React development with professional UI/UX design**
