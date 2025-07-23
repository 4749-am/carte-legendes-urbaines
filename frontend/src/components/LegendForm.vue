<script setup>
function submitForm() {
  alert('Formulaire soumis !')
}
</script>

<template>
  <div class="legend-form">
    <h2>Ajoutez une légende</h2>
    <form @submit.prevent="submitForm">
      <label for="title">Titre</label>
      <input id="title" type="text" placeholder="Titre de la légende" />

      <label for="desc">Description</label>
      <textarea id="desc" placeholder="Détails..."></textarea>

      <button type="submit">Enregistrer</button>
    </form>
  </div>
</template>

<style scoped>
.legend-form {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 450px; /* stabilise la hauteur */
}

.legend-form h2 {
  margin: 0 0 1rem 0;
  font-weight: bold;
  display: block !important;  /* force l'affichage */
  opacity: 1 !important;      /* visible */
}


.legend-form form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 0.5rem;
}

.legend-form input,
.legend-form textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  resize: vertical;
}

.legend-form button {
  background: #2196f3;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: auto;
}
</style>
