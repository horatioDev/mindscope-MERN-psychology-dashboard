// Import mongoose
const mongoose = require("mongoose");

// Async function to connect to database
const connectDB =  async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected')

  } catch (err) {

    console.log(err.message)

    // Exit if DB fails
    process.exit(1)
    
  }
}

// Export function
module.exports = connectDB;