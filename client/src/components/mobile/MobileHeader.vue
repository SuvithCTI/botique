<template>
  <header 
    :class="[
      'fixed top-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-between transition-all duration-500 w-full',
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl border-b border-zinc-200/80 text-zinc-900 shadow-xs' 
        : 'bg-gradient-to-b from-black/85 via-black/45 to-transparent border-transparent text-white'
    ]"
  >
    <!-- Hamburger Menu Toggle Button -->
    <button 
      @click="toggleMenu" 
      class="p-2 -ml-1 focus:outline-none cursor-pointer rounded-xs transition-colors"
      :class="isScrolled ? 'text-zinc-900 hover:bg-zinc-100' : 'text-white hover:bg-white/10'"
      aria-label="Toggle Menu"
    >
      <div class="space-y-1.5 w-5">
        <span class="block w-5 h-0.5 rounded-full transition-all duration-300" :class="isScrolled ? 'bg-black' : 'bg-white'"></span>
        <span class="block w-3.5 h-0.5 rounded-full transition-all duration-300" :class="isScrolled ? 'bg-[#b8860b]' : 'bg-[#fef08a]'"></span>
        <span class="block w-5 h-0.5 rounded-full transition-all duration-300" :class="isScrolled ? 'bg-black' : 'bg-white'"></span>
      </div>
    </button>

    <!-- Mobile Brand Logo -->
    <RouterLink to="/" class="text-center group">
      <div class="flex flex-col items-center">
        <span 
          :class="[
            'font-serif text-lg tracking-[0.3em] font-normal transition-colors leading-none',
            isScrolled ? 'text-black' : 'text-white drop-shadow-sm'
          ]"
        >
          LECOTRUS
        </span>
        <span 
          :class="[
            'text-[7px] uppercase tracking-[0.35em] mt-0.5 font-medium transition-colors',
            isScrolled ? 'text-[#b8860b]' : 'text-[#fef08a]/90'
          ]"
        >
          HAUTE COUTURE
        </span>
      </div>
    </RouterLink>

    <!-- Header Actions (Profile & Cart) -->
    <div class="flex items-center gap-1 -mr-1">
      <!-- Profile Button -->
      <button 
        @click="openLoginModal"
        class="p-2 rounded-xs transition-colors cursor-pointer"
        :class="isScrolled ? 'text-zinc-800 hover:bg-zinc-100' : 'text-white hover:bg-white/10'"
        :title="authStore.isAuthenticated ? authStore.user?.name : 'Sign In'"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="8" r="4"/>
          <path d="M20 21a8 8 0 0 0-16 0"/>
        </svg>
      </button>

      <!-- Cart Button -->
      <button 
        @click="cartStore.openCart"
        class="relative p-2 rounded-xs transition-colors cursor-pointer"
        :class="isScrolled ? 'text-zinc-900 hover:bg-zinc-100' : 'text-white hover:bg-white/10'"
        aria-label="View Cart"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <span 
          v-if="cartStore.cartCount > 0"
          :class="[
            'absolute top-1 right-0.5 min-w-[15px] h-[15px] px-1 rounded-full text-[8.5px] font-bold flex items-center justify-center shadow-xs border',
            isScrolled ? 'bg-black text-white border-white' : 'bg-[#d4af37] text-black border-black'
          ]"
        >
          {{ cartStore.cartCount }}
        </span>
      </button>
    </div>
  </header>

  <!-- Full-Screen Interactive Menu Drawer (Teleported to Body) -->
  <Teleport to="body">
    <Transition name="fade">
      <div 
        v-if="isMenuOpen" 
        class="fixed inset-0 z-[100] bg-white h-[100vh] h-[100dvh] w-[100vw] flex flex-col justify-between p-4 sm:p-6 text-zinc-900 overflow-y-auto"
      >
        <!-- SCREEN 1: MAIN NAVIGATION LEVEL -->
        <div v-if="!currentCategory" class="flex flex-col justify-between h-full animate-fade-in">
          <div>
            <!-- Top Brand Strip & Close -->
            <div class="flex items-center justify-between pb-3.5 border-b border-zinc-200">
              <div>
                <div class="text-[9px] tracking-[0.4em] text-[#b8860b] font-semibold">HOUSE OF LECOTRUS</div>
                <div class="font-serif text-lg tracking-widest text-black font-medium">ATELIER NAVIGATION</div>
              </div>
              <button 
                @click="closeMenu" 
                class="w-9 h-9 rounded-full bg-zinc-100 hover:bg-black hover:text-white transition-colors flex items-center justify-center text-base cursor-pointer shadow-2xs font-bold"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <!-- Primary Navigation List -->
            <nav class="py-3 space-y-1 text-sm">
              
              <!-- 01. Home -->
              <RouterLink 
                @click="closeMenu" 
                to="/" 
                class="flex items-center justify-between py-3 px-3 rounded-sm hover:bg-[#faf9f6] border-b border-zinc-100 group transition-colors"
              >
                <span class="font-serif text-xs font-semibold tracking-[0.2em] uppercase text-zinc-900 group-hover:text-[#b8860b]">
                  01. Home
                </span>
                <span class="text-zinc-400 group-hover:text-black font-sans text-xs">→</span>
              </RouterLink>

              <!-- 02. Women (Taps into Women Mega-Page) -->
              <button 
                @click="openCategoryPage('women')"
                class="w-full flex items-center justify-between py-3 px-3 rounded-sm hover:bg-[#faf9f6] border-b border-zinc-100 group transition-colors text-left cursor-pointer"
              >
                <span class="font-serif text-xs font-semibold tracking-[0.2em] uppercase text-zinc-900 group-hover:text-[#b8860b]">
                  02. Women
                </span>
                <div class="flex items-center gap-1.5">
                  <span class="text-[9.5px] uppercase font-semibold text-[#b8860b]">3 Edits</span>
                  <span class="text-zinc-400 group-hover:text-black font-sans text-xs">→</span>
                </div>
              </button>

              <!-- 03. Men (Taps into Men Mega-Page) -->
              <button 
                @click="openCategoryPage('men')"
                class="w-full flex items-center justify-between py-3 px-3 rounded-sm hover:bg-[#faf9f6] border-b border-zinc-100 group transition-colors text-left cursor-pointer"
              >
                <span class="font-serif text-xs font-semibold tracking-[0.2em] uppercase text-zinc-900 group-hover:text-[#b8860b]">
                  03. Men
                </span>
                <div class="flex items-center gap-1.5">
                  <span class="text-[9.5px] uppercase font-semibold text-[#b8860b]">3 Edits</span>
                  <span class="text-zinc-400 group-hover:text-black font-sans text-xs">→</span>
                </div>
              </button>

              <!-- 04. Bridal (Taps into Bridal Mega-Page) -->
              <button 
                @click="openCategoryPage('bridal')"
                class="w-full flex items-center justify-between py-3 px-3 rounded-sm hover:bg-[#faf9f6] border-b border-zinc-100 group transition-colors text-left cursor-pointer"
              >
                <span class="font-serif text-xs font-bold tracking-[0.2em] uppercase text-[#b8860b]">
                  04. Bridal ✨
                </span>
                <div class="flex items-center gap-1.5">
                  <span class="text-[9.5px] uppercase font-semibold text-[#b8860b]">3 Edits</span>
                  <span class="text-[#b8860b] font-sans text-xs">→</span>
                </div>
              </button>

              <!-- 05. Accessories (Taps into Accessories Mega-Page) -->
              <button 
                @click="openCategoryPage('accessories')"
                class="w-full flex items-center justify-between py-3 px-3 rounded-sm hover:bg-[#faf9f6] border-b border-zinc-100 group transition-colors text-left cursor-pointer"
              >
                <span class="font-serif text-xs font-semibold tracking-[0.2em] uppercase text-zinc-900 group-hover:text-[#b8860b]">
                  05. Accessories
                </span>
                <div class="flex items-center gap-1.5">
                  <span class="text-[9.5px] uppercase font-semibold text-[#b8860b]">4 Edits</span>
                  <span class="text-zinc-400 group-hover:text-black font-sans text-xs">→</span>
                </div>
              </button>

              <!-- 06. Contact Us -->
              <RouterLink 
                @click="closeMenu" 
                to="/contact" 
                class="flex items-center justify-between py-3 px-3 rounded-sm hover:bg-[#faf9f6] border-b border-zinc-100 group transition-colors"
              >
                <span class="font-serif text-xs font-semibold tracking-[0.2em] uppercase text-zinc-900 group-hover:text-[#b8860b]">
                  06. Contact Us
                </span>
                <span class="text-zinc-400 group-hover:text-black font-sans text-xs">→</span>
              </RouterLink>

              <!-- 07. Sign In -->
              <button 
                @click="openLoginModal" 
                class="w-full flex items-center justify-between py-3 px-3 rounded-sm hover:bg-[#faf9f6] border-b border-zinc-100 cursor-pointer group text-left transition-colors"
              >
                <span class="font-serif text-xs font-semibold tracking-[0.2em] uppercase text-zinc-900 group-hover:text-[#b8860b]">
                  07. {{ authStore.isAuthenticated ? `Account (${authStore.user?.name})` : 'Sign In' }}
                </span>
                <span class="text-zinc-400 group-hover:text-black font-sans text-xs">👤</span>
              </button>

              <!-- 08. Admin Control Center -->
              <RouterLink 
                v-if="authStore.isAdmin"
                @click="closeMenu" 
                to="/admin" 
                class="flex items-center justify-between py-3 px-3 rounded-sm hover:bg-[#faf9f6] text-[#b8860b] font-bold border-b border-zinc-100 group transition-colors"
              >
                <span class="font-serif text-xs tracking-[0.2em] uppercase">
                  08. Admin Control Center 👑
                </span>
                <span class="text-[#b8860b] font-sans text-xs">→</span>
              </RouterLink>
            </nav>
          </div>

          <!-- Bottom Actions -->
          <div class="pt-4 border-t border-zinc-200 space-y-2.5">
            <button 
              @click="openBridalModal" 
              class="w-full py-3.5 bg-[#18181b] text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#b8860b] transition-colors rounded-xs shadow-md cursor-pointer"
            >
              Book Private Salon Fitting
            </button>
            <div class="flex items-center justify-center gap-3 text-[11px] text-zinc-600 font-light">
              <a href="tel:+914222456789" class="hover:text-black underline">📞 +91 422 245 6789</a>
              <span>•</span>
              <a href="https://wa.me/919876543210" target="_blank" class="text-emerald-700 font-semibold hover:underline">💬 WhatsApp Concierge</a>
            </div>
          </div>
        </div>

        <!-- SCREEN 2: DEDICATED CATEGORY MEGA-PANEL (OPENED IN A NEW VIEW) -->
        <div v-else class="flex flex-col justify-between h-full animate-fade-in space-y-4">
          <div class="space-y-4">
            <!-- Top Back Navigation Header -->
            <div class="flex items-center justify-between pb-3 border-b border-zinc-200">
              <button 
                @click="currentCategory = null"
                class="inline-flex items-center gap-1.5 py-1 px-2 -ml-2 text-xs font-semibold uppercase tracking-wider text-black hover:text-[#b8860b] cursor-pointer"
              >
                <span>←</span>
                <span>Back to Menu</span>
              </button>
              <button 
                @click="closeMenu" 
                class="w-8 h-8 rounded-full bg-zinc-100 hover:bg-black hover:text-white transition-colors flex items-center justify-center text-sm cursor-pointer shadow-2xs font-bold"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <!-- Category Universe Lore (Exact Desktop Layout Style) -->
            <div class="space-y-1.5 pb-1">
              <span class="text-[9px] uppercase tracking-[0.3em] text-[#b8860b] font-semibold">
                {{ activeCategoryData.subtitle }}
              </span>
              <h2 class="font-serif text-2xl tracking-widest text-black uppercase font-normal leading-tight">
                {{ activeCategoryData.title }}
              </h2>
              <p class="text-xs text-zinc-500 font-light leading-relaxed">
                {{ activeCategoryData.lore }}
              </p>
              <div class="pt-1">
                <RouterLink 
                  @click="closeMenu" 
                  :to="activeCategoryData.fullCatalogLink" 
                  class="text-xs text-[#b8860b] font-bold uppercase tracking-wider hover:underline inline-block"
                >
                  {{ activeCategoryData.fullCatalogText }}
                </RouterLink>
              </div>
            </div>

            <!-- Big Rectangular Subcategory Cards (Matching Desktop Mega-Menu Screenshot) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <RouterLink 
                v-for="sub in activeCategoryData.items" 
                :key="sub.slug"
                :to="{ path: activeCategoryData.fullCatalogLink, query: { sub: sub.slug } }"
                @click="closeMenu"
                class="p-3.5 bg-white border border-zinc-300 hover:border-[#b8860b] rounded-xs flex items-center justify-between shadow-xs hover:shadow-md transition-all group cursor-pointer"
              >
                <div>
                  <h3 class="font-serif text-xs font-semibold uppercase tracking-wider text-black group-hover:text-[#b8860b] transition-colors">
                    {{ sub.label }}
                  </h3>
                  <p class="text-[10px] text-zinc-500 font-light mt-0.5">{{ sub.desc }}</p>
                </div>
                <span class="text-[#b8860b] font-sans text-xs group-hover:translate-x-1 transition-transform">→</span>
              </RouterLink>
            </div>

            <!-- Editorial Visual Spotlight Card (Matching Desktop Preview) -->
            <RouterLink 
              @click="closeMenu" 
              :to="activeCategoryData.spotlight.link" 
              class="relative h-36 w-full rounded-xs overflow-hidden border border-zinc-200 block shadow-sm group mt-2"
            >
              <img 
                :src="activeCategoryData.spotlight.image" 
                :alt="activeCategoryData.spotlight.title" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-end p-3">
                <span class="text-[8.5px] uppercase tracking-widest text-[#fef08a] font-semibold">
                  {{ activeCategoryData.spotlight.tag }}
                </span>
                <span class="font-serif text-xs tracking-wide text-white mt-0.5 leading-snug">
                  {{ activeCategoryData.spotlight.title }}
                </span>
              </div>
            </RouterLink>
          </div>

          <!-- Bottom CTA -->
          <div class="pt-3 border-t border-zinc-200">
            <RouterLink 
              @click="closeMenu" 
              :to="activeCategoryData.fullCatalogLink" 
              class="block w-full py-3 bg-[#18181b] text-white text-center text-xs font-semibold uppercase tracking-[0.2em] rounded-xs shadow-md hover:bg-[#b8860b] transition-colors"
            >
              {{ activeCategoryData.fullCatalogText }}
            </RouterLink>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { categoryNavItems } from '@/data/products'
import { useCartStore } from '@/stores/cartStore'
import { useBridalStore } from '@/stores/bridalStore'
import { useAuthStore } from '@/stores/authStore'

const isMenuOpen = ref(false)
const currentCategory = ref(null) // null = Main Menu, 'women' | 'men' | 'bridal' | 'accessories' = Dedicated Submenu Page
const cartStore = useCartStore()
const bridalStore = useBridalStore()
const authStore = useAuthStore()
const isScrolled = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (!isMenuOpen.value) {
    currentCategory.value = null
  }
}

const closeMenu = () => {
  isMenuOpen.value = false
  currentCategory.value = null
}

const openCategoryPage = (cat) => {
  currentCategory.value = cat
}

// Category lore, subcategories, and spotlight data for each dedicated screen
const categoryPageData = {
  women: {
    title: 'WOMEN',
    subtitle: 'THE COLLECTION UNIVERSE',
    lore: 'Explore meticulously curated silhouettes, generational needlework, and bespoke atelier appointments.',
    fullCatalogLink: '/women',
    fullCatalogText: 'VIEW FULL WOMEN CATALOG →',
    items: categoryNavItems.women,
    spotlight: {
      tag: 'HAUTE SAREE CURATION',
      title: 'Varanasi Brocade & Sculpted Sarees',
      image: '/images/sarees/saree-1-banarasi.jpg',
      link: '/women?sub=saree'
    }
  },
  men: {
    title: 'MEN',
    subtitle: 'THE COLLECTION UNIVERSE',
    lore: 'Imperial achkans, tailored bandhgalas, and pure silk creations crafted for royalty.',
    fullCatalogLink: '/men',
    fullCatalogText: 'VIEW FULL MEN CATALOG →',
    items: categoryNavItems.men,
    spotlight: {
      tag: 'MASTER BESPOKE GROOMWEAR',
      title: 'Royal Gold Zardozi Groom Sherwani',
      image: '/images/sherwanis/sherwani-1-gold.jpg',
      link: '/men?sub=sherwani'
    }
  },
  bridal: {
    title: 'THE BRIDAL SUITE',
    subtitle: 'THE COLLECTION UNIVERSE',
    lore: 'Generational lehengas, hand-embroidered zardozi ensembles, and bespoke trousseau.',
    fullCatalogLink: '/bridal',
    fullCatalogText: 'VIEW FULL BRIDAL SUITE →',
    items: categoryNavItems.bridal,
    spotlight: {
      tag: 'HEIRLOOM BRIDAL EDITION',
      title: 'The Rani of Ayodhya Crimson Lehenga',
      image: '/images/lehengas/lehenga-1-crimson.jpg',
      link: '/bridal?sub=lehengas'
    }
  },
  accessories: {
    title: 'FINE ACCESSORIES',
    subtitle: 'THE COLLECTION UNIVERSE',
    lore: 'Mother-of-pearl minaudières, uncut polki jewels, luxury watches, and handcrafted mojaris.',
    fullCatalogLink: '/accessories',
    fullCatalogText: 'VIEW ALL ACCESSORIES →',
    items: categoryNavItems.accessories,
    spotlight: {
      tag: 'IMPERIAL FINE JEWELS',
      title: '24K Gold Gilded Lion Talisman Brooch',
      image: '/images/jewellery/jewel-1-lion-brooch.jpg',
      link: '/accessories?sub=jewellery'
    }
  }
}

const activeCategoryData = computed(() => {
  return categoryPageData[currentCategory.value] || categoryPageData.women
})

// Lock body scrolling when drawer menu is open
watch(isMenuOpen, (isOpen) => {
  if (typeof document !== 'undefined') {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 30
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})

const openBridalModal = () => {
  closeMenu()
  bridalStore.openBookingModal()
}

const openLoginModal = () => {
  closeMenu()
  authStore.openAuthModal('login')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
