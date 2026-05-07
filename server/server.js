// Load environment variables
require("dotenv").config()

// Import packages
const express = require("express");
const cors = require("cors");

// Import Db connection
const connectDB = require("./config/db");

// Create app
const app = express();

// Connect database
connectDB();

// Middleware
app.use(cors())
app.use(express.json());

// Routes
app.use("/api/entries", require("./routes/entryRoutes"));

// Test routes tbr
// app.get("/", (req, res) => {
//   res.send("Mindscope API Running");
// });

// Set PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})