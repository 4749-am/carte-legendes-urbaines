<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

function logout() {
  userStore.logout()
  router.push('/')
}

onMounted(() => {
  if (userStore.token && !userStore.user) {
    userStore.fetchUserProfile()
  }
})
</script>

<template>
  <!-- Navbar -->
  <header class="navbar">
    <div class="nav-left"></div>
    
    <!-- Liens centrés -->
    <div class="nav-center">
      <RouterLink to="/">Accueil</RouterLink>
      <RouterLink to="/about">A propos</RouterLink>
    </div>
    
    <!-- Bouton Connexion et Espace Admin à droite -->
    <div class="nav-right">
      <RouterLink v-if="!userStore.user" to="/connexion">
        <button class="login-btn">Connexion</button>
      </RouterLink>

      <button v-else class="logout-btn" @click="logout">Déconnexion</button>

      <RouterLink v-if="userStore.user?.role === 'admin'" to="/admin">
        <button class="admin-btn">Espace Admin</button>
      </RouterLink>
    </div>
  </header>

  <!-- On affiche directement le contenu -->
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

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-right .login-btn,
.nav-right .logout-btn,
.nav-right .admin-btn {
  background: #ff9800;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

.nav-right .admin-btn {
  background: #2196f3;
}

main {
  padding-top: 80px; /* pour ne pas être caché sous la navbar */
}
</style>
