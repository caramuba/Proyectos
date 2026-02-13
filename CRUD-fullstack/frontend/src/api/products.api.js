import axios from "axios";

const API_URL = "http://localhost/4000/api/products";

export const getProductsRequest = () => {
  return axios.get(API_URL); // get al backend para obtener todos los productos
};
