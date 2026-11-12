
import axios from "axios";

const api = axios.create({
  baseURL: "https://e-commerce-api-3wara.vercel.app",
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  const isAdminRequest =
    config.url?.startsWith("/auth/me") ||
    ["post", "put", "patch", "delete"].includes(
      config.method?.toLowerCase()
    );

  if (token && isAdminRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;