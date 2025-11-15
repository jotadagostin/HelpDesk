import { Router } from "express";
import { registerUser, loginUser } from "../services/authService";
import jwt from "jsonwebtoken";

const router = Router();

//User registration:
router.post("/register", async (req, res) => {
  try {
    const user = await registerUser(req.body);

    // dont return the password!

    const { password, ...userWithoutPassword } = user;

    // Gera token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.status(201).json({ user: userWithoutPassword, token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// User Login:
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    // remove password:

    const { password: _, ...userWithoutPassword } = user;

    res.json({ user: userWithoutPassword, token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
