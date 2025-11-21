import { Router } from "express";
import { createCall, getCalls } from "../controllers/callsController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

//Create call (user must login)
router.post("/calls", authMiddleware, createCall);

//To list calls (user must login)
router.get("/calls", authMiddleware, getCalls);

export default router;
