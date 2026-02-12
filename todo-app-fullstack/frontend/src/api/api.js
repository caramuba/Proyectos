import axios from "axios"; //importa la libreria de axios para hacer peticiones HTTP

const api = axios.create({
  //crea una instancia de axios con una configuración base
  baseURL: "http://localhost:4000/api", //la URL base para todas las peticionesbaseURL: "http://localhost:4000/api",
});

export default api; //exporta la instancia de axios para ser utilizada en otras partes de la aplicación
