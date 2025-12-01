import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCall = async (req: Request, res: Response) => {
  // 🔥 Logs para diagnosticar
  console.log("🔥 RECEBI REQUISIÇÃO /api/calls");
  console.log("BODY:", req.body);
  console.log("USER:", req.user);

  try {
    const { title, description, category, total } = req.body;

    const userId = (req as any).user?.id;

    if (!title || !description || !category || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newCall = await prisma.call.create({
      data: {
        title,
        description: description || "",
        category,
        // `total` is optional in the schema; accept value from the client or store null
        total: total ?? null,
        userId: Number(userId),
        technicianName: null, // null por padrão, será definido pelo admin
        status: "open", // default
        updatedAt: new Date(),
      },
      include: { user: true }, // para retornar o user completo pro frontend
    });

    return res.status(201).json(newCall);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export const getCalls = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const isAdmin = user?.role === "ADMIN";
    const isTechnician = user?.role === "TEC";

    // ADMIN and TEC see all calls; CLIENT sees only their own
    const calls = await prisma.call.findMany({
      where: isAdmin || isTechnician ? undefined : { userId: user?.id },
      include: { user: true },
    });

    res.json(calls);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getCallById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const call = await prisma.call.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!call) return res.status(404).json({ error: "Call not found" });

    const user = (req as any).user;
    // clients and technicians can see all calls; only ADMIN has full access
    // clients can only see their own calls
    if (user?.role === "CLIENT" && call.userId !== user?.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    res.json(call);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const updateCall = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, description, category, total, status, technicianName } =
      req.body;

    const existing = await prisma.call.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: "Call not found" });

    const user = (req as any).user;
    // clients can only update their own calls; technicians and admins can update any call
    if (user?.role === "CLIENT" && existing.userId !== user?.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const updated = await prisma.call.update({
      where: { id },
      data: {
        title: title ?? existing.title,
        description: description ?? existing.description,
        category: category ?? existing.category,
        total: total ?? existing.total,
        status: status ?? existing.status,
        technicianName: technicianName ?? existing.technicianName,
      },
      include: { user: true },
    });

    res.json(updated);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
