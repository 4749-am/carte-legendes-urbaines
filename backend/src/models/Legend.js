import mongoose from "mongoose";

const legendSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  source: { type: String }, // URL Wikipédia
});

export default mongoose.model("Legend", legendSchema);
