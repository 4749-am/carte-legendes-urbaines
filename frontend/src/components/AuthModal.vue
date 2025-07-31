<script setup>
import { ref } from 'vue'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'

const showLogin = ref(true)
</script>

<template>
  <div class="modal">
    <button @click="showLogin = !showLogin">
      {{ showLogin ? 'Créer un compte' : 'Se connecter' }}
    </button>

    <LoginForm v-if="showLogin" />
    <RegisterForm v-else />
  </div>
</template>
