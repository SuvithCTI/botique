import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLegalStore = defineStore('legal', () => {
  const isOpen = ref(false)
  const activeTab = ref('privacy') // 'privacy' | 'terms'

  const openPolicy = (tab = 'privacy') => {
    activeTab.value = tab
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
  }

  return {
    isOpen,
    activeTab,
    openPolicy,
    close
  }
})
