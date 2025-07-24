import dotenv from "dotenv";
import mongoose from "mongoose";
import axios from "axios";
import Legend from "../src/models/Legend.js";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;
const WIKI_API = "https://fr.wikipedia.org/api/rest_v1/page/summary/";

async function enrichLegend(legend) {
  try {
    // On prend juste le dernier segment de l’URL Wikipédia
    const pageName = decodeURIComponent(legend.source.split("/wiki/")[1]);
    const url = `${WIKI_API}${pageName}`;

    const { data } = await axios.get(url, {
      headers: { "User-Agent": "CarteLegendesUrbaines/1.0" }
    });

    const extract = data.extract || null;
    const image = data.thumbnail ? data.thumbnail.source : null;

    legend.description = extract || legend.description;
    legend.image = image;

    await legend.save();

    console.log(`✅ ${legend.title} enrichi : ${extract ? "Résumé OK" : "Pas de résumé"} | ${image ? "Image OK" : "Pas d'image"}`);

  } catch (err) {
    console.warn(`⚠️ Impossible d’enrichir ${legend.title} : ${err.message}`);
  }
}

async function runEnrichment() {
  console.log("🔗 Connexion MongoDB...");
  await mongoose.connect(MONGO_URI);
  console.log("✅ Connecté à MongoDB");

  const legends = await Legend.find({});
  console.log(`📡 ${legends.length} légendes à enrichir`);

  for (let i = 0; i < legends.length; i++) {
    const legend = legends[i];

    // Si déjà enrichi, on skip
    if (legend.description && legend.image) {
      console.log(`⏩ ${legend.title} déjà enrichi`);
      continue;
    }

    // Pause 1s pour éviter de spammer l’API Wikipédia
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await enrichLegend(legend);
  }

  console.log("✅ Enrichissement terminé !");
  mongoose.connection.close();
}

runEnrichment();
