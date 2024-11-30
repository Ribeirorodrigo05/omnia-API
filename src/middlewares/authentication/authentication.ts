import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

export function authenticateToken(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    response
      .status(401)
      .json({ message: "Token não fornecido. Acesso negado." });
    return;
  }

  try {
    const { id, role } = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    request.user = {
      id,
      role,
    };
    next();
  } catch (error) {
    response.status(403).json({ message: "Token inválido ou expirado." });
    return;
  }
}
