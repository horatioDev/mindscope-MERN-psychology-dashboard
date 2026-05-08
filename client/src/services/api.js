import axios from "axios";

// Backend API URL
const API_URL = "http://localhost:5000/api/entries";

// Get Entries
export const getEntries = () => axios.get(API_URL)

// Create Entry
export const createEntry = (entryData) => axios.post(API_URL, entryData)

// Update Entry
export const updateEntry = (id, entryData) => axios.put(`${API_URL}/${id}`, entryData)

// Delete Entry
export const deleteEntry = (id) => axios.delete(`${API_URL}/${id}`)

const API = axios.create({
  baseURL: ,
});

export default API;