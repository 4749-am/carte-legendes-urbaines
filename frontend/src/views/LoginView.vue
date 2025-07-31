<script setup>
import { ref } from 'vue'
import axios from '@/axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const userStore = useUserStore()

async function login() {
  error.value = ''
  try {
    const res = await axios.post('/users/login', {
      email: email.value,
      password: password.value
    })

    const token = res.data.token
    userStore.setUser(null, token)
    await userStore.fetchUserProfile()
    router.push('/') // redirige vers l'accueil
  } catch (err) {
    error.value = err.response?.data?.message || "Erreur de connexion"
  }
}
</script>

<template>
  <div class="login-page">
    <h2>Connexion</h2>

    <form @submit.prevent="login" class="login-form">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Mot de passe" required />

      <button type="submit">Se connecter</button>

      <p class="error" v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 3rem auto;
  background: #f5f5f5;
  padding: 2rem;
  border-radius: 10px;
}

h2 {
  color: black !important;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-form input {
  padding: 0.6rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.login-form button {
  background: #2196f3;
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
