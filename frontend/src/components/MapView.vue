<script setup>
import { onMounted } from 'vue';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

    onMounted(() => {
        const map = L.map('map').setView([48.866669, 2.33333], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([48.866669, 2.33333]).addTo(map)
        .bindPopup('Une jolie popup.<br> Facilement customisable.')
        .openPopup();
    });  
</script>

<template>
    <div id="map"></div>
</template>

<style scoped>
    #map {
        height: 50vh;
        width: 100%;
        border-radius: 15px;
    }
</style>