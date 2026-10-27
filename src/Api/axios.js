import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// يضيف التوكن تلقائيًا مع كل طلب
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization =' Bearer ${token}';
  }
  return config;
});

// لو السيرفر رجّع 401 يمسح البيانات ويرجّع للوجين
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname !== "/login") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;