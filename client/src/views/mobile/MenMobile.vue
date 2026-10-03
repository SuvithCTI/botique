<template>
  <div class="space-y-6 pb-10 px-3.5 pt-16 bg-white text-[#18181b]">
    <!-- Header -->
    <div class="text-center space-y-1">
      <span class="text-[9px] uppercase tracking-[0.35em] text-[#b8860b] font-semibold">MEN'S BESPOKE</span>
      <h1 class="font-serif text-2xl tracking-widest text-black">ROYAL GROOMWEAR</h1>
      <p class="text-[11px] text-zinc-500 font-light">Imperial sherwanis, bandhgala jackets & pure silk shirts.</p>
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
        All ({{ allMenProducts.length }})
      </button>
      <button 
        @click="selectedSub = 'sherwani'" 
        :class="[
          'px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer font-medium',
          selectedSub === 'sherwani' 
            ? 'bg-[#18181b] text-white font-semibold shadow-xs' 
            : 'bg-[#faf9f6] border border-zinc-300 text-zinc-700 hover:border-black'
        ]"
      >
        Sherwanis ({{ countBySub('sherwani') }})
      </button>
      <button 
        @click="selectedSub = 'bandhgala'" 
        :class="[
          'px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer font-medium',
          selectedSub === 'bandhgala' 
            ? 'bg-[#18181b] text-white font-semibold shadow-xs' 
            : 'bg-[#faf9f6] border border-zinc-300 text-zinc-700 hover:border-black'
        ]"
      >
        Bandhgalas ({{ countBySub('bandhgala') }})
      </button>
      <button 
        @click="selectedSub = 'mulberry silk shirts'" 
        :class="[
          'px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer font-medium',
          selectedSub === 'mulberry silk shirts' || selectedSub === 'shirts'
            ? 'bg-[#18181b] text-white font-semibold shadow-xs' 
            : 'bg-[#faf9f6] border border-zinc-300 text-zinc-700 hover:border-black'
        ]"
      >
        Silk Shirts ({{ countBySub('mulberry silk shirts') }})
      </button>
    </div>

    <!-- Master Fitting Service Card -->
    <div class="bg-[#faf9f6] border border-zinc-200 p-3.5 rounded-xs flex items-center justify-between shadow-xs">
      <div class="space-y-0.5">
        <h4 class="font-serif text-xs uppercase tracking-wider text-black font-semibold">Master Karigar Tailoring</h4>
        <p class="text-[10px] text-zinc-500 font-light">Custom posture measurements in Coimbatore salon</p>
      </div>
      <button 
        @click="bridalStore.openBookingModal()"
        class="px-3 py-1.5 bg-[#18181b] text-white text-[10px] font-semibold uppercase tracking-wider rounded-2xs hover:bg-[#b8860b] transition-colors cursor-pointer"
      >
        Book Fitting
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

const allMenProducts = computed(() => productStore.products.filter(p => p.category === 'men'))

const countBySub = (sub) => {
  return allMenProducts.value.filter(p => {
    const s = p.subcategory.toLowerCase()
    if (sub === 'bandhgala') return s.includes('bandhgala') || s.includes('jacket')
    if (sub === 'mulberry silk shirts') return s.includes('shirt')
    return s === sub.toLowerCase()
  }).length
}

const filteredProducts = computed(() => {
  if (selectedSub.value === 'all') return allMenProducts.value
  const target = selectedSub.value.toLowerCase()
  return allMenProducts.value.filter(p => {
    const s = p.subcategory.toLowerCase()
    if (target === 'bandhgala' || target === 'jacket') return s.includes('bandhgala') || s.includes('jacket')
    if (target === 'mulberry silk shirts' || target === 'shirts') return s.includes('shirt')
    return s === target
  })
})
</script>
