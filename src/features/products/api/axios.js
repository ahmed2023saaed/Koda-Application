
import axios from "axios";

const api = axios.create({
  baseURL: "https://e-commerce-api-3wara.vercel.app",
});

export default api;