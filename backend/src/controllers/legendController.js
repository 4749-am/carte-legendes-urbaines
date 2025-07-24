import Legend from "../models/Legend.js";

// Récupérer toutes les légendes
export const getLegends = async (req, res) => {
  try {
    const legends = await Legend.find({});
    res.json(legends);
  } catch (error) {
    console.error("❌ Erreur récupération légendes:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
