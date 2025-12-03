import prisma from "../config/prisma";
import { Request, Response } from "express";

export async function getUsers(req: Request, res: Response) {
  try {
    const { role } = req.query;

    const where = role ? { role: role as string } : undefined;

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Error when trying find the user" });
  }
}
