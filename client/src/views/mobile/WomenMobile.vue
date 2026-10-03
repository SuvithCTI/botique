<template>
  <div class="space-y-6 pb-28 px-3.5 pt-16 bg-white text-[#18181b]">
    <!-- Header -->
    <div class="text-center space-y-1">
      <span class="text-[9px] uppercase tracking-[0.35em] text-[#b8860b] font-semibold">WOMEN'S COUTURE</span>
      <h1 class="font-serif text-2xl tracking-widest text-black">AUTUMN / WINTER</h1>
      <p class="text-[11px] text-zinc-500 font-light">Handcrafted Banarasi sarees, embroidered kurti sets & silk coords.</p>
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
        All ({{ allWomenProducts.length }})
      </button>
      <button 
        @click="selectedSub = 'saree'" 
        :class="[
          'px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer font-medium',
          selectedSub === 'saree' 
            ? 'bg-[#18181b] text-white font-semibold shadow-xs' 
            : 'bg-[#faf9f6] border border-zinc-300 text-zinc-700 hover:border-black'
        ]"
      >
        Sarees ({{ countBySub('saree') }})
      </button>
      <button 
        @click="selectedSub = 'kurthi set'" 
        :class="[
          'px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer font-medium',
          selectedSub === 'kurthi set' 
            ? 'bg-[#18181b] text-white font-semibold shadow-xs' 
            : 'bg-[#faf9f6] border border-zinc-300 text-zinc-700 hover:border-black'
        ]"
      >
        Kurthi Sets ({{ countBySub('kurthi set') }})
      </button>
      <button 
        @click="selectedSub = 'coord set'" 
        :class="[
          'px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer font-medium',
          selectedSub === 'coord set' 
            ? 'bg-[#18181b] text-white font-semibold shadow-xs' 
            : 'bg-[#faf9f6] border border-zinc-300 text-zinc-700 hover:border-black'
        ]"
      >
        Coord Sets ({{ countBySub('coord set') }})
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
          <span 
            v-if="product.badge"
            class="absolute top-2 left-2 px-2 py-0.5 bg-black/80 backdrop-blur-xs text-[#fef08a] text-[8px] font-semibold uppercase tracking-wider rounded-2xs"
          >
            {{ product.badge }}
          </span>
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

const route = useRoute()
const productStore = useProductStore()

const selectedSub = ref(route.query.sub || 'all')

watch(() => route.query.sub, (newSub) => {
  selectedSub.value = newSub || 'all'
})

const allWomenProducts = computed(() => productStore.products.filter(p => p.category === 'women'))

const countBySub = (sub) => {
  return allWomenProducts.value.filter(p => p.subcategory.toLowerCase() === sub.toLowerCase()).length
}

const filteredProducts = computed(() => {
  if (selectedSub.value === 'all') return allWomenProducts.value
  return allWomenProducts.value.filter(p => p.subcategory.toLowerCase() === selectedSub.value.toLowerCase())
})
</script>
