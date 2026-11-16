import api from "../../../api/axios";

export const fetchUsers = () => api.get("/users/all");
export const getUser = (id) => api.get("/users/" + id);
export const addUser = (payload) => api.post("/users/add", payload);
export const updateUser = (id, payload) => api.patch("/users/" + id, payload);
export const deleteUsers = (id) => api.delete("/users/" + id);
export const changeRole = (payload) => api.patch("/auth/change-role", payload);