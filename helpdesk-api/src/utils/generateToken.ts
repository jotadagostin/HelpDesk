// src/utils/generateToken.ts
import jwt from "jsonwebtoken";

export function generateToken(id: number, role: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined in environment variables");
  }

  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
}
