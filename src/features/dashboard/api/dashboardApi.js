const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchDashboard() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Not logged in. Please sign in as admin first.");
  }

  const res = await fetch(`${BASE_URL}/orders/admin/dashboard`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok || !json.success) {
    throw new Error(json.message || `Request failed (${res.status})`);
  }
  return json;
}