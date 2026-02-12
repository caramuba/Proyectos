import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String, //el titulo sera texto.
      required: true, //sera obligatorio.
      trim: true, //elimina los espacios en blanco al inicio y al final del texto.
    },

    completed: {
      type: Boolean,
      default: false, //por defecto, la tarea no estará completada.
    },
  },
  { timestamps: true }, //agrega automáticamente campos de fecha de creación y actualización a cada documento de tarea.
);

export default mongoose.model("Task", taskSchema);
//exporta el modelo de tarea para que pueda ser utilizado en otras partes de la aplicación.
//"Task" sera el nombre de la coleccion en MongoDB (tasks)
