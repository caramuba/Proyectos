import { useEffect, useState } from "react";

import {
  getTasksRequest,
  createTaskRequest,
  deleteTaskRequest,
  updateTaskRequest,
} from "./api/tasks.api"; //importa las funciones para realizar peticiones relacionadas con tareas desde el archivo tasks.api.js

function App() {
  const [tasks, setTasks] = useState([]); //estado para almacenar la lista de tareas
  const [title, setTitle] = useState(""); //estado para almacenar el título de una nueva tarea mediante un input

  useEffect(() => {
    //efecto para cargar las tareas al montar el componente
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await getTasksRequest(); //realiza una petición para obtener todas las tareas
    setTasks(res.data); //actualiza el estado con la lista de tareas obtenida
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //previene que se recargue la pagina por defecto

    if (title.trim() === "") return;

    await createTaskRequest({ title }); //realiza una petición para crear una nueva tarea con el título ingresado
    setTitle(""); //limpia el input después de crear la tarealoadTasks();
    loadTasks(); //recarga la lista de tareas después de crear una nueva tarea
  };

  const handleDelete = async (id) => {
    await deleteTaskRequest(id); //realiza una petición para eliminar una tarea específica utilizando su id
    loadTasks(); //recarga la lista de tareas después de eliminar una tarea
  };

  const toggleDone = async (task) => {
    await updateTaskRequest(task._id, { done: !task.done }); //realiza una petición para actualizar el estado de una tarea específica, cambiando su propiedad "done" a su valor opuesto
    loadTasks(); //recarga la lista de tareas después de actualizar el estado de una tarea
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center p-6 bg-gradient-to-br from-zinc-900 via-slate-900 to-black text-white">
      {/* contenedor principal de la aplicación con estilos de Tailwind CSS */}
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl">
        {/* Titulo Principal */}
        <h1 className="text-4xl font-extrabold text-center mb-2 tracking-wide">
          To Do App
        </h1>
        {/* Subtitulo */}
        <p className="text-center text-gray-300 mb-6">
          👌Organiza tus tareas like a Pro!🚀
        </p>
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="nueva tarea"
            className="flex-1 px-4 py-3 rounded-2xl bg-white/20 border border-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-green-500 transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-600 px-5 py-3 rounded-2xl font-bold hover:bg-green-700 transition shadow-lg"
          >
            Crear
          </button>
        </form>

        {/* Lista de Tareas */}
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between items-center bg-white/10 border border-white/20 p-4 rounded-2xl shadow-md hover:bg-white/20 transition"
            >
              {/* Texto de la tarea */}
              <span
                onClick={() => toggleDone(task)}
                className={`cursor-pointer flex-1 text-lg ${
                  task.done ? "line-through text-gray-400" : "text-white"
                }`}
              >
                {task.title}
              </span>
              {/* Botón de eliminar */}
              <button
                onClick={() => handleDelete(task._id)}
                className="ml-3 bg-red-600 px-4 py-2 rounded-xl font-bold hover:bg-red-700 transition"
              >
                Borrar
              </button>
            </li>
          ))}
        </ul>
        {tasks.length === 0 && (
          <p className="text-center text-gray-400 mt-6">
            No hay tareas aún, ¡crea tu primera tarea! 🚀
          </p>
        )}
      </div>
    </div>
  );
}

export default App; //exporta el componente App para ser utilizado en otras partes de la aplicación
