import mongoose from "mongoose"; //importacion de mongoose para conectar con mongoDB

export const connectDB = async () => {
  // funcion asincrona para conectar con la base de datos
  try {
    //intento de coneccion con mongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado");
  } catch (error) {
    console.log("Error MongoDB", error.message);
  }
};
