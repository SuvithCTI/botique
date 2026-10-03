<template>
  <div>
    <!-- Render Desktop Page when on PC, or Mobile Page when on Phone -->
    <component :is="isDesktop ? HomeDesktop : HomeMobile" />
  </div>
</template>

<script setup>
import { useDevice } from '@/composables/useDevice'
import HomeDesktop from '@/views/desktop/HomeDesktop.vue'
import HomeMobile from '@/views/mobile/HomeMobile.vue'

const { isDesktop } = useDevice()
</script>
