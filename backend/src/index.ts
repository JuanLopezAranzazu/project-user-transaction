import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const SERVER_PORT = process.env.SERVER_PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get("/", (_req: Request, res: Response) => {
  res.json({ "message": "Hello World!" });
});

// iniciar el servidor
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
  console.log(`http://localhost:${SERVER_PORT}`);
});
