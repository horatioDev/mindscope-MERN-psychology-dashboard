import { useState, useEffect } from "react";

import API from "../services/api";


function EntryForm({

  fetchEntries,
  editEntry,
  setEditEntry,

}) {

  const [mood, setMood] = useState("");

  const [journal, setJournal] = useState("");

  const [loading, setLoading] =
  useState(false);

  const [error, setError] = useState("");


  // Populate form when editing
  useEffect(() => {

    if (editEntry) {

      setMood(editEntry.mood);

      setJournal(editEntry.journal);

    }

  }, [editEntry]);


  // Handle form submission
  const submitHandler = async (e) => {

    e.preventDefault();

    // Validate form
    if (!mood || !journal) {

      setError(
        "Please complete all fields."
      );
      return

    }

    setError("")
    setLoading(true)

    try {

      // UPDATE ENTRY
      if (editEntry) {

        await API.put(

          `/entries/${editEntry._id}`,

          {
            mood,
            journal,
          }

        );

        // Clear edit mode
        setEditEntry(null);

      } else {

        // CREATE ENTRY
        await API.post("/entries", {

          mood,
          journal,

        });

      }


      // Clear form
      setMood("");

      setJournal("");


      // Refresh entries
      fetchEntries();

      console.log("Form Submitted");
      setLoading(false);

    } catch (err) {
      setError(
        "Something went wrong."
      );
      setLoading(false);

    }

  };


  return (

    <form
      className="entry-form"
      onSubmit={submitHandler}
    >

      {/* Mood Input */}
      <input
        type="text"
        placeholder="Mood"
        value={mood}
        onChange={(e) =>
          setMood(e.target.value)
        }
      />


      {/* Journal Input */}
      <textarea
        placeholder="Journal Entry"
        value={journal}
        onChange={(e) =>
          setJournal(e.target.value)
        }
      />

      {error && (

        <p className="error-message">
          {error}
        </p>

      )}


      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
      >

        { loading
            ? "Saving..."
            : editEntry
            ? "Update Entry"
            : "Save Entry"
        }

      </button>

    </form>

  );

}


export default EntryForm;