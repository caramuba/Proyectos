import axios from "axios";

const API_URL = "http://localhost/4000/api/products";

export const getProductsRequest = () => {
  return axios.get(API_URL); // get al backend para obtener todos los productos
};

export const createProductRequest = (product) => {
  return axios.post(API_URL, product); //post al backend para enviar nuevo producto
};

export const deleteProductRequest = (id) => {
  return axios.delete(`${API_URL}/${id}`); //delete al backend para eliminar producto por id
};

export const updateProductRequest = (id, product) => {
  return axios.put(`${API_URL}/${id}`, product); //put al backend para actualizar producto por id
};
