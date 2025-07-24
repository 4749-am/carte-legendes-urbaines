import dotenv from "dotenv";
import mongoose from "mongoose";
import axios from "axios";
import * as cheerio from "cheerio";
import Legend from "../src/models/Legend.js"; // modèle mongoose

dotenv.config();

// URL de la page Wikipédia
const WIKI_URL = "https://fr.wikipedia.org/wiki/L%C3%A9gende_urbaine";

async function fetchLegendsFromWikipedia() {
  console.log("📡 Récupération des légendes depuis Wikipédia...");

  const { data } = await axios.get(WIKI_URL);
  const $ = cheerio.load(data);

  const legends = [];

  // Exemple simple : récupérer les titres h2 de la page
  $("h2 .mw-headline").each((_, el) => {
    legends.push({
      title: $(el).text().trim(),
      description: `Extraite de Wikipédia: ${$(el).text().trim()}`,
      source: WIKI_URL
    });
  });

  console.log(`✅ ${legends.length} légendes trouvées`);
  return legends;
}

async function saveLegendsToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connecté à MongoDB");

    const legends = await fetchLegendsFromWikipedia();

    await Legend.insertMany(legends);
    console.log(`✅ ${legends.length} légendes sauvegardées en base`);

    mongoose.connection.close();
    console.log("✅ Connexion MongoDB fermée");
  } catch (err) {
    console.error("❌ Erreur:", err);
  }
}

saveLegendsToDB();
