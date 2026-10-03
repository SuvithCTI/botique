<template>
  <div class="min-h-screen bg-[#faf9f6] text-[#18181b] flex flex-col justify-between selection:bg-[#d4af37] selection:text-black">
    <!-- Desktop Header (PC Only, hidden on Admin routes) -->
    <DesktopNavbar v-if="isDesktop && !isAdminRoute" />

    <!-- Mobile Header (Phone Only, hidden on Admin routes) -->
    <MobileHeader v-else-if="!isDesktop && !isAdminRoute" />

    <!-- Main Dynamic Route View -->
    <main class="flex-grow">
      <RouterView />
    </main>

    <!-- Desktop Footer (PC Only, hidden on Admin routes) -->
    <DesktopFooter v-if="isDesktop && !isAdminRoute" />

    <!-- Mobile Footer (Phone Only, hidden on Admin routes) -->
    <template v-else-if="!isDesktop && !isAdminRoute">
      <MobileFooter />
    </template>

    <!-- Shared Modals & Drawers -->
    <template v-if="!isAdminRoute">
      <LuxuryCartDrawer />
      <BridalAppointmentModal />
      <LuxuryAuthModal />
      <LegalPolicyModal />
    </template>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useDevice } from '@/composables/useDevice'

// Desktop Navigation
import DesktopNavbar from '@/components/desktop/DesktopNavbar.vue'
import DesktopFooter from '@/components/desktop/DesktopFooter.vue'

// Mobile Navigation
import MobileHeader from '@/components/mobile/MobileHeader.vue'
import MobileFooter from '@/components/mobile/MobileFooter.vue'

// Shared Modals (Async Loaded on demand to maximize speed)
const LuxuryCartDrawer = defineAsyncComponent(() => import('@/components/shared/LuxuryCartDrawer.vue'))
const BridalAppointmentModal = defineAsyncComponent(() => import('@/components/shared/BridalAppointmentModal.vue'))
const LuxuryAuthModal = defineAsyncComponent(() => import('@/components/shared/LuxuryAuthModal.vue'))
const LegalPolicyModal = defineAsyncComponent(() => import('@/components/shared/LegalPolicyModal.vue'))

const route = useRoute()
const { isDesktop } = useDevice()

const isAdminRoute = computed(() => route.path.startsWith('/admin'))
</script>
