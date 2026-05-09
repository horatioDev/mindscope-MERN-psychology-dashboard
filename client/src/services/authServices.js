import axios from "axios";

// Backend URL
const API_URL = "http://localhost:5000/api/auth";

// Register User
export const registerUser = (userData) =>
  axios.post(`${API_URL}/register`, userData);

// Login User
export const loginUser = (userData) =>
  axios.post(`${API_URL}/login`, userData);
