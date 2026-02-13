import mongoose from "mongoose";
// Funcion que conecta el Backend a la base de datos de MongoDB
//si falla mostramos el error y cerramos el proceso

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🫰🏼 MongoDB conectado correctamente");
  } catch (error) {
    console.log("🤦🏻Error conectando a MongoDB", error.message);
    process.exit(1);
  }
};
