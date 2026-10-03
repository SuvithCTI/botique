<template>
  <div>
    <component :is="isDesktop ? WomenDesktop : WomenMobile" />
  </div>
</template>

<script setup>
import { useDevice } from '@/composables/useDevice'
import WomenDesktop from '@/views/desktop/WomenDesktop.vue'
import WomenMobile from '@/views/mobile/WomenMobile.vue'

const { isDesktop } = useDevice()
</script>
