<template>
  <div>
    <component :is="isDesktop ? BridalDesktop : BridalMobile" />
  </div>
</template>

<script setup>
import { useDevice } from '@/composables/useDevice'
import BridalDesktop from '@/views/desktop/BridalDesktop.vue'
import BridalMobile from '@/views/mobile/BridalMobile.vue'

const { isDesktop } = useDevice()
</script>
