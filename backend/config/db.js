const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Optional: Retry connection
    setTimeout(connectDB, 5000); // Retry connection after 5 seconds
  }
};

module.exports = connectDB;
