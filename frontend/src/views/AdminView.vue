<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/axios'

const pendingLegends = ref([])

async function loadPending() {
  const res = await axios.get('/admin/pending')
  pendingLegends.value = res.data
}

async function validateLegend(id) {
  await axios.post(`/admin/validate/${id}`)
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
        <strong>{{ legend.title }}</strong> – {{ legend.description?.slice(0, 60) }}...
        <button @click="validateLegend(legend._id)">✅ Valider</button>
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
  color: white !important;
}

.pending-list {
  list-style: none;
  padding: 0;
}

.pending-list li {
  padding: 1rem;
  background: #eee;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
}
</style>
