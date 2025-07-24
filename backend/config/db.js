import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connecté !");
  } catch (err) {
    console.error("❌ Erreur MongoDB :", err.message);
    process.exit(1);
  }
};
