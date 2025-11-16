import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";
import { generateToken } from "../utils/generateToken";

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser({ name, email, password });

    // generate token:
    const token = generateToken(user.id, user.role);

    // remove the password before sending:
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({ user: userWithoutPassword, token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);

    const token = generateToken(result.user.id, result.user.role);

    // remove password before sending:
    const { password: _, ...userWithoutPassword } = result.user;
    res.status(200).json({ user: userWithoutPassword, token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
