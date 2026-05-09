import axios from "axios";

const API_URL = "http://localhost:5000/api/entries";

const getConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get Entries
export const getEntries = () => axios.get(API_URL, getConfig());

// Create Entry
export const createEntry = (entryData) =>
  axios.post(API_URL, entryData, getConfig());

// Update Entry
export const updateEntry = (id, entryData) =>
  axios.put(`${API_URL}/${id}`, entryData, getConfig());

// Delete Entry
export const deleteEntry = (id) =>
  axios.delete(`${API_URL}/${id}`, getConfig());