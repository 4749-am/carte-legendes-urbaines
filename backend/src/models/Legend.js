import mongoose from "mongoose";

const legendSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },   // résumé Wikipédia
  source: { type: String },        // lien vers la page Wikipédia
  image: { type: String },         // URL de la vignette Wikipédia
  latitude: { type: Number },
  longitude: { type: Number }
});

export default mongoose.model("Legend", legendSchema);
