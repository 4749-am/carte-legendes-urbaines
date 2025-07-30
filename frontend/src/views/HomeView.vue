<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MapView from '@/components/MapView.vue'

const mapRef = ref(null)
const legends = ref([])
const router = useRouter()

function onLegendsLoaded(data) {
  legends.value = data
}

function goToLegend(id) {
  mapRef.value?.centerOnLegend(id)
}

function addLegend() {
  router.push('/add')
}
</script>

<template>
  <div class="container">
    <h1 class="title">Carte des légendes urbaines</h1>

    <div class="columns">
      <div class="left">
        <MapView ref="mapRef" @legends-ready="onLegendsLoaded" />
        <button class="add-button" @click="addLegend">➕ Ajouter une légende</button>
      </div>

      <div class="right">
        <h2 class="list-title">Légendes</h2>
        <ul class="legend-list">
          <li
            v-for="legend in legends"
            :key="legend.id"
            @click="goToLegend(legend.id)"
          >
            <strong>{{ legend.title }}</strong><br />
            <small>{{ legend.description?.slice(0, 60) }}...</small>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.columns {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.left {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.right {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 15px; /* ✅ coins arrondis */
  max-height: 500px;
  overflow-y: auto;
}

.list-title {
  margin-bottom: 1rem;
}

.legend-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border-radius: 10px; /* ✅ coins arrondis */
  overflow: hidden;
  border: 1px solid #ddd;
}

.legend-list li {
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  background: white;
  transition: background 0.2s;
}

.legend-list li:hover {
  background: #e3f2fd;
}

.legend-list li:last-child {
  border-bottom: none;
}

.add-button {
  background: #2196f3;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  width: 100%;
}
</style>
