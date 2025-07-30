<script setup>
function submitForm() {
  alert('Légende ajoutée (fictif pour l’instant)')
}
</script>

<template>
  <div class="form-container">
    <h1>Ajouter une légende</h1>
    <form @submit.prevent="submitForm">
      <label for="title">Titre</label>
      <input id="title" type="text" placeholder="Ex: Le fantôme du métro" />

      <label for="desc">Description</label>
      <textarea id="desc" placeholder="Décrivez la légende..."></textarea>

      <button type="submit">Enregistrer</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  background: #f3f3f3;
  border-radius: 12px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input,
textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background: #4caf50;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
