import { useState, useEffect } from "react";

import API from "../services/api";


function EntryForm({

  onSubmit,
  editEntry,
  cancelEntry,

}) {

  const [formData, setFormData] = useState({
    mood: "Happy",
    intensity: 5,
    category: "Personal",
    journal: "",
  });


  // Populate form when editing
  useEffect(() => {

    if (editEntry) {

      setFormData({
        mood: editEntry.mood || "Happy",
        intensity: editEntry.intensity || 5,
        category: editEntry.category || "Personal",
        journal: editEntry.journal || "",
      });

    }

  }, [editEntry]);

  // Handle form 
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "intensity" ? Number(value) : value;
    })
  }

  // Handle form submission
  const handleSubmit = (e) => {

    e.preventDefault();

    if (!editEntry) {
      // Validate form
      setFormData({
        mood: "Happy",
        intensity: 5,
        category: "Personal",
        journal: "",
      })
    }


  };


  return (

    <form
      className="entry-form"
      onSubmit={handleSubmit}
    >

      {/* Mood Selection */}
      <label>Mood</label>
      <select name="mood" value={formData.mood} onChange={handleChange}>
        <option>Happy</option>
        <option>Sad</option>
        <option>Anxious</option>
        <option>Calm</option>
        <option>Angry</option>
        <option>Stressed</option>
        <option>Motivated</option>
      </select>


      {/* Intensity Input */}
      <label>Intensity: {formData.intensity}/10</label>
      <input
        type="range"
        name="intensity"
        min="1"
        max="10"
        value={formData.intensity}
        onChange={handleChange}
      />

      {/* Category Selection */}
      <label>Category</label>
      <select name="category" value={formData.category} onChange={handleChange}>
        <option>School</option>
        <option>Work</option>
        <option>Family</option>
        <option>Health</option>
        <option>Social</option>
        <option>Personal</option>
      </select>

      {/* Journal Textarea */}
      <label>Journal Reflection</label>
      <textarea
        name="journal"
        value={formData.journal}
        onChange={handleChange}
        placeholder="Write your reflection..."
        required
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary"
      >
        { editEntry ? "Update Entry" : "Add Entry" }
      </button>

      {/* Cancel Button */}
      { editEntry && (
        <button 
          type="button"
          onClick={cancelEdit}
        >
          Cancel Edit
        </button>
      )}

    </form>

  );

}


export default EntryForm;