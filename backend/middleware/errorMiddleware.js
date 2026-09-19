/**
 * Centralized Error Handling Middleware
 * Formats errors consistently as { success: false, message: ... }
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';

  // Handle Invalid MongoDB ObjectId (CastError)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 400;
    message = `Invalid Task ID format: ${err.value}`;
  }

  // Handle Mongoose Schema Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');
  }

  res.status(statusCode).json({
    success: false,
    message: message
  });
};

module.exports = errorHandler;
