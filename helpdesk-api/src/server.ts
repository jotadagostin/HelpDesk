import express, { Router } from "express";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(express.json());

// authentication Routes:
app.use("/auth", authRoutes);
app.use("/api", Router);

app.listen(3000, () => console.log("Server running on http://localhost:300"));
