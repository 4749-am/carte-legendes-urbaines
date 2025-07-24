import mongoose from "mongoose";

const legendSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  source: { type: String },
  latitude: { type: Number, default: 48.8566 },  // Paris par défaut
  longitude: { type: Number, default: 2.3522 }
});

export default mongoose.model("Legend", legendSchema);
