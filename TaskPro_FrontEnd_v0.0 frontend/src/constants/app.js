// Environment and app constants
export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  API_VERSION: process.env.REACT_APP_API_VERSION || 'v1',
  DEBUG: process.env.REACT_APP_DEBUG === 'true',
  APP_NAME: process.env.REACT_APP_NAME || 'TaskPro',
  APP_VERSION: process.env.REACT_APP_VERSION || '1.0.0',
  GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
};

// API Configuration
export const API_CONFIG = {
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Toast notification durations
export const TOAST_DURATION = {
  SUCCESS: 3000,
  ERROR: 5000,
  WARNING: 4000,
  INFO: 3000,
};

// Local storage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_THEME: 'userTheme',
  PERSIST_ROOT: 'persist:root',
};

// Application routes
export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  WELCOME: '/welcome',
  DASHBOARD: '/home',
};

// Theme options
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  VIOLET: 'violet',
};

// Task priorities
export const PRIORITIES = {
  WITHOUT: 'without',
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  MOBILE: '375px',
  TABLET: '768px',
  DESKTOP: '1280px',
};
