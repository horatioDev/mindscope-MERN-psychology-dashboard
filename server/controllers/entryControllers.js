// Import Model
const Entry = require("../models/Entry");

// @desc Get all entries
// @route Get /api/entries
const getEntries = async (req, res) => {

  try {
    // Find all entries
    const entries = await Entry.find();

    // Send response
    res.json(entries)
    
  } catch (err) {
    
    res.status(500).json({
      message: err.message
    })
  }

}

// @desc Create Entry
// @route POST /api/entries
const createEntry = async (req, res) => {

  try {
    // Deconstruct request
    const { mood, journal } = req.body;

    // Create new entry
    const entry = await Entry.create({
      mood,
      journal,
      emotion: "happy" // Placeholder tbr
    });

    // Send response
    res.status(201).json(entry);
  } catch (err) {

    res.status(500).json({
      message: err.message,
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
    // Retrieve entry
    const entry = await Entry.findById(req.params.id);
    
    // Send response if entry isn't found
    if(!entry) {
      return res.status(404).json({
        message: "Entry not found",
      })
    }

    // Update input(s)
    entry.mood = req.body.mood || entry.mood;
    entry.journal = req.body.journal || entry.journal;

    // Update Entry
    const updatedEntry = await entry.save();

    res.json(updatedEntry);

    
  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
    
  }
}

// @desc Delete Entry
// @route DELETE /api/entries/:id
const deleteEntry = async (req, res) => {

  try {
    // Retrieve entry
    const entry = await Entry.findById(req.params.id);
    
    // Send response if entry isn't found
    if(!entry) {
      return res.status(404).json({
        message: "Entry not found",
      })
    }

    // Delete Entry
    await entry.deleteOne();

    // Send response
    res.json({
      message: "Entry deleted",
    })

  } catch (err) {

    res.status(500).json({
      message: err.message,
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