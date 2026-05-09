// Import Axios
const axios = require("axios");
// Import Model
const Entry = require("../models/Entry");

// @desc Get all entries
// @route Get /api/entries
const getEntries = async (req, res) => {

  try {
    // Find all user entries by most recent
    const entries = await Entry.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    // Send response
    res.status(200).json(entries)
    
  } catch (err) {
    
    res.status(500).json({

      message: "Error fetching entries",
      error: err.message
    })
  }

}

// @desc Create Entry
// @route POST /api/entries
// Create a new mood/journal entry
const createEntry = async (req, res) => {
  try {

    // Extract entry data sent from the frontend
    const { mood, intensity, category, journal } = req.body;

    // Default emotion value
    // Used if the ML service fails or is unavailable
    let emotion = "Not analyzed";

    // Try to analyze the journal text using the Flask ML service
    try {

      // Send POST request to Python NLP service
      const analysis = await axios.post("http://localhost:8000/analyze", {

        // Send journal text for emotion analysis
        text: journal,
      });

      // Save detected emotion from ML response
      // Fallback to default if no emotion is returned
      emotion = analysis.data.emotion || "Not analyzed";

    } catch (analysisError) {

      // Log ML service errors without crashing app
      console.log("ML service unavailable:", analysisError.message);
    }

    // Create new entry in MongoDB database
    const entry = await Entry.create({

      // Associate entry with authenticated user
      user: req.user._id,

      // Save mood-related data
      mood,
      intensity,
      category,
      journal,

      // Save analyzed emotion result
      emotion,
    });

    // Return created entry with HTTP 201 (created)
    res.status(201).json(entry);

  } catch (err) {

    // Handle validation/database/server errors
    res.status(400).json({

      // Error message returned to frontend
      message: "Error creating entry",

      // Detailed error message
      error: err.message,
    });
  }
};

// @desc Get Entry by ID
// @route GET /api/entries/:id
const getEntryById = async (req, res) => {

  try {
    // Retrieve entry
    const entry = await Entry.findById({
      _id: req.params.id,
      user: req.user._id,
    });

    // Send response if entry isn't found
    if(!entry) {
      return res.status(404).json({
        message: "Entry not found",
      })
    }

    res.json(entry);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
    
  }
}

// @desc Update Entry
// @route PUT /api/entries/:id
// Update an existing journal/mood entry
const updateEntry = async (req, res) => {
  try {
    // Extract updated entry data from the request body
    const { mood, intensity, category, journal } = req.body;

    // Default emotion value in case the ML service fails
    let emotion = "Not analyzed";

    // Try to analyze the journal text using the Flask ML service
    try {
      const analysis = await axios.post("http://localhost:8000/analyze", {
        text: journal,
      });

      // Save returned emotion, or fallback if no emotion is returned
      emotion = analysis.data.emotion || "Not analyzed";
    } catch (analysisError) {
      // Do not stop the update if the ML service is unavailable
      console.log("ML service unavailable:", analysisError.message);
    }

    // Find the entry by ID and make sure it belongs to the logged-in user
    const entry = await Entry.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      {
        mood,
        intensity,
        category,
        journal,
        emotion,
      },
      {
        new: true, // Return the updated entry instead of the old one
        runValidators: true, // Run schema validation during update
      }
    );

    // If no matching entry exists, return 404
    if (!entry) {
      return res.status(404).json({
        message: "Entry not found",
      });
    }

    // Return the updated entry
    res.status(200).json(entry);
  } catch (err) {
    // Handle validation or server errors
    res.status(400).json({
      message: "Error updating entry",
      error: err.message,
    });
  }
};

// @desc Delete Entry
// @route DELETE /api/entries/:id
const deleteEntry = async (req, res) => {

  try {
    // Retrieve entry
    const entry = await Entry.findByIdAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    
    // Send response if entry isn't found
    if(!entry) {
      return res.status(404).json({
        message: "Entry not found",
      })
    }


    // Send response
    res.status(200).json({
      message: "Entry deleted successfully",
    })

  } catch (err) {

    res.status(500).json({
      message: "Error deleting entry",
      error: err.message,
    });
    
  }
}



// Export Controllers
module.exports = {
  getEntries,
  createEntry,
  updateEntry,
  deleteEntry,
  getEntryById
}