import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  role: string;
}

export default function authenticate(roles: string[] = []) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("🔐 Auth middleware triggered");
    const token = req.headers.authorization?.split(" ")[1];
    console.log("🔑 Token:", token ? "✅ Found" : "❌ Missing");

    if (!token) {
      console.log("❌ No token, returning 401");
      return res.status(401).json({ error: "Token missing" });
    }

    try {
      console.log("🔍 Verifying token...");
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      console.log("✅ Token valid, user:", payload);

      if (roles.length && !roles.includes(payload.role)) {
        console.log(
          "❌ Role not allowed. Required:",
          roles,
          "User role:",
          payload.role
        );
        return res.status(403).json({ error: "Forbidden" });
      }

      req.user = payload;
      console.log("✅ Auth passed, calling next()");
      next();
    } catch (err) {
      console.log("❌ Token verification failed:", err);
      return res.status(401).json({ error: "Invalid token" });
    }
  };
}
