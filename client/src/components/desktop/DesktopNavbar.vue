<template>
  <header 
    :class="[
      'fixed top-0 left-0 right-0 z-40 transition-all duration-500 w-full',
      isScrolled || activeMenu 
        ? 'bg-white/95 backdrop-blur-xl border-b border-zinc-200 shadow-sm text-[#18181b]' 
        : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent border-transparent text-white'
    ]"
    @mouseleave="activeMenu = null"
  >
    <!-- Main Navigation Bar with Perfect 3-Column Center Alignment -->
    <div class="w-full px-8 md:px-12 lg:px-16 py-5 grid grid-cols-12 items-center transition-colors duration-300">
      
      <!-- Left Category Links (Cols 1-5) -->
      <nav 
        :class="[
          'col-span-5 flex items-center space-x-6 lg:space-x-8 text-xs uppercase tracking-[0.2em] font-medium transition-colors',
          isScrolled || activeMenu ? 'text-zinc-700' : 'text-white/90 drop-shadow-sm'
        ]"
      >
        <RouterLink 
          to="/" 
          class="transition-colors py-1 hover:text-[#b8860b]"
          :class="isScrolled || activeMenu ? 'active:text-[#b8860b]' : 'hover:text-[#fef08a]'"
          active-class="font-semibold !text-[#b8860b]"
        >
          Home
        </RouterLink>

        <!-- Women Dropdown Trigger -->
        <div class="relative py-1" @mouseenter="openMenu('women')">
          <RouterLink 
            to="/women" 
            class="transition-colors flex items-center gap-1 cursor-pointer"
            :class="[
              isScrolled || activeMenu ? 'hover:text-[#b8860b]' : 'hover:text-[#fef08a]',
              activeMenu === 'women' ? '!text-[#b8860b] font-semibold' : ''
            ]"
            active-class="font-semibold !text-[#b8860b]"
          >
            Women
            <span class="text-[9px] transition-transform duration-300" :class="{ 'rotate-180': activeMenu === 'women' }">▾</span>
          </RouterLink>
        </div>

        <!-- Men Dropdown Trigger -->
        <div class="relative py-1" @mouseenter="openMenu('men')">
          <RouterLink 
            to="/men" 
            class="transition-colors flex items-center gap-1 cursor-pointer"
            :class="[
              isScrolled || activeMenu ? 'hover:text-[#b8860b]' : 'hover:text-[#fef08a]',
              activeMenu === 'men' ? '!text-[#b8860b] font-semibold' : ''
            ]"
            active-class="font-semibold !text-[#b8860b]"
          >
            Men
            <span class="text-[9px] transition-transform duration-300" :class="{ 'rotate-180': activeMenu === 'men' }">▾</span>
          </RouterLink>
        </div>

        <!-- Bridal Dropdown Trigger -->
        <div class="relative py-1" @mouseenter="openMenu('bridal')">
          <RouterLink 
            to="/bridal" 
            class="transition-colors flex items-center gap-1 cursor-pointer"
            :class="[
              isScrolled || activeMenu ? 'hover:text-[#b8860b]' : 'hover:text-[#fef08a]',
              activeMenu === 'bridal' ? '!text-[#b8860b] font-semibold' : ''
            ]"
            active-class="font-semibold !text-[#b8860b]"
          >
            Bridal
            <span class="text-[9px] transition-transform duration-300" :class="{ 'rotate-180': activeMenu === 'bridal' }">▾</span>
          </RouterLink>
        </div>
      </nav>

      <!-- Center Brand Logo (Cols 6-7, True Geometric Center) -->
      <div class="col-span-2 flex justify-center items-center">
        <RouterLink to="/" class="text-center group block">
          <h1 
            :class="[
              'font-serif text-2xl md:text-3xl lg:text-4xl tracking-[0.35em] font-normal transition-colors whitespace-nowrap',
              isScrolled || activeMenu ? 'text-black group-hover:text-[#b8860b]' : 'text-white group-hover:text-[#fef08a] drop-shadow'
            ]"
          >
            LECOTRUS
          </h1>
        </RouterLink>
      </div>

      <!-- Right Nav Links & Actions (Cols 8-12) -->
      <div 
        :class="[
          'col-span-5 flex items-center justify-end space-x-6 lg:space-x-8 text-xs uppercase tracking-[0.2em] font-medium transition-colors',
          isScrolled || activeMenu ? 'text-zinc-700' : 'text-white/90 drop-shadow-sm'
        ]"
      >
        
        <!-- Accessories Dropdown Trigger -->
        <div class="relative py-1" @mouseenter="openMenu('accessories')">
          <RouterLink 
            to="/accessories" 
            class="transition-colors flex items-center gap-1 cursor-pointer"
            :class="[
              isScrolled || activeMenu ? 'hover:text-[#b8860b]' : 'hover:text-[#fef08a]',
              activeMenu === 'accessories' ? '!text-[#b8860b] font-semibold' : ''
            ]"
            active-class="font-semibold !text-[#b8860b]"
          >
            Accessories
            <span class="text-[9px] transition-transform duration-300" :class="{ 'rotate-180': activeMenu === 'accessories' }">▾</span>
          </RouterLink>
        </div>

        <RouterLink 
          to="/contact" 
          class="transition-colors py-1"
          :class="isScrolled || activeMenu ? 'hover:text-[#b8860b]' : 'hover:text-[#fef08a]'"
          active-class="font-semibold !text-[#b8860b]"
        >
          Contact Us
        </RouterLink>

        <!-- Actions Group (Sign In / Small Icon Actions & Bag) -->
        <div 
          :class="[
            'flex items-center space-x-4 lg:space-x-5 pl-5 border-l transition-colors',
            isScrolled || activeMenu ? 'border-zinc-300' : 'border-white/40'
          ]"
        >
          <!-- Unauthenticated: Sign In text -->
          <button 
            v-if="!authStore.isAuthenticated"
            @click="authStore.openAuthModal('login')" 
            :class="[
              'transition-colors cursor-pointer tracking-[0.2em] uppercase font-medium py-1',
              isScrolled || activeMenu ? 'hover:text-[#b8860b]' : 'hover:text-[#fef08a]'
            ]"
          >
            Sign In
          </button>

          <!-- Authenticated: Compact Small Icon Actions -->
          <div v-else class="flex items-center gap-2">
            <!-- Small Admin Crown Icon Button -->
            <a 
              v-if="authStore.isAdmin" 
              href="/admin" 
              target="_blank"
              class="w-7 h-7 rounded-full bg-[#18181b] hover:bg-[#b8860b] text-[#fef08a] hover:text-black border border-[#d4af37]/40 flex items-center justify-center transition-all cursor-pointer shadow-xs"
              title="Atelier Admin Console (Open in new tab)"
            >
              <span class="text-xs">👑</span>
            </a>

            <!-- Small Profile Avatar Button -->
            <button 
              @click="authStore.openAuthModal()" 
              class="w-7 h-7 rounded-full border border-current hover:border-[#b8860b] hover:text-[#b8860b] flex items-center justify-center text-[11px] font-serif font-bold transition-all cursor-pointer"
              :title="`Account: ${authStore.user?.name || 'Customer'}`"
            >
              <span>{{ authStore.user?.name ? authStore.user.name.charAt(0).toUpperCase() : '👤' }}</span>
            </button>
          </div>

          <!-- Cart Bag Trigger -->
          <button 
            @click="cartStore.openCart" 
            :class="[
              'relative flex items-center gap-2 transition-colors cursor-pointer py-1',
              isScrolled || activeMenu ? 'text-zinc-800 hover:text-[#b8860b]' : 'text-white hover:text-[#fef08a]'
            ]"
            aria-label="Shopping Bag"
          >
            <span class="tracking-widest">Bag</span>
            <span 
              :class="[
                'w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center transition-colors',
                isScrolled || activeMenu ? 'bg-[#18181b] text-white' : 'bg-[#d4af37] text-black shadow-md'
              ]"
            >
              {{ cartStore.cartCount }}
            </span>
          </button>
        </div>

      </div>
    </div>

    <!-- LUXURY MEGA-MENU DROPDOWN OVERLAY (When Hovering Categories) -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div 
        v-if="activeMenu && categoryNavItems[activeMenu]" 
        class="absolute top-full left-0 right-0 bg-white/98 border-b border-zinc-200 shadow-2xl backdrop-blur-2xl py-8 px-8 md:px-16 text-[#18181b]"
        @mouseenter="activeMenu = activeMenu"
        @mouseleave="activeMenu = null"
      >
        <div class="max-w-[1800px] mx-auto grid grid-cols-12 gap-8 items-center">
          
          <!-- Category Title & Lore (Cols 1-3) -->
          <div class="col-span-3 border-r border-zinc-200 pr-8 space-y-2">
            <span class="text-[10px] uppercase tracking-[0.3em] text-[#b8860b] font-semibold">The Collection Universe</span>
            <h3 class="font-serif text-2xl tracking-widest text-black uppercase font-normal">
              {{ activeMenu }}
            </h3>
            <p class="text-xs text-zinc-500 font-light leading-relaxed">
              Explore meticulously curated silhouettes, generational needlework, and bespoke atelier appointments.
            </p>
            <div class="pt-2">
              <RouterLink 
                :to="`/${activeMenu}`" 
                @click="activeMenu = null"
                class="text-xs text-[#b8860b] font-semibold uppercase tracking-wider hover:underline inline-block"
              >
                View Full {{ activeMenu }} Catalog →
              </RouterLink>
            </div>
          </div>

          <!-- Specific Subcategory Items (Cols 4-8) -->
          <div class="col-span-6 grid grid-cols-2 gap-4 px-4">
            <RouterLink 
              v-for="sub in categoryNavItems[activeMenu]" 
              :key="sub.slug"
              :to="{ path: `/${activeMenu}`, query: { sub: sub.slug } }"
              @mouseenter="hoveredSub = sub.slug"
              @touchstart="hoveredSub = sub.slug"
              @click="activeMenu = null"
              :class="[
                'p-4 rounded-sm border transition-all block cursor-pointer group',
                (hoveredSub === sub.slug || (!hoveredSub && categoryNavItems[activeMenu][0]?.slug === sub.slug))
                  ? 'border-[#b8860b] bg-white shadow-md' 
                  : 'bg-[#faf9f6] border-zinc-200/80 hover:border-[#b8860b] hover:bg-white hover:shadow-sm'
              ]"
            >
              <div class="flex items-center justify-between">
                <h4 
                  :class="[
                    'font-serif text-sm tracking-wider font-medium uppercase transition-colors',
                    (hoveredSub === sub.slug || (!hoveredSub && categoryNavItems[activeMenu][0]?.slug === sub.slug))
                      ? 'text-[#b8860b]' 
                      : 'text-black group-hover:text-[#b8860b]'
                  ]"
                >
                  {{ sub.label }}
                </h4>
                <span 
                  :class="[
                    'text-xs transition-transform',
                    (hoveredSub === sub.slug || (!hoveredSub && categoryNavItems[activeMenu][0]?.slug === sub.slug))
                      ? 'text-[#b8860b] translate-x-1' 
                      : 'text-zinc-400 group-hover:text-[#b8860b] group-hover:translate-x-1'
                  ]"
                >
                  →
                </span>
              </div>
              <p class="text-[11px] text-zinc-500 font-light mt-1">{{ sub.desc }}</p>
            </RouterLink>
          </div>

          <!-- Dynamic Visual Spotlight for Hovered Subcategory (Cols 9-12) -->
          <div class="col-span-3 pl-4">
            <div class="relative h-48 rounded-sm overflow-hidden border border-zinc-200 shadow-sm group bg-[#faf9f6]">
              <img 
                :src="currentSpotlight.image" 
                :alt="currentSpotlight.title" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-4">
                <span class="text-[9px] uppercase tracking-widest text-[#fef08a] font-semibold">{{ currentSpotlight.tag }}</span>
                <span class="font-serif text-xs tracking-wider text-white mt-0.5 leading-snug line-clamp-2">{{ currentSpotlight.title }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { categoryNavItems } from '@/data/products'
import { useCartStore } from '@/stores/cartStore'
import { useAuthStore } from '@/stores/authStore'

const cartStore = useCartStore()
const authStore = useAuthStore()
const activeMenu = ref(null)
const hoveredSub = ref(null)
const isScrolled = ref(false)

const openMenu = (menu) => {
  activeMenu.value = menu
  if (menu && categoryNavItems[menu] && categoryNavItems[menu][0]) {
    hoveredSub.value = categoryNavItems[menu][0].slug
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const subcategorySpotlights = {
  // Women
  'saree': {
    title: 'Varanasi Brocade & Sculpted Sarees',
    tag: 'Haute Saree Curation',
    image: '/images/sarees/saree-1-banarasi.jpg'
  },
  'kurthi set': {
    title: 'Nizam Embroidered Anarkali & Sharara Sets',
    tag: 'Luxury Prêt Kurti',
    image: '/images/kurtis/kurti-1-ivory.jpg'
  },
  'coord set': {
    title: 'Zephyr Midnight Embroidered Cape Coord Set',
    tag: 'Contemporary Co-ord',
    image: '/images/coords/coord-1-midnight.jpg'
  },

  // Men
  'sherwani': {
    title: 'Royal Gold Zardozi Groom Sherwani',
    tag: 'Master Bespoke Sherwani',
    image: '/images/sherwanis/sherwani-1-gold.jpg'
  },
  'bandhgala': {
    title: 'Asymmetric Charcoal Couture Bandhgala',
    tag: 'Runway Bandhgala',
    image: '/images/bandhgalas/bandhgala-1-charcoal.jpg'
  },
  'mulberry silk shirts': {
    title: 'Regal Pure Mulberry Silk Shirt',
    tag: 'Casual Couture Shirt',
    image: '/images/shirts/shirt-1-mulberry.jpg'
  },

  // Bridal
  'lehengas': {
    title: 'Rani of Ayodhya Heirloom Lehenga',
    tag: 'Masterpiece Lehenga',
    image: '/images/lehengas/lehenga-1-crimson.jpg'
  },
  'gowns': {
    title: 'Chandramukhi Ivory Pearl Bridal Gown',
    tag: 'Sculptural Bridal Gown',
    image: '/images/gowns/gown-1-ivory-pearl.jpg'
  },
  'ethinic set': {
    title: 'Shahi Vermilion Red Bridal Sharara Set',
    tag: 'Ceremonial Ethnic Set',
    image: '/images/ethnic/ethnic-1-red-sharara.jpg'
  },

  // Accessories
  'bags': {
    title: 'Nizam Sculptural Minaudière Bag',
    tag: 'Hand-Cast Brass Bag',
    image: '/images/bags/bag-1-minaudiere.jpg'
  },
  'shoes': {
    title: 'Imperial Velvet Groom Mojaris',
    tag: 'Handcrafted Footwear',
    image: '/images/shoes/shoe-1-men-mojari.jpg'
  },
  'watches': {
    title: 'Chronos Gilded Tourbillon Watch',
    tag: 'Haute Horlogerie Timepiece',
    image: '/images/watches/watch-1-tourbillon.jpg'
  },
  'jewellery': {
    title: 'Gilded Lion Talisman & Polki Jewels',
    tag: 'Statement Royal Jewels',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
  }
}

const currentSpotlight = computed(() => {
  if (hoveredSub.value && subcategorySpotlights[hoveredSub.value]) {
    return subcategorySpotlights[hoveredSub.value]
  }
  if (activeMenu.value && categoryNavItems[activeMenu.value] && categoryNavItems[activeMenu.value][0]) {
    const firstSlug = categoryNavItems[activeMenu.value][0].slug
    return subcategorySpotlights[firstSlug] || { title: 'Atelier Edits', tag: 'Lecotrus', image: '' }
  }
  return { title: 'Atelier Edits', tag: 'Lecotrus', image: '' }
})
</script>
