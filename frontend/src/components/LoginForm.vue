<script setup>
import { ref } from 'vue'
import axios from '@/axios'

const email = ref('')
const password = ref('')
const error = ref('')

async function login() {
  try {
    const res = await axios.post('/api/users/login', { email: email.value, password: password.value })
    localStorage.setItem('token', res.data.token)
    window.location.reload()
  } catch (err) {
    error.value = err.response?.data?.message || 'Erreur de connexion'
  }
}
</script>

<template>
  <form @submit.prevent="login">
    <h3>Connexion</h3>
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Mot de passe" required />
    <button type="submit">Se connecter</button>
    <p v-if="error" style="color:red">{{ error }}</p>
  </form>
</template>
