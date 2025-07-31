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
  } else {
    console.warn(`Aucun marqueur trouvé pour l'id ${id}`)
  }
}

onMounted(async () => {
  await fetchLegends()

  map.value = L.map('map').setView([46.6, 1.88], 2)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map.value)

  // Correction bug de taille
  setTimeout(() => {
    map.value.invalidateSize()
  }, 300)

  markers.value = [] // Reset les anciens marqueurs au cas où

  legends.value.forEach((legend) => {
    const lat = legend.latitude
    const lon = legend.longitude

    const popupContent = `
      <div style="font-family: Arial; max-width: 250px;">
        <strong style="font-size: 1.1em; color: orange">${legend.title}</strong><br/>
        ${legend.image ? `<img src="${legend.image}" style="width:100%; margin:8px 0; border-radius:8px;" />` : ''}
        <p style="font-size: 0.9em; color: #333;">${legend.description || 'Pas de description.'}</p>
        ${
          legend.source && legend.source.startsWith('http')
            ? `<a href="${legend.source}" target="_blank" style="color: #007bff; text-decoration: none;">Voir sur Wikipédia</a>`
            : ''
        }
      </div>
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
  height: 600px;
  width: 100%;
  border-radius: 12px;
}
</style>
