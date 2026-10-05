<template>
  <div class="min-h-screen bg-[#faf9f6] text-black font-sans antialiased">
    
    <!-- =================================================================== -->
    <!-- GLOBAL TOAST / NOTIFICATION BANNER -->
    <!-- =================================================================== -->
    <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-2">
      <div 
        v-if="toastMessage" 
        class="fixed bottom-6 right-6 z-50 bg-[#0c0c0e] text-[#fef08a] border border-[#d4af37] px-5 py-3 rounded-xs shadow-2xl flex items-center gap-3 text-xs tracking-wide"
      >
        <span class="text-base">{{ toastIcon }}</span>
        <span class="font-bold text-white">{{ toastMessage }}</span>
      </div>
    </transition>

    <!-- =================================================================== -->
    <!-- VIEW A: ADMIN SIGN-IN PORTAL (IF NOT LOGGED IN AS ADMIN) -->
    <!-- =================================================================== -->
    <div v-if="!authStore.isAuthenticated || !authStore.isAdmin" class="min-h-screen flex items-center justify-center p-4 bg-[#0a0a0c] text-white relative overflow-hidden">
      <!-- Background Decorative Aura -->
      <div class="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#d4af37]/10 blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#d4af37]/10 blur-3xl pointer-events-none"></div>

      <div class="w-full max-w-md bg-[#121216] border border-[#d4af37]/40 p-8 rounded-sm shadow-2xl relative z-10 space-y-6">
        <!-- Brand Crest Header -->
        <div class="text-center space-y-2">
          <div class="w-14 h-14 mx-auto rounded-full bg-black/60 border border-[#d4af37]/60 flex items-center justify-center text-2xl shadow-lg">
            ⚜️
          </div>
          <span class="text-[9px] uppercase tracking-[0.35em] text-[#d4af37] font-semibold block">House of Lecotrus</span>
          <h2 class="font-serif text-2xl tracking-widest text-[#fef08a] font-normal">ADMIN CONSOLE</h2>
          <p class="text-xs text-zinc-300 font-medium">Coimbatore Flagship Master Atelier Access</p>
        </div>

        <!-- Error feedback -->
        <div v-if="loginError" class="p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded-xs flex items-center gap-2">
          <span>⚠️</span>
          <span>{{ loginError }}</span>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleAdminLogin" class="space-y-4 text-xs">
          <div>
            <label class="block uppercase tracking-wider text-white font-bold mb-1.5 text-[10.5px]">Admin Email</label>
            <input 
              v-model="loginEmail" 
              type="email" 
              required
              placeholder="admin@lecotrus.com"
              class="w-full px-3.5 py-2.5 bg-black/50 border border-zinc-600 focus:border-[#d4af37] text-white rounded-xs focus:outline-none transition-colors font-medium"
            />
          </div>

          <div>
            <label class="block uppercase tracking-wider text-white font-bold mb-1.5 text-[10.5px]">Master Security Password</label>
            <div class="relative">
              <input 
                v-model="loginPassword" 
                :type="showPassword ? 'text' : 'password'" 
                required
                placeholder="••••••••"
                class="w-full px-3.5 py-2.5 bg-black/50 border border-zinc-600 focus:border-[#d4af37] text-white rounded-xs focus:outline-none transition-colors pr-10 font-medium"
              />
              <button 
                type="button" 
                @click="showPassword = !showPassword"
                class="absolute right-3 top-2.5 text-zinc-300 hover:text-[#d4af37] text-xs cursor-pointer font-bold"
              >
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>

          <!-- Quick Demo Credentials Auto-Fill Button -->
          <button 
            type="button" 
            @click="quickFillAdmin" 
            class="w-full py-1.5 px-3 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/30 text-[#fef08a] rounded-xs text-[10.5px] uppercase tracking-wider transition-colors cursor-pointer text-center font-semibold"
          >
            👑 Quick Fill Master Credentials (admin123)
          </button>

          <button 
            type="submit" 
            class="w-full py-3 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black font-bold uppercase tracking-widest text-xs rounded-xs hover:brightness-110 transition-all cursor-pointer shadow-lg mt-2"
          >
            Enter Atelier Command Center ✦
          </button>
        </form>

        <div class="pt-2 text-center border-t border-zinc-800">
          <a href="/" class="text-xs text-zinc-300 hover:text-[#fef08a] transition-colors font-medium">
            ← Return to Public Boutique Storefront
          </a>
        </div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- VIEW B: FULL ADMINISTRATIVE DASHBOARD (WHEN AUTHENTICATED) -->
    <!-- =================================================================== -->
    <div v-else class="min-h-screen flex flex-col lg:flex-row relative">
      
      <!-- =================================================================== -->
      <!-- MOBILE ADMIN TOP NAVBAR (CLEAN, MINIMAL & FIXED) -->
      <!-- =================================================================== -->
      <header class="lg:hidden bg-[#0c0c0e]/95 backdrop-blur-md text-white border-b border-[#d4af37]/30 fixed top-0 left-0 right-0 z-40 px-4 py-2.5 flex items-center justify-between shadow-md">
        <!-- Left: Clean Hamburger Icon -->
        <button 
          @click="isMobileDrawerOpen = !isMobileDrawerOpen"
          class="p-2 -ml-1 text-white hover:text-[#d4af37] focus:outline-none cursor-pointer rounded-xs transition-colors"
          aria-label="Toggle Admin Navigation Menu"
        >
          <div class="space-y-1.5 w-5">
            <span class="block w-5 h-0.5 rounded-full bg-white transition-all"></span>
            <span class="block w-3.5 h-0.5 rounded-full bg-[#d4af37] transition-all"></span>
            <span class="block w-5 h-0.5 rounded-full bg-white transition-all"></span>
          </div>
        </button>

        <!-- Center: Centered Luxury Brand Title -->
        <div class="flex flex-col items-center text-center">
          <span class="font-serif text-base tracking-[0.25em] text-[#fef08a] font-normal leading-none">LECOTRUS</span>
          <span class="text-[7.5px] uppercase tracking-[0.35em] text-[#d4af37] font-semibold mt-0.5">ADMIN CONSOLE</span>
        </div>

        <!-- Right: Clean Storefront Link -->
        <div class="flex items-center gap-1.5 -mr-1">
          <a 
            href="/" 
            target="_blank"
            class="px-2.5 py-1 rounded-xs border border-[#d4af37]/40 text-[#fef08a] hover:bg-[#d4af37]/15 text-[10px] uppercase tracking-wider font-bold transition-all flex items-center gap-1"
            title="Open Live Boutique Storefront"
          >
            <span>Store</span>
            <span class="text-xs">↗</span>
          </a>
        </div>
      </header>

      <!-- =================================================================== -->
      <!-- MOBILE ADMIN SLIDE-OUT NAVIGATION DRAWER (TELEPORTED / FULL VIEW) -->
      <!-- =================================================================== -->
      <Teleport to="body">
        <transition 
          enter-active-class="transition-opacity duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div 
            v-if="isMobileDrawerOpen" 
            class="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs lg:hidden"
            @click="isMobileDrawerOpen = false"
          ></div>
        </transition>

        <transition 
          enter-active-class="transition-transform duration-300 ease-out"
          enter-from-class="-translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition-transform duration-200 ease-in"
          leave-from-class="translate-x-0"
          leave-to-class="-translate-x-full"
        >
          <div 
            v-if="isMobileDrawerOpen" 
            class="fixed inset-y-0 left-0 z-50 w-4/5 max-w-sm bg-[#0c0c0e] text-[#fef08a] border-r border-[#d4af37]/40 shadow-2xl flex flex-col justify-between overflow-y-auto lg:hidden"
          >
            <!-- Drawer Header & Navigation List -->
            <div class="p-5 space-y-5">
              <!-- Header with Close button -->
              <div class="flex items-center justify-between pb-4 border-b border-[#d4af37]/25">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full bg-[#18181b] border border-[#d4af37]/50 flex items-center justify-center text-base shadow-xs">
                    ⚜️
                  </div>
                  <div>
                    <div class="text-[8px] uppercase tracking-[0.3em] text-[#d4af37] font-bold">House of Lecotrus</div>
                    <h2 class="font-serif text-sm tracking-wider text-[#fef08a] font-normal">ADMIN CONSOLE</h2>
                  </div>
                </div>

                <button 
                  @click="isMobileDrawerOpen = false"
                  class="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <!-- Admin Status Badge -->
              <div class="bg-[#18181b] border border-[#d4af37]/30 p-3 rounded-xs space-y-1">
                <div class="flex items-center justify-between">
                  <span class="text-[8.5px] uppercase tracking-wider text-[#d4af37] font-bold">Authority Session</span>
                  <span class="flex items-center gap-1 text-[9px] text-emerald-400 font-bold">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Online
                  </span>
                </div>
                <p class="text-xs text-white font-mono font-bold truncate">{{ authStore.user?.email || 'admin@lecotrus.com' }}</p>
                <span class="text-[9.5px] text-zinc-400 font-medium">Coimbatore Flagship Master Atelier</span>
              </div>

              <!-- Drawer Navigation Links -->
              <nav class="space-y-2 pt-1">
                <div class="text-[9px] uppercase tracking-[0.25em] text-[#d4af37] font-bold px-2">
                  Atelier Navigation Menu
                </div>

                <!-- 1. Executive Analytics -->
                <button 
                  @click="selectTab('analytics')"
                  class="w-full px-3.5 py-3 rounded-xs text-xs uppercase tracking-wider font-bold flex items-center justify-between transition-all cursor-pointer text-left"
                  :class="activeTab === 'analytics' 
                    ? 'bg-[#d4af37]/20 text-[#fef08a] border-l-4 border-[#d4af37]' 
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'"
                >
                  <div class="flex items-center gap-3">
                    <span class="text-lg">📊</span>
                    <span>Executive Analytics</span>
                  </div>
                  <span 
                    class="px-2 py-0.5 rounded-full text-[9px] font-extrabold"
                    :class="activeTab === 'analytics' ? 'bg-[#d4af37] text-black' : 'bg-zinc-800 text-zinc-300'"
                  >
                    KPI
                  </span>
                </button>

                <!-- 2. Creation Catalog -->
                <button 
                  @click="selectTab('products')"
                  class="w-full px-3.5 py-3 rounded-xs text-xs uppercase tracking-wider font-bold flex items-center justify-between transition-all cursor-pointer text-left"
                  :class="activeTab === 'products' 
                    ? 'bg-[#d4af37]/20 text-[#fef08a] border-l-4 border-[#d4af37]' 
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'"
                >
                  <div class="flex items-center gap-3">
                    <span class="text-lg">👗</span>
                    <span>Creation Catalog</span>
                  </div>
                  <span 
                    class="px-2 py-0.5 rounded-full text-[9px] font-extrabold"
                    :class="activeTab === 'products' ? 'bg-[#d4af37] text-black' : 'bg-zinc-800 text-zinc-300'"
                  >
                    {{ productStore.products.length }}
                  </span>
                </button>

                <!-- 3. Client Orders -->
                <button 
                  @click="selectTab('orders')"
                  class="w-full px-3.5 py-3 rounded-xs text-xs uppercase tracking-wider font-bold flex items-center justify-between transition-all cursor-pointer text-left"
                  :class="activeTab === 'orders' 
                    ? 'bg-[#d4af37]/20 text-[#fef08a] border-l-4 border-[#d4af37]' 
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'"
                >
                  <div class="flex items-center gap-3">
                    <span class="text-lg">📦</span>
                    <span>Client Orders</span>
                  </div>
                  <span 
                    class="px-2 py-0.5 rounded-full text-[9px] font-extrabold"
                    :class="activeTab === 'orders' ? 'bg-[#d4af37] text-black' : 'bg-zinc-800 text-zinc-300'"
                  >
                    {{ cartStore.orders.length }}
                  </span>
                </button>

                <!-- 4. Client Measurements -->
                <button 
                  @click="selectTab('measurements')"
                  class="w-full px-3.5 py-3 rounded-xs text-xs uppercase tracking-wider font-bold flex items-center justify-between transition-all cursor-pointer text-left"
                  :class="activeTab === 'measurements' 
                    ? 'bg-[#d4af37]/20 text-[#fef08a] border-l-4 border-[#d4af37]' 
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'"
                >
                  <div class="flex items-center gap-3">
                    <span class="text-lg">📏</span>
                    <span>Client Measurements</span>
                  </div>
                  <span 
                    class="px-2 py-0.5 rounded-full text-[9px] font-extrabold"
                    :class="activeTab === 'measurements' ? 'bg-[#d4af37] text-black' : 'bg-zinc-800 text-zinc-300'"
                  >
                    {{ measurementStore.measurements.length }}
                  </span>
                </button>

                <!-- 5. Salon Consultations -->
                <button 
                  @click="selectTab('appointments')"
                  class="w-full px-3.5 py-3 rounded-xs text-xs uppercase tracking-wider font-bold flex items-center justify-between transition-all cursor-pointer text-left"
                  :class="activeTab === 'appointments' 
                    ? 'bg-[#d4af37]/20 text-[#fef08a] border-l-4 border-[#d4af37]' 
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'"
                >
                  <div class="flex items-center gap-3">
                    <span class="text-lg">💍</span>
                    <span>Salon Bookings</span>
                  </div>
                  <span 
                    class="px-2 py-0.5 rounded-full text-[9px] font-extrabold"
                    :class="activeTab === 'appointments' ? 'bg-[#d4af37] text-black' : 'bg-zinc-800 text-zinc-300'"
                  >
                    {{ appointmentStore.appointments.length }}
                  </span>
                </button>
              </nav>
            </div>

            <!-- Drawer Bottom Actions -->
            <div class="p-5 border-t border-[#d4af37]/20 space-y-2.5 bg-[#08080a]">
              <a 
                href="/" 
                target="_blank"
                class="w-full py-2 px-3 rounded-xs border border-[#d4af37]/40 text-[#fef08a] hover:bg-[#d4af37]/20 text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Live Storefront</span>
                <span>↗</span>
              </a>

              <button 
                @click="handleLogout(); isMobileDrawerOpen = false" 
                class="w-full py-2 px-3 rounded-xs bg-red-950/80 border border-red-800/60 text-red-100 hover:bg-red-900 text-xs uppercase tracking-wider transition-colors cursor-pointer text-center font-bold"
              >
                Sign Out Admin
              </button>
            </div>
          </div>
        </transition>
      </Teleport>

      <!-- =================================================================== -->
      <!-- MOBILE ADMIN BOTTOM NAVIGATION BAR (FIXED 1-THUMB APP-LIKE BAR) -->
      <!-- =================================================================== -->
      <div class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0c0e]/95 backdrop-blur-md border-t border-[#d4af37]/40 px-2 py-1.5 shadow-2xl flex items-center justify-around text-center">
        <!-- Tab 1: Analytics -->
        <button 
          @click="selectTab('analytics')" 
          class="flex flex-col items-center justify-center py-1 px-2 rounded-xs transition-colors cursor-pointer"
          :class="activeTab === 'analytics' ? 'text-[#fef08a] font-bold' : 'text-zinc-400 hover:text-zinc-200'"
        >
          <span class="text-base">📊</span>
          <span class="text-[9px] tracking-wider uppercase">Analytics</span>
        </button>

        <!-- Tab 2: Catalog -->
        <button 
          @click="selectTab('products')" 
          class="flex flex-col items-center justify-center py-1 px-2 rounded-xs transition-colors cursor-pointer relative"
          :class="activeTab === 'products' ? 'text-[#fef08a] font-bold' : 'text-zinc-400 hover:text-zinc-200'"
        >
          <span class="text-base">👗</span>
          <span class="text-[9px] tracking-wider uppercase">Catalog</span>
          <span class="absolute -top-1 -right-0.5 bg-[#d4af37] text-black text-[8px] font-bold px-1 rounded-full">{{ productStore.products.length }}</span>
        </button>

        <!-- Center: Quick Add Button -->
        <button 
          @click="openAddProductModal" 
          class="w-10 h-10 -mt-4 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#fef08a] text-black flex items-center justify-center text-lg font-extrabold shadow-lg border-2 border-black cursor-pointer active:scale-95 transition-transform"
          title="Add New Creation"
        >
          ➕
        </button>

        <!-- Tab 3: Orders -->
        <button 
          @click="selectTab('orders')" 
          class="flex flex-col items-center justify-center py-1 px-2 rounded-xs transition-colors cursor-pointer relative"
          :class="activeTab === 'orders' ? 'text-[#fef08a] font-bold' : 'text-zinc-400 hover:text-zinc-200'"
        >
          <span class="text-base">📦</span>
          <span class="text-[9px] tracking-wider uppercase">Orders</span>
          <span v-if="cartStore.orders.length > 0" class="absolute -top-1 -right-0.5 bg-[#d4af37] text-black text-[8px] font-bold px-1 rounded-full">{{ cartStore.orders.length }}</span>
        </button>

        <!-- Tab 4: Salon -->
        <button 
          @click="selectTab('appointments')" 
          class="flex flex-col items-center justify-center py-1 px-2 rounded-xs transition-colors cursor-pointer relative"
          :class="activeTab === 'appointments' ? 'text-[#fef08a] font-bold' : 'text-zinc-400 hover:text-zinc-200'"
        >
          <span class="text-base">💍</span>
          <span class="text-[9px] tracking-wider uppercase">Salon</span>
        </button>
      </div>

      <!-- =================================================================== -->
      <!-- LEFT COLUMN: FIXED / FROZEN ATELIER SIDEBAR (DESKTOP ONLY) -->
      <!-- =================================================================== -->
      <aside class="hidden lg:flex w-72 xl:w-80 bg-[#0c0c0e] text-[#fef08a] border-r border-[#d4af37]/30 flex-col justify-between flex-shrink-0 lg:fixed lg:top-0 lg:left-0 lg:bottom-0 lg:h-screen lg:overflow-y-auto z-40">
        
        <!-- Top Brand & Navigation Section -->
        <div class="p-5 lg:p-6 space-y-5">
          
          <!-- House Crest & Brand Header -->
          <div class="flex items-center gap-3.5 pb-4 border-b border-[#d4af37]/20">
            <div class="w-10 h-10 rounded-full bg-[#18181b] border border-[#d4af37]/40 flex items-center justify-center text-xl shadow-md">
              ⚜️
            </div>
            <div>
              <div class="text-[9px] uppercase tracking-[0.35em] text-[#d4af37] font-bold">House of Lecotrus</div>
              <h1 class="font-serif text-lg tracking-[0.14em] text-[#fef08a] font-normal">ADMIN CONSOLE</h1>
            </div>
          </div>

          <!-- Administrator Badge -->
          <div class="bg-[#18181b]/90 border border-[#d4af37]/25 p-3 rounded-xs space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-[9px] uppercase tracking-wider text-[#d4af37] font-bold">Session Status</span>
              <span class="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Online
              </span>
            </div>
            <p class="text-xs text-white font-bold truncate font-mono">{{ authStore.user?.email || 'admin@lecotrus.com' }}</p>
            <span class="text-[10px] text-zinc-300 font-medium block">Coimbatore Flagship Master Authority</span>
          </div>

          <!-- Vertical Sidebar Navigation Menu -->
          <nav class="space-y-1.5 pt-1">
            <div class="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-bold px-3 mb-2">
              Atelier Management
            </div>

            <!-- Tab 1: Executive Analytics (FIRST) -->
            <button 
              @click="activeTab = 'analytics'"
              class="w-full px-3.5 py-2.5 rounded-xs text-xs uppercase tracking-wider font-semibold flex items-center justify-between transition-all cursor-pointer text-left group"
              :class="activeTab === 'analytics' 
                ? 'bg-[#d4af37]/20 text-[#fef08a] border-l-4 border-[#d4af37] font-bold shadow-xs' 
                : 'text-zinc-300 hover:text-white hover:bg-white/10'"
            >
              <div class="flex items-center gap-2.5">
                <span class="text-base">📊</span>
                <span>Executive Analytics</span>
              </div>
              <span 
                class="px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors"
                :class="activeTab === 'analytics' ? 'bg-[#d4af37] text-black font-extrabold' : 'bg-zinc-800 text-zinc-200 group-hover:bg-zinc-700'"
              >
                KPI
              </span>
            </button>

            <!-- Tab 2: Product Catalog (SECOND) -->
            <button 
              @click="activeTab = 'products'"
              class="w-full px-3.5 py-2.5 rounded-xs text-xs uppercase tracking-wider font-semibold flex items-center justify-between transition-all cursor-pointer text-left group"
              :class="activeTab === 'products' 
                ? 'bg-[#d4af37]/20 text-[#fef08a] border-l-4 border-[#d4af37] font-bold shadow-xs' 
                : 'text-zinc-300 hover:text-white hover:bg-white/10'"
            >
              <div class="flex items-center gap-2.5">
                <span class="text-base">👗</span>
                <span>Creation Catalog</span>
              </div>
              <span 
                class="px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors"
                :class="activeTab === 'products' ? 'bg-[#d4af37] text-black font-extrabold' : 'bg-zinc-800 text-zinc-200 group-hover:bg-zinc-700'"
              >
                {{ productStore.products.length }}
              </span>
            </button>

            <!-- Tab 3: Client Orders & Deliveries -->
            <button 
              @click="activeTab = 'orders'"
              class="w-full px-3.5 py-2.5 rounded-xs text-xs uppercase tracking-wider font-semibold flex items-center justify-between transition-all cursor-pointer text-left group"
              :class="activeTab === 'orders' 
                ? 'bg-[#d4af37]/20 text-[#fef08a] border-l-4 border-[#d4af37] font-bold shadow-xs' 
                : 'text-zinc-300 hover:text-white hover:bg-white/10'"
            >
              <div class="flex items-center gap-2.5">
                <span class="text-base">📦</span>
                <span>Client Orders</span>
              </div>
              <span 
                class="px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors"
                :class="activeTab === 'orders' ? 'bg-[#d4af37] text-black font-extrabold' : 'bg-zinc-800 text-zinc-200 group-hover:bg-zinc-700'"
              >
                {{ cartStore.orders.length }}
              </span>
            </button>

            <!-- Tab 4: Client Measurements (LECOTRUS Bespoke Sheet) -->
            <button 
              @click="activeTab = 'measurements'"
              class="w-full px-3.5 py-2.5 rounded-xs text-xs uppercase tracking-wider font-semibold flex items-center justify-between transition-all cursor-pointer text-left group"
              :class="activeTab === 'measurements' 
                ? 'bg-[#d4af37]/20 text-[#fef08a] border-l-4 border-[#d4af37] font-bold shadow-xs' 
                : 'text-zinc-300 hover:text-white hover:bg-white/10'"
            >
              <div class="flex items-center gap-2.5">
                <span class="text-base">📏</span>
                <span>Client Measurements</span>
              </div>
              <span 
                class="px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors"
                :class="activeTab === 'measurements' ? 'bg-[#d4af37] text-black font-extrabold' : 'bg-zinc-800 text-zinc-200 group-hover:bg-zinc-700'"
              >
                {{ measurementStore.measurements.length }}
              </span>
            </button>

            <!-- Tab 5: Salon Appointments -->
            <button 
              @click="activeTab = 'appointments'"
              class="w-full px-3.5 py-2.5 rounded-xs text-xs uppercase tracking-wider font-semibold flex items-center justify-between transition-all cursor-pointer text-left group"
              :class="activeTab === 'appointments' 
                ? 'bg-[#d4af37]/20 text-[#fef08a] border-l-4 border-[#d4af37] font-bold shadow-xs' 
                : 'text-zinc-300 hover:text-white hover:bg-white/10'"
            >
              <div class="flex items-center gap-2.5">
                <span class="text-base">💍</span>
                <span>Salon Bookings</span>
              </div>
              <span 
                class="px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors"
                :class="activeTab === 'appointments' ? 'bg-[#d4af37] text-black font-extrabold' : 'bg-zinc-800 text-zinc-200 group-hover:bg-zinc-700'"
              >
                {{ appointmentStore.appointments.length }}
              </span>
            </button>
          </nav>
        </div>

        <!-- Bottom Sidebar Footer Actions -->
        <div class="p-5 lg:p-6 border-t border-[#d4af37]/20 space-y-3 bg-[#08080a]">
          <a 
            href="/" 
            target="_blank"
            class="w-full py-2 px-3 rounded-xs border border-[#d4af37]/50 text-[#fef08a] hover:bg-[#d4af37]/20 text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 text-center"
          >
            <span>Live Storefront</span>
            <span>↗</span>
          </a>

          <button 
            @click="handleLogout" 
            class="w-full py-2 px-3 rounded-xs bg-red-950/80 border border-red-800/60 text-red-100 hover:bg-red-900 text-xs uppercase tracking-wider transition-colors cursor-pointer text-center font-bold"
          >
            Sign Out Admin
          </button>

          <div class="pt-1 text-[10px] text-zinc-300 text-center font-medium">
            Flagship Atelier · R.S. Puram, CBE
          </div>
        </div>

      </aside>

      <!-- =================================================================== -->
      <!-- RIGHT COLUMN: MAIN DASHBOARD WORKSPACE (DARK BLACK CONTENT) -->
      <!-- =================================================================== -->
      <main class="flex-1 lg:ml-72 xl:ml-80 p-3 sm:p-6 md:p-8 lg:p-10 pt-16 sm:pt-20 lg:pt-8 pb-24 lg:pb-10 space-y-4 sm:space-y-6 min-w-0 min-h-screen text-black bg-[#faf9f6]">
        
        <!-- Header Banner & Quick Action Buttons -->
        <div class="bg-white border-2 border-zinc-300 p-4 sm:p-6 rounded-sm shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div class="text-[10px] uppercase tracking-[0.3em] text-[#b8860b] font-bold">
              {{ activeTab === 'analytics' ? 'Executive Atelier Intelligence' : activeTab === 'products' ? 'Catalog Management' : activeTab === 'orders' ? 'Order Logistics & Fulfillment' : activeTab === 'measurements' ? "Women Client's Information & Measurement Sheet" : 'Salon Consultations' }}
            </div>
            <h2 class="font-serif text-xl sm:text-2xl md:text-3xl tracking-wide text-black font-bold mt-0.5">
              {{ activeTab === 'analytics' ? 'Performance & Revenue Metrics' : activeTab === 'products' ? 'Atelier Product Catalog' : activeTab === 'orders' ? 'Client Orders & Delivery Dispatch' : activeTab === 'measurements' ? 'Client Bespoke Fitting & Measurement Registry' : 'Salon Consultation Schedule' }}
            </h2>
          </div>

          <div class="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button 
              v-if="activeTab === 'analytics' || activeTab === 'products'"
              @click="openAddProductModal"
              class="w-full sm:w-auto px-4 py-2.5 bg-black text-[#fef08a] hover:bg-[#b8860b] hover:text-black text-[11px] sm:text-xs uppercase tracking-widest font-bold rounded-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
            >
              <span>➕ Add New Creation</span>
            </button>

            <button 
              v-if="activeTab === 'measurements'"
              @click="openAddMeasurementModal"
              class="w-full sm:w-auto px-4 py-2.5 bg-[#8B0000] text-[#fef08a] hover:bg-black hover:text-[#fef08a] text-[11px] sm:text-xs uppercase tracking-widest font-extrabold rounded-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5 border border-[#d4af37]"
            >
              <span>📏 + New Client Measurement Sheet</span>
            </button>

            <button 
              v-if="activeTab === 'appointments'"
              @click="openAddAppointmentModal"
              class="w-full sm:w-auto px-4 py-2.5 bg-black text-[#fef08a] hover:bg-[#b8860b] hover:text-black text-[11px] sm:text-xs uppercase tracking-widest font-bold rounded-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
            >
              <span>➕ Schedule Appointment</span>
            </button>
          </div>
        </div>

        <!-- KPI Live Metrics Cards Row (Hidden on Client Measurements Tab) -->
        <div v-if="activeTab !== 'measurements'" class="grid grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-4">
          <!-- Card 1: Gross Sales -->
          <div class="bg-white border-2 border-zinc-300 p-3.5 sm:p-5 rounded-sm shadow-xs space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-[9px] sm:text-[10.5px] uppercase tracking-widest text-black font-extrabold truncate">Gross Sales</span>
              <span class="text-sm sm:text-base">💰</span>
            </div>
            <p class="font-serif text-xl sm:text-3xl text-black font-extrabold">₹{{ totalGrossRevenue.toLocaleString('en-IN') }}</p>
            <p class="text-[10px] sm:text-xs text-black font-semibold truncate">{{ cartStore.orders.length }} Purchases</p>
          </div>

          <!-- Card 2: Total Creations -->
          <div class="bg-white border-2 border-zinc-300 p-3.5 sm:p-5 rounded-sm shadow-xs space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-[9px] sm:text-[10.5px] uppercase tracking-widest text-black font-extrabold truncate">Total Creations</span>
              <span class="text-sm sm:text-base">👗</span>
            </div>
            <p class="font-serif text-xl sm:text-3xl text-black font-extrabold">{{ productStore.products.length }}</p>
            <p class="text-[10px] sm:text-xs text-black font-semibold truncate">Women, Men, Bridal, Acc</p>
          </div>

          <!-- Card 3: Active Orders -->
          <div class="bg-white border-2 border-zinc-300 p-3.5 sm:p-5 rounded-sm shadow-xs space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-[9px] sm:text-[10.5px] uppercase tracking-widest text-black font-extrabold truncate">Client Orders</span>
              <span class="text-sm sm:text-base">📦</span>
            </div>
            <p class="font-serif text-xl sm:text-3xl text-black font-extrabold">{{ cartStore.orders.length }}</p>
            <p class="text-[10px] sm:text-xs text-black font-semibold truncate">Live Deliveries</p>
          </div>

          <!-- Card 4: Salon Bookings -->
          <div class="bg-white border-2 border-zinc-300 p-3.5 sm:p-5 rounded-sm shadow-xs space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-[9px] sm:text-[10.5px] uppercase tracking-widest text-black font-extrabold truncate">Salon Bookings</span>
              <span class="text-sm sm:text-base">💍</span>
            </div>
            <p class="font-serif text-xl sm:text-3xl text-black font-extrabold">{{ appointmentStore.appointments.length }}</p>
            <p class="text-[10px] sm:text-xs text-black font-semibold truncate">Private Appointments</p>
          </div>
        </div>

        <!-- MAIN TAB WORKSPACE CONTAINER -->
        <div class="bg-white border-2 border-zinc-300 rounded-sm shadow-xs overflow-hidden">
          
          <!-- =================================================================== -->
          <!-- TAB 1: EXECUTIVE ATELIER ANALYTICS (FIRST TAB) -->
          <!-- =================================================================== -->
          <div v-if="activeTab === 'analytics'" class="p-3.5 sm:p-6 space-y-6 sm:space-y-8">
            <div class="pb-3 border-b-2 border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 class="font-serif text-xl text-black font-bold">Executive Performance & Revenue Intelligence</h3>
                <p class="text-xs text-black font-medium">Comprehensive atelier metrics across client purchases, salon trials, and inventory distribution.</p>
              </div>
              <span class="text-xs bg-[#d4af37]/20 text-black border border-[#d4af37] px-3.5 py-1 rounded-full font-mono font-bold self-start sm:self-auto">
                ● Live Real-Time Feed
              </span>
            </div>

            <!-- Detailed Revenue & Performance Metric Panels -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5">
              <!-- Total Revenue Box -->
              <div class="p-4 sm:p-6 bg-[#0c0c0e] text-[#fef08a] border-2 border-[#d4af37] rounded-sm space-y-3 shadow-md">
                <div class="flex items-center justify-between">
                  <span class="text-[10.5px] uppercase tracking-widest text-[#d4af37] font-extrabold">Cumulative Sales Revenue</span>
                  <span class="text-xl">💳</span>
                </div>
                <p class="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#fef08a]">₹{{ totalGrossRevenue.toLocaleString('en-IN') }}</p>
                <div class="pt-2 border-t border-[#d4af37]/30 flex items-center justify-between text-xs text-zinc-200 font-semibold">
                  <span>{{ cartStore.orders.length }} Placed Orders</span>
                  <span class="text-emerald-400 font-mono font-bold">✓ 100% Verified</span>
                </div>
              </div>

              <!-- Average Order Value (AOV) -->
              <div class="p-4 sm:p-6 bg-white border-2 border-zinc-300 rounded-sm space-y-3 shadow-xs">
                <div class="flex items-center justify-between">
                  <span class="text-[10.5px] uppercase tracking-widest text-black font-extrabold">Average Order Value (AOV)</span>
                  <span class="text-xl">📈</span>
                </div>
                <p class="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-black">₹{{ averageOrderValue.toLocaleString('en-IN') }}</p>
                <div class="pt-2 border-t border-zinc-200 flex items-center justify-between text-xs text-black font-semibold">
                  <span>Per client purchase ticket</span>
                  <span class="text-[#b8860b] font-bold">Haute Couture Tier</span>
                </div>
              </div>

              <!-- VIP Salon Conversion -->
              <div class="p-4 sm:p-6 bg-white border-2 border-zinc-300 rounded-sm space-y-3 shadow-xs">
                <div class="flex items-center justify-between">
                  <span class="text-[10.5px] uppercase tracking-widest text-black font-extrabold">VIP Salon Trials Confirmed</span>
                  <span class="text-xl">👑</span>
                </div>
                <p class="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-black">
                  {{ confirmedAppointmentsCount }} <span class="text-base sm:text-lg text-black font-semibold font-sans">/ {{ appointmentStore.appointments.length }} Bookings</span>
                </p>
                <div class="pt-2 border-t border-zinc-200 flex items-center justify-between text-xs text-black font-semibold">
                  <span>R.S. Puram Flagship Lounge</span>
                  <span class="text-emerald-800 font-bold">Active Trials</span>
                </div>
              </div>
            </div>

            <!-- Department Catalog Breakdown -->
            <div class="p-4 sm:p-6 bg-white border-2 border-zinc-300 rounded-sm space-y-4 shadow-xs">
              <div class="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h4 class="font-serif text-base sm:text-lg font-bold text-black">Haute Couture Department Catalog Distribution</h4>
                  <p class="text-xs text-black font-medium">Inventory count and valuation across all four boutique collections.</p>
                </div>
                <span class="text-xs font-bold text-black bg-zinc-100 px-3 py-1.5 rounded border border-zinc-300">
                  Total Valuation: ₹{{ totalInventoryValue.toLocaleString('en-IN') }}
                </span>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-2">
                <div class="p-3 sm:p-4 bg-zinc-50 border-2 border-zinc-300 rounded-xs space-y-1 hover:border-black transition-colors">
                  <span class="text-[11px] sm:text-xs uppercase tracking-wider text-black block font-bold">👗 Women's Couture</span>
                  <p class="font-serif text-xl sm:text-2xl font-extrabold text-black">{{ womenCount }} Pieces</p>
                  <p class="text-[10.5px] sm:text-xs text-black font-semibold">Sarees, Kurti Sets, Coord Sets</p>
                </div>
                <div class="p-3 sm:p-4 bg-zinc-50 border-2 border-zinc-300 rounded-xs space-y-1 hover:border-black transition-colors">
                  <span class="text-[11px] sm:text-xs uppercase tracking-wider text-black block font-bold">👔 Men's Bespoke</span>
                  <p class="font-serif text-xl sm:text-2xl font-extrabold text-black">{{ menCount }} Pieces</p>
                  <p class="text-[10.5px] sm:text-xs text-black font-semibold">Sherwanis, Kurtas, Bandhgalas</p>
                </div>
                <div class="p-3 sm:p-4 bg-zinc-50 border-2 border-zinc-300 rounded-xs space-y-1 hover:border-black transition-colors">
                  <span class="text-[11px] sm:text-xs uppercase tracking-wider text-black block font-bold">💍 Bridal Heritage</span>
                  <p class="font-serif text-xl sm:text-2xl font-extrabold text-black">{{ bridalCount }} Pieces</p>
                  <p class="text-[10.5px] sm:text-xs text-black font-semibold">Heirloom Lehengas & Sarees</p>
                </div>
                <div class="p-3 sm:p-4 bg-zinc-50 border-2 border-zinc-300 rounded-xs space-y-1 hover:border-black transition-colors">
                  <span class="text-[11px] sm:text-xs uppercase tracking-wider text-black block font-bold">✨ Fine Accessories</span>
                  <p class="font-serif text-xl sm:text-2xl font-extrabold text-black">{{ accessoriesCount }} Pieces</p>
                  <p class="text-[10.5px] sm:text-xs text-black font-semibold">Bags, Mojaris, Watches, Jewels</p>
                </div>
              </div>
            </div>
          </div>

          <!-- =================================================================== -->
          <!-- TAB 2: PRODUCT CATALOG MANAGER (SECOND TAB) -->
          <!-- =================================================================== -->
          <div v-if="activeTab === 'products'" class="p-3.5 sm:p-6 space-y-4 sm:space-y-6">
            
            <!-- Search, Category & Subcategory Filter Toolbar -->
            <div class="space-y-3 pb-4 border-b-2 border-zinc-200">
              <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
                <div class="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
                  <!-- Search input -->
                  <div class="relative w-full sm:w-72">
                    <input 
                      v-model="productSearch"
                      type="text" 
                      placeholder="Search creation, fabric, ID, tag..."
                      class="w-full pl-8 pr-8 py-2 border-2 border-zinc-300 rounded-xs text-xs focus:outline-none focus:border-black bg-white text-black font-semibold placeholder:text-zinc-500"
                    />
                    <span class="absolute left-2.5 top-2.5 text-black text-xs font-bold">🔍</span>
                    <button 
                      v-if="productSearch" 
                      @click="productSearch = ''" 
                      class="absolute right-2.5 top-2 text-black hover:text-red-700 text-xs font-extrabold cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <!-- Category Filter Buttons -->
                  <div class="flex gap-1.5 flex-wrap">
                    <button 
                      v-for="cat in ['all', 'women', 'men', 'bridal', 'accessories']"
                      :key="cat"
                      @click="setCategoryFilter(cat)"
                      :class="['px-3 py-1.5 rounded-xs border-2 text-xs uppercase tracking-wider cursor-pointer transition-all font-bold', filterCat === cat ? 'bg-black text-[#fef08a] border-black' : 'bg-white border-zinc-300 text-black hover:border-black']"
                    >
                      {{ cat }}
                    </button>
                  </div>
                </div>

                <!-- Restore Defaults & Counter -->
                <div class="flex items-center justify-between sm:justify-end gap-3 pt-1 lg:pt-0">
                  <span class="text-xs text-black font-bold">
                    Showing {{ filteredProducts.length }} of {{ productStore.products.length }} creations
                  </span>
                  <button 
                    @click="confirmResetCatalog"
                    class="px-3 py-1.5 border-2 border-zinc-300 text-black hover:text-red-700 hover:border-red-600 text-xs uppercase tracking-wider rounded-xs transition-all cursor-pointer font-bold"
                    title="Restore default 56 creations"
                  >
                    🔄 Restore Defaults
                  </button>
                </div>
              </div>

              <!-- Contextual Subcategory Filter Pills (shown when category selected) -->
              <div v-if="filterCat !== 'all' && availableSubcategoriesForFilter.length > 0" class="flex items-center gap-1.5 sm:gap-2 pt-2 text-xs flex-wrap">
                <span class="text-[11px] sm:text-xs uppercase tracking-wider text-black font-bold">Subcategory:</span>
                <button 
                  @click="filterSubcat = 'all'"
                  :class="['px-2.5 py-1 rounded-xs border-2 text-xs transition-all cursor-pointer font-bold', filterSubcat === 'all' ? 'bg-[#b8860b] text-black border-[#b8860b]' : 'bg-zinc-100 text-black border-zinc-300 hover:bg-zinc-200']"
                >
                  All Types
                </button>
                <button 
                  v-for="sub in availableSubcategoriesForFilter"
                  :key="sub.value"
                  @click="filterSubcat = sub.value"
                  :class="['px-2.5 py-1 rounded-xs border-2 text-xs transition-all cursor-pointer font-bold', filterSubcat === sub.value ? 'bg-[#b8860b] text-black border-[#b8860b]' : 'bg-zinc-100 text-black border-zinc-300 hover:bg-zinc-200']"
                >
                  {{ sub.label }}
                </button>
              </div>
            </div>

            <!-- Product Catalog Table (Luxury High-End Layout) -->
            <div class="overflow-x-auto border border-zinc-200 rounded-sm bg-white shadow-2xs">
              <table class="w-full text-left text-xs text-black border-collapse">
                <thead class="bg-zinc-50 text-[10.5px] uppercase tracking-wider text-black font-extrabold border-b border-zinc-200">
                  <tr>
                    <th class="py-3.5 px-4 w-[38%] min-w-[260px]">Creation & Details</th>
                    <th class="py-3.5 px-4 w-[18%] min-w-[140px]">Category & Silhouette</th>
                    <th class="py-3.5 px-4 w-[14%] min-w-[100px]">Price</th>
                    <th class="py-3.5 px-4 w-[18%] min-w-[140px]">Artisanal Fabric</th>
                    <th class="py-3.5 px-4 w-[12%] min-w-[180px] text-right pr-5">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-zinc-100 bg-white">
                  <tr 
                    v-for="item in filteredProducts" 
                    :key="item.id" 
                    class="hover:bg-amber-50/30 transition-colors group"
                  >
                    <!-- Creation Column: Image + Name + ID -->
                    <td class="py-3 px-4">
                      <div class="flex items-center gap-3.5">
                        <div class="relative flex-shrink-0">
                          <img 
                            :src="item.image || (item.images && item.images[0]) || '/images/sarees/saree-1-banarasi.jpg'" 
                            :alt="item.name" 
                            class="w-12 h-15 object-cover rounded-xs border border-zinc-200 shadow-2xs group-hover:scale-105 transition-transform" 
                          />
                          <span 
                            v-if="item.images && item.images.length > 1"
                            class="absolute bottom-1 right-1 bg-black/85 text-[#fef08a] text-[8px] px-1 py-0.2 rounded-2xs font-mono font-bold shadow-xs"
                            title="Multiple photos available"
                          >
                            📸{{ item.images.length }}
                          </span>
                        </div>
                        <div class="min-w-0 pr-2">
                          <span class="font-serif font-bold text-black block text-[13px] leading-snug group-hover:text-[#b8860b] transition-colors truncate">
                            {{ item.name }}
                          </span>
                          <div class="flex items-center gap-2 mt-0.5">
                            <span class="text-[10px] text-zinc-500 font-mono">ID: {{ item.id }}</span>
                            <span v-if="item.badge" class="text-[9.5px] font-semibold text-[#b8860b] bg-[#d4af37]/10 px-1.5 py-0.2 rounded-2xs">
                              {{ item.badge }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <!-- Category & Silhouette -->
                    <td class="py-3 px-4 whitespace-nowrap">
                      <div class="space-y-0.5">
                        <span class="text-[10px] uppercase tracking-wider font-extrabold text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded-2xs border border-zinc-200 inline-block">
                          {{ item.category }}
                        </span>
                        <p class="text-xs font-bold text-black capitalize">
                          {{ formatSubcategoryName(item.subcategory) }}
                        </p>
                      </div>
                    </td>

                    <!-- Price -->
                    <td class="py-3 px-4 whitespace-nowrap">
                      <span class="font-serif font-bold text-black text-sm block">
                        ₹{{ (Number(item.price) || 0).toLocaleString('en-IN') }}
                      </span>
                      <span v-if="item.originalPrice && item.originalPrice > item.price" class="text-zinc-400 line-through text-[10px] block font-medium">
                        ₹{{ Number(item.originalPrice).toLocaleString('en-IN') }}
                      </span>
                    </td>

                    <!-- Fabric -->
                    <td class="py-3 px-4">
                      <p class="text-xs text-zinc-800 font-medium line-clamp-2 max-w-[200px]" :title="item.fabric">
                        {{ item.fabric || 'Pure Handloom Silk' }}
                      </p>
                    </td>

                    <!-- Action buttons (Completely visible & comfortable) -->
                    <td class="py-3 px-4 text-right whitespace-nowrap pr-5">
                      <div class="inline-flex items-center gap-1.5">
                        <button 
                          @click="openEditProductModal(item)"
                          class="px-2.5 py-1.5 bg-black text-[#fef08a] hover:bg-[#b8860b] hover:text-black rounded-xs text-[11px] font-bold tracking-wider transition-all cursor-pointer shadow-xs inline-flex items-center gap-1"
                          title="Edit creation"
                        >
                          <span>✏️</span>
                          <span>Edit</span>
                        </button>
                        
                        <button 
                          @click="duplicateProduct(item)"
                          class="px-2 py-1.5 bg-zinc-100 text-black hover:bg-zinc-200 rounded-xs text-[11px] font-bold transition-all cursor-pointer border border-zinc-300"
                          title="Duplicate creation"
                        >
                          📑
                        </button>
                        
                        <button 
                          @click="handleDeleteProduct(item)"
                          class="px-2 py-1.5 bg-red-50 text-red-700 hover:bg-red-700 hover:text-white rounded-xs text-[11px] font-bold transition-all cursor-pointer border border-red-200"
                          title="Delete from boutique"
                        >
                          🗑️
                        </button>

                        <a 
                          :href="`/product/${item.id}`" 
                          target="_blank" 
                          class="p-1.5 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-xs text-xs font-bold transition-colors inline-block"
                          title="Preview on live storefront"
                        >
                          ↗
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Empty Search State -->
            <div v-if="filteredProducts.length === 0" class="py-16 text-center text-black text-xs bg-zinc-50 rounded border-2 border-zinc-300">
              <div class="text-3xl mb-2">🔍</div>
              <p class="font-serif text-sm text-black font-bold">No creations match your search criteria.</p>
              <button @click="resetFilters" class="mt-3 px-3.5 py-1.5 bg-black text-[#fef08a] text-xs rounded-xs font-bold">
                Clear Filters
              </button>
            </div>
          </div>

          <!-- =================================================================== -->
          <!-- TAB 3: CLIENT ORDERS & LOGISTICS -->
          <!-- =================================================================== -->
          <div v-if="activeTab === 'orders'" class="p-3.5 sm:p-6 space-y-4 sm:space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-zinc-200">
              <div>
                <h3 class="font-serif text-xl text-black font-bold">Live Customer Orders & Logistics</h3>
                <p class="text-xs text-black font-medium">Monitor real-time customer purchases, update craftsmanship progress, and dispatch white-glove delivery.</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold bg-[#b8860b]/20 text-black border border-[#b8860b] px-3.5 py-1 rounded-full self-start sm:self-auto">
                  {{ cartStore.orders.length }} Registered Order(s)
                </span>
              </div>
            </div>

            <!-- Empty state for orders -->
            <div v-if="cartStore.orders.length === 0" class="py-16 text-center bg-zinc-50 rounded border-2 border-zinc-300">
              <div class="text-3xl mb-2">📜</div>
              <p class="font-serif text-base text-black font-bold">No Customer Orders Placed Yet</p>
              <p class="text-xs text-black mt-1 max-w-sm mx-auto font-medium">
                When customers complete bag checkout on the storefront, their order details and live WhatsApp contact actions will appear here.
              </p>
            </div>

            <!-- Orders Table / Cards -->
            <div v-else class="space-y-4">
              <div 
                v-for="order in cartStore.orders" 
                :key="order.orderId"
                class="border-2 border-zinc-300 rounded-sm p-4 sm:p-5 bg-white space-y-4 hover:border-black transition-all shadow-xs"
              >
                <!-- Order Header Row -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-zinc-200 pb-3">
                  <div class="flex items-center gap-3">
                    <span class="font-serif font-extrabold text-sm text-black tracking-wider">{{ order.orderId }}</span>
                    <span class="text-xs text-black font-semibold">
                      {{ new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}
                    </span>
                  </div>

                  <!-- Status Selector -->
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-black font-bold uppercase tracking-wider">Status:</span>
                    <select 
                      v-model="order.status"
                      @change="handleOrderStatusChange(order)"
                      class="px-3 py-1 text-xs border-2 border-zinc-400 rounded bg-white font-bold text-black focus:border-black"
                    >
                      <option value="In Atelier Crafting">✦ In Atelier Crafting</option>
                      <option value="Quality Inspection">✦ Quality & Zari Inspection</option>
                      <option value="Out for Delivery">✦ Out for White-Glove Delivery</option>
                      <option value="Delivered">✓ Delivered to Client</option>
                      <option value="Cancelled">✕ Cancelled / Returned</option>
                    </select>
                  </div>
                </div>

                <!-- Content Row: Items & Address -->
                <div class="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                  <!-- Items list (7 cols) -->
                  <div class="md:col-span-7 space-y-2">
                    <span class="text-xs uppercase tracking-wider text-black font-extrabold block">Pieces in Order ({{ order.items?.length || 0 }})</span>
                    <div class="space-y-2 max-h-44 overflow-y-auto pr-1">
                      <div 
                        v-for="piece in order.items" 
                        :key="piece.id + '-' + piece.size"
                        class="flex items-center justify-between bg-zinc-50 p-2.5 rounded border border-zinc-300"
                      >
                        <div class="flex items-center gap-2.5">
                          <img :src="piece.image" :alt="piece.name" class="w-10 h-12 object-cover rounded-xs border border-zinc-300" />
                          <div>
                            <p class="font-bold text-black truncate max-w-[200px] sm:max-w-[220px]">{{ piece.name }}</p>
                            <span class="text-[11px] text-black font-semibold">Size: {{ piece.size }} · Qty: {{ piece.quantity }}</span>
                          </div>
                        </div>
                        <span class="font-serif font-extrabold text-black text-sm">₹{{ (piece.price * piece.quantity).toLocaleString('en-IN') }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Destination Address (5 cols) -->
                  <div class="md:col-span-5 bg-zinc-50 p-3.5 rounded border border-zinc-300 space-y-1.5">
                    <span class="text-xs uppercase tracking-wider text-black font-extrabold block">📍 Delivery Destination</span>
                    <p class="font-extrabold text-black">{{ order.address?.firstName }} {{ order.address?.lastName }}</p>
                    <p class="text-black font-medium">{{ order.address?.street }}, {{ order.address?.locality }}</p>
                    <p class="text-black font-medium">{{ order.address?.city }}, {{ order.address?.state }} – {{ order.address?.pincode }}</p>
                    <p class="text-xs text-black pt-1 font-mono font-bold">📱 +91 {{ order.address?.phone }} · ✉️ {{ order.address?.email }}</p>
                    <p v-if="order.address?.notes" class="text-black font-semibold italic text-xs pt-1">Notes: "{{ order.address?.notes }}"</p>
                  </div>
                </div>

                <!-- Order Footer & WhatsApp Direct Action -->
                <div class="pt-3 border-t-2 border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div class="flex items-center gap-5">
                    <div>
                      <span class="text-[10.5px] text-black font-bold uppercase tracking-wider block">Payment Method</span>
                      <span class="font-extrabold text-black capitalize">{{ order.paymentMethod || 'Atelier Delivery' }}</span>
                    </div>
                    <div>
                      <span class="text-[10.5px] text-black font-bold uppercase tracking-wider block">Total Amount</span>
                      <span class="font-serif text-lg font-extrabold text-black">₹{{ order.total?.toLocaleString('en-IN') }}</span>
                    </div>
                  </div>

                  <div class="flex items-center gap-2">
                    <a 
                      :href="`https://wa.me/91${order.address?.phone}?text=Hello%20${order.address?.firstName},%20this%20is%20Lecotrus%20Couture%20Atelier%20Coimbatore%20regarding%20your%20order%20${order.orderId}.`"
                      target="_blank"
                      class="w-full sm:w-auto px-4 py-2 bg-black text-[#fef08a] hover:bg-[#b8860b] hover:text-black rounded-xs text-xs font-bold tracking-wider transition-all inline-flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span>💬 WhatsApp Client</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- =================================================================== -->
          <!-- TAB 4: CLIENT BESPOKE MEASUREMENTS (LECOTRUS PAD REPLICA) -->
          <!-- =================================================================== -->
          <div v-if="activeTab === 'measurements'" class="p-3.5 sm:p-6 space-y-5 sm:space-y-6">
            <!-- Header Banner -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-zinc-200">
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 bg-[#8B0000] text-[#fef08a] text-[10px] font-bold uppercase tracking-widest rounded-2xs">LECOTRUS® ATELIER</span>
                  <span class="text-xs text-[#b8860b] font-bold tracking-wider uppercase">Coimbatore Flagship Fitting Registry</span>
                </div>
                <h3 class="font-serif text-xl sm:text-2xl text-black font-bold mt-1">Client Information & Measurement Sheets</h3>
                <p class="text-xs text-black font-medium">Digital bespoke measurement slips with exact 24 tailoring anatomical points & custom fitting specs.</p>
              </div>

              <div class="flex items-center gap-2 flex-wrap">
                <button 
                  @click="openAddMeasurementModal"
                  class="px-4 py-2.5 bg-[#8B0000] hover:bg-black text-[#fef08a] font-extrabold text-xs uppercase tracking-widest rounded-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer border border-[#d4af37]"
                >
                  <span>📏 + New Measurement Sheet</span>
                </button>
              </div>
            </div>

            <!-- Metric Badges Row -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              <div class="bg-zinc-50 border-2 border-zinc-200 p-3 rounded-xs">
                <span class="text-[10px] uppercase tracking-wider text-black font-bold block">Total Clients</span>
                <span class="font-serif text-xl font-extrabold text-black">{{ measurementStore.measurements.length }}</span>
              </div>
              <div class="bg-amber-50/60 border-2 border-amber-300 p-3 rounded-xs">
                <span class="text-[10px] uppercase tracking-wider text-amber-950 font-bold block">In Cutting / Embroidery</span>
                <span class="font-serif text-xl font-extrabold text-amber-950">
                  {{ measurementStore.measurements.filter(m => m.status === 'In Cutting' || m.status === 'In Embroidery').length }}
                </span>
              </div>
              <div class="bg-blue-50/60 border-2 border-blue-300 p-3 rounded-xs">
                <span class="text-[10px] uppercase tracking-wider text-blue-950 font-bold block">In Stitching</span>
                <span class="font-serif text-xl font-extrabold text-blue-950">
                  {{ measurementStore.measurements.filter(m => m.status === 'In Stitching').length }}
                </span>
              </div>
              <div class="bg-emerald-50/60 border-2 border-emerald-300 p-3 rounded-xs">
                <span class="text-[10px] uppercase tracking-wider text-emerald-950 font-bold block">Ready for Trial</span>
                <span class="font-serif text-xl font-extrabold text-emerald-950">
                  {{ measurementStore.measurements.filter(m => m.status === 'Ready for Trial').length }}
                </span>
              </div>
            </div>

            <!-- Search and Filter Bar -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 bg-zinc-50 border-2 border-zinc-300 rounded-xs">
              <div class="relative flex-1 max-w-md">
                <input 
                  v-model="measurementSearch" 
                  type="text" 
                  placeholder="Search client, phone, Order No (e.g. L-101), garment..."
                  class="w-full pl-8 pr-8 py-2 text-xs border-2 border-zinc-300 rounded-xs bg-white text-black font-bold focus:outline-none focus:border-black"
                />
                <span class="absolute left-2.5 top-2.5 text-black text-xs font-bold">🔍</span>
                <button 
                  v-if="measurementSearch" 
                  @click="measurementSearch = ''" 
                  class="absolute right-2.5 top-2 text-black hover:text-red-700 font-extrabold text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <!-- Garment Type Quick Filters -->
              <div class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                <button 
                  v-for="gFilter in [
                    { label: 'All Garments', val: 'all' },
                    { label: 'Blouse', val: 'blouse' },
                    { label: 'Lehenga', val: 'lehenga' },
                    { label: 'Anarkali', val: 'anarkali' },
                    { label: 'Kurti', val: 'kurti' }
                  ]"
                  :key="gFilter.val"
                  @click="measurementGarmentFilter = gFilter.val"
                  class="px-2.5 py-1.5 rounded-xs text-[10.5px] uppercase tracking-wider font-bold whitespace-nowrap transition-colors cursor-pointer border"
                  :class="measurementGarmentFilter === gFilter.val 
                    ? 'bg-black text-[#fef08a] border-black' 
                    : 'bg-white text-black border-zinc-300 hover:border-black'"
                >
                  {{ gFilter.label }}
                </button>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredMeasurements.length === 0" class="p-8 text-center bg-zinc-50 border-2 border-dashed border-zinc-300 rounded-sm">
              <span class="text-3xl block mb-2">📏</span>
              <h4 class="font-serif text-lg font-bold text-black">No Measurement Sheets Found</h4>
              <p class="text-xs text-zinc-600 mt-1">Try resetting search filters or record a new client measurement sheet.</p>
              <button 
                @click="measurementSearch = ''; measurementGarmentFilter = 'all'" 
                class="mt-3 px-4 py-1.5 bg-black text-[#fef08a] text-xs font-bold rounded-xs cursor-pointer"
              >
                Reset Filters
              </button>
            </div>

            <!-- Measurement Cards List (Clean, Simple, Aligned) -->
            <div v-else class="space-y-3">
              <div 
                v-for="item in filteredMeasurements" 
                :key="item.id"
                class="bg-white border-2 border-zinc-300 rounded-sm hover:border-black transition-all shadow-xs p-3.5 sm:p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4"
              >
                <!-- Left Side: Client & Order Summary -->
                <div class="flex items-start sm:items-center gap-3.5 min-w-0">
                  <div class="w-10 h-10 rounded-full bg-[#8B0000] text-[#fef08a] flex items-center justify-center font-serif text-base font-bold flex-shrink-0 shadow-xs">
                    ⚜️
                  </div>
                  <div class="min-w-0 space-y-1">
                    <div class="flex items-center gap-2 flex-wrap">
                      <h4 class="font-serif text-base sm:text-lg font-bold text-black">{{ item.clientName }}</h4>
                      <span class="px-2 py-0.5 bg-[#8B0000]/10 border border-[#8B0000] text-[#8B0000] text-[10.5px] font-mono font-extrabold rounded-2xs whitespace-nowrap">
                        Order No: {{ item.orderNo }}
                      </span>
                      <span class="px-2.5 py-0.5 bg-zinc-100 text-black text-[10.5px] font-bold rounded-2xs border border-zinc-300 whitespace-nowrap">
                        {{ item.garmentType }}
                      </span>
                    </div>
                    
                    <div class="flex items-center gap-3 sm:gap-4 text-xs text-black font-semibold flex-wrap">
                      <span class="font-mono">📱 {{ item.phone || '—' }}</span>
                      <span v-if="item.email" class="hidden sm:inline">✉️ {{ item.email }}</span>
                      <span>📅 Date: {{ item.date }}</span>
                      <span v-if="item.dueDate" class="text-[#8B0000] font-bold">🎯 Due: {{ item.dueDate }}</span>
                    </div>

                    <p v-if="item.notes" class="text-[11px] text-zinc-600 font-medium italic truncate max-w-xl pt-0.5">
                      Notes: "{{ item.notes }}"
                    </p>
                  </div>
                </div>

                <!-- Right Side: Status Selector & Aligned Action Buttons (Single Row) -->
                <div class="flex items-center gap-2 flex-wrap sm:flex-nowrap flex-shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-zinc-200">
                  <select 
                    v-model="item.status"
                    @change="handleMeasurementStatusChange(item)"
                    class="px-2.5 py-1.5 text-xs font-bold border-2 rounded-xs bg-white text-black cursor-pointer"
                    :class="{
                      'border-amber-400 bg-amber-50 text-amber-950': item.status === 'In Cutting' || item.status === 'In Embroidery',
                      'border-blue-400 bg-blue-50 text-blue-950': item.status === 'In Stitching',
                      'border-emerald-500 bg-emerald-50 text-emerald-950': item.status === 'Ready for Trial' || item.status === 'Completed',
                      'border-zinc-300': item.status === 'Pending'
                    }"
                  >
                    <option value="In Cutting">✂️ In Cutting</option>
                    <option value="In Embroidery">🪡 In Embroidery</option>
                    <option value="In Stitching">🧵 In Stitching</option>
                    <option value="Ready for Trial">✨ Ready for Trial</option>
                    <option value="Completed">★ Completed</option>
                    <option value="Delivered">📦 Delivered</option>
                  </select>

                  <button 
                    @click="openPrintSlipModal(item)"
                    class="px-3 py-1.5 bg-[#8B0000] hover:bg-black text-[#fef08a] text-xs font-extrabold rounded-xs transition-colors cursor-pointer border border-[#d4af37] flex items-center gap-1 shadow-2xs whitespace-nowrap"
                    title="View & Print Official Fitting Slip"
                  >
                    <span>📄 Slip</span>
                  </button>

                  <a 
                    :href="getWhatsAppMeasurementLink(item)"
                    target="_blank"
                    class="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xs transition-colors inline-flex items-center gap-1 shadow-2xs whitespace-nowrap"
                    title="Send Measurement Slip to Client WhatsApp"
                  >
                    <span>💬 WhatsApp</span>
                  </a>

                  <button 
                    @click="openEditMeasurementModal(item)"
                    class="px-3 py-1.5 bg-black hover:bg-[#b8860b] text-white hover:text-black text-xs font-bold rounded-xs transition-colors cursor-pointer shadow-xs whitespace-nowrap flex items-center gap-1"
                    title="Edit 24-Point Measurements & Atelier Specs"
                  >
                    <span>✏️ Edit</span>
                  </button>

                  <button 
                    @click="handleDeleteMeasurement(item)"
                    class="p-1.5 bg-red-100 hover:bg-red-800 hover:text-white text-red-800 text-xs font-bold rounded-xs transition-colors cursor-pointer border border-red-300 flex items-center justify-center w-8 h-8 flex-shrink-0"
                    title="Delete Measurement Sheet"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- =================================================================== -->
          <!-- TAB 5: SALON APPOINTMENTS & CONSULTATIONS -->
          <!-- =================================================================== -->
          <div v-if="activeTab === 'appointments'" class="p-3.5 sm:p-6 space-y-4 sm:space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b-2 border-zinc-200">
              <div>
                <h3 class="font-serif text-xl text-black font-bold">Flagship Salon Consultations</h3>
                <p class="text-xs text-black font-medium">Client trials and bespoke measurement appointments at Venkatachalam Chetty St, R.S. Puram.</p>
              </div>
              <span class="text-xs font-bold bg-[#b8860b]/20 text-black border border-[#b8860b] px-3.5 py-1 rounded-full self-start sm:self-auto">
                {{ appointmentStore.appointments.length }} Active Appointments
              </span>
            </div>

            <!-- Appointments Table -->
            <div class="overflow-x-auto border border-zinc-300 rounded-xs">
              <table class="w-full text-left text-xs text-black">
                <thead class="bg-zinc-100 text-[11px] uppercase tracking-wider text-black font-extrabold border-b-2 border-zinc-300">
                  <tr>
                    <th class="p-3.5 min-w-[140px]">Client Name</th>
                    <th class="p-3.5 min-w-[160px]">Contact & WhatsApp</th>
                    <th class="p-3.5 min-w-[180px]">Occasion / Service</th>
                    <th class="p-3.5 min-w-[140px]">Date & Slot</th>
                    <th class="p-3.5 min-w-[130px]">Status</th>
                    <th class="p-3.5 min-w-[140px]">Special Notes</th>
                    <th class="p-3.5 text-right min-w-[160px]">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-zinc-200 bg-white">
                  <tr 
                    v-for="apt in appointmentStore.appointments" 
                    :key="apt.id" 
                    class="hover:bg-amber-50/50"
                  >
                    <td class="p-3.5 font-serif font-bold text-black">{{ apt.name }}</td>
                    <td class="p-3.5">
                      <p class="font-mono font-bold text-black">{{ apt.phone }}</p>
                      <p class="text-[11px] text-black font-medium">{{ apt.email }}</p>
                    </td>
                    <td class="p-3.5 font-bold text-black">{{ apt.service }}</td>
                    <td class="p-3.5 font-mono text-xs text-black font-bold">{{ apt.date }} · {{ apt.time }}</td>
                    <td class="p-3.5">
                      <select 
                        v-model="apt.status"
                        @change="handleAppointmentStatusChange(apt)"
                        class="px-2.5 py-1 text-xs border-2 border-zinc-400 rounded font-bold bg-white text-black"
                      >
                        <option value="Confirmed">✓ Confirmed</option>
                        <option value="Pending">⏳ Pending</option>
                        <option value="Completed">★ Completed</option>
                        <option value="Cancelled">✕ Cancelled</option>
                      </select>
                    </td>
                    <td class="p-3.5 max-w-xs text-xs text-black font-medium truncate" :title="apt.notes">
                      {{ apt.notes || '—' }}
                    </td>
                    <td class="p-3.5 text-right whitespace-nowrap space-x-2">
                      <a 
                        :href="`https://wa.me/${apt.phone ? apt.phone.replace(/[^0-9]/g, '') : ''}?text=Hello%20${apt.name},%20confirming%20your%20bespoke%20appointment%20at%20Lecotrus%20Coimbatore%20on%20${apt.date}%20at%20${apt.time}.`"
                        target="_blank"
                        class="px-3 py-1 bg-black text-[#fef08a] hover:bg-[#b8860b] hover:text-black rounded-xs text-xs font-bold transition-all inline-block shadow-xs"
                      >
                        💬 WhatsApp
                      </a>
                      <button 
                        @click="handleDeleteAppointment(apt)"
                        class="px-2.5 py-1 bg-red-100 text-red-800 hover:bg-red-800 hover:text-white rounded-xs text-xs font-bold transition-all cursor-pointer border border-red-300"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </main>

      <!-- =================================================================== -->
      <!-- MODAL: ADD / EDIT PRODUCT (DYNAMIC DRESS SILHOUETTES & 5 IMAGES) -->
      <!-- =================================================================== -->
      <div v-if="isProductModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="fixed inset-0 bg-black/80 backdrop-blur-xs" @click="closeProductModal"></div>

        <div class="min-h-screen px-3 sm:px-4 flex items-center justify-center py-4">
          <div class="inline-block w-full max-w-3xl max-h-[92vh] overflow-y-auto p-4 sm:p-8 my-2 sm:my-8 text-left align-middle bg-white border-2 border-zinc-400 shadow-2xl relative text-black rounded-sm">
            
            <button 
              @click="closeProductModal"
              class="absolute top-4 right-4 text-black hover:text-red-700 font-extrabold text-xl cursor-pointer"
            >
              ✕
            </button>

            <div class="border-b-2 border-zinc-200 pb-4 mb-6">
              <span class="text-[10.5px] uppercase tracking-[0.3em] text-[#b8860b] font-bold">Atelier Product Editor</span>
              <h3 class="font-serif text-2xl text-black font-bold mt-0.5">
                {{ editingProductId ? 'Edit Creation Details' : 'Add New Atelier Creation' }}
              </h3>
              <p class="text-xs text-black font-medium mt-1">
                Configure category, dress silhouette type, pricing, artisanal details, and up to 5 high-resolution images.
              </p>
            </div>

            <form @submit.prevent="saveProduct" class="space-y-5 text-xs">
              
              <!-- 1. Category & Subcategory Selection -->
              <div class="p-4 bg-zinc-50 border-2 border-zinc-300 rounded-sm space-y-3">
                <div class="flex items-center justify-between">
                  <label class="block uppercase tracking-wider text-black font-extrabold">1. Collection Category & Dress Silhouette *</label>
                  <span class="text-xs text-black font-bold">Distinct Categorization</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <!-- Primary Category -->
                  <div>
                    <label class="block uppercase tracking-wider text-black font-bold mb-1.5">Collection Category *</label>
                    <select 
                      v-model="productForm.category" 
                      @change="onCategoryChange"
                      required
                      class="w-full px-3.5 py-2.5 border-2 border-zinc-400 rounded-xs focus:outline-none focus:border-black bg-white text-xs font-bold text-black"
                    >
                      <option value="women">👗 Women's Haute Couture</option>
                      <option value="men">👔 Men's Master Bespoke</option>
                      <option value="bridal">💍 Heritage Bridal Suite</option>
                      <option value="accessories">✨ Fine Accessories & Jewels</option>
                    </select>
                  </div>

                  <!-- Dependent Subcategory Dropdown -->
                  <div>
                    <label class="block uppercase tracking-wider text-black font-bold mb-1.5">
                      Dress / Silhouette Type (Subcategory) *
                    </label>
                    <select 
                      v-model="productForm.subcategory" 
                      required
                      class="w-full px-3.5 py-2.5 border-2 border-zinc-400 rounded-xs focus:outline-none focus:border-black bg-white text-xs font-extrabold text-black"
                    >
                      <option 
                        v-for="sub in currentSubcategories" 
                        :key="sub.value" 
                        :value="sub.value"
                      >
                        {{ sub.label }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- 2. Creation Title & Pricing -->
              <div class="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <!-- Name -->
                <div class="sm:col-span-6">
                  <label class="block uppercase tracking-wider text-black font-bold mb-1.5">Creation Title / Name *</label>
                  <input 
                    v-model="productForm.name" 
                    type="text" 
                    required
                    placeholder="e.g. Royal Emerald Zardozi Silk Saree"
                    class="w-full px-3.5 py-2.5 border-2 border-zinc-300 rounded-xs focus:outline-none focus:border-black bg-white text-black font-bold"
                  />
                </div>

                <!-- Price -->
                <div class="sm:col-span-3">
                  <label class="block uppercase tracking-wider text-black font-bold mb-1.5">Price (INR) *</label>
                  <input 
                    v-model="productForm.price" 
                    type="number" 
                    required
                    placeholder="12999"
                    class="w-full px-3.5 py-2.5 border-2 border-zinc-300 rounded-xs focus:outline-none focus:border-black bg-white font-mono font-bold text-black"
                  />
                </div>

                <!-- Original Price -->
                <div class="sm:col-span-3">
                  <label class="block uppercase tracking-wider text-black font-bold mb-1.5">Original Price (INR)</label>
                  <input 
                    v-model="productForm.originalPrice" 
                    type="number" 
                    placeholder="24999"
                    class="w-full px-3.5 py-2.5 border-2 border-zinc-300 rounded-xs focus:outline-none focus:border-black bg-white font-mono font-bold text-black"
                  />
                </div>
              </div>

              <!-- 3. Real 5-Image File Upload & Visual Manager -->
              <div class="p-4 bg-zinc-50 border-2 border-zinc-300 rounded-sm space-y-3">
                <div class="flex items-center justify-between">
                  <div>
                    <label class="block uppercase tracking-wider text-black font-extrabold">2. Creation Gallery Photos (Upload up to 5 Images) *</label>
                    <p class="text-xs text-black font-medium">Upload image files directly from your computer (Cover, Angles, Close-ups).</p>
                  </div>
                  <span class="text-xs font-extrabold text-black bg-[#b8860b]/20 border border-[#b8860b] px-2.5 py-1 rounded">
                    {{ productForm.images.length }} / 5 Uploaded
                  </span>
                </div>

                <!-- File Upload Dropzone -->
                <div class="border-2 border-dashed border-zinc-400 hover:border-black rounded-sm p-2.5 sm:p-4 text-center bg-white transition-colors cursor-pointer relative">
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    @change="handleFileUpload" 
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    :disabled="productForm.images.length >= 5"
                  />
                  <div class="space-y-0.5 sm:space-y-1 pointer-events-none">
                    <div class="text-xl sm:text-2xl">📸</div>
                    <p class="text-[11px] sm:text-xs font-extrabold text-black">
                      Click or Drag & Drop Image Files Here
                    </p>
                    <p class="text-[9.5px] sm:text-xs text-zinc-600 font-medium">
                      JPG, PNG, WEBP · Up to 5 photos
                    </p>
                  </div>
                </div>

                <!-- 5 Preview Image Slots Grid (Compact Single Row on Mobile) -->
                <div class="grid grid-cols-5 gap-1.5 sm:gap-3 pt-1">
                  <div 
                    v-for="(slotNum, idx) in 5" 
                    :key="idx"
                    class="aspect-[3/4] border sm:border-2 rounded-2xs sm:rounded-xs relative overflow-hidden flex flex-col items-center justify-center text-center p-0.5 sm:p-1 bg-white shadow-2xs"
                    :class="productForm.images[idx] ? 'border-black ring-1 ring-black' : 'border-dashed border-zinc-400 bg-zinc-100'"
                  >
                    <!-- If image exists in slot -->
                    <template v-if="productForm.images[idx]">
                      <img :src="productForm.images[idx]" alt="Slot preview" class="w-full h-full object-cover rounded-3xs" />
                      
                      <!-- Cover badge for Slot 1 -->
                      <span 
                        v-if="idx === 0" 
                        class="absolute top-0.5 left-0.5 bg-black/90 text-[#fef08a] text-[6.5px] sm:text-[9px] uppercase font-extrabold px-1 py-0.2 rounded-3xs shadow-xs"
                      >
                        ★ Cover
                      </span>

                      <!-- Remove Button -->
                      <button 
                        type="button" 
                        @click="removeImageSlot(idx)"
                        class="absolute top-0.5 right-0.5 w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-red-700 text-white text-[7.5px] sm:text-[10px] font-bold flex items-center justify-center hover:bg-red-900 shadow-md cursor-pointer"
                        title="Remove image"
                      >
                        ✕
                      </button>

                      <!-- Make Cover action if not slot 0 -->
                      <button 
                        v-if="idx !== 0"
                        type="button"
                        @click="makeCoverImage(idx)"
                        class="absolute bottom-0.5 inset-x-0.5 py-0.2 bg-black/90 text-[#fef08a] text-[6.5px] sm:text-[9px] uppercase tracking-wider font-bold rounded-3xs shadow-xs cursor-pointer truncate"
                      >
                        Set Cover
                      </button>
                    </template>

                    <!-- Empty Slot Placeholder -->
                    <template v-else>
                      <span class="text-zinc-600 text-[8px] sm:text-xs font-mono font-bold">#{{ idx + 1 }}</span>
                      <span class="text-[7px] sm:text-[11px] text-zinc-500 font-medium leading-none mt-0.5">{{ idx === 0 ? 'Cover' : 'Photo ' + (idx + 1) }}</span>
                    </template>
                  </div>
                </div>
              </div>

              <!-- 4. Fabric & Artisanal Details -->
              <div>
                <label class="block uppercase tracking-wider text-black font-bold mb-1.5">Fabric & Generational Embroidery Details *</label>
                <input 
                  v-model="productForm.fabric" 
                  type="text" 
                  required
                  placeholder="e.g. Pure Handloom Katan Silk with 24K Gold Zari & Hand-beaten Mukaish"
                  class="w-full px-3.5 py-2.5 border-2 border-zinc-300 rounded-xs focus:outline-none focus:border-black bg-white text-black font-semibold"
                />
              </div>

              <!-- 5. Badge & Tag Labels -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block uppercase tracking-wider text-black font-bold mb-1.5">Badge (e.g. Banarasi Brocade / Runway Exclusive)</label>
                  <input 
                    v-model="productForm.badge" 
                    type="text" 
                    placeholder="Heritage Zardozi / Runway Exclusive"
                    class="w-full px-3.5 py-2.5 border-2 border-zinc-300 rounded-xs focus:outline-none focus:border-black bg-white text-black font-semibold"
                  />
                </div>
                <div>
                  <label class="block uppercase tracking-wider text-black font-bold mb-1.5">Heritage Tag (e.g. Traditional Indian Heritage)</label>
                  <input 
                    v-model="productForm.tag" 
                    type="text" 
                    placeholder="Traditional Indian Heritage / Master Tailored"
                    class="w-full px-3.5 py-2.5 border-2 border-zinc-300 rounded-xs focus:outline-none focus:border-black bg-white text-black font-semibold"
                  />
                </div>
              </div>

              <!-- 6. Description -->
              <div>
                <label class="block uppercase tracking-wider text-black font-bold mb-1.5">Editorial Atelier Narrative</label>
                <textarea 
                  v-model="productForm.description" 
                  rows="3"
                  placeholder="Describe the silhouette, generational weaving, drape, and styling advice..."
                  class="w-full px-3.5 py-2 border-2 border-zinc-300 rounded-xs focus:outline-none focus:border-black bg-white text-black font-semibold"
                ></textarea>
              </div>

              <!-- Modal Footer Buttons -->
              <div class="pt-4 border-t-2 border-zinc-200 flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  @click="closeProductModal"
                  class="px-5 py-2.5 border-2 border-zinc-400 text-black uppercase tracking-wider hover:border-black rounded-xs transition-all cursor-pointer font-bold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  class="px-8 py-2.5 bg-black text-[#fef08a] hover:bg-[#b8860b] hover:text-black uppercase tracking-widest font-extrabold rounded-xs transition-all cursor-pointer shadow-md flex items-center gap-2"
                >
                  <span>{{ editingProductId ? 'Save Creation Changes' : 'Publish Creation to Catalog ✦' }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- =================================================================== -->
      <!-- MODAL: SCHEDULE APPOINTMENT -->
      <!-- =================================================================== -->
      <div v-if="isAppointmentModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="fixed inset-0 bg-black/80 backdrop-blur-xs" @click="isAppointmentModalOpen = false"></div>

        <div class="min-h-screen px-3 sm:px-4 flex items-center justify-center py-4">
          <div class="inline-block w-full max-w-lg max-h-[92vh] overflow-y-auto p-4 sm:p-8 my-2 sm:my-8 text-left align-middle bg-white border-2 border-zinc-400 shadow-2xl relative text-black rounded-sm">
            <button 
              @click="isAppointmentModalOpen = false"
              class="absolute top-4 right-4 text-black hover:text-red-700 font-extrabold text-xl cursor-pointer"
            >
              ✕
            </button>

            <div class="border-b-2 border-zinc-200 pb-4 mb-5">
              <span class="text-[10.5px] uppercase tracking-[0.3em] text-[#b8860b] font-bold">Flagship Salon</span>
              <h3 class="font-serif text-xl text-black font-bold mt-0.5">Schedule Client Consultation</h3>
            </div>

            <form @submit.prevent="saveNewAppointment" class="space-y-4 text-xs">
              <div>
                <label class="block uppercase tracking-wider text-black font-bold mb-1">Client Full Name *</label>
                <input 
                  v-model="appointmentForm.name" 
                  type="text" 
                  required 
                  placeholder="e.g. Kavitha & Sanjay Sundaram"
                  class="w-full px-3.5 py-2.5 border-2 border-zinc-300 rounded-xs bg-white text-black font-bold"
                />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block uppercase tracking-wider text-black font-bold mb-1">Phone Number *</label>
                  <input 
                    v-model="appointmentForm.phone" 
                    type="text" 
                    required 
                    placeholder="+91 90474 74454"
                    class="w-full px-3.5 py-2.5 border-2 border-zinc-300 rounded-xs bg-white text-black font-bold"
                  />
                </div>
                <div>
                  <label class="block uppercase tracking-wider text-black font-bold mb-1">Email Address</label>
                  <input 
                    v-model="appointmentForm.email" 
                    type="email" 
                    placeholder="client@example.com"
                    class="w-full px-3.5 py-2.5 border-2 border-zinc-300 rounded-xs bg-white text-black font-bold"
                  />
                </div>
              </div>

              <div>
                <label class="block uppercase tracking-wider text-black font-bold mb-1">Bespoke Service Requested *</label>
                <select 
                  v-model="appointmentForm.service" 
                  required 
                  class="w-full px-3.5 py-2.5 border-2 border-zinc-300 rounded-xs bg-white text-black font-bold"
                >
                  <option value="Bridal Heirloom Lehenga Consultation">Bridal Heirloom Lehenga Consultation</option>
                  <option value="Men's Master Groom Sherwani & Achkan">Men's Master Groom Sherwani & Achkan</option>
                  <option value="Banarasi Brocade & Zari Saree Drape">Banarasi Brocade & Zari Saree Drape</option>
                  <option value="Fine Jewellery & Minaudiere Styling">Fine Jewellery & Minaudiere Styling</option>
                  <option value="Custom Atelier Silhouette Commission">Custom Atelier Silhouette Commission</option>
                </select>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block uppercase tracking-wider text-black font-bold mb-1">Date *</label>
                  <input 
                    v-model="appointmentForm.date" 
                    type="date" 
                    required 
                    class="w-full px-3.5 py-2.5 border-2 border-zinc-300 rounded-xs bg-white text-black font-bold"
                  />
                </div>
                <div>
                  <label class="block uppercase tracking-wider text-black font-bold mb-1">Time Slot *</label>
                  <input 
                    v-model="appointmentForm.time" 
                    type="text" 
                    required 
                    placeholder="11:30 AM"
                    class="w-full px-3.5 py-2.5 border-2 border-zinc-300 rounded-xs bg-white text-black font-bold"
                  />
                </div>
              </div>

              <div>
                <label class="block uppercase tracking-wider text-black font-bold mb-1">Special Client Notes</label>
                <textarea 
                  v-model="appointmentForm.notes" 
                  rows="2"
                  placeholder="Requested private lounge and master embroiderer fitting..."
                  class="w-full px-3.5 py-2 border-2 border-zinc-300 rounded-xs bg-white text-black font-semibold"
                ></textarea>
              </div>

              <div class="pt-3 border-t-2 border-zinc-200 flex justify-end gap-3">
                <button 
                  type="button" 
                  @click="isAppointmentModalOpen = false" 
                  class="px-4 py-2 border-2 border-zinc-400 rounded-xs text-xs uppercase font-bold text-black hover:border-black"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  class="px-6 py-2 bg-black text-[#fef08a] hover:bg-[#b8860b] hover:text-black rounded-xs text-xs uppercase font-extrabold transition-all shadow-md"
                >
                  Confirm Appointment ✦
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- =================================================================== -->
      <!-- MODAL: ADD / EDIT CLIENT MEASUREMENT SHEET (24-POINT PHYSICAL PAD) -->
      <!-- =================================================================== -->
      <div v-if="isMeasurementModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="fixed inset-0 bg-black/80 backdrop-blur-xs" @click="closeMeasurementModal"></div>

        <div class="min-h-screen px-2 sm:px-4 flex items-center justify-center py-4">
          <div class="inline-block w-full max-w-4xl max-h-[94vh] overflow-y-auto p-4 sm:p-7 my-2 sm:my-6 text-left align-middle bg-white border-2 border-zinc-400 shadow-2xl relative text-black rounded-sm">
            
            <!-- Close Button -->
            <button 
              @click="closeMeasurementModal"
              class="absolute top-4 right-4 text-black hover:text-red-700 font-extrabold text-xl cursor-pointer"
            >
              ✕
            </button>

            <!-- Physical Pad Header Replica -->
            <div class="bg-[#8B0000] text-white p-4 rounded-xs mb-5 shadow-sm border border-[#d4af37]">
              <div class="flex items-center justify-between">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-xl">⚜️</span>
                    <span class="font-serif text-2xl tracking-[0.2em] font-extrabold text-[#fef08a]">LECOTRUS®</span>
                  </div>
                  <h3 class="font-serif text-sm tracking-wider uppercase text-zinc-100 font-bold mt-0.5">
                    Women Client's Information & Measurement Sheet
                  </h3>
                </div>
                <span class="px-2.5 py-1 bg-black/50 text-[#fef08a] border border-[#d4af37]/40 text-[10px] font-mono font-bold rounded-2xs uppercase">
                  {{ editingMeasurementId ? 'Edit Entry' : 'New Bespoke Sheet' }}
                </span>
              </div>
            </div>

            <form @submit.prevent="saveMeasurement" class="space-y-5 text-xs">
              
              <!-- Section 1: Client & Order Meta Info -->
              <div class="p-3.5 bg-zinc-50 border-2 border-zinc-300 rounded-xs space-y-3">
                <span class="text-[10.5px] uppercase tracking-wider text-[#8B0000] font-extrabold block">
                  1. Client Identity & Delivery Schedule
                </span>

                <div class="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <!-- Name -->
                  <div class="sm:col-span-4">
                    <label class="block uppercase tracking-wider text-black font-bold mb-1">Client Full Name *</label>
                    <input 
                      v-model="measurementForm.clientName" 
                      type="text" 
                      required 
                      placeholder="e.g. Priyanka Sundaram"
                      class="w-full px-3 py-2 border-2 border-zinc-300 rounded-xs bg-white text-black font-bold focus:border-black"
                    />
                  </div>

                  <!-- Phone / WhatsApp -->
                  <div class="sm:col-span-3">
                    <label class="block uppercase tracking-wider text-black font-bold mb-1">Phone / WhatsApp *</label>
                    <input 
                      v-model="measurementForm.phone" 
                      type="text" 
                      required 
                      placeholder="+91 98422 12345"
                      class="w-full px-3 py-2 border-2 border-zinc-300 rounded-xs bg-white text-black font-bold font-mono focus:border-black"
                    />
                  </div>

                  <!-- Order No -->
                  <div class="sm:col-span-2">
                    <label class="block uppercase tracking-wider text-black font-bold mb-1">Order No *</label>
                    <input 
                      v-model="measurementForm.orderNo" 
                      type="text" 
                      required 
                      placeholder="L-101"
                      class="w-full px-3 py-2 border-2 border-zinc-300 rounded-xs bg-white text-black font-mono font-extrabold focus:border-black"
                    />
                  </div>

                  <!-- Status -->
                  <div class="sm:col-span-3">
                    <label class="block uppercase tracking-wider text-black font-bold mb-1">Atelier Status *</label>
                    <select 
                      v-model="measurementForm.status" 
                      required
                      class="w-full px-3 py-2 border-2 border-zinc-300 rounded-xs bg-white text-black font-bold focus:border-black"
                    >
                      <option value="In Cutting">✂️ In Cutting</option>
                      <option value="In Embroidery">🪡 In Embroidery</option>
                      <option value="In Stitching">🧵 In Stitching</option>
                      <option value="Ready for Trial">✨ Ready for Trial</option>
                      <option value="Completed">★ Completed</option>
                      <option value="Delivered">📦 Delivered</option>
                    </select>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
                  <!-- Garment Type -->
                  <div class="sm:col-span-6">
                    <label class="block uppercase tracking-wider text-black font-bold mb-1">Garment Type / Commission *</label>
                    <input 
                      v-model="measurementForm.garmentType" 
                      type="text" 
                      required 
                      placeholder="e.g. Bridal Blouse & Lehenga / Kanjeevaram Saree Blouse"
                      class="w-full px-3 py-2 border-2 border-zinc-300 rounded-xs bg-white text-black font-bold focus:border-black"
                    />
                  </div>

                  <!-- Measurement Date -->
                  <div class="sm:col-span-3">
                    <label class="block uppercase tracking-wider text-black font-bold mb-1">Measurement Date *</label>
                    <input 
                      v-model="measurementForm.date" 
                      type="date" 
                      required 
                      class="w-full px-3 py-2 border-2 border-zinc-300 rounded-xs bg-white text-black font-bold focus:border-black"
                    />
                  </div>

                  <!-- Due / Trial Date -->
                  <div class="sm:col-span-3">
                    <label class="block uppercase tracking-wider text-black font-bold mb-1">Due / Trial Date</label>
                    <input 
                      v-model="measurementForm.dueDate" 
                      type="date" 
                      class="w-full px-3 py-2 border-2 border-zinc-300 rounded-xs bg-white text-black font-bold focus:border-black"
                    />
                  </div>
                </div>
              </div>

              <!-- Section 2: Exact 24 Anatomical Measurement Points (2 Columns matching pad) -->
              <div class="p-3.5 bg-zinc-50 border-2 border-zinc-300 rounded-xs space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-[10.5px] uppercase tracking-wider text-[#8B0000] font-extrabold">
                    2. Anatomical Tailoring Measurement Matrix (Inches)
                  </span>
                  <span class="text-[10px] text-zinc-500 font-bold uppercase">24 Official Pad Points</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- LEFT COLUMN (12 Points) -->
                  <div class="border-2 border-zinc-300 bg-white p-3 rounded-xs space-y-2">
                    <div class="bg-[#8B0000]/10 border-b border-[#8B0000]/30 pb-1 mb-2 font-bold text-[#8B0000] uppercase text-[10px] tracking-wider text-center">
                      Column 1 · Upper Torso & Arm Measurements
                    </div>

                    <div class="space-y-1.5">
                      <div class="flex items-center justify-between gap-2">
                        <label class="font-bold text-zinc-800 text-[11px]">1. Shoulder</label>
                        <div class="flex items-center gap-1">
                          <input v-model="measurementForm.measurements.shoulder" type="text" placeholder="14.5" class="w-20 px-2 py-1 border border-zinc-300 rounded-2xs font-mono font-bold text-right text-xs bg-zinc-50 focus:bg-white focus:border-black" />
                          <span class="text-zinc-500 font-bold text-xs">"</span>
                        </div>
                      </div>

                      <div class="flex items-center justify-between gap-2">
                        <label class="font-bold text-zinc-800 text-[11px]">2. Front Neck Depth</label>
                        <div class="flex items-center gap-1">
                          <input v-model="measurementForm.measurements.frontNeckDepth" type="text" placeholder="7.5" class="w-20 px-2 py-1 border border-zinc-300 rounded-2xs font-mono font-bold text-right text-xs bg-zinc-50 focus:bg-white focus:border-black" />
                          <span class="text-zinc-500 font-bold text-xs">"</span>
                        </div>
                      </div>

                      <div class="flex items-center justify-between gap-2">
                        <label class="font-bold text-zinc-800 text-[11px]">3. Back Neck Depth</label>
                        <div class="flex items-center gap-1">
                          <input v-model="measurementForm.measurements.backNeckDepth" type="text" placeholder="10.0" class="w-20 px-2 py-1 border border-zinc-300 rounded-2xs font-mono font-bold text-right text-xs bg-zinc-50 focus:bg-white focus:border-black" />
                          <span class="text-zinc-500 font-bold text-xs">"</span>
                        </div>
                      </div>

                      <div class="flex items-center justify-between gap-2">
                        <label class="font-bold text-zinc-800 text-[11px]">4. Neck Round</label>
                        <div class="flex items-center gap-1">
                          <input v-model="measurementForm.measurements.neckRound" type="text" placeholder="15.0" class="w-20 px-2 py-1 border border-zinc-300 rounded-2xs font-mono font-bold text-right text-xs bg-zinc-50 focus:bg-white focus:border-black" />
                          <span class="text-zinc-500 font-bold text-xs">"</span>
                        </div>
                      </div>

                      <div class="flex items-center justify-between gap-2">
                        <label class="font-bold text-zinc-800 text-[11px]">5. Armhole</label>
                        <div class="flex items-center gap-1">
                          <input v-model="measurementForm.measurements.armhole" type="text" placeholder="16.5" class="w-20 px-2 py-1 border border-zinc-300 rounded-2xs font-mono font-bold text-right text-xs bg-zinc-50 focus:bg-white focus:border-black" />
                          <span class="text-zinc-500 font-bold text-xs">"</span>
                        </div>
                      </div>

                      <div class="flex items-center justify-between gap-2">
                        <label class="font-bold text-zinc-800 text-[11px]">6. Chest</label>
                        <div class="flex items-center gap-1">
                          <input v-model="measurementForm.measurements.chest" type="text" placeholder="36.0" class="w-20 px-2 py-1 border border-zinc-300 rounded-2xs font-mono font-bold text-right text-xs bg-zinc-50 focus:bg-white focus:border-black" />
                          <span class="text-zinc-500 font-bold text-xs">"</span>
                        </div>
                      </div>

                      <div class="flex items-center justify-between gap-2">
                        <label class="font-bold text-zinc-800 text-[11px]">7. Bust to Bust</label>
                        <div class="flex items-center gap-1">
                          <input v-model="measurementForm.measurements.bustToBust" type="text" placeholder="7.5" class="w-20 px-2 py-1 border border-zinc-300 rounded-2xs font-mono font-bold text-right text-xs bg-zinc-50 focus:bg-white focus:border-black" />
                          <span class="text-zinc-500 font-bold text-xs">"</span>
                        </div>
                      </div>

                      <div class="flex items-center justify-between gap-2">
                        <label class="font-bold text-zinc-800 text-[11px]">8. Waist</label>
                        <div class="flex items-center gap-1">
                          <input v-model="measurementForm.measurements.waist" type="text" placeholder="30.0" class="w-20 px-2 py-1 border border-zinc-300 rounded-2xs font-mono font-bold text-right text-xs bg-zinc-50 focus:bg-white focus:border-black" />
                          <span class="text-zinc-500 font-bold text-xs">"</span>
                        </div>
                      </div>

                      <div class="flex items-center justify-between gap-2">
                        <label class="font-bold text-zinc-800 text-[11px]">9. Hip</label>
                        <div class="flex items-center gap-1">
                          <input v-model="measurementForm.measurements.hip" type="text" placeholder="38.0" class="w-20 px-2 py-1 border border-zinc-300 rounded-2xs font-mono font-bold text-right text-xs bg-zinc-50 focus:bg-white focus:border-black" />
                          <span class="text-zinc-500 font-bold text-xs">"</span>
                        </div>
                      </div>

                      <div class="flex items-center justify-between gap-2">
                        <label class="font-bold text-zinc-800 text-[11px]">10. Seat</label>
                        <div class="flex items-center gap-1">
                          <input v-model="measurementForm.measurements.seat" type="text" placeholder="40.0" class="w-20 px-2 py-1 border border-zinc-300 rounded-2xs font-mono font-bold text-right text-xs bg-zinc-50 focus:bg-white focus:border-black" />
                          <span class="text-zinc-500 font-bold text-xs">"</span>
                        </div>
                      </div>

                      <div class="flex items-center justify-between gap-2">
                        <label class="font-bold text-zinc-800 text-[11px]">11. Sleeve Length</label>
                        <div class="flex items-center gap-1">
                          <input v-model="measurementForm.measurements.sleeveLength" type="text" placeholder="11.5" class="w-20 px-2 py-1 border border-zinc-300 rounded-2xs font-mono font-bold text-right text-xs bg-zinc-50 focus:bg-white focus:border-black" />
                          <span class="text-zinc-500 font-bold text-xs">"</span>
                        </div>
                      </div>

                      <div class="flex items-center justify-between gap-2">
                        <label class="font-bold text-zinc-800 text-[11px]">12. Sleeve Round</label>
                        <div class="flex items-center gap-1">
                          <input v-model="measurementForm.measurements.sleeveRound" type="text" placeholder="12.0" class="w-20 px-2 py-1 border border-zinc-300 rounded-2xs font-mono font-bold text-right text-xs bg-zinc-50 focus:bg-white focus:border-black" />
                          <span class="text-zinc-500 font-bold text-xs">"</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- RIGHT COLUMN (12 Points) -->
                  <div class="border-2 border-zinc-300 bg-white p-3 rounded-xs space-y-2">
                    <div class="bg-[#8B0000]/10 border-b border-[#8B0000]/30 pb-1 mb-2 font-bold text-[#8B0000] uppercase text-[10px] tracking-wider text-center">
                      Column 2 · Length & Lower Body Measurements
                    </div>

                    <div class="space-y-1.5">
                      <div class="flex items-center justify-between gap-2">
                        <label class="font-bold text-zinc-800 text-[11px]">13. Wrist Round</label>
                        <div class="flex items-center gap-1">
                          <input v-model="measurementForm.measurements.wristRound" type="text" placeholder="6.5" class="w-20 px-2 py-1 border border-zinc-300 rounded-2xs font-mono font-bold text-right text-xs bg-zinc-50 focus:bg-white focus:border-black" />
                          <span class="text-zinc-500 font-bold text-xs">"</span>
                        </div>
                      </div>

                      <div class="flex items-center justify-between gap-2">
                        <label class="font-bold text-zinc-800 text-[11px]">14. Shoulder to Bust</label>
                        <div class="flex items-center gap-1">
                          <input v-model="measurementForm.measurements.shoulderToBust" type="text" placeholder="10.0" class="w-20 px-2 py-1 border border-zinc-300 rounded-2xs font-mono font-bold text-right text-xs bg-zinc-50 focus:bg-white focus:border-black" />
                          <span class="text-zinc-500 font-bold text-xs">"</span>
                        </div>
                      </div>

                      <div class="flex items-center justify-between gap-2">
                        <label class="font-bold text-zinc-800 text-[11px]">15. Shoulder to Waist</label>
                        <div class="flex items-center gap-1">
                          <input v-model="measurementForm.measurements.shoulderToWaist" type="text" placeholder="14.5" class="w-20 px-2 py-1 border border-zinc-300 rounded-2xs font-mono font-bold text-right text-xs bg-zinc-50 focus:bg-white focus:border-black" />
                          <span class="text-zinc-500 font-bold text-xs">"</span>
                        </div>
                      </div>

                      <div class="flex items-center justify-between gap-2">
                        <label class="font-bold text-zinc-800 text-[11px]">16. Shoulder to Hip</label>
                        <div class="flex items-center gap-1">
                          <input v-model="measurementForm.measurements.shoulderToHip" type="text" placeholder="21.0" class="w-20 px-2 py-1 border border-zinc-300 rounded-2xs font-mono font-bold text-right text-xs bg-zinc-50 focus:bg-white focus:border-black" />
                          <span class="text-zinc-500 font-bold text-xs">"</span>
                        </div>
                      </div>

                      <div class="flex items-center justify-between gap-2">
                        <label class="font-bold text-zinc-800 text-[11px]">17. Shoulder to Seat</label>
                        <div class="flex items-center gap-1">
                          <input v-model="measurementForm.measurements.shoulderToSeat" type="text" placeholder="25.0" class="w-20 px-2 py-1 border border-zinc-300 rounded-2xs font-mono font-bold text-right text-xs bg-zinc-50 focus:bg-white focus:border-black" />
                          <span class="text-zinc-500 font-bold text-xs">"</span>
                        </div>
                      </div>

                      <div class="flex items-center justify-between gap-2">
                        <label class="font-bold text-zinc-800 text-[11px]">18. Full Length</label>
                        <div class="flex items-center gap-1">
                          <input v-model="measurementForm.measurements.fullLength" type="text" placeholder="42.0" class="w-20 px-2 py-1 border border-zinc-300 rounded-2xs font-mono font-bold text-right text-xs bg-zinc-50 focus:bg-white focus:border-black" />
                          <span class="text-zinc-500 font-bold text-xs">"</span>
                        </div>
                      </div>

                      <div class="flex items-center justify-between gap-2">
                        <label class="font-bold text-zinc-800 text-[11px]">19. Thigh Round</label>
                        <div class="flex items-center gap-1">
                          <input v-model="measurementForm.measurements.thighRound" type="text" placeholder="22.0" class="w-20 px-2 py-1 border border-zinc-300 rounded-2xs font-mono font-bold text-right text-xs bg-zinc-50 focus:bg-white focus:border-black" />
                          <span class="text-zinc-500 font-bold text-xs">"</span>
                        </div>
                      </div>

                      <div class="flex items-center justify-between gap-2">
                        <label class="font-bold text-zinc-800 text-[11px]">20. Knee Round</label>
                        <div class="flex items-center gap-1">
                          <input v-model="measurementForm.measurements.kneeRound" type="text" placeholder="15.0" class="w-20 px-2 py-1 border border-zinc-300 rounded-2xs font-mono font-bold text-right text-xs bg-zinc-50 focus:bg-white focus:border-black" />
                          <span class="text-zinc-500 font-bold text-xs">"</span>
                        </div>
                      </div>

                      <div class="flex items-center justify-between gap-2">
                        <label class="font-bold text-zinc-800 text-[11px]">21. Waist to Thigh</label>
                        <div class="flex items-center gap-1">
                          <input v-model="measurementForm.measurements.waistToThigh" type="text" placeholder="12.0" class="w-20 px-2 py-1 border border-zinc-300 rounded-2xs font-mono font-bold text-right text-xs bg-zinc-50 focus:bg-white focus:border-black" />
                          <span class="text-zinc-500 font-bold text-xs">"</span>
                        </div>
                      </div>

                      <div class="flex items-center justify-between gap-2">
                        <label class="font-bold text-zinc-800 text-[11px]">22. Waist to Knee</label>
                        <div class="flex items-center gap-1">
                          <input v-model="measurementForm.measurements.waistToKnee" type="text" placeholder="21.0" class="w-20 px-2 py-1 border border-zinc-300 rounded-2xs font-mono font-bold text-right text-xs bg-zinc-50 focus:bg-white focus:border-black" />
                          <span class="text-zinc-500 font-bold text-xs">"</span>
                        </div>
                      </div>

                      <div class="flex items-center justify-between gap-2">
                        <label class="font-bold text-zinc-800 text-[11px]">23. Ankle Round</label>
                        <div class="flex items-center gap-1">
                          <input v-model="measurementForm.measurements.ankleRound" type="text" placeholder="11.0" class="w-20 px-2 py-1 border border-zinc-300 rounded-2xs font-mono font-bold text-right text-xs bg-zinc-50 focus:bg-white focus:border-black" />
                          <span class="text-zinc-500 font-bold text-xs">"</span>
                        </div>
                      </div>

                      <div class="flex items-center justify-between gap-2">
                        <label class="font-bold text-zinc-800 text-[11px]">24. Waist to Floor Length</label>
                        <div class="flex items-center gap-1">
                          <input v-model="measurementForm.measurements.waistToFloorLength" type="text" placeholder="41.5" class="w-20 px-2 py-1 border border-zinc-300 rounded-2xs font-mono font-bold text-right text-xs bg-zinc-50 focus:bg-white focus:border-black" />
                          <span class="text-zinc-500 font-bold text-xs">"</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Section 3: Bespoke Specifications & Notes -->
              <div class="p-3.5 bg-zinc-50 border-2 border-zinc-300 rounded-xs space-y-3">
                <span class="text-[10.5px] uppercase tracking-wider text-[#8B0000] font-extrabold block">
                  3. Cut, Neckline & Atelier Design Specifications
                </span>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label class="block uppercase tracking-wider text-black font-bold mb-1">Front Neck Design</label>
                    <input v-model="measurementForm.specifications.frontNeck" type="text" placeholder="e.g. Sweetheart Neck / Deep V" class="w-full px-3 py-2 border-2 border-zinc-300 rounded-xs bg-white text-black font-semibold text-xs" />
                  </div>
                  <div>
                    <label class="block uppercase tracking-wider text-black font-bold mb-1">Back Neck Design</label>
                    <input v-model="measurementForm.specifications.backNeck" type="text" placeholder="e.g. Deep U / Potli Keyhole" class="w-full px-3 py-2 border-2 border-zinc-300 rounded-xs bg-white text-black font-semibold text-xs" />
                  </div>
                  <div>
                    <label class="block uppercase tracking-wider text-black font-bold mb-1">Sleeve Pattern & Style</label>
                    <input v-model="measurementForm.specifications.sleeveStyle" type="text" placeholder="e.g. Elbow Length with Zari border" class="w-full px-3 py-2 border-2 border-zinc-300 rounded-xs bg-white text-black font-semibold text-xs" />
                  </div>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div>
                    <label class="block uppercase tracking-wider text-black font-bold mb-1">Pads / Cups</label>
                    <select v-model="measurementForm.specifications.pads" class="w-full px-2.5 py-1.5 border-2 border-zinc-300 rounded-xs bg-white text-black font-bold text-xs">
                      <option value="Yes">Yes (Padded)</option>
                      <option value="No">No (Unpadded)</option>
                      <option value="Yes (B-Cup)">Yes (B-Cup)</option>
                      <option value="Yes (C-Cup)">Yes (C-Cup)</option>
                      <option value="Yes (D-Cup)">Yes (D-Cup)</option>
                    </select>
                  </div>
                  <div>
                    <label class="block uppercase tracking-wider text-black font-bold mb-1">Hook / Opening</label>
                    <select v-model="measurementForm.specifications.hookOpening" class="w-full px-2.5 py-1.5 border-2 border-zinc-300 rounded-xs bg-white text-black font-bold text-xs">
                      <option value="Back Hook">Back Hook</option>
                      <option value="Front Hook">Front Hook</option>
                      <option value="Side Concealed Zipper">Side Concealed Zipper</option>
                      <option value="Back Concealed Zipper">Back Concealed Zipper</option>
                    </select>
                  </div>
                  <div>
                    <label class="block uppercase tracking-wider text-black font-bold mb-1">Lining Fabric</label>
                    <input v-model="measurementForm.specifications.lining" type="text" placeholder="Pure Cotton" class="w-full px-2.5 py-1.5 border-2 border-zinc-300 rounded-xs bg-white text-black font-semibold text-xs" />
                  </div>
                  <div>
                    <label class="block uppercase tracking-wider text-black font-bold mb-1">Seam Margin</label>
                    <input v-model="measurementForm.specifications.margin" type="text" placeholder="2.5 inches" class="w-full px-2.5 py-1.5 border-2 border-zinc-300 rounded-xs bg-white text-black font-semibold text-xs" />
                  </div>
                </div>

                <div>
                  <label class="block uppercase tracking-wider text-black font-bold mb-1">Master Atelier Notes & Special Instructions</label>
                  <textarea 
                    v-model="measurementForm.notes" 
                    rows="2" 
                    placeholder="e.g. Wedding wear crimson silk, antique zardozi, latkans matching dupatta border, trial 2 days prior..." 
                    class="w-full px-3 py-2 border-2 border-zinc-300 rounded-xs bg-white text-black font-semibold text-xs"
                  ></textarea>
                </div>
              </div>

              <!-- Submit Buttons -->
              <div class="pt-3 border-t-2 border-zinc-200 flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  @click="closeMeasurementModal"
                  class="px-5 py-2.5 border-2 border-zinc-400 rounded-xs text-xs uppercase font-bold text-black hover:border-black cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  class="px-7 py-2.5 bg-[#8B0000] hover:bg-black text-[#fef08a] rounded-xs text-xs uppercase font-extrabold transition-all shadow-md cursor-pointer border border-[#d4af37]"
                >
                  {{ editingMeasurementId ? 'Save Measurement Sheet Changes' : 'Save & Register Bespoke Sheet ✦' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- =================================================================== -->
      <!-- MODAL: DIGITAL / PRINTABLE FITTING SLIP (OFFICIAL LECOTRUS® VOUCHER) -->
      <!-- =================================================================== -->
      <div v-if="isPrintSlipModalOpen && selectedMeasurementForPrint" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="fixed inset-0 bg-black/80 backdrop-blur-xs" @click="closePrintSlipModal"></div>

        <div class="min-h-screen px-2 sm:px-4 flex items-center justify-center py-4">
          <div class="inline-block w-full max-w-3xl max-h-[96vh] overflow-y-auto p-4 sm:p-8 my-2 text-left align-middle bg-white border-4 border-zinc-800 shadow-2xl relative text-black rounded-sm print:p-0 print:border-none print:shadow-none">
            
            <!-- Modal Header Actions (Hidden in Print) -->
            <div class="flex items-center justify-between pb-4 mb-4 border-b-2 border-zinc-300 print:hidden">
              <div class="flex items-center gap-2">
                <span class="text-xl">🖨️</span>
                <span class="font-serif text-lg font-bold text-black">Official Bespoke Measurement Slip</span>
              </div>
              <div class="flex items-center gap-2">
                <button 
                  @click="printSlip" 
                  class="px-4 py-2 bg-black text-[#fef08a] hover:bg-[#8B0000] text-xs font-bold uppercase rounded-xs transition-colors cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <span>🖨️ Print Slip / PDF</span>
                </button>
                <button 
                  @click="closePrintSlipModal" 
                  class="w-8 h-8 rounded-full bg-zinc-200 text-black hover:bg-red-700 hover:text-white font-extrabold flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            <!-- THE ACTUAL PRINTABLE PAD VOUCHER -->
            <div class="border-2 border-[#8B0000] p-4 sm:p-6 bg-[#faf9f6] rounded-xs space-y-4">
              
              <!-- Red Physical Pad Header -->
              <div class="bg-[#8B0000] text-white p-4 rounded-xs border-2 border-[#d4af37] text-center space-y-1">
                <div class="flex items-center justify-center gap-2">
                  <span class="text-2xl">⚜️</span>
                  <span class="font-serif text-3xl sm:text-4xl tracking-[0.25em] font-extrabold text-[#fef08a]">LECOTRUS®</span>
                </div>
                <div class="text-[10px] tracking-[0.35em] uppercase font-bold text-zinc-200">
                  Haute Couture & Bespoke Bridal Atelier
                </div>
                <div class="pt-1 text-xs font-serif tracking-widest text-[#fef08a] uppercase font-bold border-t border-[#d4af37]/40 mt-1">
                  Women Client's Information & Measurement Sheet
                </div>
              </div>

              <!-- Header Info Fields Box -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs border border-[#8B0000]/40 p-3 bg-white rounded-xs">
                <div>
                  <span class="text-[9px] uppercase tracking-wider text-[#8B0000] font-extrabold block">Client Name</span>
                  <span class="font-serif font-extrabold text-black text-sm">{{ selectedMeasurementForPrint.clientName }}</span>
                </div>
                <div>
                  <span class="text-[9px] uppercase tracking-wider text-[#8B0000] font-extrabold block">Order No</span>
                  <span class="font-mono font-extrabold text-[#8B0000] text-sm">{{ selectedMeasurementForPrint.orderNo }}</span>
                </div>
                <div>
                  <span class="text-[9px] uppercase tracking-wider text-[#8B0000] font-extrabold block">Date</span>
                  <span class="font-bold text-black">{{ selectedMeasurementForPrint.date }}</span>
                </div>
                <div>
                  <span class="text-[9px] uppercase tracking-wider text-[#8B0000] font-extrabold block">Due Date</span>
                  <span class="font-bold text-[#8B0000]">{{ selectedMeasurementForPrint.dueDate || 'As per trial' }}</span>
                </div>
                <div class="col-span-2 pt-1 border-t border-zinc-200">
                  <span class="text-[9px] uppercase tracking-wider text-[#8B0000] font-extrabold block">Garment Type</span>
                  <span class="font-bold text-black">{{ selectedMeasurementForPrint.garmentType }}</span>
                </div>
                <div class="col-span-2 pt-1 border-t border-zinc-200">
                  <span class="text-[9px] uppercase tracking-wider text-[#8B0000] font-extrabold block">Client Phone</span>
                  <span class="font-mono font-bold text-black">{{ selectedMeasurementForPrint.phone }}</span>
                </div>
              </div>

              <!-- 2-Column Exact Measurement Table -->
              <div class="grid grid-cols-2 gap-3 text-xs">
                <!-- Left 12 Points -->
                <div class="border border-[#8B0000]/40 bg-white rounded-xs overflow-hidden">
                  <div class="bg-[#8B0000]/15 text-[#8B0000] font-bold p-1.5 text-center text-[10px] uppercase tracking-wider border-b border-[#8B0000]/30">
                    Upper Body Measurements
                  </div>
                  <table class="w-full text-left">
                    <tbody class="divide-y divide-zinc-200">
                      <tr><td class="p-1.5 text-zinc-700 font-semibold">1. Shoulder</td><td class="p-1.5 font-mono font-extrabold text-right">{{ selectedMeasurementForPrint.measurements?.shoulder || '—' }}"</td></tr>
                      <tr><td class="p-1.5 text-zinc-700 font-semibold">2. Front Neck Depth</td><td class="p-1.5 font-mono font-extrabold text-right">{{ selectedMeasurementForPrint.measurements?.frontNeckDepth || '—' }}"</td></tr>
                      <tr><td class="p-1.5 text-zinc-700 font-semibold">3. Back Neck Depth</td><td class="p-1.5 font-mono font-extrabold text-right">{{ selectedMeasurementForPrint.measurements?.backNeckDepth || '—' }}"</td></tr>
                      <tr><td class="p-1.5 text-zinc-700 font-semibold">4. Neck Round</td><td class="p-1.5 font-mono font-extrabold text-right">{{ selectedMeasurementForPrint.measurements?.neckRound || '—' }}"</td></tr>
                      <tr><td class="p-1.5 text-zinc-700 font-semibold">5. Armhole</td><td class="p-1.5 font-mono font-extrabold text-right">{{ selectedMeasurementForPrint.measurements?.armhole || '—' }}"</td></tr>
                      <tr><td class="p-1.5 text-zinc-700 font-semibold">6. Chest</td><td class="p-1.5 font-mono font-extrabold text-right">{{ selectedMeasurementForPrint.measurements?.chest || '—' }}"</td></tr>
                      <tr><td class="p-1.5 text-zinc-700 font-semibold">7. Bust to Bust</td><td class="p-1.5 font-mono font-extrabold text-right">{{ selectedMeasurementForPrint.measurements?.bustToBust || '—' }}"</td></tr>
                      <tr><td class="p-1.5 text-zinc-700 font-semibold">8. Waist</td><td class="p-1.5 font-mono font-extrabold text-right">{{ selectedMeasurementForPrint.measurements?.waist || '—' }}"</td></tr>
                      <tr><td class="p-1.5 text-zinc-700 font-semibold">9. Hip</td><td class="p-1.5 font-mono font-extrabold text-right">{{ selectedMeasurementForPrint.measurements?.hip || '—' }}"</td></tr>
                      <tr><td class="p-1.5 text-zinc-700 font-semibold">10. Seat</td><td class="p-1.5 font-mono font-extrabold text-right">{{ selectedMeasurementForPrint.measurements?.seat || '—' }}"</td></tr>
                      <tr><td class="p-1.5 text-zinc-700 font-semibold">11. Sleeve Length</td><td class="p-1.5 font-mono font-extrabold text-right">{{ selectedMeasurementForPrint.measurements?.sleeveLength || '—' }}"</td></tr>
                      <tr><td class="p-1.5 text-zinc-700 font-semibold">12. Sleeve Round</td><td class="p-1.5 font-mono font-extrabold text-right">{{ selectedMeasurementForPrint.measurements?.sleeveRound || '—' }}"</td></tr>
                    </tbody>
                  </table>
                </div>

                <!-- Right 12 Points -->
                <div class="border border-[#8B0000]/40 bg-white rounded-xs overflow-hidden">
                  <div class="bg-[#8B0000]/15 text-[#8B0000] font-bold p-1.5 text-center text-[10px] uppercase tracking-wider border-b border-[#8B0000]/30">
                    Length & Lower Body Measurements
                  </div>
                  <table class="w-full text-left">
                    <tbody class="divide-y divide-zinc-200">
                      <tr><td class="p-1.5 text-zinc-700 font-semibold">13. Wrist Round</td><td class="p-1.5 font-mono font-extrabold text-right">{{ selectedMeasurementForPrint.measurements?.wristRound || '—' }}"</td></tr>
                      <tr><td class="p-1.5 text-zinc-700 font-semibold">14. Shoulder to Bust</td><td class="p-1.5 font-mono font-extrabold text-right">{{ selectedMeasurementForPrint.measurements?.shoulderToBust || '—' }}"</td></tr>
                      <tr><td class="p-1.5 text-zinc-700 font-semibold">15. Shoulder to Waist</td><td class="p-1.5 font-mono font-extrabold text-right">{{ selectedMeasurementForPrint.measurements?.shoulderToWaist || '—' }}"</td></tr>
                      <tr><td class="p-1.5 text-zinc-700 font-semibold">16. Shoulder to Hip</td><td class="p-1.5 font-mono font-extrabold text-right">{{ selectedMeasurementForPrint.measurements?.shoulderToHip || '—' }}"</td></tr>
                      <tr><td class="p-1.5 text-zinc-700 font-semibold">17. Shoulder to Seat</td><td class="p-1.5 font-mono font-extrabold text-right">{{ selectedMeasurementForPrint.measurements?.shoulderToSeat || '—' }}"</td></tr>
                      <tr><td class="p-1.5 text-zinc-700 font-semibold">18. Full Length</td><td class="p-1.5 font-mono font-extrabold text-right">{{ selectedMeasurementForPrint.measurements?.fullLength || '—' }}"</td></tr>
                      <tr><td class="p-1.5 text-zinc-700 font-semibold">19. Thigh Round</td><td class="p-1.5 font-mono font-extrabold text-right">{{ selectedMeasurementForPrint.measurements?.thighRound || '—' }}"</td></tr>
                      <tr><td class="p-1.5 text-zinc-700 font-semibold">20. Knee Round</td><td class="p-1.5 font-mono font-extrabold text-right">{{ selectedMeasurementForPrint.measurements?.kneeRound || '—' }}"</td></tr>
                      <tr><td class="p-1.5 text-zinc-700 font-semibold">21. Waist to Thigh</td><td class="p-1.5 font-mono font-extrabold text-right">{{ selectedMeasurementForPrint.measurements?.waistToThigh || '—' }}"</td></tr>
                      <tr><td class="p-1.5 text-zinc-700 font-semibold">22. Waist to Knee</td><td class="p-1.5 font-mono font-extrabold text-right">{{ selectedMeasurementForPrint.measurements?.waistToKnee || '—' }}"</td></tr>
                      <tr><td class="p-1.5 text-zinc-700 font-semibold">23. Ankle Round</td><td class="p-1.5 font-mono font-extrabold text-right">{{ selectedMeasurementForPrint.measurements?.ankleRound || '—' }}"</td></tr>
                      <tr><td class="p-1.5 text-zinc-700 font-semibold">24. Waist to Floor</td><td class="p-1.5 font-mono font-extrabold text-right">{{ selectedMeasurementForPrint.measurements?.waistToFloorLength || '—' }}"</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Cut & Design Specs -->
              <div class="border border-[#8B0000]/40 p-3 bg-white rounded-xs text-xs space-y-1.5">
                <span class="text-[9.5px] uppercase tracking-wider text-[#8B0000] font-extrabold block pb-0.5 border-b border-zinc-200">
                  Tailoring Specifications & Remarks
                </span>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                  <div><strong class="text-zinc-700">Front Neck:</strong> {{ selectedMeasurementForPrint.specifications?.frontNeck || 'Standard' }}</div>
                  <div><strong class="text-zinc-700">Back Neck:</strong> {{ selectedMeasurementForPrint.specifications?.backNeck || 'Standard' }}</div>
                  <div><strong class="text-zinc-700">Sleeve Style:</strong> {{ selectedMeasurementForPrint.specifications?.sleeveStyle || 'Standard' }}</div>
                  <div><strong class="text-zinc-700">Pads:</strong> {{ selectedMeasurementForPrint.specifications?.pads || 'No' }}</div>
                  <div><strong class="text-zinc-700">Hook Opening:</strong> {{ selectedMeasurementForPrint.specifications?.hookOpening || 'Back' }}</div>
                  <div><strong class="text-zinc-700">Margin:</strong> {{ selectedMeasurementForPrint.specifications?.margin || '2 inches' }}</div>
                </div>
                <div v-if="selectedMeasurementForPrint.notes" class="pt-1 text-[11px] text-zinc-800 italic bg-amber-50/50 p-2 rounded border border-amber-200 mt-1">
                  <strong>Atelier Notes:</strong> {{ selectedMeasurementForPrint.notes }}
                </div>
              </div>

              <!-- Atelier Footer Signatures -->
              <div class="pt-4 border-t-2 border-[#8B0000]/40 flex items-center justify-between text-xs">
                <div class="text-center">
                  <div class="w-32 border-b border-black mb-1"></div>
                  <span class="text-[9px] uppercase tracking-wider text-zinc-600 font-bold">Master Tailor Signature</span>
                </div>
                <div class="text-center text-[10px] text-zinc-500 font-semibold">
                  <div>Venkatachalam Chetty St, R.S. Puram, Coimbatore 641002</div>
                  <div>Phone: +91 90474 74454 · House of Lecotrus</div>
                </div>
                <div class="text-center">
                  <div class="w-32 border-b border-black mb-1"></div>
                  <span class="text-[9px] uppercase tracking-wider text-zinc-600 font-bold">Client Signature</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'
import { useAppointmentStore } from '@/stores/appointmentStore'
import { useMeasurementStore } from '@/stores/measurementStore'

const router = useRouter()
const authStore = useAuthStore()
const productStore = useProductStore()
const cartStore = useCartStore()
const appointmentStore = useAppointmentStore()
const measurementStore = useMeasurementStore()

// ----------------------------------------------------
// TOAST SYSTEM
// ----------------------------------------------------
const toastMessage = ref('')
const toastIcon = ref('✨')
let toastTimer = null

const showToast = (message, icon = '✨') => {
  toastMessage.value = message
  toastIcon.value = icon
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toastMessage.value = ''
  }, 3500)
}

// ----------------------------------------------------
// AUTH & LOGIN LOGIC
// ----------------------------------------------------
const loginEmail = ref('admin@lecotrus.com')
const loginPassword = ref('')
const showPassword = ref(false)
const loginError = ref('')

const quickFillAdmin = () => {
  loginEmail.value = 'admin@lecotrus.com'
  loginPassword.value = 'admin123'
}

const handleAdminLogin = () => {
  loginError.value = ''
  const email = (loginEmail.value || '').trim().toLowerCase()
  const pass = (loginPassword.value || '').trim()
  if ((email === 'admin@lecotrus.com' || email === 'admin' || email.startsWith('admin')) && pass === 'admin123') {
    authStore.loginAsAdmin(loginEmail.value.trim(), 'Atelier Master Administrator')
    showToast('Welcome back, Master Administrator 👑', '👑')
  } else {
    loginError.value = 'Invalid Admin credentials. Use admin@lecotrus.com & admin123'
  }
}

const handleLogout = () => {
  authStore.logout()
  showToast('Logged out of Admin Console', '👋')
  router.push('/')
}

// ----------------------------------------------------
// DASHBOARD TABS (ANALYTICS IS DEFAULT FIRST TAB)
// ----------------------------------------------------
const activeTab = ref('analytics')
const isMobileDrawerOpen = ref(false)
const filterCat = ref('all')
const filterSubcat = ref('all')
const productSearch = ref('')

const selectTab = (tab) => {
  activeTab.value = tab
  isMobileDrawerOpen.value = false
}

const setCategoryFilter = (cat) => {
  filterCat.value = cat
  filterSubcat.value = 'all'
}

const resetFilters = () => {
  filterCat.value = 'all'
  filterSubcat.value = 'all'
  productSearch.value = ''
}

// Subcategories map
const subcategoriesMap = {
  women: [
    { label: 'Saree (Varanasi & Heritage Silk)', value: 'saree' },
    { label: 'Kurti Set (Master Embroidered)', value: 'kurthi set' },
    { label: 'Coord Set (Contemporary Luxury)', value: 'coord set' }
  ],
  men: [
    { label: 'Sherwani (Royal Heritage)', value: 'sherwani' },
    { label: 'Kurta Set (Silk Festive)', value: 'kurta' },
    { label: 'Indo-Western Tuxedo', value: 'indowestern' },
    { label: 'Imperial Bandhgala Jacket', value: 'bandhgala' }
  ],
  bridal: [
    { label: 'Heirloom Bridal Lehenga', value: 'lehenga' },
    { label: 'Royal Groom Sherwani', value: 'sherwani' },
    { label: 'Royal Heritage Brocade Saree', value: 'saree' }
  ],
  accessories: [
    { label: 'Luxury Handbags & Potlis', value: 'bag' },
    { label: 'Royal Footwear & Mojaris', value: 'shoes' },
    { label: 'Master Timepieces & Watches', value: 'watch' },
    { label: 'Heirloom Fine Jewellery', value: 'jewellery' }
  ]
}

const availableSubcategoriesForFilter = computed(() => {
  if (filterCat.value === 'all') return []
  return subcategoriesMap[filterCat.value] || []
})

const formatSubcategoryName = (sub) => {
  if (!sub) return 'Couture Piece'
  if (sub === 'kurthi set') return 'Kurti Set'
  if (sub === 'coord set') return 'Coord Set'
  if (sub === 'saree') return 'Saree'
  if (sub === 'sherwani') return 'Sherwani'
  if (sub === 'kurta') return 'Kurta Set'
  if (sub === 'indowestern') return 'Indo-Western'
  if (sub === 'bandhgala') return 'Bandhgala'
  if (sub === 'lehenga') return 'Bridal Lehenga'
  if (sub === 'bag') return 'Bag / Potli'
  if (sub === 'shoes') return 'Footwear / Mojari'
  if (sub === 'watch') return 'Timepiece / Watch'
  if (sub === 'jewellery') return 'Fine Jewellery'
  return sub
}

// Filtered products list
const filteredProducts = computed(() => {
  let list = productStore.products

  if (filterCat.value !== 'all') {
    list = list.filter(p => p.category === filterCat.value)
  }

  if (filterSubcat.value !== 'all') {
    list = list.filter(p => p.subcategory === filterSubcat.value)
  }

  if (productSearch.value.trim()) {
    const q = productSearch.value.toLowerCase().trim()
    list = list.filter(p => 
      p.name?.toLowerCase().includes(q) || 
      p.fabric?.toLowerCase().includes(q) ||
      String(p.id).toLowerCase().includes(q) ||
      p.subcategory?.toLowerCase().includes(q) ||
      p.badge?.toLowerCase().includes(q) ||
      p.tag?.toLowerCase().includes(q)
    )
  }

  return list
})

// Metrics
const totalInventoryValue = computed(() => {
  return productStore.products.reduce((acc, p) => acc + (Number(p.price) || 0), 0)
})

const totalGrossRevenue = computed(() => {
  return cartStore.orders.reduce((acc, o) => acc + (Number(o.total) || 0), 0)
})

const averageOrderValue = computed(() => {
  if (!cartStore.orders.length) return 0
  return Math.round(totalGrossRevenue.value / cartStore.orders.length)
})

const confirmedAppointmentsCount = computed(() => {
  return appointmentStore.appointments.filter(a => a.status === 'Confirmed').length
})

const womenCount = computed(() => productStore.products.filter(p => p.category === 'women').length)
const menCount = computed(() => productStore.products.filter(p => p.category === 'men').length)
const bridalCount = computed(() => productStore.products.filter(p => p.category === 'bridal').length)
const accessoriesCount = computed(() => productStore.products.filter(p => p.category === 'accessories').length)

// ----------------------------------------------------
// PRODUCT MODAL & 5-IMAGE UPLOAD
// ----------------------------------------------------
const isProductModalOpen = ref(false)
const editingProductId = ref(null)

const productForm = reactive({
  name: '',
  category: 'women',
  subcategory: 'saree',
  price: '',
  originalPrice: '',
  images: [], // up to 5 images
  fabric: '',
  badge: '',
  tag: '',
  description: ''
})

const currentSubcategories = computed(() => {
  return subcategoriesMap[productForm.category] || subcategoriesMap.women
})

const onCategoryChange = () => {
  const available = subcategoriesMap[productForm.category]
  if (available && available.length > 0) {
    productForm.subcategory = available[0].value
  }
}

const openAddProductModal = () => {
  editingProductId.value = null
  Object.assign(productForm, {
    name: '',
    category: 'women',
    subcategory: 'saree',
    price: '',
    originalPrice: '',
    images: ['/images/sarees/saree-1-banarasi.jpg'],
    fabric: 'Pure Handloom Silk with 24K Gold Zari',
    badge: 'Atelier Exclusive',
    tag: 'Bespoke Heirloom',
    description: 'An exquisite handwoven silhouette handcrafted by Master Artisans in Coimbatore.'
  })
  isProductModalOpen.value = true
}

const openEditProductModal = (product) => {
  editingProductId.value = product.id
  
  // Extract images array up to 5
  let existingImages = []
  if (Array.isArray(product.images) && product.images.length > 0) {
    existingImages = [...product.images]
  } else if (product.image) {
    existingImages = [product.image]
    if (product.secondaryImage && product.secondaryImage !== product.image) {
      existingImages.push(product.secondaryImage)
    }
  }

  Object.assign(productForm, {
    name: product.name,
    category: product.category,
    subcategory: product.subcategory || 'saree',
    price: product.price,
    originalPrice: product.originalPrice || product.price,
    images: existingImages.slice(0, 5),
    fabric: product.fabric || 'Pure Handloom Silk',
    badge: product.badge || '',
    tag: product.tag || '',
    description: product.description || ''
  })
  isProductModalOpen.value = true
}

const closeProductModal = () => {
  isProductModalOpen.value = false
  editingProductId.value = null
}

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files || [])
  if (!files.length) return

  const remainingSlots = 5 - productForm.images.length
  const filesToProcess = files.slice(0, remainingSlots)

  filesToProcess.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (productForm.images.length < 5) {
        productForm.images.push(e.target.result)
      }
    }
    reader.readAsDataURL(file)
  })

  event.target.value = ''
}

const removeImageSlot = (index) => {
  productForm.images.splice(index, 1)
}

const makeCoverImage = (index) => {
  const [selected] = productForm.images.splice(index, 1)
  productForm.images.unshift(selected)
}

const saveProduct = () => {
  if (!productForm.images.length) {
    alert('Please upload at least 1 image for the creation.')
    return
  }

  const payload = {
    ...productForm,
    image: productForm.images[0],
    secondaryImage: productForm.images[1] || productForm.images[0]
  }

  if (editingProductId.value) {
    productStore.updateProduct(editingProductId.value, payload)
    showToast(`"${productForm.name}" updated successfully!`, '✓')
  } else {
    productStore.addProduct(payload)
    showToast(`"${productForm.name}" published to catalog!`, '✨')
  }
  closeProductModal()
}

const duplicateProduct = (product) => {
  const cloned = {
    ...product,
    id: `custom-${Date.now()}`,
    name: `${product.name} (Copy)`
  }
  productStore.addProduct(cloned)
  showToast(`Duplicated "${product.name}"`, '📑')
}

const handleDeleteProduct = (product) => {
  if (confirm(`Are you sure you want to delete "${product.name}" from the boutique catalog?`)) {
    productStore.deleteProduct(product.id)
    showToast(`Deleted "${product.name}"`, '🗑️')
  }
}

const confirmResetCatalog = () => {
  if (confirm('This will restore all default 56 creations across Women, Men, Bridal, and Accessories. Proceed?')) {
    productStore.resetToDefaultProducts()
    showToast('Restored default 56 creations', '🔄')
  }
}

// ----------------------------------------------------
// ORDER ACTIONS
// ----------------------------------------------------
const handleOrderStatusChange = (order) => {
  try {
    localStorage.setItem('lecotrus_orders', JSON.stringify(cartStore.orders))
    showToast(`Order ${order.orderId} status set to "${order.status}"`, '📦')
  } catch (e) {
    console.error('Error saving order status:', e)
  }
}

// ----------------------------------------------------
// APPOINTMENT ACTIONS
// ----------------------------------------------------
const isAppointmentModalOpen = ref(false)
const appointmentForm = reactive({
  name: '',
  phone: '',
  email: '',
  service: 'Bridal Heirloom Lehenga Consultation',
  date: new Date().toISOString().split('T')[0],
  time: '11:30 AM',
  notes: ''
})

const openAddAppointmentModal = () => {
  Object.assign(appointmentForm, {
    name: '',
    phone: '',
    email: '',
    service: 'Bridal Heirloom Lehenga Consultation',
    date: new Date().toISOString().split('T')[0],
    time: '11:30 AM',
    notes: ''
  })
  isAppointmentModalOpen.value = true
}

const saveNewAppointment = () => {
  appointmentStore.addAppointment({ ...appointmentForm })
  isAppointmentModalOpen.value = false
  showToast(`Appointment scheduled for ${appointmentForm.name}`, '💍')
}

const handleAppointmentStatusChange = (apt) => {
  appointmentStore.updateAppointment(apt.id, { status: apt.status })
  showToast(`Consultation for ${apt.name} marked as ${apt.status}`, '✓')
}

const handleDeleteAppointment = (apt) => {
  if (confirm(`Remove appointment for ${apt.name}?`)) {
    appointmentStore.deleteAppointment(apt.id)
    showToast(`Removed appointment for ${apt.name}`, '🗑️')
  }
}

// ----------------------------------------------------
// MEASUREMENT ACTIONS & SHEET MANAGEMENT (LECOTRUS)
// ----------------------------------------------------
const measurementSearch = ref('')
const measurementGarmentFilter = ref('all')
const isMeasurementModalOpen = ref(false)
const isPrintSlipModalOpen = ref(false)
const editingMeasurementId = ref(null)
const selectedMeasurementForPrint = ref(null)

const defaultMeasurementFields = () => ({
  orderNo: '',
  clientName: '',
  phone: '',
  email: '',
  date: new Date().toISOString().split('T')[0],
  dueDate: '',
  garmentType: 'Bridal Blouse & Lehenga',
  status: 'In Cutting',
  measurements: {
    // Left Column (12 fields)
    shoulder: '',
    frontNeckDepth: '',
    backNeckDepth: '',
    neckRound: '',
    armhole: '',
    chest: '',
    bustToBust: '',
    waist: '',
    hip: '',
    seat: '',
    sleeveLength: '',
    sleeveRound: '',
    // Right Column (12 fields)
    wristRound: '',
    shoulderToBust: '',
    shoulderToWaist: '',
    shoulderToHip: '',
    shoulderToSeat: '',
    fullLength: '',
    thighRound: '',
    kneeRound: '',
    waistToThigh: '',
    waistToKnee: '',
    ankleRound: '',
    waistToFloorLength: ''
  },
  specifications: {
    frontNeck: '',
    backNeck: '',
    sleeveStyle: '',
    pads: 'Yes',
    hookOpening: 'Back Hook',
    lining: 'Pure Cotton',
    margin: '2 inches'
  },
  notes: ''
})

const measurementForm = reactive(defaultMeasurementFields())

const filteredMeasurements = computed(() => {
  let list = measurementStore.measurements

  if (measurementGarmentFilter.value !== 'all') {
    list = list.filter(m => m.garmentType?.toLowerCase().includes(measurementGarmentFilter.value.toLowerCase()))
  }

  if (measurementSearch.value.trim()) {
    const q = measurementSearch.value.toLowerCase().trim()
    list = list.filter(m => 
      m.clientName?.toLowerCase().includes(q) ||
      m.phone?.toLowerCase().includes(q) ||
      m.orderNo?.toLowerCase().includes(q) ||
      m.garmentType?.toLowerCase().includes(q) ||
      m.notes?.toLowerCase().includes(q)
    )
  }

  return list
})

const openAddMeasurementModal = () => {
  editingMeasurementId.value = null
  const initial = defaultMeasurementFields()
  initial.orderNo = measurementStore.generateOrderNo()
  Object.assign(measurementForm, initial)
  isMeasurementModalOpen.value = true
}

const openEditMeasurementModal = (item) => {
  editingMeasurementId.value = item.id
  Object.assign(measurementForm, JSON.parse(JSON.stringify(item)))
  isMeasurementModalOpen.value = true
}

const closeMeasurementModal = () => {
  isMeasurementModalOpen.value = false
  editingMeasurementId.value = null
}

const saveMeasurement = () => {
  if (!measurementForm.clientName.trim()) {
    alert('Please enter client full name.')
    return
  }

  const payload = JSON.parse(JSON.stringify(measurementForm))

  if (editingMeasurementId.value) {
    measurementStore.updateMeasurement(editingMeasurementId.value, payload)
    showToast(`Measurement sheet for "${payload.clientName}" updated!`, '✓')
  } else {
    measurementStore.addMeasurement(payload)
    showToast(`Measurement sheet for "${payload.clientName}" (${payload.orderNo}) saved!`, '📏')
  }
  closeMeasurementModal()
}

const handleDeleteMeasurement = (item) => {
  if (confirm(`Are you sure you want to remove measurement record for ${item.clientName} (${item.orderNo})?`)) {
    measurementStore.deleteMeasurement(item.id)
    showToast(`Removed measurements for ${item.clientName}`, '🗑️')
  }
}

const handleMeasurementStatusChange = (item) => {
  measurementStore.updateMeasurement(item.id, { status: item.status })
  showToast(`Order ${item.orderNo} status set to "${item.status}"`, '✓')
}

const openPrintSlipModal = (item) => {
  selectedMeasurementForPrint.value = item
  isPrintSlipModalOpen.value = true
}

const closePrintSlipModal = () => {
  isPrintSlipModalOpen.value = false
  selectedMeasurementForPrint.value = null
}

const printSlip = () => {
  window.print()
}

const getWhatsAppMeasurementLink = (item) => {
  const phoneDigits = item.phone ? item.phone.replace(/[^0-9]/g, '') : ''
  const m = item.measurements || {}
  
  const text = `*LECOTRUS® BESPOKE ATELIER MEASUREMENT SLIP*
⚜️ *Order No:* ${item.orderNo || 'L-Bespoke'}
👤 *Client:* ${item.clientName}
👗 *Garment:* ${item.garmentType}
📅 *Due Date:* ${item.dueDate || 'As per trial'}
✨ *Status:* ${item.status || 'In Atelier'}

*KEY ATELIER MEASUREMENTS (Inches):*
• Shoulder: ${m.shoulder || '—'}" | Armhole: ${m.armhole || '—'}"
• Chest: ${m.chest || '—'}" | Waist: ${m.waist || '—'}" | Hip: ${m.hip || '—'}"
• Front Neck: ${m.frontNeckDepth || '—'}" | Back Neck: ${m.backNeckDepth || '—'}"
• Sleeve Length: ${m.sleeveLength || '—'}" | Sleeve Round: ${m.sleeveRound || '—'}"
• Full Length: ${m.fullLength || '—'}" | Waist to Floor: ${m.waistToFloorLength || '—'}"

*SPECIFICATIONS:*
• Front Neck: ${item.specifications?.frontNeck || 'Standard'}
• Back Neck: ${item.specifications?.backNeck || 'Standard'}
• Sleeve: ${item.specifications?.sleeveStyle || 'Standard'}
• Notes: ${item.notes || 'None'}

📍 *House of Lecotrus*, Venkatachalam Chetty St, R.S. Puram, Coimbatore`

  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(text)}`
}

</script>
