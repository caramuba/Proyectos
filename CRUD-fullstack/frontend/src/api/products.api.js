import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api/products",
});

export const getProductsRequest = () => API.get("/"); // get al backend para obtener todos los productos

export const getProductByIdRequest = (id) => API.get(`/${id}`); //post al backend para enviar nuevo producto

export const createProductRequest = (product) => API.post("/", product);

export const deleteProductRequest = (id) => API.delete(`/${id}`); //delete al backend para eliminar producto por id

export const updateProductRequest = (id, product) => API.put(`/${id}`, product);
