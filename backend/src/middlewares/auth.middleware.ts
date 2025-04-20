import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomJwtPayload } from "../types";

// Middleware para verificar el token JWT
const authMiddleware = (
  req: Request & { user?: number },
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as CustomJwtPayload;
    req.user = decoded.user;
    next();
  } catch (err: any) {
    if(err.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token expired." });
      return;
    }
    res.status(401).json({ message: "Invalid token." });
  }
};

export default authMiddleware;
