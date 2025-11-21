import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCall = async (req: Request, res: Response) => {
  // 🔥 Logs para diagnosticar
  console.log("🔥 RECEBI REQUISIÇÃO /api/calls");
  console.log("BODY:", req.body);
  console.log("USER:", req.user);

  try {
    const { title, description, category } = req.body;

    const userId = (req as any).user?.id;

    if (!title || !description || !category || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newCall = await prisma.call.create({
      data: {
        title,
        description,
        category,
        userId: Number(userId),
      },
    });

    return res.status(201).json(newCall);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export const getCalls = async (req: Request, res: Response) => {
  try {
    const calls = await prisma.call.findMany({
      include: { user: true },
    });

    res.json(calls);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
