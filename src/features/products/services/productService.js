
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

export async function getProductById(id) {
  const response = await api.get(`/products/${id}`);

  return response.data;
}
export async function createProduct(formData) {
  const response = await api.post("/products", formData);

  return response.data;
}
export async function updateProduct(id, formData) {
  const response = await api.patch(
    `/products/update/${id}`,
    formData
  );

  return response.data;
}
export async function deleteProduct(id) {
  const response = await api.delete(`/products/${id}`);

  return response.data;
}