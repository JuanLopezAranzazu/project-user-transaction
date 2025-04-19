import express from "express";
import userRoute from "./user.route";
import transactionRoute from "./transaction.route";

// Función que se encarga de cargar las rutas
function loadRoutes(app: express.Application) {
  const router = express.Router();
  // Prefijo para las rutas de la API
  app.use("/api/v1", router);
  // Cargar las rutas de los módulos
  router.use("/user", userRoute);
  router.use("/transaction", transactionRoute);
}

export default loadRoutes;