<template>
  <div class="w-full px-8 md:px-16 pt-24 pb-12 space-y-8 bg-white text-[#18181b] max-w-[1800px] mx-auto">
    <!-- Grand Bridal Hero -->
    <div class="relative h-[500px] md:h-[560px] w-full rounded-sm overflow-hidden flex items-center justify-center border border-zinc-200 shadow-lg bg-zinc-100">
      <img 
        src="https://images.unsplash.com/photo-1546804784-896d0dca3805?auto=format&fit=crop&w=2200&q=85" 
        alt="The Grand Bridal Suite"
        class="absolute inset-0 w-full h-full object-cover opacity-100"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"></div>
      <div class="relative z-10 text-center space-y-4 max-w-2xl px-4">
        <span class="text-xs uppercase tracking-[0.4em] text-[#fef08a] font-semibold drop-shadow">LECOTRUS HAUTE BRIDAL</span>
        <h1 class="font-serif text-5xl md:text-6xl tracking-[0.2em] text-white font-normal drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">THE BRIDAL SUITE</h1>
        <p class="text-xs md:text-sm text-zinc-100 font-light tracking-widest leading-relaxed drop-shadow">
          Heirloom Bridal Lehengas, Sculptural Gowns, and Royal Ceremonial Ethnic Sets.
        </p>
        <div class="pt-4">
          <button 
            @click="bridalStore.openBookingModal()"
            class="px-8 py-3.5 bg-[#18181b] text-white text-xs font-semibold uppercase tracking-[0.25em] hover:bg-[#b8860b] shadow-xl cursor-pointer transition-colors"
          >
            Reserve Flagship Bridal Salon Appointment
          </button>
        </div>
      </div>
    </div>

    <!-- Subcategory Quick Filter Tabs -->
    <div class="flex items-center justify-between border-b border-zinc-200 pb-4">
      <div class="flex gap-3">
        <button 
          @click="selectedSub = 'all'"
          :class="['px-5 py-2 text-xs uppercase tracking-wider rounded-xs transition-all cursor-pointer font-medium', selectedSub === 'all' ? 'bg-[#18181b] text-white font-semibold shadow-xs' : 'bg-[#faf9f6] border border-zinc-300 text-zinc-700 hover:text-black']"
        >
          All ({{ allBridalProducts.length }})
        </button>
        <button 
          @click="selectedSub = 'lehengas'"
          :class="['px-5 py-2 text-xs uppercase tracking-wider rounded-xs transition-all cursor-pointer font-medium', selectedSub === 'lehengas' ? 'bg-[#18181b] text-white font-semibold shadow-xs' : 'bg-[#faf9f6] border border-zinc-300 text-zinc-700 hover:text-black']"
        >
          Lehengas
        </button>
        <button 
          @click="selectedSub = 'gowns'"
          :class="['px-5 py-2 text-xs uppercase tracking-wider rounded-xs transition-all cursor-pointer font-medium', selectedSub === 'gowns' ? 'bg-[#18181b] text-white font-semibold shadow-xs' : 'bg-[#faf9f6] border border-zinc-300 text-zinc-700 hover:text-black']"
        >
          Gowns
        </button>
        <button 
          @click="selectedSub = 'ethinic set'"
          :class="['px-5 py-2 text-xs uppercase tracking-wider rounded-xs transition-all cursor-pointer font-medium', selectedSub === 'ethinic set' ? 'bg-[#18181b] text-white font-semibold shadow-xs' : 'bg-[#faf9f6] border border-zinc-300 text-zinc-700 hover:text-black']"
        >
          Ethnic Set
        </button>
      </div>

      <span class="text-xs text-zinc-500 font-light">
        Showing {{ filteredProducts.length }} Masterpiece(s)
      </span>
    </div>

    <!-- 4-Column Editorial Dress Lookbook Grid (Click to view full detail) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
        <RouterLink 
          v-for="product in filteredProducts" 
          :key="product.id"
          :to="`/product/${product.id}`"
          class="group block cursor-pointer space-y-3 outline-none focus:outline-none"
        >
          <!-- Tall Borderless High-Fashion Editorial Image -->
          <div class="relative h-[500px] w-full overflow-hidden bg-[#faf9f6] rounded-xs">
            <img 
              :src="product.image" 
              :alt="product.name"
              class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
              <span class="px-4 py-2 bg-white/95 text-black text-[11px] font-semibold uppercase tracking-widest shadow-md">
                View Atelier Creation →
              </span>
            </div>
          </div>

          <!-- Clean Editorial Typography Underneath -->
          <div class="space-y-1">
            <h3 class="font-serif text-xs uppercase tracking-[0.18em] text-zinc-900 group-hover:text-[#b8860b] transition-colors leading-snug line-clamp-1">
              {{ product.name }}
            </h3>
            <div class="flex items-center gap-2 pt-0.5">
              <span class="text-xs text-zinc-900 font-semibold tracking-wider">
                ₹{{ product.price.toLocaleString('en-IN') }}
              </span>
              <span v-if="product.originalPrice" class="text-[11px] text-zinc-400 line-through tracking-wider">
                ₹{{ product.originalPrice.toLocaleString('en-IN') }}
              </span>
              <span v-if="product.originalPrice" class="text-[10px] text-[#b8860b] font-semibold tracking-wider">
                ({{ Math.round((1 - product.price / product.originalPrice) * 100) }}% OFF)
              </span>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'
import { useBridalStore } from '@/stores/bridalStore'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const bridalStore = useBridalStore()

const selectedSub = ref(route.query.sub || 'all')

watch(() => route.query.sub, (newSub) => {
  selectedSub.value = newSub || 'all'
})

const allBridalProducts = computed(() => productStore.products.filter(p => p.category === 'bridal'))

const filteredProducts = computed(() => {
  if (selectedSub.value === 'all') return allBridalProducts.value
  return allBridalProducts.value.filter(p => p.subcategory.toLowerCase() === selectedSub.value.toLowerCase())
})
</script>
