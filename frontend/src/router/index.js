import { createRouter, createWebHistory } from 'vue-router'
import Splash from '@/views/Splash.vue'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import AddLegendView from '@/views/AddLegendView.vue'

const routes = [
  { path: '/', name: 'splash', component: Splash},
  { path: '/home', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/add', name: 'add', component: AddLegendView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
