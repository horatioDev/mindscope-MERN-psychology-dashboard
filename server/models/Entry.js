// Import mongoose
const mongoose = require("mongoose");

// Create Entry Schema
const entrySchema = mongoose.Schema({

  mood: {
    type: String,
    required: true,
  },

  journal: {
    type: String,
    required: true,
  },

  emotion: {
    type: String,
    default: "unknown",
  },

  date: {
    type: Date,
    default:Date.now,
  }
});

// Export Model
module.exports = mongoose.model("Entry", entrySchema);