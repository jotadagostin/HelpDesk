import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export type RoleType = "ADMIN" | "TEC" | "CLIENT";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: RoleType;
}

export async function registerUser({
  name,
  email,
  password,
  role = "CLIENT",
}: RegisterInput) {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    return { user, token };
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        const target = err.meta?.target as string[];
        if (target.includes("email")) {
          throw new Error("This Email already is registered");
        }
      }
    }
    throw err;
  }
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid password");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  return { user, token };
}
