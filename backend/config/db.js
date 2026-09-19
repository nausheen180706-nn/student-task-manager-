const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * Uses connection string from process.env.MONGO_URI
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
    return conn;
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
