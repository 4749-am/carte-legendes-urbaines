import mongoose from "mongoose";

const legendSchema = new mongoose.Schema({
  title: { type: String, required: true },
  source: { type: String, required: true },
  latitude: { type: Number, default: null },
  longitude: { type: Number, default: null },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  validated: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

export default mongoose.model("Legend", legendSchema);
