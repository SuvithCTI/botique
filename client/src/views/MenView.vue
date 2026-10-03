<template>
  <div>
    <component :is="isDesktop ? MenDesktop : MenMobile" />
  </div>
</template>

<script setup>
import { useDevice } from '@/composables/useDevice'
import MenDesktop from '@/views/desktop/MenDesktop.vue'
import MenMobile from '@/views/mobile/MenMobile.vue'

const { isDesktop } = useDevice()
</script>
