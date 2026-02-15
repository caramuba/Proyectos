import dotenv from "dotenv";
import app from "./app.js";
import { connectDb } from "./config/db.js";
import cors from "cors";

app.use(cors());

dotenv.config();

const startServer = async () => {
  await connectDb();

  app.listen(process.env.PORT, () => {
    console.log(
      `🚀 Servidor corriendo en http://localhost:${process.env.PORT}`,
    );
  });
};

startServer();
