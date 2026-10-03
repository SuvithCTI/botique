<template>
  <div>
    <component :is="isDesktop ? ProductDesktop : ProductMobile" />
  </div>
</template>

<script setup>
import { useDevice } from '@/composables/useDevice'
import ProductDesktop from '@/views/desktop/ProductDesktop.vue'
import ProductMobile from '@/views/mobile/ProductMobile.vue'

const { isDesktop } = useDevice()
</script>
