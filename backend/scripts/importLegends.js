import dotenv from "dotenv";
import mongoose from "mongoose";
import axios from "axios";
import * as cheerio from "cheerio";
import Legend from "../src/models/Legend.js"; // modèle mongoose

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI; // ✅ correspond à ton .env
const WIKI_URL = process.env.WIKI_URL || "https://fr.wikipedia.org/wiki/Liste_de_l%C3%A9gendes_urbaines";

async function fetchLegendsFromWikipedia() {
  console.log("📡 Récupération des légendes depuis Wikipédia...");

  const { data } = await axios.get(WIKI_URL);
  const $ = cheerio.load(data);

  const legends = [];

  // Sélectionne toutes les <li> dans le contenu principal
  $("#mw-content-text ul li").each((_, el) => {
    const link = $(el).find("a").first(); // premier lien dans le <li>
    const title = link.text().trim();
    const href = link.attr("href");

    if (title && href && href.startsWith("/wiki/")) {
      legends.push({
        title,
        description: `Voir plus : https://fr.wikipedia.org${href}`,
        source: `https://fr.wikipedia.org${href}`
      });
    }
  });

  console.log(`✅ ${legends.length} légendes trouvées`);
  return legends;
}

async function saveLegendsToDB() {
  try {
    console.log("🔗 Connexion à MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connecté à MongoDB");

    const legends = await fetchLegendsFromWikipedia();

    if (legends.length === 0) {
      console.warn("⚠️ Aucun résultat trouvé sur Wikipédia !");
    } else {
      console.log("🗑 Suppression des anciennes légendes...");
      await Legend.deleteMany({}); // supprime les anciennes entrées

      console.log("💾 Sauvegarde des nouvelles légendes...");
      await Legend.insertMany(legends);
      console.log(`✅ ${legends.length} légendes sauvegardées en base`);
    }

    mongoose.connection.close();
    console.log("✅ Connexion MongoDB fermée");
  } catch (err) {
    console.error("❌ Erreur:", err);
    process.exit(1);
  }
}

saveLegendsToDB();
