import api from "../../../api/axios";

export async function fetchDashboard() {
  try {
    const { data } = await api.get("/orders/admin/dashboard");
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
}