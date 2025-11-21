import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import router from "./routes/user.routes";
import callsRoutes from "./routes/calls.routes";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// authentication Routes:
app.use("/auth", authRoutes);

//Other API Routes:
app.use("/api", router);

//Call Routes:
app.use("/api/calls", callsRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
