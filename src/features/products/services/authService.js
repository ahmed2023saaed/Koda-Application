
import api from "../api/axios";

export async function loginAdmin(email, password) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  const data = response.data;

  if (data.user?.role !== "admin") {
    throw new Error("Access denied. Admin account required.");
  }

  localStorage.setItem("token", data.token);

  return data.user;
}


export async function getCurrentAdmin() {
  const response = await api.get("/auth/me");

  const user = response.data.user;

  if (user?.role !== "admin") {
    throw new Error("Admin access required.");
  }

  return user;
}