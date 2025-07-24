<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import des icônes Leaflet (sinon bug sur certaines versions)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// ✅ Variables réactives
const legends = ref([]); // on stockera les légendes ici

onMounted(async () => {
  // 1️⃣ Créer la carte centrée sur la France
  const map = L.map("map").setView([46.603354, 1.888334], 6);

  // 2️⃣ Ajouter la couche OpenStreetMap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // 3️⃣ Récupérer les légendes depuis l’API backend
  const res = await fetch("http://localhost:5000/api/legends");
  legends.value = await res.json();

  // 4️⃣ Pour chaque légende → ajouter un marker
  legends.value.forEach((legend) => {
    // Pour l’instant, elles n’ont pas de latitude/longitude, donc on les place à Paris
    const lat = 48.8566;
    const lon = 2.3522;

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
