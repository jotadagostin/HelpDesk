import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCall = async (req: Request, res: Response) => {
  // 🔥 Logs para diagnosticar
  console.log("🔥 RECEBI REQUISIÇÃO /api/calls");
  console.log("BODY:", req.body);
  console.log("USER:", req.user);

  try {
    const { title, description, category, total, additionalServices } =
      req.body;

    const userId = (req as any).user?.id;

    if (!title || !description || !category || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newCall = await prisma.call.create({
      data: {
        title,
        description: description || "",
        category,
        total: total ?? null,
        // @ts-ignore
        additionalServices: JSON.stringify(additionalServices || []),
        userId: Number(userId),
        technicianName: null,
        status: "open",
        updatedAt: new Date(),
      },
      include: { user: true },
    });

    return res.status(201).json({
      ...newCall,
      // @ts-ignore
      additionalServices: JSON.parse(newCall.additionalServices),
    });
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

    // @ts-ignore
    const parsedCalls = calls.map((call) => ({
      ...call,
      // @ts-ignore
      additionalServices: JSON.parse(call.additionalServices),
    }));

    res.json(parsedCalls);
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

    // @ts-ignore
    const parsedCall = {
      ...call,
      // @ts-ignore
      additionalServices: JSON.parse(call.additionalServices),
    };

    res.json(parsedCall);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const updateCall = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const {
      title,
      description,
      category,
      total,
      status,
      technicianName,
      additionalServices,
    } = req.body;

    const existing = await prisma.call.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: "Call not found" });

    const user = (req as any).user;
    // clients can only update their own calls; technicians and admins can update any call
    if (user?.role === "CLIENT" && existing.userId !== user?.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    // Category base prices
    const CATEGORY_PRICES: Record<string, number> = {
      "data-recover": 200.0,
      backup: 150.0,
      internet: 100.0,
      others: 50.0,
    };

    // Calculate total if additionalServices changed
    let calculatedTotal = total ?? existing.total;
    if (additionalServices !== undefined) {
      const basePrice = CATEGORY_PRICES[category || existing.category] ?? 0;
      const additionalTotal = (additionalServices as any[]).reduce(
        (sum, service) => sum + (Number(service.price) || 0),
        0
      );
      calculatedTotal = basePrice + additionalTotal;
    }

    const updated = await prisma.call.update({
      where: { id },
      data: {
        title: title ?? existing.title,
        description: description ?? existing.description,
        category: category ?? existing.category,
        total: calculatedTotal,
        status: status ?? existing.status,
        technicianName: technicianName ?? existing.technicianName,
        // @ts-ignore
        additionalServices:
          additionalServices !== undefined
            ? JSON.stringify(additionalServices)
            : existing.additionalServices,
      },
      include: { user: true },
    });

    // @ts-ignore
    const parsedUpdated = {
      ...updated,
      // @ts-ignore
      additionalServices: JSON.parse(updated.additionalServices),
    };

    res.json(parsedUpdated);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
