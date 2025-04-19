import { Request, Response, NextFunction } from "express";

// Middleware para manejar rutas no encontradas
export function notFoundHandler(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
    ...(process.env.NODE_ENV !== "production" && {
      stack: new Error().stack,
    }),
  });
}