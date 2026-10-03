<template>
  <footer class="bg-[#0c0c0e] text-[#fef08a] border-t border-[#d4af37]/30 pt-6 pb-10 px-5 text-center space-y-4">
    <!-- Brand Identity -->
    <div class="space-y-1">
      <div class="text-[9px] uppercase tracking-[0.4em] text-[#d4af37] font-semibold">House of Lecotrus</div>
      <h3 class="font-serif text-xl tracking-widest text-[#fef08a] mt-0.5">LECOTRUS</h3>
      <p class="text-[11.5px] text-[#e2d9c8]/80 font-light max-w-xs mx-auto leading-normal">
        Haute Couture, Heirloom Bridal, and Bespoke Master Tailoring. Handcrafted in Coimbatore.
      </p>
    </div>

    <!-- WhatsApp Concierge Pill -->
    <div>
      <a 
        href="https://wa.me/919876543210" 
        target="_blank" 
        class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#fef08a] text-[10.5px] font-medium tracking-wider"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        WhatsApp Concierge: +91 422 245 6789
      </a>
    </div>

    <!-- Quick Navigation Links Grid -->
    <div class="grid grid-cols-2 gap-y-2 gap-x-3 text-[11.5px] text-[#e2d9c8]/90 py-3 border-y border-[#d4af37]/20 text-left px-2">
      <RouterLink to="/women" class="hover:text-[#fef08a] transition-colors">Women's Couture</RouterLink>
      <RouterLink to="/men" class="hover:text-[#fef08a] transition-colors">Men's Bespoke</RouterLink>
      <RouterLink to="/bridal" class="hover:text-[#fef08a] transition-colors">Bridal Suite</RouterLink>
      <RouterLink to="/accessories" class="hover:text-[#fef08a] transition-colors">Fine Accessories</RouterLink>
      <RouterLink to="/contact" class="hover:text-[#fef08a] transition-colors">Contact Us</RouterLink>
      <button @click="bridalStore.openBookingModal()" class="text-[#fef08a] text-left font-medium">
        Book Appointment ✦
      </button>
    </div>

    <!-- Flagship Info & Legal -->
    <div class="space-y-2 text-[10.5px] text-[#c5a059]">
      <div class="flex justify-center items-center gap-3">
        <button 
          @click="legalStore.openPolicy('privacy')" 
          class="text-[#d4af37] hover:text-[#fef08a] underline font-light"
        >
          Privacy Policy
        </button>
        <span class="text-[#d4af37]/40">•</span>
        <button 
          @click="legalStore.openPolicy('terms')" 
          class="text-[#d4af37] hover:text-[#fef08a] underline font-light"
        >
          Terms & Conditions
        </button>
      </div>

      <div class="text-[#c5a059]/70 text-[9.5px] space-y-0.5">
        <p>Flagship Atelier · Venkatachalam Chetty St, R.S. Puram, Coimbatore – 641 002</p>
        <p class="text-[#c5a059]/50 mt-1">© 2026 LECOTRUS COUTURE HOUSE. ALL RIGHTS RESERVED.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useBridalStore } from '@/stores/bridalStore'
import { useLegalStore } from '@/stores/legalStore'

const bridalStore = useBridalStore()
const legalStore = useLegalStore()
</script>
