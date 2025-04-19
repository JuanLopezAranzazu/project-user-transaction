import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";

// Endpoint para crear una transacción
export const createTransaction = async (
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
    const { type, amount, description } = req.body;
    // Crear la transacción en la base de datos
    const transaction = await prisma.transaction.create({
      data: {
        type,
        amount,
        description,
        userId,
      },
    });

    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

// Endpoint para obtener todas las transacciones de un usuario
export const getTransactions = async (
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
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

// Endpoint para obtener una transacción por ID
export const getTransactionById = async (
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
    const { id } = req.params;

    const transaction = await prisma.transaction.findUnique({
      where: { id: Number(id), userId },
    });
    // Verificar si la transacción existe y pertenece al usuario
    if (!transaction) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }

    res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
};

// Endpoint para actualizar una transacción
export const updateTransaction = async (
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
    const { id } = req.params;
    const { type, amount, description } = req.body;

    const transaction = await prisma.transaction.findUnique({
      where: { id: Number(id), userId },
    });
    // Verificar si la transacción existe y pertenece al usuario
    if (!transaction) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }
    // Actualizar la transacción en la base de datos
    const updatedTransaction = await prisma.transaction.update({
      where: { id: Number(id) },
      data: { type, amount, description },
    });

    res.status(200).json(updatedTransaction);
  } catch (error) {
    next(error);
  }
};

// Endpoint para eliminar una transacción
export const deleteTransaction = async (
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
    const { id } = req.params;

    const transaction = await prisma.transaction.findUnique({
      where: { id: Number(id), userId },
    });
    // Verificar si la transacción existe y pertenece al usuario
    if (!transaction) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }
    // Eliminar la transacción de la base de datos
    await prisma.transaction.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
