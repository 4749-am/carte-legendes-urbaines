/*En attente d'ajustement

import dotenv from "dotenv";
import mongoose from "mongoose";
import axios from "axios";
import Legend from "../src/models/Legend.js";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

async function geocodeLegend(title) {
  try {
    const query = encodeURIComponent(title + " France");
    const url = `${NOMINATIM_URL}?q=${query}&format=json&limit=1`;

    // Pause 1s pour respecter la limite de Nominatim
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await axios.get(url, {
      headers: { "User-Agent": "CarteLegendesUrbaines/1.0 (contact@exemple.com)" }
    });

    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat: parseFloat(lat), lon: parseFloat(lon) };
    } else {
      console.warn(`⚠️ Pas trouvé : ${title}`);
      return { lat: 48.8566, lon: 2.3522 }; // fallback Paris
    }
  } catch (error) {
    console.error(`❌ Erreur géocodage pour "${title}" :`, error.message);
    return { lat: 48.8566, lon: 2.3522 }; // fallback Paris
  }
}

async function runGeocoding() {
  try {
    console.log("🔗 Connexion MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connecté à MongoDB");

    const legends = await Legend.find({});
    console.log(`📡 ${legends.length} légendes à géocoder`);

    for (let i = 0; i < legends.length; i++) {
      const legend = legends[i];

      // Skip si déjà géocodée
      if (legend.latitude && legend.longitude && legend.latitude !== 48.8566) {
        console.log(`✅ ${legend.title} déjà géocodée`);
        continue;
      }

      const coords = await geocodeLegend(legend.title);
      legend.latitude = coords.lat;
      legend.longitude = coords.lon;
      await legend.save();

      console.log(`📍 ${legend.title} → ${coords.lat}, ${coords.lon}`);
    }

    console.log("✅ Géocodage terminé !");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Erreur :", err);
    mongoose.connection.close();
  }
}

runGeocoding();

Fichier à ajuster ou à supprimer */ 