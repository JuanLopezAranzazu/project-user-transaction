import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomJwtPayload } from "../types";

const SECRET_KEY: string = process.env.JWT_SECRET ?? "your_secret_key";

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
    const decoded = jwt.verify(token, SECRET_KEY) as CustomJwtPayload;
    if (!decoded) {
      res.status(401).json({ message: "Invalid token." });
      return;
    }
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};

export default authMiddleware;
