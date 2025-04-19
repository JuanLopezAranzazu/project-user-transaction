import express, { Request, Response } from "express";
import dotenv from "dotenv";
import loadRoutes from "./routes";
import { errorHandler } from "./middlewares/error.middleware";
import { notFoundHandler } from "./middlewares/noFound.middleware";
import prisma from "./config/prisma";

dotenv.config();

const app = express();

const SERVER_PORT = process.env.SERVER_PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cargar las rutas
loadRoutes(app);

// Rutas
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

// Middleware para manejar errores
app.use(errorHandler);
// Middleware para manejar rutas no encontradas
app.use(notFoundHandler);

// Iniciar el servidor
const startServer = async () => {
  try {
    // Conectar a la base de datos
    await prisma.$connect();
    console.log("Connected to the database successfully.");

    // Iniciar el servidor solo después de la conexión exitosa
    app.listen(SERVER_PORT, () => {
      console.log(`Server is running on port ${SERVER_PORT}`);
      console.log(`http://localhost:${SERVER_PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Salir del proceso si no se puede conectar
  }
};

startServer();
