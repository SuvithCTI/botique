import { ref, computed, onMounted, onUnmounted } from 'vue'

// Global shared state for device detection
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)
const forceMode = ref(null) // null | 'desktop' | 'mobile'

export function useDevice() {
  const updateWidth = () => {
    windowWidth.value = window.innerWidth
  }

  onMounted(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
  })

  const isMobile = computed(() => {
    if (forceMode.value === 'mobile') return true
    if (forceMode.value === 'desktop') return false
    return windowWidth.value < 1024 // 1024px is desktop breakpoint
  })

  const isDesktop = computed(() => !isMobile.value)

  const setDeviceMode = (mode) => {
    forceMode.value = mode // 'desktop', 'mobile', or null (auto)
  }

  return {
    isMobile,
    isDesktop,
    forceMode,
    setDeviceMode,
    windowWidth
  }
}
