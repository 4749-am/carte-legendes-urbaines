<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

function logout() {
  userStore.clearUser()
  router.push('/')
}
</script>

<template>
  <header class="navbar">
    <div class="nav-left"></div>

    <div class="nav-center">
      <RouterLink to="/">Accueil</RouterLink>
      <RouterLink to="/about">A propos</RouterLink>
      <RouterLink to="/add" v-if="userStore.user">Ajouter une légende</RouterLink>
    </div>

    <div class="nav-right">
      <!-- Si utilisateur non connecté -->
      <RouterLink v-if="!userStore.user" to="/connexion">
        <button class="login-btn">Connexion</button>
      </RouterLink>

      <!-- Si connecté -->
      <template v-else>
        <button class="logout-btn" @click="logout">Déconnexion</button>

        <RouterLink v-if="userStore.user.role === 'admin'" to="/admin">
          <button class="admin-btn">Espace Admin</button>
        </RouterLink>
      </template>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #222;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 1000;
}

.nav-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2rem;
}

.nav-center a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.nav-center a.router-link-exact-active {
  text-decoration: underline;
}

.nav-right button {
  background: #ff9800;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  margin-left: 0.5rem;
}

.logout-btn {
  background: #f44336;
}

.admin-btn {
  background: #4caf50;
}
</style>
