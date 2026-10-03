import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const loadSavedUser = () => {
    try {
      const saved = localStorage.getItem('lecotrus_auth_user')
      if (saved) {
        return JSON.parse(saved)
      }
    } catch (e) {
      console.error('Error loading saved user:', e)
    }
    return null
  }

  const savedUser = loadSavedUser()
  const isAuthModalOpen = ref(false)
  const user = ref(savedUser) // { name, email, role: 'customer' | 'admin' }
  const isAuthenticated = ref(!!savedUser)
  const authMode = ref('login') // 'login' | 'register' | 'admin'

  const isAdmin = computed(() => user.value?.role === 'admin')

  const openAuthModal = (mode = 'login') => {
    authMode.value = mode
    isAuthModalOpen.value = true
  }

  const closeAuthModal = () => {
    isAuthModalOpen.value = false
  }

  const login = (email, name = 'Customer', role = 'customer') => {
    const userData = { email, name, role }
    user.value = userData
    isAuthenticated.value = true
    isAuthModalOpen.value = false
    try {
      localStorage.setItem('lecotrus_auth_user', JSON.stringify(userData))
    } catch (e) {
      console.error('Error saving user to localStorage:', e)
    }
  }

  const loginAsAdmin = (email = 'admin@lecotrus.com', name = 'Atelier Administrator') => {
    const adminData = { email, name, role: 'admin' }
    user.value = adminData
    isAuthenticated.value = true
    isAuthModalOpen.value = false
    try {
      localStorage.setItem('lecotrus_auth_user', JSON.stringify(adminData))
    } catch (e) {
      console.error('Error saving admin to localStorage:', e)
    }
  }

  const logout = () => {
    isAuthenticated.value = false
    user.value = null
    try {
      localStorage.removeItem('lecotrus_auth_user')
    } catch (e) {
      console.error('Error removing user from localStorage:', e)
    }
  }

  return {
    isAuthModalOpen,
    isAuthenticated,
    user,
    authMode,
    isAdmin,
    openAuthModal,
    closeAuthModal,
    login,
    loginAsAdmin,
    logout
  }
})
