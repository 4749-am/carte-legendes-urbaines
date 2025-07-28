import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Splash from '../views/Splash.vue'

const routes = [
  { path: '/', redirect: '/splash' },
  { path: '/splash', component: Splash },
  { path: '/home', component: HomeView },
  { path: '/about', component: AboutView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
