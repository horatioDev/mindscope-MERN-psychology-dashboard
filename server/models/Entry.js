// Import Mongoose
const mongoose = require("mongoose");

// Create Entry Model 
const entrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    
    mood: {
      type: String,
      required: true,
    },

    intensity: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    journal: {
      type: String,
      required: true,
    },

    emotion: {
      type: String,
      default: "Not analyzed",
    },
  },
  { timestamps: true }
);

// Export Model
module.exports = mongoose.model("Entry", entrySchema);