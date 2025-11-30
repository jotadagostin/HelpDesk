import { Router } from "express";
import {
  createCall,
  getCalls,
  getCallById,
  updateCall,
} from "../controllers/callsController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

//Create call (user must login)
router.post("/calls", authMiddleware(), createCall);

//To list calls (user must login)
router.get("/calls", authMiddleware(), getCalls);

// Get single call
router.get("/calls/:id", authMiddleware(), getCallById);

// Update call
router.put("/calls/:id", authMiddleware(), updateCall);

export default router;
