<template>
  <footer class="bg-[#0c0c0e] text-[#fef08a] border-t border-[#d4af37]/30 pt-8 pb-4 w-full">
    <div class="w-full max-w-[1800px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 space-y-6">
      <!-- Main 4-Column Justified Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-6 border-b border-[#d4af37]/20 items-start">
        
        <!-- Column 1: Brand & Concierge (Takes 4 cols on large screens) -->
        <div class="lg:col-span-4 space-y-2.5 pr-0 lg:pr-6">
          <div class="text-[9px] uppercase tracking-[0.35em] text-[#d4af37] font-semibold">House of Lecotrus</div>
          <h3 class="font-serif text-2xl md:text-3xl tracking-[0.14em] text-[#fef08a] font-normal">LECOTRUS</h3>
          <p class="text-[12px] text-[#e2d9c8]/80 font-light leading-relaxed max-w-sm">
            Pioneering architectural silhouettes and generational Indian craftsmanship. Handcrafted with reverence at our Coimbatore flagship atelier.
          </p>
          <div class="pt-1.5 space-y-1.5">
            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              class="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#fef08a] hover:bg-[#d4af37]/20 text-[11px] font-medium tracking-wider transition-all"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              WhatsApp Concierge: +91 422 245 6789
            </a>
            <p class="text-[#c5a059]/80 font-light text-[11px]">Direct: coimbatore@lecotrus.com</p>
          </div>
        </div>

        <!-- Column 2: The Collections (Takes 2.5 cols on large screens) -->
        <div class="lg:col-span-3 space-y-2.5">
          <h4 class="text-[10px] font-serif uppercase tracking-[0.32em] text-[#d4af37] font-semibold">The Collections</h4>
          <ul class="space-y-1.5 text-[12.5px] text-[#e2d9c8]/85 font-light">
            <li>
              <RouterLink to="/women" class="hover:text-[#fef08a] hover:translate-x-1 transition-all inline-block">Women's Haute Couture</RouterLink>
            </li>
            <li>
              <RouterLink to="/men" class="hover:text-[#fef08a] hover:translate-x-1 transition-all inline-block">Men's Master Bespoke</RouterLink>
            </li>
            <li>
              <RouterLink to="/bridal" class="hover:text-[#fef08a] hover:translate-x-1 transition-all inline-block">Heritage Bridal Suite</RouterLink>
            </li>
            <li>
              <RouterLink to="/accessories" class="hover:text-[#fef08a] hover:translate-x-1 transition-all inline-block">Fine Accessories & Jewels</RouterLink>
            </li>
            <li>
              <button @click="bridalStore.openBookingModal()" class="text-[#d4af37] hover:text-[#fef08a] hover:translate-x-1 transition-all text-left cursor-pointer text-[12px]">
                ✦ Custom Atelier Commissions
              </button>
            </li>
          </ul>
        </div>

        <!-- Column 3: Client Services (Takes 2.5 cols on large screens) -->
        <div class="lg:col-span-2 space-y-2.5">
          <h4 class="text-[10px] font-serif uppercase tracking-[0.32em] text-[#d4af37] font-semibold">Client Services</h4>
          <ul class="space-y-1.5 text-[12.5px] text-[#e2d9c8]/85 font-light">
            <li>
              <button @click="bridalStore.openBookingModal()" class="hover:text-[#fef08a] hover:translate-x-1 transition-all text-left cursor-pointer">
                Private Salon Appointment
              </button>
            </li>
            <li>
              <RouterLink to="/contact" class="hover:text-[#fef08a] hover:translate-x-1 transition-all inline-block">Bespoke Measurement</RouterLink>
            </li>
            <li>
              <button @click="legalStore.openPolicy('privacy')" class="hover:text-[#fef08a] hover:translate-x-1 transition-all text-left cursor-pointer">
                Privacy & Data Security
              </button>
            </li>
            <li>
              <button @click="legalStore.openPolicy('terms')" class="hover:text-[#fef08a] hover:translate-x-1 transition-all text-left cursor-pointer">
                Terms of Atelier Service
              </button>
            </li>
            <li>
              <RouterLink to="/contact" class="hover:text-[#fef08a] hover:translate-x-1 transition-all inline-block">Contact Us & Concierge</RouterLink>
            </li>
          </ul>
        </div>

        <!-- Column 4: Flagship Atelier (Takes 3 cols on large screens) -->
        <div class="lg:col-span-3 space-y-2.5 pl-0 lg:pl-4">
          <h4 class="text-[10px] font-serif uppercase tracking-[0.32em] text-[#d4af37] font-semibold">Flagship Atelier</h4>
          <div class="text-[12.5px] text-[#e2d9c8]/85 font-light space-y-1 leading-relaxed">
            <p class="font-medium text-[#fef08a]">Venkatachalam Chetty St</p>
            <p>R.S. Puram, Coimbatore – 641 002</p>
            <p>Tamil Nadu, India</p>
            <div class="pt-1 text-[11px] text-[#c5a059]/90 space-y-0.5">
              <p>Mon – Sat: 10:30 AM – 8:00 PM</p>
              <p>Sunday: 11:00 AM – 6:00 PM</p>
            </div>
            <div class="pt-1.5">
              <a 
                href="https://maps.app.goo.gl/exDw7KXJ4Tnr2BwP6?g_st=ic"
                target="_blank"
                class="inline-flex items-center gap-1.5 text-[#d4af37] hover:text-[#fef08a] font-medium tracking-[0.14em] uppercase text-[10.5px] transition-colors group"
              >
                <span>📍 Google Maps Directions</span>
                <span class="group-hover:translate-x-1 transition-transform">↗</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Bar: Legal & Copyright Justified Edge to Edge -->
      <div class="flex flex-col md:flex-row items-center justify-between text-[10.5px] text-[#c5a059]/80 font-light gap-3 pt-0.5">
        <p class="tracking-wide">© 2026 LECOTRUS COUTURE HOUSE. ALL RIGHTS RESERVED. · CRAFTED WITH REVERENCE IN COIMBATORE</p>
        <div class="flex items-center gap-4 text-[10.5px]">
          <button 
            @click="legalStore.openPolicy('terms')" 
            class="hover:text-[#fef08a] transition-colors cursor-pointer"
          >
            Terms & Conditions
          </button>
          <span class="text-[#d4af37]/40">·</span>
          <button 
            @click="legalStore.openPolicy('privacy')" 
            class="hover:text-[#fef08a] transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <span class="text-[#d4af37]/40">·</span>
          <RouterLink 
            to="/contact" 
            class="hover:text-[#fef08a] transition-colors"
          >
            Contact Atelier
          </RouterLink>
          <span class="text-[#d4af37]/40">·</span>
          <RouterLink 
            to="/admin" 
            class="text-[#d4af37] hover:text-[#fef08a] transition-colors font-medium"
          >
            Admin Console 🔒
          </RouterLink>
        </div>
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
