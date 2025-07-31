<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/axios'

const legends = ref([])
const token = localStorage.getItem('token')

async function fetchPendingLegends() {
  const res = await axios.get('/api/legends/admin/pending-legends', {
    headers: { Authorization: `Bearer ${token}` }
  })
  legends.value = res.data
}

async function validateLegend(id) {
  await axios.patch(`/api/legends/${id}/validate`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  })
  legends.value = legends.value.filter(l => l._id !== id)
}

onMounted(fetchPendingLegends)
</script>

<template>
  <div>
    <h2>Légendes à valider</h2>
    <ul>
      <li v-for="legend in legends" :key="legend._id">
        <strong>{{ legend.title }}</strong>
        <button @click="validateLegend(legend._id)">✅ Valider</button>
      </li>
    </ul>
  </div>
</template>
