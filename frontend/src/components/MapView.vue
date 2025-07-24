<script setup>
import { ref, onMounted } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Correction des icônes Leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

// ✅ Données réactives
const legends = ref([]);

// ✅ Charger les légendes depuis l’API backend
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
  // Charger les données depuis le backend
  await fetchLegends();

  // Initialiser la carte centrée sur la France
  const map = L.map("map").setView([46.603354, 1.888334], 6);

  // Fond de carte OpenStreetMap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Ajouter un marqueur par légende
  legends.value.forEach((legend) => {
    // ✅ Si pas encore géocodée, on la place à Paris par défaut
    const lat = legend.latitude || 48.8566;
    const lon = legend.longitude || 2.3522;

    L.marker([lat, lon])
      .addTo(map)
      .bindPopup(`
        <b>${legend.title}</b><br>
        <a href="${legend.source}" target="_blank">Voir sur Wikipédia</a>
      `);
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
