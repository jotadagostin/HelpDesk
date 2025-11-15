import dotenv from "dotenv";
dotenv.config();

import express, { Router } from "express";
import authRoutes from "./routes/authRoutes";
import router from "./routes/user.routes";

const app = express();
app.use(express.json());

// authentication Routes:
app.use("/auth", authRoutes);

//Other API Routes:
app.use("/api", router);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
