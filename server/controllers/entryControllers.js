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
const createEntry = async (req, res) => {

  try {
    // Deconstruct request
    const { mood, intensity, category, journal } = req.body;

    // Create new entry
    const entry = await Entry.create({
      user: req.user._id,
      mood,
      intensity,
      category,
      journal,
    });

    // Send response
    res.status(201).json(entry);
  } catch (err) {

    res.status(400).json({
      message: "Error creating entry",
      error: err.message,
    });
    
  }
}

// @desc Get Entry by ID
// @route GET /api/entries/:id
const getEntryById = async (req, res) => {

  try {
    // Retrieve entry
    const entry = await Entry.findById(req.params.id);

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
const updateEntry = async (req, res) => {

  try {
    const { mood, intensity, category, journal } = req.body;

    
    // Update Entry
    const entry = await Entry.findByIdAndUpdate(
      req.params.id,
      { mood, intensity, category, journal },
      {new: true, runValidators: true }
    );
    
    // Send response if entry isn't found
    if(!entry) {
      return res.status(404).json({
        message: "Entry not found",
      })
    }

    

    res.status(200).json(entry);

    
  } catch (err) {

    res.status(400).json({
      message: "Error updating entry",
      error: err.message,
    });
    
  }
}

// @desc Delete Entry
// @route DELETE /api/entries/:id
const deleteEntry = async (req, res) => {

  try {
    // Retrieve entry
    const entry = await Entry.findByIdAndDelete(req.params.id);
    
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