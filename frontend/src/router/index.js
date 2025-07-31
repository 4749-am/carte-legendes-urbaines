import { createRouter, createWebHistory } from 'vue-router'
import Splash from '@/views/Splash.vue'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import AddLegendView from '@/views/AddLegendView.vue'
import { useUserStore } from '@/stores/user'

const routes = [
  { path: '/', name: 'splash', component: Splash},
  { path: '/home', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/add', name: 'add', component: AddLegendView },
  { path: '/connexion', name: 'Login', component: () => import('@/views/LoginView.vue')},
  { path: '/admin', name: 'Admin', component: () => import('@/views/AdminView.vue')},
  { path: '/register', name: 'Register', component: () => import('@/views/RegisterView.vue')}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.path === '/admin') {
    if (userStore.user?.role === 'admin') {
      next()
    } else {
      next('/')  // ou redirection vers une page 403
    }
  } else {
    next()
  }
})

export default router
