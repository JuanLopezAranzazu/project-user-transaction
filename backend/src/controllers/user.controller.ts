import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../utils/password";
import prisma from "../config/prisma";

// Endpoint para registrar un nuevo usuario
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, email, password, phone, address } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    // Validar si el usuario ya existe
    if (existingUser) {
      res.status(409).json({ message: "Email already exists" });
      return;
    }
    // Crear un nuevo usuario
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        passwordHash: await hashPassword(password),
        phone,
        address,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// Endpoint para iniciar sesión
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    // Validar si el usuario existe
    if (!user || !(await comparePassword(password, user.passwordHash))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    // Generar un token JWT y enviarlo como cookie
    const token = jwt.sign({ user: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

// Endpoint para cerrar sesión
export const logout = async (
  req: Request & { user?: number },
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

// Endpoint para obtener información del usuario autenticado
export const me = async (
  req: Request & { user?: number },
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
