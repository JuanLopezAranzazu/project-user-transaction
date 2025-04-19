import { Router } from "express";
import {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

// Rutas de transacciones
router.get("/", authMiddleware, getTransactions); // Obtener todas las transacciones
router.get("/:id", authMiddleware, getTransactionById); // Obtener una transacción por ID
router.post("/", authMiddleware, createTransaction); // Crear una nueva transacción
router.put("/:id", authMiddleware, updateTransaction); // Actualizar una transacción existente
router.delete("/:id", authMiddleware, deleteTransaction); // Eliminar una transacción por ID

export default router;
