<template>
  <div class="space-y-6 pb-10 px-3.5 pt-16 bg-white text-[#18181b]">
    <!-- Grand Bridal Hero -->
    <div class="relative h-64 rounded-sm overflow-hidden flex flex-col justify-end p-5 border border-zinc-200 bg-[#f4f3ef] shadow-md">
      <img 
        src="https://images.unsplash.com/photo-1546804784-896d0dca3805?auto=format&fit=crop&w=800&q=80" 
        alt="Bridal Mobile Hero"
        class="absolute inset-0 w-full h-full object-cover opacity-100"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

      <div class="relative z-10 space-y-2">
        <span class="text-[9px] uppercase tracking-[0.35em] text-[#fef08a] font-semibold drop-shadow">THE ATELIER BRIDAL</span>
        <h1 class="font-serif text-2xl tracking-widest text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">THE BRIDAL SUITE</h1>
        <p class="text-[11px] text-zinc-100 font-light drop-shadow">Museum-edition lehengas, bridal gowns & royal trousseau sets.</p>
        <div class="pt-1">
          <button 
            @click="bridalStore.openBookingModal()"
            class="w-full py-2.5 bg-[#b8860b] text-black text-xs font-bold uppercase tracking-wider rounded-xs shadow-md hover:bg-white transition-colors cursor-pointer"
          >
            Book Private Salon Consultation
          </button>
        </div>
      </div>
    </div>

    <!-- Filter Pills (Scrollable with active badge) -->
    <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-none text-[11px] -mx-3.5 px-3.5">
      <button 
        @click="selectedSub = 'all'" 
        :class="[
          'px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer font-medium',
          selectedSub === 'all' 
            ? 'bg-[#18181b] text-white font-semibold shadow-xs' 
            : 'bg-[#faf9f6] border border-zinc-300 text-zinc-700 hover:border-black'
        ]"
      >
        All Bridal ({{ allBridalProducts.length }})
      </button>
      <button 
        @click="selectedSub = 'lehengas'" 
        :class="[
          'px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer font-medium',
          selectedSub === 'lehengas' 
            ? 'bg-[#18181b] text-white font-semibold shadow-xs' 
            : 'bg-[#faf9f6] border border-zinc-300 text-zinc-700 hover:border-black'
        ]"
      >
        Lehengas ({{ countBySub('lehengas') }})
      </button>
      <button 
        @click="selectedSub = 'gowns'" 
        :class="[
          'px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer font-medium',
          selectedSub === 'gowns' 
            ? 'bg-[#18181b] text-white font-semibold shadow-xs' 
            : 'bg-[#faf9f6] border border-zinc-300 text-zinc-700 hover:border-black'
        ]"
      >
        Gowns ({{ countBySub('gowns') }})
      </button>
      <button 
        @click="selectedSub = 'ethinic set'" 
        :class="[
          'px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer font-medium',
          selectedSub === 'ethinic set' 
            ? 'bg-[#18181b] text-white font-semibold shadow-xs' 
            : 'bg-[#faf9f6] border border-zinc-300 text-zinc-700 hover:border-black'
        ]"
      >
        Ethnic Sets ({{ countBySub('ethinic set') }})
      </button>
    </div>

    <!-- 2-Column Editorial Lookbook Grid -->
    <div class="grid grid-cols-2 gap-x-3.5 gap-y-6">
      <RouterLink 
        v-for="product in filteredProducts" 
        :key="product.id"
        :to="`/product/${product.id}`"
        class="block group space-y-2 cursor-pointer outline-none focus:outline-none"
      >
        <div class="relative aspect-[3/4] w-full rounded-xs overflow-hidden bg-[#faf9f6] border border-zinc-200">
          <img 
            :src="product.image" 
            :alt="product.name" 
            class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" 
          />
        </div>

        <div class="space-y-1">
          <span class="text-[9px] uppercase tracking-wider text-[#b8860b] font-semibold">
            {{ product.subcategoryLabel || product.subcategory }}
          </span>
          <h3 class="font-serif text-xs uppercase tracking-wider text-black group-hover:text-[#b8860b] transition-colors leading-snug line-clamp-1">
            {{ product.name }}
          </h3>
          <div class="flex items-center gap-1.5 flex-wrap pt-0.5">
            <span class="text-xs text-zinc-950 font-bold tracking-wider">
              ₹{{ product.price.toLocaleString('en-IN') }}
            </span>
            <span v-if="product.originalPrice" class="text-[10px] text-zinc-400 line-through">
              ₹{{ product.originalPrice.toLocaleString('en-IN') }}
            </span>
            <span v-if="product.originalPrice" class="text-[9px] text-[#b8860b] font-semibold">
              {{ Math.round((1 - product.price / product.originalPrice) * 100) }}% OFF
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
import { useBridalStore } from '@/stores/bridalStore'

const route = useRoute()
const productStore = useProductStore()
const bridalStore = useBridalStore()

const selectedSub = ref(route.query.sub || 'all')

watch(() => route.query.sub, (newSub) => {
  selectedSub.value = newSub || 'all'
})

const allBridalProducts = computed(() => productStore.products.filter(p => p.category === 'bridal'))

const countBySub = (sub) => {
  return allBridalProducts.value.filter(p => p.subcategory.toLowerCase() === sub.toLowerCase()).length
}

const filteredProducts = computed(() => {
  if (selectedSub.value === 'all') return allBridalProducts.value
  return allBridalProducts.value.filter(p => p.subcategory.toLowerCase() === selectedSub.value.toLowerCase())
})
</script>
