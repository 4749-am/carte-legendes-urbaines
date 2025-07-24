import mongoose from "mongoose";

const legendSchema = new mongoose.Schema({
  title: { type: String, required: true },
  source: { type: String, required: true },
  latitude: { type: Number, default: null },
  longitude: { type: Number, default: null },
  description: { type: String, default: "" }, // ✅ résumé Wikipédia
  image: { type: String, default: "" }        // ✅ URL image Wikipédia
});

export default mongoose.model("Legend", legendSchema);
