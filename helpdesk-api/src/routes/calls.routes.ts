import { Router } from "express";
import { createCall, getCalls } from "../controllers/callsController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

//Create call (user must login)
router.post("/", authMiddleware, createCall);

//To list calls (user must login)
router.get("/", authMiddleware, getCalls);

export default router;
