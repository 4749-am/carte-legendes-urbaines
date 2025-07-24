<script setup>
import { ref, onMounted } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

const legends = ref([]);

async function fetchLegends() {
  try {
    const response = await fetch("http://localhost:5000/api/legends");
    legends.value = await response.json();
    console.log(`✅ ${legends.value.length} légendes récupérées`);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des légendes :", error);
  }
}

onMounted(async () => {
  await fetchLegends();

  const map = L.map("map").setView([46.603354, 1.888334], 6);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  legends.value.forEach((legend) => {
    const lat = legend.latitude || 48.8566;
    const lon = legend.longitude || 2.3522;

    // ✅ Image si dispo, sinon placeholder
    const imageHtml = legend.image
      ? `<img src="${legend.image}" alt="${legend.title}" style="width:100%;border-radius:8px;margin-bottom:8px;"/>`
      : "";

    // ✅ Résumé (couper s'il est trop long)
    const shortDesc = legend.description
      ? legend.description.slice(0, 200) + (legend.description.length > 200 ? "…" : "")
      : "Pas de résumé disponible.";

    const popupContent = `
      <div style="font-family: Arial, sans-serif; max-width: 250px;">
        <strong style="font-size: 1.1em; color: #222;">${legend.title}</strong><br/>
        ${imageHtml}
        <p style="font-size: 0.9em; color: #555; line-height:1.3em;">
          ${shortDesc}
        </p>
        <a href="${legend.source}" target="_blank" style="color: #007bff; text-decoration: none;">
          🔗 Lire l'article complet
        </a>
      </div>
    `;

    L.marker([lat, lon]).addTo(map).bindPopup(popupContent);
  });
});
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  height: 100%;
  width: 100%;
  border-radius: 15px;
}
</style>
