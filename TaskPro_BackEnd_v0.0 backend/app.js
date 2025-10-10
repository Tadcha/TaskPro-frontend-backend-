// Load environment variables
require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const mongoose = require("mongoose");
const { version } = require("./package.json");

const app = express();

// Configure dotenv-safe to validate environment variables at startup
const dotenv = require("dotenv-safe");
dotenv.config({
  allowEmptyValues: false,
  path: "./.env",
  example: "./.env.example",
});

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// After dotenv-safe configuration, router imports can use environment variables
const authRouter = require("./routes/api/auth");
const dashboardRouter = require("./routes/api/dashboards");
const columnRouter = require("./routes/api/column");
const cardRouter = require("./routes/api/card");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allowed origins
    const allowedOrigins = [
      process.env.FRONTEND_URL || "http://localhost:3000", // Frontend URL from .env
      "http://localhost:3001", // Alternative frontend port
      "https://taskpro-frontend.vercel.app", // Frontend production (update with your domain)
    ];

    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else if (process.env.NODE_ENV === "development") {
      // In development, allow any origin
      console.log(`⚠️  CORS: Allowing origin ${origin} in development mode`);
      callback(null, true);
    } else {
      callback(new Error("🚫 Not allowed by CORS"));
    }
  },
  credentials: true, // For cookies and authentication headers
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

// Rate Limiting Configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: "🚫 Too many requests from this IP",
    message: "Please try again after 15 minutes",
    retryAfter: "15 minutes",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Stricter rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit auth requests to 5 per 15 minutes
  message: {
    error: "🔒 Too many authentication attempts",
    message: "Please try again after 15 minutes",
    retryAfter: "15 minutes",
  },
});

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" })); // Request size limit

// Security Middleware
app.use(mongoSanitize()); // Prevent NoSQL injection attacks
app.use("/api/", limiter); // Apply rate limiting to all API routes
app.use("/api/users/login", authLimiter); // Stricter limiting for login
app.use("/api/users/register", authLimiter); // Stricter limiting for register

// Custom request logging in development
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(
      `📍 ${new Date().toLocaleTimeString()} - ${req.method} ${req.path}`
    );
    next();
  });
}

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health Check Endpoint
app.get("/api/health", async (req, res) => {
  const uptime = process.uptime();
  const uptimeFormatted = `${Math.floor(uptime / 60)} minutes ${Math.floor(
    uptime % 60
  )} seconds`;

  // Check database connection
  let databaseStatus = "🔴 Disconnected";
  let databaseMessage = "Database connection failed";

  try {
    if (mongoose.connection.readyState === 1) {
      // Test the connection with a simple ping
      await mongoose.connection.db.admin().ping();
      databaseStatus = "🟢 Connected";
      databaseMessage = "Database is healthy";
    } else {
      databaseStatus = "🟡 Connecting";
      databaseMessage = "Database is connecting";
    }
  } catch (error) {
    databaseStatus = "🔴 Error";
    databaseMessage = `Database error: ${error.message}`;
  }

  const healthData = {
    status: "✅ OK",
    message: "TaskPro API is running smoothly",
    timestamp: new Date().toISOString(),
    uptime: uptimeFormatted,
    environment: process.env.NODE_ENV || "unknown",
    database: {
      status: databaseStatus,
      message: databaseMessage,
      readyState: mongoose.connection.readyState,
    },
    version: version,
    memory: {
      used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
      total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`,
    },
  };

  // Return different status codes based on database health
  const statusCode = databaseStatus.includes("🟢") ? 200 : 503;
  res.status(statusCode).json(healthData);
});

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    message: "🚀 Welcome to TaskPro API",
    documentation: "/api-docs",
    health: "/api/health",
    version: version,
  });
});

app.use("/api/users", authRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/column", columnRouter);
app.use("/api/card", cardRouter);

app.use((req, res, next) => {
  if (!res.headersSent) {
    res.status(404).json({
      message: "🔍 Resource not found",
      error: `Route ${req.method} ${req.originalUrl} does not exist`,
    });
  }
});

app.use((err, req, res, next) => {
  // Log error for debugging
  console.error("❌ Server Error:", err.message);
  if (process.env.NODE_ENV === "development") {
    console.error("📋 Stack trace:", err.stack);
  }

  const { status = 500, message = "🚨 Internal Server Error" } = err;

  // In development, send more details
  const errorResponse = {
    message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
      timestamp: new Date().toISOString(),
    }),
  };

  res.status(status).json(errorResponse);
});

module.exports = app;
