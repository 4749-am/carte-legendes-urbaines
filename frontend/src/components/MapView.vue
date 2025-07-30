<script setup>
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix icônes Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
})

// Refs
const map = ref(null)
const markers = ref([])
const legends = ref([])

// Events
const emit = defineEmits(['legends-ready'])

// Récupérer légendes
async function fetchLegends() {
  try {
    const res = await fetch('http://localhost:5000/api/legends')
    legends.value = await res.json()
    emit('legends-ready', legends.value)
  } catch (err) {
    console.error('Erreur API :', err)
  }
}

// Fonction exposée
function centerOnLegend(id) {
  const found = markers.value.find((m) => m.id === id)
  if (found) {
    map.value.setView(found.marker.getLatLng(), 10)
    found.marker.openPopup()
  }
}

onMounted(async () => {
  await fetchLegends()

  map.value = L.map('map').setView([46.6, 1.88], 6)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map.value)

  // 🛠 Correction bug de taille
  setTimeout(() => {
    map.value.invalidateSize()
  }, 300)

  legends.value.forEach((legend) => {
    const lat = legend.latitude || 48.8566
    const lon = legend.longitude || 2.3522

    const popupContent = `
      <strong>${legend.title}</strong><br/>
      <p>${legend.description || 'Pas de description.'}</p>
    `

    const leafletMarker = L.marker([lat, lon])
      .addTo(map.value)
      .bindPopup(popupContent)

    markers.value.push({
      id: legend.id,
      marker: leafletMarker
    })
  })
})

defineExpose({ centerOnLegend })
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  height: 500px;
  width: 100%;
  border-radius: 12px;
}
</style>
