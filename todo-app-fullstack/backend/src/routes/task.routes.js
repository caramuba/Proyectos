import { Router } from "express"; //sirve ara crear las Rutas

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js"; //importamos los controladores

const router = Router(); //creamos una instancia de Router (para manejar las rutas)

// GET
router.get("/", getTasks); //ruta para obtener todas las tareas

// POST
router.post("/", createTask); //ruta para crear una nueva tarea

// PUt
router.put("/:id", updateTask); //ruta para actualizar una tarea existente

// DELETE
router.delete("/:id", deleteTask); //ruta para eliminar una tarea existente

export default router; //exportamos el router para usarlo en otras partes de la aplicación
