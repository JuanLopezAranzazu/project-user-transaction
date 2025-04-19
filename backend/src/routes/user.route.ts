import { Router } from "express";
import { register, login, logout, me } from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

// Rutas para usuarios
router.post("/register", register); // Registrar un nuevo usuario
router.post("/login", login); // Iniciar sesión
router.post("/logout", authMiddleware, logout); // Cerrar sesión
router.get("/me", authMiddleware, me); // Obtener información del usuario autenticado

export default router;
