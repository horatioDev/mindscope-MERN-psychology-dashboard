// Import Mongoose
const mongoose = require("mongoose");

// Create Entry Model 
const entrySchema = new mongoose.Schema(
  {
    mood: {
      type: String,
      required: true,
      enum: ["Happy", "Sad", "Anxious", "Calm", "Angry", "Stressed", "Motivated"],
    },
    intensity: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    category: {
      type: String,
      required: true,
      enum: ["School", "Work", "Family", "Health", "Social", "Personal"],
      default: "Personal",
    },
    journal: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Export Model
module.exports = mongoose.model("Entry", entrySchema);