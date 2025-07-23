<script setup>
import MapView from '@/components/MapView.vue'

function submitForm() {
  alert('Formulaire soumis !')
}
</script>

<template>
  <div class="home-container">
    <!-- TITRE PRINCIPAL -->
    <h1 class="page-title">Carte des légendes urbaines</h1>

    <!-- Mise en page en deux colonnes -->
    <div class="columns">
      <!-- Colonne gauche : Carte -->
      <div class="left">
        <MapView />
      </div>

      <!-- Colonne droite : Formulaire -->
      <div class="right">
        <h2 class="form-title">Ajoutez une légende</h2>
        <form @submit.prevent="submitForm">
          <label for="title">Titre</label>
          <input id="title" type="text" placeholder="Titre de la légende" />

          <label for="desc">Description</label>
          <textarea id="desc" placeholder="Détails..."></textarea>

          <button type="submit">Enregistrer</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

/* Titre principal */
.page-title {
  text-align: center;
  font-size: 2rem;
  margin-top: -8rem;
  margin-bottom: 2rem;
}

/* Mise en page en deux colonnes */
.columns {
  display: grid;
  grid-template-columns: 5fr 2fr;
  gap: 2rem;
  align-items: stretch;
}

.left {
  height: 100%;
  display: flex;
}

.right {
  background: var(--color-background-soft);
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

/* Titre du formulaire */
.form-title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.right form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 0.5rem;
}

input,
textarea {
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  width: 100%;
  resize: vertical;
}

button {
  background: #2196f3;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: auto; /* pousse le bouton en bas */
}
</style>
