<script setup>
import { ref } from 'vue'
import axios from '@/axios'

const email = ref('')
const password = ref('')
const error = ref('')

async function register() {
  try {
    const res = await axios.post('/api/users/register', { email: email.value, password: password.value })
    localStorage.setItem('token', res.data.token)
    window.location.reload()
  } catch (err) {
    error.value = err.response?.data?.message || 'Erreur lors de l’inscription'
  }
}
</script>

<template>
  <form @submit.prevent="register">
    <h3>Inscription</h3>
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Mot de passe" required />
    <button type="submit">S’inscrire</button>
    <p v-if="error" style="color:red">{{ error }}</p>
  </form>
</template>
