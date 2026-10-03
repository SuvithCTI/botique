<template>
  <div>
    <component :is="isDesktop ? ContactDesktop : ContactMobile" />
  </div>
</template>

<script setup>
import { useDevice } from '@/composables/useDevice'
import ContactDesktop from '@/views/desktop/ContactDesktop.vue'
import ContactMobile from '@/views/mobile/ContactMobile.vue'

const { isDesktop } = useDevice()
</script>
