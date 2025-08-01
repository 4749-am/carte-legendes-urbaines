import { createRouter, createWebHistory } from 'vue-router'
import Splash from '@/views/Splash.vue'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import { useUserStore } from '@/stores/user'
import RegisterView from '@/views/RegisterView.vue'
import AdminView from '@/views/AdminView.vue'
import LoginView from '@/views/LoginView.vue'

const routes = [
  { path: '/', name: 'splash', component: Splash},
  { path: '/home', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/connexion', name: 'Login', component: LoginView},
  { path: '/admin', name: 'Admin', component:AdminView},
  { path: '/register', name: 'Register', component: RegisterView}
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
