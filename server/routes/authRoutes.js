// Import express
const express = require("express");

// Import User Auth Controller
const { registerUser, loginUser } = require("../controllers/authControllers");

// Add Router
const router = express.Router();

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Export Routes
module.exports = router;