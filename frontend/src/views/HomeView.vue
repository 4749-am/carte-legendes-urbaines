<script setup>
import { ref } from 'vue'
import MapView from '@/components/MapView.vue'
import LegendForm from '@/components/LegendForm.vue'

const mapRef = ref(null)
const showModal = ref(false)
const legends = ref([])

function onLegendsLoaded(loaded) {
  legends.value = loaded
}

function goToLegend(id) {
  mapRef.value?.centerOnLegend(id)
}

function toggleModal() {
  showModal.value = !showModal.value
}
</script>

<template>
  <div class="home-container">
    <h1 class="page-title">Carte des légendes urbaines</h1>

    <div class="columns">
      <!-- Colonne carte -->
      <div class="left">
        <MapView ref="mapRef" @legends-ready="onLegendsLoaded" />
        <button class="form-button" @click="toggleModal">
          ➕ Ajouter une légende
        </button>
      </div>

      <!-- Colonne liste -->
      <div class="right">
        <h2 class="list-title">Légendes disponibles</h2>
        <div class="legend-list-wrapper">
          <ul class="legend-list">
            <li
              v-for="legend in legends"
              :key="legend.id"
              @click="goToLegend(legend.id)"
            >
              <strong>{{ legend.title }}</strong><br />
              <small>{{ legend.description?.slice(0, 50) }}...</small>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 💬 MODALE DU FORMULAIRE -->
    <div v-if="showModal" class="modal-overlay" @click.self="toggleModal">
      <div class="modal-content">
        <button class="modal-close" @click="toggleModal">✖</button>
        <LegendForm />
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}

.page-title {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
}

.columns {
  display: grid;
  grid-template-columns: 5fr 2fr;
  gap: 2rem;
}

.left {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.right {
  background: var(--color-background-soft);
  padding: 1rem;
  border-radius: 12px;
  height: fit-content;
}

.list-title {
  margin-bottom: 0.8rem;
  font-size: 1.3rem;
  text-align: center;
}

.legend-list-wrapper {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #ddd;
  background: white;
  max-height: 400px;
}

.legend-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  max-height: 400px;
  color: black;
}

.legend-list li {
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background 0.2s;
}

.legend-list li:hover {
  background: #2196f3;
  color: white;
}

.legend-list li:last-child {
  border-bottom: none;
}

.form-button {
  margin-top: 1rem;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  background-color: #2196f3;
  color: white;
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.3s;
}

.form-button:hover {
  background-color: #1976d2;
}

/* ✅ Modale */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  color: #333;
}
</style>
