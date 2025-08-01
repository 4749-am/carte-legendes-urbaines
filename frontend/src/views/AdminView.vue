<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/axios'

const pendingLegends = ref([])
const rejectionReasons = ref({})

async function loadPending() {
  const res = await axios.get('/admin/pending')
  pendingLegends.value = res.data
}

async function validateLegend(id) {
  await axios.post(`/admin/validate/${id}`)
  pendingLegends.value = pendingLegends.value.filter(l => l._id !== id)
}

function showRejectInput(id) {
  rejectionReasons.value[id] = ''
}

async function rejectLegend(id) {
  await axios.post(`/admin/reject/${id}`, {
    reason: rejectionReasons.value[id] || ''
  })
  delete rejectionReasons.value[id]
  pendingLegends.value = pendingLegends.value.filter(l => l._id !== id)
}

onMounted(() => {
  loadPending()
})
</script>

<template>
  <div class="admin-view">
    <h2>Légendes à valider</h2>

    <ul class="pending-list">
      <li v-for="legend in pendingLegends" :key="legend._id">
        <div class="legend-info">
          <p><strong>Titre :</strong> {{ legend.title }}</p>
          <p><strong>Description :</strong> {{ legend.description }}</p>
          <p><strong>Latitude :</strong> {{ legend.latitude }}</p>
          <p><strong>Longitude :</strong> {{ legend.longitude }}</p>
          <p><strong>Proposée par :</strong> {{ legend.createdBy?.email || 'Inconnu' }}</p>
          <p><strong>Date de création :</strong> {{ new Date(legend.createdAt).toLocaleString() }}</p>
        </div>

        <div class="buttons">
          <button @click="validateLegend(legend._id)" class="approve">✅ Valider</button>
          <button @click="showRejectInput(legend._id)" class="reject">❌ Refuser</button>
        </div>

        <div v-if="rejectionReasons[legend._id] !== undefined" class="rejection-form">
          <input
            v-model="rejectionReasons[legend._id]"
            placeholder="Motif du refus"
          />
          <button @click="rejectLegend(legend._id)">Confirmer le refus</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.admin-view {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

.admin-view h2 {
  color: white;
  text-align: center;
  margin-bottom: 20px;
}

.pending-list {
  list-style: none;
  padding: 0;
}

.pending-list li {
  padding: 1rem;
  background: #eee;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  color: black;
}

.legend-info {
  margin-bottom: 0.5rem;
}

.legend-info p {
  margin: 0.2rem 0;
}

.buttons button {
  margin-right: 10px;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button.approve {
  background-color: #4caf50;
  color: white;
}

button.reject {
  background-color: #f44336;
  color: white;
}

.rejection-form {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
}

.rejection-form input {
  flex: 1;
  padding: 0.4rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
