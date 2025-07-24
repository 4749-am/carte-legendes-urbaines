import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import legendRoutes from "./routes/legendRoutes.js"; // ✅ on ajoute les routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connexion MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch(err => console.error("❌ Erreur connexion MongoDB:", err));

// ✅ Route test
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

// ✅ Route pour récupérer les légendes
app.use("/api/legends", legendRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
