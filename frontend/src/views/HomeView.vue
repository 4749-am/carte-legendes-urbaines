<script setup>
import MapView from '@/components/MapView.vue'
import LegendForm from '@/components/LegendForm.vue'
</script>

<template>
  <div class="home-container">
    <!-- Colonne gauche : Carte -->
    <div class="left">
      <MapView />
    </div>

    <!-- Colonne droite : Formulaire -->
    <div class="right">
      <LegendForm />
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: grid;
  grid-template-columns: 7fr 2.5fr;
  gap: 2rem;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  min-height: 450px;
  align-items: start;
}

.left {
  height: 100%;
  display: flex;
}

.right {
  height: 100%;
  overflow: visible; /* au cas où */
  display: flex;
  flex-direction: column;
}
</style>
