// user.routes.ts
import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import authorizeRoles from "../middlewares/authorizeRoles";
import { getUsers } from "../controllers/getUsers";

const router = Router();

router.get("/users", authMiddleware, authorizeRoles("ADMIN"), getUsers);

export default router;
