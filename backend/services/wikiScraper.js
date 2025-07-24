import axios from "axios";
import * as cheerio from "cheerio";
import dotenv from "dotenv";

dotenv.config();

export async function fetchUrbanLegends() {
  const url = process.env.WIKI_URL;
  console.log("📥 Récupération depuis", url);

  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  let legends = [];

  // Sélectionne les éléments de la liste principale
  $("div.mw-parser-output ul li").each((i, el) => {
    const text = $(el).text().trim();

    // On filtre un peu les légendes (éviter les liens vides)
    if (text.length > 20) {
      legends.push({
        title: text.split("–")[0].trim(), // avant un éventuel tiret
        description: text.includes("–") ? text.split("–")[1].trim() : "",
        source: url
      });
    }
  });

  console.log(`✅ ${legends.length} légendes trouvées`);
  return legends;
}
