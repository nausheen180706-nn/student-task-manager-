const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const notFound = require('./middleware/notFoundMiddleware');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration: supports process.env.CLIENT_URL and common local dev ports
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000'
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g. Postman, curl, mobile)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      // Permissive in local development so students never get stuck with CORS errors
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root health check endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'TaskFlow API is running. Explore tasks at /api/tasks'
  });
});

// API Routes
app.use('/api/tasks', taskRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Database & Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
