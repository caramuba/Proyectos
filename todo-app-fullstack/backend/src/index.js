import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/task.routes.js";
import { connectDB } from "./config/db.js";

dotenv.config(); // Activa dotenv para leer el archivo .env

connectDB(); // Crea una nueva aplicación Express para conectarse a la base de datos y manejar las rutas

const app = express(); // Crea una nueva aplicación Express

app.use(cors()); // Habilita CORS para permitir solicitudes desde el frontend

app.use(express.json()); // Para que el backend entienda json

app.use("/api/tasks", taskRoutes); // Usa las rutas de tareas para manejar las solicitudes a /api/tasks

const PORT = process.env.PORT || 4000; // Obtiene el puerto del archivo .env o usa el puerto 4000 por defecto

app.listen(PORT, () => {
  console.log("Servidor corriendo en http://localHost:" + PORT);
}); // Inicia el servidor en el puerto especificado y muestra un mensaje en la consola.

export default app; //exporta la aplicación Express para ser utilizada en otras partes de la aplicación
