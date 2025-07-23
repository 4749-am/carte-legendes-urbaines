<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="header">
    <div class="overlay">
      <h1>Carte des Légendes Urbaines</h1>
      <button class="login-btn">Connexion</button>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
.header {
  position: relative;
  background: url('@/assets/logo.svg') center/cover no-repeat;
  color: white;
  text-align: center;
  padding: 3rem 1rem;
}
.overlay {
  background: rgba(0, 0, 0, 0.4);
  padding: 2rem;
  border-radius: 10px;
  display: inline-block;
}
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.login-btn {
  background: #ff9800;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  margin-bottom: 1rem;
}
nav {
  margin-top: 1rem;
}
nav a {
  color: white;
  margin: 0 1rem;
  text-decoration: none;
}
nav a.router-link-exact-active {
  text-decoration: underline;
}
main {
  padding: 2rem;
}
</style>
