// Importamos la instancia api configurada en api.js (axios con baseURL)
import api from "./api";

// ============================
// TRAER TODAS LAS TAREAS
// ============================
export const getTasksRequest = () => {
  // Hace GET a: http://localhost:4000/api/tasks
  return api.get("/tasks");
};

// ============================
// CREAR UNA NUEVA TAREA
// ============================
export const createTaskRequest = (task) => {
  // Hace POST a: http://localhost:4000/api/tasks
  // task es un objeto, ejemplo: { title: "Comprar pan" }
  return api.post("/tasks", task);
};

// ============================
// ELIMINAR UNA TAREA POR ID
// ============================
export const deleteTaskRequest = (id) => {
  // Hace DELETE a: http://localhost:4000/api/tasks/id
  return api.delete(`/tasks/${id}`);
};

// ============================
// TRAER UNA TAREA POR ID
// ============================
export const getTaskRequest = (id) => {
  // Hace GET a: http://localhost:4000/api/tasks/id
  return api.get(`/tasks/${id}`);
};

// ============================
// ACTUALIZAR UNA TAREA POR ID
// ============================
export const updateTaskRequest = (id, task) => {
  // Hace PUT a: http://localhost:4000/api/tasks/id
  // task puede ser por ejemplo: { done: true }
  return api.put(`/tasks/${id}`, task);
};
