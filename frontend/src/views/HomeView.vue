<script setup>
import MapView from '@/components/MapView.vue'
</script>

<template>
  <div class="container">
    <!-- Colonne gauche : Carte -->
    <div class="left">
      <MapView />
    </div>

    <!-- Colonne droite : Formulaire -->
    <div class="right">
      <h2>Ajoutez une légende</h2>
      <form @submit.prevent="submitForm">
        <label for="title">Titre</label>
        <input id="title" type="text" placeholder="Titre de la légende" />

        <label for="desc">Description</label>
        <textarea id="desc" placeholder="Détails..."></textarea>

        <button type="submit">Enregistrer</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    submitForm() {
      alert("Formulaire soumis !");
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  gap: 2rem;
}
.left {
  flex: 2;
}
.right {
  flex: 1;
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 10px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
input, textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  background: #2196f3;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
}
</style>
