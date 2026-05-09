import { useEffect, useState } from "react";

// Import Entry Form
import EntryForm from "../components/EntryForm";

// Import Navbar
import Navbar from "../components/Navbar";

// Import CRUD Functionality
import { createEntry, getEntries, updateEntry, deleteEntry } from "../services/api";

// Import Mood Chart
import MoodChart from "../components/MoodCharts";



function Dashboard() {

  const [entries, setEntries] = useState([]);
  const [editEntry, setEditEntry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // Load entries 
  const loadEntries = async () => {

    try {
      setLoading(true);

      const res = await getEntries();

      // Load data
      setEntries(res.data);

      // Clear Error
      setError("");

    } catch (err) {
      setError("Could not load entries. Make sure the server is running");
    } finally {
      setLoading(false)
    }

  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    } else {
      loadEntries();
    }
  }, [])

  // Handle Form Submission
  const handleSubmit = async (entryData) => {
    try {
      // Check if  Editing
      if (editEntry) {
        await updateEntry(editEntry._id, entryData);
        setEditEntry(null);
      } else {
        await createEntry(entryData);
      }

      loadEntries();
    } catch (err) {
      setError("Could not save entry.");
    }
  };

  // DELETE ENTRY 
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this entry?")

    if (!confirmed) return;

    try {

      // Delete entry from backend
      await deleteEntry(id);

      // Refresh entries after delete
      loadEntries();

    } catch (error) {
      setError("Could not delete entry")
      console.log(error);
    }

  };

  // Cancel editing
  const cancelEdit = () => {
    setEditEntry(null);
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Refresh to login
    window.location.href = "/login";
  }

  // Count Entries
  const totalEntries = entries.length;

  // Average Intensity
  const averageIntensity = totalEntries > 0
    ? (
      entries.reduce((sum, entry) => sum + Number(entry.intensity || 0), 0) / totalEntries
    ).toFixed(1) : 0;

  // /Most Common Mood
  const mostCommonMood =
    entries.length > 0
      ? Object.entries(
        entries.reduce((count, entry) => {
          count[entry.mood] = (count[entry.mood] || 0) + 1;
          return count;
        }, {})
      ).sort((a, b) => b[1] - a[1])[0][0]
      : "None";


  // Last Entry Date
  const latestEntryDate =
    entries.length > 0
      ? new Date(entries[0].createdAt).toLocaleDateString()
      : "No entries";


  return (
  <>
    {/* Dashboard Navbar */}
    <Navbar />

    {/* Dashboard Header */}
    <main className="dashboard">
      <section className="dashboard-hero">
        <h1>MindScope Dashboard</h1>
        <p className="subtitle">
          Track emotional patterns, reflection categories, and mood intensity.
        </p>
      </section>

      {error && <p className="error-message">{error}</p>}

      {/* keep your stats, chart, form, and entries below */}
    </main>
     {/* Statistics Section */}
      <section className="stats-grid">
        <div className="stat-card">
          <h3>Total Entries</h3>
          <p>{totalEntries}</p>
        </div>

        <div className="stat-card">
          <h3>Average Intensity</h3>
          <p>{averageIntensity}/10</p>
        </div>

        <div className="stat-card">
          <h3>Most Common Mood</h3>
          <p>{mostCommonMood}</p>
        </div>

        <div className="stat-card">
          <h3>Latest Entry</h3>
          <p>{latestEntryDate}</p>
        </div>
      </section>

      {/* Mood Chart */}
      <MoodChart entries={entries} />

      {/* Entry Form */}
      <EntryForm
        onSubmit={handleSubmit}
        editEntry={editEntry}
        cancelEntry={cancelEdit}
      />

      {/* History */}
      {loading ? (
        <p>Loading entries</p>
      ) : (
        <section className="entries-list">
          <h2>Reflection History</h2>

          {entries.length === 0 ? (
            <p>No entries available. Add your first reflection above.</p>
          ) : (
            // Map entries
            entries.map((entry) => (
              <div
                className="entry-card"
                key={entry._id}
              >
                <h3>{entry.mood}</h3>
                <p><strong>Category:</strong> {entry.category}</p>
                <p><strong>Intensity:</strong> {entry.intensity}/10</p>
                <p><strong>Date::</strong>{" "} {new Date(entry.createdAt).toLocaleString()}</p>
                <p>{entry.journal}</p>

                {/* Buttons */}
                <div className="entry-actions">
                  <button onClick={() => setEditEntry(entry)}>Edit</button>
                  <button onClick={() => handleDelete(entry._id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </section>
      )}


  </>
);


}

export default Dashboard;