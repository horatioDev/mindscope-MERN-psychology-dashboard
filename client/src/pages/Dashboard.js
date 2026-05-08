import { useEffect, useState } from "react";

import EntryForm from "../components/EntryForm";


function Dashboard() {

  const [entries, setEntries] = useState([]);
  const [editEntry, setEditEntry] = useState(null);


  // Fetch entries from backend
  const fetchEntries = async () => {

    try {

      const { data } = await API.get("/entries");

      setEntries(data);

    } catch (error) {

      console.log(error);

    }

  };


  // DELETE ENTRY FUNCTION
  const deleteEntry = async (id) => {

    try {

      // Delete entry from backend
      await API.delete(`/entries/${id}`);

      // Refresh entries after delete
      fetchEntries();

    } catch (error) {

      console.log(error);

    }

  };


  // Load entries on page load
  useEffect(() => {

    fetchEntries();

  }, []);


  return (

    <div className="dashboard">

      <h1 className="dashboard-title">
        MindScope Dashboard
      </h1>

      <EntryForm 
        fetchEntries={fetchEntries}
        editEntry={editEntry}
        setEditEntry={setEditEntry}
      />

      <div className="entries-container">

        {entries.length === 0 ? (

          <p className="empty-message">
            No entries yet.
          </p>

        ) : (

          entries.map((entry) => (

            <div
              className="entry-card"
              key={entry._id}
            >

              <h3>{entry.mood}</h3>

              <p>{entry.journal}</p>

              <small>
                Emotion: {entry.emotion}
              </small>

              {/* EDIT BUTTON */}
              <button
                className="btn btn-edit"
                onClick={() => setEditEntry(entry)}
              >
                Edit
              </button>

              {/* DELETE BUTTON */}
              <button
                className="btn btn-danger"
                onClick={() => deleteEntry(entry._id)}
              >
                Delete
              </button>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default Dashboard;