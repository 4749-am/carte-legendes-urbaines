<script setup>
import { ref } from 'vue'

const title = ref('')
const description = ref('')
const latitude = ref('')
const longitude = ref('')

const submitForm = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    alert("Vous devez être connecté pour ajouter une légende.")
    return
  }

  if (!title.value || !description.value || !latitude.value || !longitude.value) {
    alert("Tous les champs sont requis.")
    return
  }

  try {
    const response = await fetch('http://localhost:5000/api/legends', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: title.value,
        description: description.value,
        latitude: parseFloat(latitude.value),
        longitude: parseFloat(longitude.value),
        source: 'Ajout utilisateur' // ou un champ que tu ajoutes manuellement
      })
    })

    const result = await response.json()

    if (response.ok) {
      alert('Votre légende a été envoyée pour validation ✅')
      title.value = ''
      description.value = ''
      latitude.value = ''
      longitude.value = ''
    } else {
      alert(result.message || 'Erreur lors de l’envoi.')
    }
  } catch (err) {
    console.error(err)
    alert('Erreur réseau')
  }
}
</script>

<template>
  <div class="legend-form">
    <h2>Ajoutez une légende</h2>
    <form @submit.prevent="submitForm">
      <label for="title">Titre</label>
      <input id="title" v-model="title" type="text" placeholder="Titre de la légende" />

      <label for="desc">Description</label>
      <textarea id="desc" v-model="description" placeholder="Détails..."></textarea>

      <label for="latitude">Latitude</label>
      <input id="latitude" v-model="latitude" type="number" step="any" placeholder="Ex: 48.8566" />

      <label for="longitude">Longitude</label>
      <input id="longitude" v-model="longitude" type="number" step="any" placeholder="Ex: 2.3522" />

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
  min-height: 450px;
  color: black;
}

.legend-form h2 {
  margin: 0 0 1rem 0;
  text-align: center;
  color: black !important;
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
