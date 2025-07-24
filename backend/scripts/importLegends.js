import dotenv from "dotenv";
import mongoose from "mongoose";
import axios from "axios";
import * as cheerio from "cheerio";
import Legend from "../src/models/Legend.js";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;
const WIKI_LIST_URL = "https://fr.wikipedia.org/wiki/Liste_de_l%C3%A9gendes_urbaines";

async function scrapeLegendPage(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // ✅ Cherche une image (infobox ou première image de la page)
    let image = $(".infobox img").first().attr("src");
    if (!image) {
      image = $("img").first().attr("src");
    }
    if (image && image.startsWith("//")) {
      image = "https:" + image;
    }

    // ✅ Cherche un résumé (premier paragraphe significatif)
    let description = "";
    $("p").each((_, el) => {
      const text = $(el).text().trim();
      if (text.length > 50) {
        description = text;
        return false; // on prend juste le premier
      }
    });

    return { image, description };
  } catch (error) {
    console.warn(`⚠️ Impossible de scraper ${url} : ${error.message}`);
    return { image: null, description: "" };
  }
}

async function fetchLegendsFromWikipedia() {
  console.log("📡 Récupération de la liste des légendes...");

  const { data } = await axios.get(WIKI_LIST_URL);
  const $ = cheerio.load(data);

  const legends = [];
  const items = $("#mw-content-text ul li");
  console.log(`🔍 ${items.length} entrées détectées`);

  for (let i = 0; i < items.length; i++) {
    const el = items[i];
    const link = $(el).find("a").first();
    const title = link.text().trim();
    const href = link.attr("href");

    if (title && href && href.startsWith("/wiki/")) {
      const fullUrl = `https://fr.wikipedia.org${href}`;

      // ✅ Scraper la page individuelle
      const { image, description } = await scrapeLegendPage(fullUrl);

      legends.push({
        title,
        source: fullUrl,
        description: description || "Aucune description disponible.",
        image: image || ""
      });

      console.log(`✅ ${title} ajouté`);
      await new Promise((r) => setTimeout(r, 500)); // petite pause
    }
  }

  console.log(`✅ ${legends.length} légendes enrichies récupérées`);
  return legends;
}

async function saveLegendsToDB() {
  try {
    console.log("🔗 Connexion MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connecté à MongoDB");

    console.log("🗑 Suppression des anciennes légendes...");
    await Legend.deleteMany({});

    const legends = await fetchLegendsFromWikipedia();

    if (legends.length > 0) {
      console.log("💾 Sauvegarde des nouvelles légendes enrichies...");
      await Legend.insertMany(legends);
      console.log(`✅ ${legends.length} légendes sauvegardées`);
    } else {
      console.warn("⚠️ Aucun résultat récupéré !");
    }

    mongoose.connection.close();
    console.log("✅ Connexion fermée");
  } catch (err) {
    console.error("❌ Erreur:", err);
    process.exit(1);
  }
}

saveLegendsToDB();
