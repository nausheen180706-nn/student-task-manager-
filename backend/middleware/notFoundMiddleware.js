/**
 * 404 Route Not Found Middleware
 * Handles requests to undefined routes and returns JSON error
 */
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
};

module.exports = notFound;
