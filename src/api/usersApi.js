
import axios from "axios";

const API = axios.create({
  baseURL: "https://e-commerce-api-3wara.vercel.app/api-docs",
});




// Get all users
export const getUsers = () => {
  return API.get("/users");
};

// Get user by ID
export const getUserById = (id) => {
  return API.get(`/users/${id}`);
};

// Add user
export const addUser = (user) => {
  return API.post("/users", user);
};

// Update user
export const updateUser = (id, user) => {
  return API.put(`/users/${id}`, user);
};

// Delete user
export const deleteUser = (id) => {
  return API.delete(`/users/${id}`);
};