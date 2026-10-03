<template>
  <nav class="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-xl border-t border-zinc-200/80 px-2 pt-2 pb-[max(env(safe-area-inset-bottom),0.65rem)] flex items-center justify-around text-[10px] text-zinc-600 font-sans shadow-lg select-none">
    <!-- Home -->
    <RouterLink 
      to="/" 
      class="flex flex-col items-center gap-1 transition-colors px-2 py-1 relative group" 
      active-class="text-black font-semibold"
    >
      <svg class="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
      <span class="tracking-wider text-[9.5px]">Home</span>
    </RouterLink>

    <!-- Women's Couture -->
    <RouterLink 
      to="/women" 
      class="flex flex-col items-center gap-1 transition-colors px-2 py-1 relative group" 
      active-class="text-black font-semibold"
    >
      <svg class="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 3h12l-2 7H8L6 3z"/>
        <path d="M8 10l-4 11h16l-4-11"/>
        <path d="M10 3v4"/>
        <path d="M14 3v4"/>
      </svg>
      <span class="tracking-wider text-[9.5px]">Women</span>
    </RouterLink>

    <!-- Men's Bespoke -->
    <RouterLink 
      to="/men" 
      class="flex flex-col items-center gap-1 transition-colors px-2 py-1 relative group" 
      active-class="text-black font-semibold"
    >
      <svg class="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4l-6 4-2-4-2 4-6-4z"/>
        <line x1="12" y1="8" x2="12" y2="22"/>
      </svg>
      <span class="tracking-wider text-[9.5px]">Men</span>
    </RouterLink>

    <!-- Bridal Suite VIP -->
    <button 
      @click="bridalStore.openBookingModal()" 
      class="flex flex-col items-center gap-1 text-[#b8860b] font-semibold cursor-pointer px-2 py-1 group"
    >
      <div class="relative">
        <svg class="w-5 h-5 transition-transform group-hover:scale-110 text-[#b8860b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </div>
      <span class="tracking-wider text-[9.5px] text-[#b8860b]">Bridal VIP</span>
    </button>

    <!-- Accessories -->
    <RouterLink 
      to="/accessories" 
      class="flex flex-col items-center gap-1 transition-colors px-2 py-1 relative group" 
      active-class="text-black font-semibold"
    >
      <svg class="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="7"/>
        <polyline points="12 9 12 12 13.5 13.5"/>
        <path d="M16.5 3.5 15 5"/>
        <path d="M7.5 3.5 9 5"/>
        <path d="M16.5 20.5 15 19"/>
        <path d="M7.5 20.5 9 19"/>
      </svg>
      <span class="tracking-wider text-[9.5px]">Accessories</span>
    </RouterLink>

    <!-- Couture Bag -->
    <button 
      @click="cartStore.openCart" 
      class="flex flex-col items-center gap-1 transition-colors px-2 py-1 relative group cursor-pointer hover:text-black text-zinc-600"
    >
      <div class="relative">
        <svg class="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <span 
          v-if="cartStore.cartCount > 0"
          class="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-1 bg-[#18181b] text-white text-[8.5px] font-bold rounded-full flex items-center justify-center border border-white shadow-xs"
        >
          {{ cartStore.cartCount }}
        </span>
      </div>
      <span class="tracking-wider text-[9.5px]">Bag</span>
    </button>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { useBridalStore } from '@/stores/bridalStore'

const cartStore = useCartStore()
const bridalStore = useBridalStore()
</script>
