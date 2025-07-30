<script setup>
import { ref, onMounted, defineExpose, defineEmits } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
})

const emit = defineEmits(['legends-ready'])

const map = ref(null)
const markers = ref([])

async function fetchLegends() {
  try {
    const res = await fetch('http://localhost:5000/api/legends')
    const legends = await res.json()

    legends.forEach((legend) => {
      const lat = legend.latitude || 48.8566
      const lon = legend.longitude || 2.3522

      const marker = L.marker([lat, lon])
        .addTo(map.value)
        .bindPopup(`
          <strong>${legend.title}</strong><br/>
          ${legend.description ? `<p>${legend.description}</p>` : ''}
        `)

      markers.value.push({ id: legend.id, marker })
    })

    emit('legends-ready', legends)
  } catch (err) {
    console.error('Erreur de chargement des légendes', err)
  }
}

function centerOnLegend(id) {
  const entry = markers.value.find(m => m.id === id)
  if (entry) {
    map.value.setView(entry.marker.getLatLng(), 10)
    entry.marker.openPopup()
  }
}

defineExpose({ centerOnLegend })

onMounted(() => {
  map.value = L.map('map').setView([46.6, 1.88], 6)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map.value)

  fetchLegends()
})
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 500px;
  border-radius: 15px;
}
</style>
