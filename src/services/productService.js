
import api from "../api/axios";

export async function getProducts(params = {}) {
  const response = await api.get("/products/search", {
    params: {
      page: 1,
      limit: 10,
      ...params,
    },
  });

  return response.data;
}
