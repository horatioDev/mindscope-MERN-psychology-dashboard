import axios from "axios";

// Get user Token
const token = localStorage.getItem("token");

// Configure
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  }
}

// Backend API URL
const API_URL = "http://localhost:5000/api/entries";

// Get Entries
export const getEntries = () => axios.get(API_URL, config)

// Create Entry
export const createEntry = (entryData) => axios.post(API_URL, entryData, config)

// Update Entry
export const updateEntry = (id, entryData) => axios.put(`${API_URL}/${id}`, entryData, config)

// Delete Entry
export const deleteEntry = (id) => axios.delete(`${API_URL}/${id}`, config)
