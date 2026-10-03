<template>
  <div v-if="product" class="space-y-6 pb-10 px-4 pt-16 bg-white text-[#18181b]">
    <!-- Top Bar Navigation & Wishlist -->
    <div class="flex items-center justify-between text-xs text-zinc-500 pb-2 border-b border-zinc-200">
      <button @click="$router.back()" class="text-black font-medium flex items-center gap-1 cursor-pointer">
        <span>←</span> <span>Back</span>
      </button>
      <div class="flex items-center gap-2">
        <span class="uppercase tracking-widest text-[9.5px] font-semibold text-[#b8860b]">
          {{ product.category }} · {{ product.subcategoryLabel || product.subcategory }}
        </span>
        <button 
          @click="cartStore.toggleWishlist(product)"
          class="p-1 text-base cursor-pointer transition-transform active:scale-125"
          :title="cartStore.isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'"
        >
          {{ cartStore.isInWishlist(product.id) ? '❤️' : '🤍' }}
        </button>
      </div>
    </div>

    <!-- Product Image Gallery (Full Touch Card) -->
    <div>
      <div class="relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-[#faf9f6] border border-zinc-200 shadow-xs">
        <img 
          :src="activeImage" 
          :alt="product.name" 
          class="w-full h-full object-cover object-top transition-opacity duration-300"
        />
      </div>
    </div>

    <!-- Product Title & Pricing -->
    <div class="space-y-2.5">
      <div class="flex items-center justify-between">
        <span class="text-[9.5px] uppercase tracking-[0.3em] text-[#b8860b] font-semibold">
          {{ product.tag }}
        </span>
        <span class="text-[9px] text-zinc-400 uppercase tracking-widest font-mono">
          REF: {{ product.id }}
        </span>
      </div>

      <h1 class="font-serif text-2xl tracking-wide text-black font-normal leading-snug">
        {{ product.name }}
      </h1>

      <div class="flex items-baseline gap-2.5">
        <span class="font-serif text-2xl text-zinc-950 font-semibold">
          ₹{{ product.price.toLocaleString('en-IN') }}
        </span>
        <span v-if="product.originalPrice" class="text-sm text-zinc-400 line-through">
          ₹{{ product.originalPrice.toLocaleString('en-IN') }}
        </span>
        <span v-if="product.originalPrice" class="px-2 py-0.5 bg-[#fef08a] text-zinc-900 text-[10px] font-bold uppercase tracking-wider rounded-2xs">
          {{ Math.round((1 - product.price / product.originalPrice) * 100) }}% OFF
        </span>
      </div>

      <p class="text-xs text-zinc-600 font-light leading-relaxed">
        {{ product.description }}
      </p>

      <!-- Craftsmanship & Delivery Highlights -->
      <div class="p-3 bg-[#faf9f6] border border-zinc-200 rounded-xs text-[11px] space-y-1.5 text-zinc-700">
        <p><strong class="text-black font-medium">Fabric & Work:</strong> {{ product.fabric }}</p>
        <p><strong class="text-black font-medium">Dispatch:</strong> 3 - 5 Weeks (Handcrafted in Coimbatore Atelier)</p>
        <p><strong class="text-black font-medium">Service:</strong> Complimentary White-Glove Shipping & Alterations</p>
      </div>
    </div>

    <!-- Sizing Selection -->
    <div class="space-y-2">
      <div class="flex justify-between text-xs text-zinc-800 font-medium">
        <span>{{ isAccessory ? (isFootwear ? 'Select Footwear Size' : 'Atelier Sizing') : 'Select Size' }}</span>
        <!-- Size Chart / Size Guide: ONLY shown for garments/apparel, removed from accessories -->
        <button 
          v-if="!isAccessory" 
          @click="bridalStore.openBookingModal()" 
          class="text-[#b8860b] hover:underline cursor-pointer"
        >
          Custom Size Guide
        </button>
      </div>

      <!-- Apparel Size Selection -->
      <div v-if="!isAccessory" class="grid grid-cols-6 gap-2 text-xs">
        <button 
          v-for="size in ['XS', 'S', 'M', 'L', 'XL', 'Custom']" 
          :key="size"
          @click="selectedSize = size"
          :class="[
            'py-2 border text-center uppercase transition-all font-medium rounded-xs cursor-pointer',
            selectedSize === size ? 'bg-[#18181b] text-white border-black shadow-xs' : 'bg-[#faf9f6] text-zinc-700 border-zinc-300'
          ]"
        >
          {{ size }}
        </button>
      </div>

      <!-- Footwear Size Selection -->
      <div v-else-if="isFootwear" class="grid grid-cols-5 gap-2 text-xs">
        <button 
          v-for="size in ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']" 
          :key="size"
          @click="selectedSize = size"
          :class="[
            'py-2 border text-center uppercase transition-all font-medium rounded-xs cursor-pointer',
            selectedSize === size ? 'bg-[#18181b] text-white border-black shadow-xs' : 'bg-[#faf9f6] text-zinc-700 border-zinc-300'
          ]"
        >
          {{ size }}
        </button>
      </div>

      <!-- Non-Footwear Accessories (Jewellery, Watches, Bags) -->
      <div v-else class="py-2.5 px-3 bg-[#faf9f6] border border-zinc-200 text-xs text-zinc-700 flex items-center justify-between rounded-xs">
        <span class="font-medium text-black">Universal / Bespoke Fit</span>
        <span class="text-[10.5px] text-zinc-500 font-light">One Size Fits All</span>
      </div>
    </div>

    <!-- Action CTAs -->
    <div class="space-y-2.5 pt-1">
      <button 
        @click="handleAddToBag"
        class="w-full py-3.5 bg-[#18181b] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-xs shadow-md hover:bg-[#b8860b] transition-colors cursor-pointer"
      >
        Add to Couture Bag
      </button>
      <button 
        @click="bridalStore.openBookingModal()"
        class="w-full py-2.5 bg-white border border-zinc-300 text-black text-[11px] font-semibold uppercase tracking-wider rounded-xs hover:bg-black hover:text-white transition-colors cursor-pointer"
      >
        Book Salon Fitting
      </button>
    </div>

    <!-- Need Help with the Product? (Mobile Concierge) -->
    <div class="space-y-2.5 pt-4 border-t border-zinc-200">
      <h3 class="text-xs font-medium text-zinc-900 uppercase tracking-wider">
        Need assistance with this Creation?
      </h3>
      <div class="grid grid-cols-3 gap-2">
        <!-- Call Us -->
        <a 
          href="tel:+914222456789" 
          class="border border-zinc-200 bg-white py-3 px-1.5 flex flex-col items-center justify-center gap-1.5 text-center rounded-xs hover:border-black transition-colors"
        >
          <svg class="w-4 h-4 text-[#b8860b]" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.5 11.5 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.5 11.5 0 00.57 3.6 1 1 0 01-.25 1.01l-2.2 2.18z"/></svg>
          <span class="text-[10px] text-zinc-800 font-medium">Call Us</span>
        </a>

        <!-- Email Us -->
        <a 
          :href="`mailto:coimbatore@lecotrus.com?subject=${encodeURIComponent(`Inquiry regarding ${product.name}`)}`" 
          class="border border-zinc-200 bg-white py-3 px-1.5 flex flex-col items-center justify-center gap-1.5 text-center rounded-xs hover:border-black transition-colors"
        >
          <svg class="w-4 h-4 text-[#b8860b]" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          <span class="text-[10px] text-zinc-800 font-medium">Email Us</span>
        </a>

        <!-- WhatsApp Us -->
        <a 
          :href="`https://wa.me/919876543210?text=${encodeURIComponent(`Hello Lecotrus Concierge, I am interested in ${product.name} (₹${product.price.toLocaleString('en-IN')}).`)}`" 
          target="_blank"
          class="border border-zinc-200 bg-white py-3 px-1.5 flex flex-col items-center justify-center gap-1.5 text-center rounded-xs hover:border-emerald-600 transition-colors"
        >
          <svg class="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2a10 10 0 00-8.955 14.424L2 22l5.683-1.035A10 10 0 1012 2z"/></svg>
          <span class="text-[10px] text-zinc-800 font-medium">WhatsApp</span>
        </a>
      </div>
    </div>

    <!-- Recommendations -->
    <div class="pt-8 border-t border-zinc-200 space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="font-serif text-sm tracking-wider uppercase text-black font-medium">You May Also Admire</h3>
        <span class="text-[9px] uppercase tracking-wider text-[#b8860b] font-semibold">Curated</span>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <RouterLink 
          v-for="item in relatedProducts" 
          :key="item.id"
          :to="`/product/${item.id}`"
          class="block space-y-1.5 group"
        >
          <div class="relative aspect-[3/4] rounded-xs overflow-hidden bg-[#faf9f6] border border-zinc-200">
            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div class="space-y-0.5">
            <span class="text-[8px] uppercase tracking-wider text-[#b8860b] font-semibold block">
              {{ item.subcategoryLabel || item.subcategory }}
            </span>
            <h4 class="font-serif text-[11px] uppercase tracking-wider text-black truncate group-hover:text-[#b8860b] transition-colors">{{ item.name }}</h4>
            <div class="flex items-center gap-1 flex-wrap">
              <span class="text-[11px] text-zinc-900 font-bold">₹{{ item.price.toLocaleString('en-IN') }}</span>
              <span v-if="item.originalPrice" class="text-[9px] text-zinc-400 line-through">₹{{ item.originalPrice.toLocaleString('en-IN') }}</span>
              <span v-if="item.originalPrice" class="text-[8px] text-[#b8860b] font-semibold">
                {{ Math.round((1 - item.price / item.originalPrice) * 100) }}% OFF
              </span>
            </div>
          </div>
        </RouterLink>
      </div>
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

const selectedSize = ref('M')
const activeImage = ref('')

const product = computed(() => {
  return productStore.getProductById(route.params.id) || productStore.products[0]
})

const productImages = computed(() => {
  if (!product.value) return []
  if (Array.isArray(product.value.images) && product.value.images.length > 0) {
    return product.value.images.filter(Boolean)
  }
  const list = [product.value.image]
  if (product.value.secondaryImage && product.value.secondaryImage !== product.value.image) {
    list.push(product.value.secondaryImage)
  }
  return list.filter(Boolean)
})

const relatedProducts = computed(() => {
  if (!product.value) return []
  
  const sameCategory = productStore.products.filter(
    p => p.category === product.value.category && p.id !== product.value.id
  )
  const sameSub = sameCategory.filter(
    p => p.subcategory.toLowerCase() === product.value.subcategory.toLowerCase()
  )
  const otherSub = sameCategory.filter(
    p => p.subcategory.toLowerCase() !== product.value.subcategory.toLowerCase()
  )
  const crossCategory = productStore.products.filter(
    p => p.category !== product.value.category && p.id !== product.value.id
  )
  
  const pool = [...sameSub, ...otherSub, ...crossCategory]
  return pool.slice(0, 4)
})

const isAccessory = computed(() => {
  if (!product.value) return false
  const cat = (product.value.category || '').toLowerCase()
  const sub = (product.value.subcategory || '').toLowerCase()
  const id = (product.value.id || '').toLowerCase()
  return cat === 'accessories' || ['bags', 'shoes', 'watches', 'jewellery'].includes(sub) || id.startsWith('a-')
})

const isFootwear = computed(() => {
  if (!product.value) return false
  const sub = (product.value.subcategory || '').toLowerCase()
  return sub.includes('shoe') || sub.includes('mojri') || sub.includes('footwear')
})

watch(() => product.value, (newVal) => {
  if (newVal) {
    activeImage.value = newVal.image
    if (isAccessory.value) {
      if (isFootwear.value) {
        selectedSize.value = 'UK 8'
      } else {
        selectedSize.value = 'One Size'
      }
    } else {
      selectedSize.value = 'M'
    }
  }
}, { immediate: true })

const handleAddToBag = () => {
  if (product.value) {
    const finalSize = isAccessory.value ? (isFootwear.value ? selectedSize.value : 'One Size') : selectedSize.value
    cartStore.addToCart(product.value, finalSize)
  }
}
</script>
