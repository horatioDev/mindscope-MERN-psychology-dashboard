// Import express
const express = require("express");

// Import Protect Middleware
const { protect } = require("../middleware/authMiddleware");

// Create router
const router = express.Router();

// Import controller(s)
const { getEntries, createEntry, getEntryById, updateEntry, deleteEntry } = require("../controllers/entryControllers");

// Routes
router.route("/")
  .get(protect, getEntries)
  .post(protect, createEntry)

// Dynamic routes
router.route("/:id")
  .get(getEntryById)
  .put(protect, updateEntry)
  .delete(protect, deleteEntry)

// Export router
  module.exports = router;