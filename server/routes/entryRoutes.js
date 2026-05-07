// Import express
const express = require("express");

// Create router
const router = express.Router();

// Import controller(s)
const { getEntries, createEntry, getEntryById, updateEntry, deleteEntry } = require("../controllers/entryControllers");

// Routes
router.route("/")
  .get(getEntries)
  .post(createEntry)

// Dynamic routes
router.route("/:id")
  .get(getEntryById)
  .put(updateEntry)
  .delete(deleteEntry)

// Export router
  module.exports = router;