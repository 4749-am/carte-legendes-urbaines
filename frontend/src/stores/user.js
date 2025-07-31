import { defineStore } from 'pinia'
import axios from '@/axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    setUser(userData, token) {
      this.user = userData
      this.token = token
      localStorage.setItem('token', token)
    },
    clearUser() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },
    async fetchUserProfile() {
      if (!this.token) return
      try {
        const res = await axios.get('/users/profile')
        this.user = res.data
      } catch (err) {
        // token invalide ou expiré, on clear tout
        this.clearUser()
      }
    },
    logout() {
      this.clearUser()
    }
  }
})
