import { Request, Response, NextFunction } from "express";
import { RoleType } from "../services/authService";

export default function authorizeRoles(...roles: RoleType[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}
