import Task from "../models/Task.js";

// GET - Controlador para obtener todas las tareas

export const getTasks = async (req, res) => {
  const tasks = await Task.find(); // Devuelve todas las tareas en la base de datos
  res.json(tasks); // Envía las tareas como respuesta en formato JSON al frontend
};

// POST - Controlador para crear una nueva tarea

export const createTask = async (req, res) => {
  const { title } = req.body; // Extrae el título de la tarea del body de la solicitud (req.body)

  const newTask = new Task({ title });
  await newTask.save(); // Guarda la nueva tarea en la base de datos
  res.json(newTask); // Envía la nueva tarea como respuesta en formato JSON al frontend
};

// DELETE - Controlador para eliminar una tarea existente

export const deleteTask = async (req, res) => {
  const taskDeleted = await Task.findByIdAndDelete(req.params.id); // findByIdAndDelete:
  // busca el id que viene por parametro en la URL y lo elimina.
  res.json(taskDeleted); // Envía la tarea eliminada como respuesta en formato JSON al frontend
};

// PUT - Controlador para actualizar una tarea existente

export const updateTask = async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }); // findByIdAndUpdate:
  // - parametro 1: ID a modificar.
  // - parametro 2: datos modificados (req.body).
  // - parametro 3: { new: true } devuelve el documento modificado.

  res.json(updated); // Envía la tarea actualizada como respuesta en formato JSON al frontend
};
