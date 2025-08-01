<script setup>
import { ref } from 'vue'
import axios from '@/axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function register() {
  error.value = ''
  try {
    await axios.post('/users/register', {
      email: email.value,
      password: password.value
    })
    router.push('/connexion') // Rediriger vers la page de connexion
  } catch (err) {
    error.value = err.response?.data?.message || "Erreur d'inscription"
  }
}
</script>

<template>
  <div class="register-page">
    <h2>Créer un compte</h2>
    <form @submit.prevent="register" class="register-form">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Mot de passe" required />
      <button type="submit">S’inscrire</button>
      <p class="error" v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
.register-page {
  max-width: 400px;
  margin: 3rem auto;
  background: #f5f5f5;
  padding: 2rem;
  border-radius: 10px;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.register-page h2 {
  color: black !important;
}

.register-form input {
  padding: 0.6rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.register-form button {
  background: #4caf50;
  color: white;
  padding: 0.6rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.error {
  color: red;
  text-align: center;
}
</style>
