import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import legendRoutes from "./routes/legendRoutes.js"; 
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes API
app.use("/api/users", authRoutes);           // Inscription / Connexion
app.use("/api/legends", legendRoutes);       // Légendes

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

// Connexion MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch(err => console.error("❌ Erreur MongoDB:", err));

app.listen(PORT, () => {
  console.log(`🚀 Serveur backend sur http://localhost:${PORT}`);
});
