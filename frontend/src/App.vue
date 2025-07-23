<script setup>
import { RouterLink, RouterView } from 'vue-router'
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
    
    <!-- Bouton Connexion à droite -->
    <div class="nav-right">
      <button class="login-btn">Connexion</button>
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

.nav-right .login-btn {
  background: #ff9800;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

main {
  padding-top: 80px; /* pour ne pas être caché sous la navbar */
}
</style>
