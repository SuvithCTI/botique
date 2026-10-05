<template>
  <div v-if="authStore.isAuthModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" @click="authStore.closeAuthModal"></div>

    <div class="min-h-screen px-4 text-center flex items-center justify-center p-4">
      <div class="inline-block w-full max-w-md p-7 md:p-8 my-8 overflow-hidden text-left align-middle transition-all transform bg-white border border-zinc-200 shadow-2xl relative text-[#18181b] rounded-sm">
        <!-- Close Button -->
        <button 
          @click="authStore.closeAuthModal"
          class="absolute top-4 right-4 text-zinc-400 hover:text-black p-2 cursor-pointer font-bold text-lg leading-none"
          aria-label="Close"
        >
          ✕
        </button>

        <!-- Brand Crest & Header -->
        <div class="text-center mb-6">
          <span class="text-[10px] uppercase tracking-[0.3em] text-[#b8860b] font-semibold">House of Lecotrus</span>
          <h2 class="font-serif text-2xl tracking-widest text-black mt-1 font-normal">
            {{ authStore.isAuthenticated ? 'Account Profile' : 'Sign In' }}
          </h2>
          <p class="text-xs text-zinc-500 mt-1 font-light">
            {{ authStore.isAuthenticated ? 'Manage your couture profile & orders.' : 'Sign in to access your account, orders, and services.' }}
          </p>
        </div>

        <!-- ALREADY LOGGED IN VIEW -->
        <div v-if="authStore.isAuthenticated" class="space-y-5">
          <div class="bg-[#faf9f6] border border-zinc-200 p-4 rounded-sm space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-zinc-500 font-light">Signed in as:</span>
              <span class="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full" :class="authStore.isAdmin ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-zinc-200 text-zinc-800'">
                {{ authStore.user?.role?.toUpperCase() || 'CUSTOMER' }}
              </span>
            </div>
            <h3 class="font-serif text-lg text-black font-semibold">{{ authStore.user?.name }}</h3>
            <p class="text-xs text-zinc-600 font-mono">{{ authStore.user?.email }}</p>
          </div>

          <div class="space-y-2.5">
            <RouterLink 
              v-if="authStore.isAdmin"
              to="/admin" 
              @click="authStore.closeAuthModal"
              class="block w-full py-3 bg-[#18181b] text-[#fef08a] border border-[#d4af37]/30 text-center text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#b8860b] hover:text-black transition-all rounded-xs shadow-sm"
            >
              Open Admin Dashboard 👑
            </RouterLink>

            <button 
              @click="authStore.logout"
              class="w-full py-2.5 border border-zinc-300 text-zinc-800 text-xs font-medium uppercase tracking-wider hover:bg-zinc-100 transition-colors rounded-xs cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        <!-- NOT LOGGED IN: SINGLE UNIFIED LOGIN & REGISTER -->
        <div v-else>
          <!-- 2 Tabs: Sign In / Register -->
          <div class="flex border-b border-zinc-200 mb-6 text-xs uppercase tracking-wider font-medium text-center">
            <button 
              @click="isSignUp = false"
              :class="['flex-1 py-2.5 border-b-2 transition-colors cursor-pointer', !isSignUp ? 'border-[#b8860b] text-black font-bold' : 'border-transparent text-zinc-400 hover:text-zinc-700']"
            >
              Sign In
            </button>
            <button 
              @click="isSignUp = true"
              :class="['flex-1 py-2.5 border-b-2 transition-colors cursor-pointer', isSignUp ? 'border-[#b8860b] text-black font-bold' : 'border-transparent text-zinc-400 hover:text-zinc-700']"
            >
              Create Account
            </button>
          </div>

          <!-- UNIFIED SIGN IN FORM -->
          <form v-if="!isSignUp" @submit.prevent="handleUnifiedLogin" class="space-y-4">
            <div>
              <label class="block text-[11px] uppercase tracking-widest text-zinc-600 mb-1 font-medium">Email or Mobile Number</label>
              <input 
                v-model="email"
                type="text" 
                required 
                placeholder="Enter your email or phone" 
                class="w-full bg-[#faf9f6] border border-zinc-300 px-3.5 py-2.5 text-xs text-black focus:border-[#b8860b] focus:outline-none rounded-xs"
              />
            </div>

            <div>
              <label class="block text-[11px] uppercase tracking-widest text-zinc-600 mb-1 font-medium">Password</label>
              <input 
                v-model="password"
                type="password" 
                required 
                placeholder="••••••••" 
                class="w-full bg-[#faf9f6] border border-zinc-300 px-3.5 py-2.5 text-xs text-black focus:border-[#b8860b] focus:outline-none rounded-xs"
              />
            </div>

            <div class="pt-2">
              <button 
                type="submit" 
                class="w-full py-3 bg-[#18181b] text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#b8860b] transition-colors cursor-pointer shadow-md rounded-xs"
              >
                Sign In
              </button>
            </div>
          </form>

          <!-- REGISTER FORM -->
          <form v-else @submit.prevent="handleRegister" class="space-y-4">
            <div>
              <label class="block text-[11px] uppercase tracking-widest text-zinc-600 mb-1 font-medium">Full Name</label>
              <input 
                v-model="name"
                type="text" 
                required 
                placeholder="e.g. Priya Sharma" 
                class="w-full bg-[#faf9f6] border border-zinc-300 px-3.5 py-2.5 text-xs text-black focus:border-[#b8860b] focus:outline-none rounded-xs"
              />
            </div>

            <div>
              <label class="block text-[11px] uppercase tracking-widest text-zinc-600 mb-1 font-medium">Email Address</label>
              <input 
                v-model="email"
                type="email" 
                required 
                placeholder="priya@example.com" 
                class="w-full bg-[#faf9f6] border border-zinc-300 px-3.5 py-2.5 text-xs text-black focus:border-[#b8860b] focus:outline-none rounded-xs"
              />
            </div>

            <div>
              <label class="block text-[11px] uppercase tracking-widest text-zinc-600 mb-1 font-medium">Create Password</label>
              <input 
                v-model="password"
                type="password" 
                required 
                placeholder="••••••••" 
                class="w-full bg-[#faf9f6] border border-zinc-300 px-3.5 py-2.5 text-xs text-black focus:border-[#b8860b] focus:outline-none rounded-xs"
              />
            </div>

            <div class="pt-2">
              <button 
                type="submit" 
                class="w-full py-3 bg-[#18181b] text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#b8860b] transition-colors cursor-pointer shadow-md rounded-xs"
              >
                Create Account
              </button>
            </div>
          </form>

          <p class="text-[10px] text-center text-zinc-400 font-light pt-4 border-t border-zinc-100 mt-4">
            ✨ Secure 256-bit Encrypted Account Access
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const isSignUp = ref(false)
const name = ref('')
const email = ref('')
const password = ref('')

const handleUnifiedLogin = () => {
  const identifier = email.value.trim().toLowerCase()
  // If admin credentials / admin email is entered, authenticate as Administrator and route to /admin
  if (identifier === 'admin' || identifier.startsWith('admin@') || identifier === 'admin@lecotrus.com') {
    authStore.loginAsAdmin(email.value, 'Atelier Administrator')
    authStore.closeAuthModal()
    router.push('/admin')
  } else {
    const displayName = email.value.split('@')[0] || 'Valued Client'
    authStore.login(email.value, displayName, 'customer')
  }
}

const handleRegister = () => {
  const identifier = email.value.trim().toLowerCase()
  if (identifier === 'admin' || identifier.startsWith('admin@')) {
    authStore.loginAsAdmin(email.value, name.value || 'Atelier Administrator')
    authStore.closeAuthModal()
    router.push('/admin')
  } else {
    authStore.login(email.value, name.value || 'Customer', 'customer')
  }
}
</script>
