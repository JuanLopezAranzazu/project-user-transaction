import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../utils/password";
import prisma from "../config/prisma";

const SECRET_KEY: string = process.env.JWT_SECRET ?? "your_secret_key";

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

    if (existingUser) {
      res.status(409).json({ message: "Email already exists" });
      return;
    }

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

    if (!user || !(await comparePassword(password, user.passwordHash))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ user: user.id }, SECRET_KEY, {
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
