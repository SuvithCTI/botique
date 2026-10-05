<template>
  <div v-if="product" class="w-full px-8 md:px-16 pt-28 pb-20 bg-white text-[#18181b] max-w-[1800px] mx-auto space-y-16">
    <!-- Breadcrumb & Back Link -->
    <div class="flex items-center justify-between text-xs tracking-widest uppercase text-zinc-500 pt-2 border-b border-zinc-200 pb-4">
      <div class="flex items-center gap-2">
        <RouterLink to="/" class="hover:text-black">Home</RouterLink>
        <span>/</span>
        <RouterLink :to="`/${product.category}`" class="hover:text-black uppercase">{{ product.category }}</RouterLink>
        <span>/</span>
        <span class="text-black font-medium">{{ product.subcategoryLabel || product.subcategory }}</span>
      </div>
      <button @click="$router.back()" class="hover:text-black cursor-pointer font-medium">
        ← Back to Collection
      </button>
    </div>

    <!-- Main Product Showcase Grid -->
    <div class="grid grid-cols-12 gap-12 lg:gap-16 items-start">
      
      <!-- Left: High-Res Editorial Gallery (7 Cols) -->
      <div class="col-span-12 lg:col-span-7 space-y-4">
        <div class="relative h-[680px] w-full rounded-sm overflow-hidden bg-[#faf9f6] border border-zinc-200 group">
          <img 
            :src="activeImage" 
            :alt="product.name" 
            class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>

      <!-- Right: Sticky Couture Buying Panel (5 Cols) -->
      <div class="col-span-12 lg:col-span-5 space-y-6 lg:sticky lg:top-28">
        <div>
          <span class="text-[11px] uppercase tracking-[0.3em] text-[#b8860b] font-semibold">
            {{ product.tag }} • {{ product.subcategoryLabel || product.subcategory }}
          </span>
          <h1 class="font-serif text-3xl lg:text-4xl tracking-wide text-black mt-2 font-normal leading-snug">
            {{ product.name }}
          </h1>
          <div class="flex items-baseline gap-3 mt-3">
            <span class="font-serif text-3xl text-zinc-950 font-semibold">
              ₹{{ product.price.toLocaleString('en-IN') }}
            </span>
            <span v-if="product.originalPrice" class="text-base text-zinc-400 line-through font-light">
              ₹{{ product.originalPrice.toLocaleString('en-IN') }}
            </span>
            <span v-if="product.originalPrice" class="px-2.5 py-0.5 bg-[#fef08a] text-zinc-900 text-xs font-bold uppercase tracking-wider rounded-xs">
              {{ Math.round((1 - product.price / product.originalPrice) * 100) }}% OFF
            </span>
          </div>
          <p class="text-[11px] text-zinc-500 font-light mt-1">Special limited atelier price • Inclusive of all taxes & white-glove delivery</p>
        </div>

        <!-- Product Lore & Fabric Details -->
        <div class="space-y-3 py-4 border-y border-zinc-200 text-xs text-zinc-600 font-light leading-relaxed">
          <p class="text-zinc-800 font-normal leading-relaxed">{{ product.description }}</p>
          <div class="space-y-1.5 pt-2">
            <p><strong class="text-black font-medium">Fabric & Work:</strong> {{ product.fabric }}</p>
            <p><strong class="text-black font-medium">Dispatch Timeline:</strong> 3 - 5 Weeks (Handcrafted in Lecotrus Atelier)</p>
            <p><strong class="text-black font-medium">Customization:</strong> Color & silhouette alterations available via Concierge</p>
          </div>
        </div>

        <!-- Size Selector -->
        <div class="space-y-2.5">
          <div class="flex items-center justify-between text-xs">
            <span class="uppercase tracking-widest text-zinc-800 font-medium">
              {{ isAccessory ? (isFootwear ? 'Select Footwear Size' : 'Atelier Sizing') : 'Select Silhouette Size' }}
            </span>
            <!-- Size Chart / Measurement Guide: ONLY shown for garments/apparel, removed from accessories -->
            <button 
              v-if="!isAccessory" 
              @click="bridalStore.openBookingModal()" 
              class="text-[#b8860b] hover:underline cursor-pointer"
            >
              Custom Measurement Guide
            </button>
          </div>
          
          <!-- Apparel Size Selection -->
          <div v-if="!isAccessory" class="grid grid-cols-6 gap-2 text-xs">
            <button 
              v-for="size in ['XS', 'S', 'M', 'L', 'XL', 'Custom']" 
              :key="size"
              @click="selectedSize = size"
              :class="[
                'py-2.5 border text-center uppercase tracking-wider transition-all cursor-pointer font-medium rounded-xs',
                selectedSize === size 
                  ? 'bg-[#18181b] text-white border-black shadow-xs' 
                  : 'bg-[#faf9f6] text-zinc-700 border-zinc-300 hover:border-black'
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
                'py-2.5 border text-center uppercase tracking-wider transition-all cursor-pointer font-medium rounded-xs',
                selectedSize === size 
                  ? 'bg-[#18181b] text-white border-black shadow-xs' 
                  : 'bg-[#faf9f6] text-zinc-700 border-zinc-300 hover:border-black'
              ]"
            >
              {{ size }}
            </button>
          </div>

          <!-- Non-Footwear Accessories (Jewellery, Watches, Bags) -->
          <div v-else class="py-2.5 px-4 bg-[#faf9f6] border border-zinc-200 text-xs text-zinc-700 flex items-center justify-between rounded-xs">
            <span class="font-medium text-black">Universal / Bespoke Fit</span>
            <span class="text-[11px] text-zinc-500 font-light">One Size Fits All</span>
          </div>
        </div>

        <!-- Action Buttons (Add to Bag & Book Salon Fitting) -->
        <div class="space-y-3 pt-2">
          <button 
            @click="handleAddToBag"
            class="w-full py-4 bg-[#18181b] text-white text-xs font-semibold uppercase tracking-[0.25em] hover:bg-[#b8860b] transition-all cursor-pointer shadow-md rounded-xs"
          >
            Add to Couture Bag
          </button>
          
          <button 
            @click="bridalStore.openBookingModal()"
            class="w-full py-3.5 bg-white border border-zinc-300 text-black text-xs font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-colors cursor-pointer rounded-xs"
          >
            Book Salon Fitting
          </button>
        </div>

        <!-- Need Help with the Product? (Replaced Section) -->
        <div class="space-y-2.5 pt-3 border-t border-zinc-200">
          <h3 class="text-xs md:text-sm font-normal text-zinc-900">
            Need help with the Product?
          </h3>
          <div class="grid grid-cols-3 gap-2.5">
            <!-- Call Us -->
            <a 
              href="tel:+919047474454" 
              class="border border-zinc-200 hover:border-zinc-800 bg-white py-3.5 px-2 flex flex-col items-center justify-center gap-1.5 transition-colors text-center group cursor-pointer rounded-xs"
            >
              <svg class="w-5 h-5 text-zinc-800 group-hover:text-black transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span class="text-xs text-zinc-800 font-normal">Call Us</span>
            </a>

            <!-- Email Us -->
            <a 
              :href="`mailto:concierge@lecotrus.com?subject=${encodeURIComponent(`Inquiry regarding ${product.name}`)}`" 
              class="border border-zinc-200 hover:border-zinc-800 bg-white py-3.5 px-2 flex flex-col items-center justify-center gap-1.5 transition-colors text-center group cursor-pointer rounded-xs"
            >
              <svg class="w-5 h-5 text-zinc-800 group-hover:text-black transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              <span class="text-xs text-zinc-800 font-normal">Email Us</span>
            </a>

            <!-- WhatsApp Us -->
            <a 
              :href="`https://wa.me/919047474454?text=${encodeURIComponent(`Hello Lecotrus Concierge, I need assistance with ${product.name} (₹${product.price.toLocaleString('en-IN')}).`)}`" 
              target="_blank"
              class="border border-zinc-200 hover:border-zinc-800 bg-white py-3.5 px-2 flex flex-col items-center justify-center gap-1.5 transition-colors text-center group cursor-pointer rounded-xs"
            >
              <svg class="w-5 h-5 text-zinc-800 group-hover:text-[#25D366] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                <path d="M16 13.5c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.5.1-.1.3-.6.7-.7.9-.1.1-.3.2-.5.1-.2-.1-.9-.3-1.7-1-.6-.5-1-1.2-1.2-1.4-.1-.2 0-.4.1-.5.1-.1.2-.2.3-.4.1-.1.1-.2.2-.3.1-.1 0-.3 0-.4-.1-.1-.5-1.2-.7-1.6-.2-.4-.4-.3-.5-.3h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9 0 1.1.8 2.2.9 2.3.1.2 1.6 2.5 3.9 3.5.5.2 1 .4 1.3.5.6.2 1.1.2 1.5.1.5-.1 1.3-.6 1.5-1.1.2-.5.2-1 .1-1.1-.1-.1-.3-.2-.5-.3z" fill="currentColor"></path>
              </svg>
              <span class="text-xs text-zinc-800 font-normal">WhatsApp Us</span>
            </a>
          </div>
        </div>

      </div>
    </div>

    <!-- Complete the Look / You May Also Admire -->
    <div class="pt-16 border-t border-zinc-200 space-y-8">
      <div class="text-center space-y-1">
        <span class="text-xs uppercase tracking-[0.3em] text-[#b8860b] font-semibold">Couture Curation</span>
        <h2 class="font-serif text-2xl tracking-widest text-black font-normal">YOU MAY ALSO ADMIRE</h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <RouterLink 
          v-for="item in relatedProducts" 
          :key="item.id"
          :to="`/product/${item.id}`"
          class="group block space-y-3 cursor-pointer"
        >
          <div class="relative h-[440px] w-full overflow-hidden rounded-xs bg-[#faf9f6]">
            <img 
              :src="item.image" 
              :alt="item.name" 
              class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
              <span class="px-4 py-2 bg-white/95 text-black text-[11px] font-semibold uppercase tracking-widest shadow-md">
                View Creation →
              </span>
            </div>
          </div>
          <div class="space-y-1">
            <span class="text-[10px] uppercase tracking-wider text-[#b8860b] font-semibold">
              {{ item.subcategoryLabel || item.subcategory }}
            </span>
            <h3 class="font-serif text-xs uppercase tracking-wider text-zinc-900 group-hover:text-[#b8860b] transition-colors leading-snug line-clamp-1">
              {{ item.name }}
            </h3>
            <div class="flex items-center gap-2 pt-0.5">
              <span class="text-xs text-zinc-900 font-semibold tracking-wider">
                ₹{{ item.price.toLocaleString('en-IN') }}
              </span>
              <span v-if="item.originalPrice" class="text-[11px] text-zinc-400 line-through tracking-wider">
                ₹{{ item.originalPrice.toLocaleString('en-IN') }}
              </span>
              <span v-if="item.originalPrice" class="text-[10px] text-[#b8860b] font-semibold tracking-wider">
                ({{ Math.round((1 - item.price / item.originalPrice) * 100) }}% OFF)
              </span>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>

  <div v-else class="min-h-[70vh] flex flex-col items-center justify-center text-center p-8">
    <h2 class="font-serif text-2xl text-black">Product Not Found</h2>
    <RouterLink to="/" class="mt-4 px-6 py-2.5 bg-black text-white text-xs uppercase tracking-widest">
      Return to Home
    </RouterLink>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
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
  
  // 1. Same category items (excluding current product)
  const sameCategory = productStore.products.filter(
    p => p.category === product.value.category && p.id !== product.value.id
  )
  
  // 2. Same subcategory items first
  const sameSub = sameCategory.filter(
    p => p.subcategory.toLowerCase() === product.value.subcategory.toLowerCase()
  )
  
  // 3. Other subcategories in same category
  const otherSub = sameCategory.filter(
    p => p.subcategory.toLowerCase() !== product.value.subcategory.toLowerCase()
  )
  
  // 4. Complementary cross-category items
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
