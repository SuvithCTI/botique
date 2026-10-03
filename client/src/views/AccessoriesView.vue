<template>
  <div>
    <component :is="isDesktop ? AccessoriesDesktop : AccessoriesMobile" />
  </div>
</template>

<script setup>
import { useDevice } from '@/composables/useDevice'
import AccessoriesDesktop from '@/views/desktop/AccessoriesDesktop.vue'
import AccessoriesMobile from '@/views/mobile/AccessoriesMobile.vue'

const { isDesktop } = useDevice()
</script>
