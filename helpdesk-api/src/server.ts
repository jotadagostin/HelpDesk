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
    // methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`\n📨 [${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log(`Origin: ${req.get("origin")}`);
  console.log(
    `Auth header: ${req.get("authorization") ? "✅ Present" : "❌ Missing"}`
  );
  next();
});

// app.options("*", cors());

// authentication Routes:
app.use("/auth", authRoutes);

//Other API Routes:
app.use("/api", router);

//Call Routes:
app.use("/api", callsRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
