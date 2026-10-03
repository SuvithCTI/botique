<template>
  <div v-if="cartStore.isCartOpen" class="fixed inset-0 z-50 overflow-hidden">
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      @click="cartStore.closeCart"
    ></div>

    <div class="fixed inset-y-0 right-0 max-w-full flex w-full justify-end">
      <div class="w-full sm:max-w-md bg-white border-l border-zinc-200 p-5 sm:p-6 shadow-2xl flex flex-col justify-between text-[#18181b]">
        
        <!-- TOP SECTION: HEADER & TABS -->
        <div>
          <!-- Title & Close -->
          <div class="flex items-center justify-between pb-4 border-b border-zinc-200">
            <div>
              <div class="text-[9px] uppercase tracking-[0.35em] text-[#b8860b] font-semibold">House of Lecotrus</div>
              <h2 class="font-serif text-xl tracking-[0.15em] uppercase text-black font-semibold mt-0.5">
                {{ cartStore.cartTab === 'bag' ? 'Couture Bag' : 'Atelier Orders' }}
              </h2>
            </div>
            <button 
              @click="cartStore.closeCart"
              class="text-zinc-400 hover:text-black p-2 transition-colors cursor-pointer text-base font-bold"
              aria-label="Close cart"
            >
              ✕
            </button>
          </div>

          <!-- Dual Tab Switcher: Bag vs Orders -->
          <div class="grid grid-cols-2 mt-4 bg-zinc-100 p-1 rounded-sm text-xs font-medium">
            <button 
              @click="cartStore.cartTab = 'bag'"
              class="py-2 rounded-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
              :class="cartStore.cartTab === 'bag' ? 'bg-black text-[#fef08a] shadow-sm font-semibold' : 'text-zinc-600 hover:text-black'"
            >
              <span>👜 Bag</span>
              <span 
                class="px-1.5 py-0.2 text-[10px] rounded-full"
                :class="cartStore.cartTab === 'bag' ? 'bg-[#b8860b] text-black font-bold' : 'bg-zinc-200 text-zinc-700'"
              >
                {{ cartStore.cartCount }}
              </span>
            </button>

            <button 
              @click="cartStore.cartTab = 'orders'"
              class="py-2 rounded-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
              :class="cartStore.cartTab === 'orders' ? 'bg-black text-[#fef08a] shadow-sm font-semibold' : 'text-zinc-600 hover:text-black'"
            >
              <span>⚜️ Orders</span>
              <span 
                class="px-1.5 py-0.2 text-[10px] rounded-full"
                :class="cartStore.cartTab === 'orders' ? 'bg-[#b8860b] text-black font-bold' : 'bg-zinc-200 text-zinc-700'"
              >
                {{ cartStore.ordersCount }}
              </span>
            </button>
          </div>

          <!-- TAB 1: COUTURE BAG CONTENT -->
          <div v-if="cartStore.cartTab === 'bag'">
            <!-- Empty State -->
            <div v-if="cartStore.items.length === 0" class="py-14 text-center">
              <div class="text-4xl mb-3 opacity-60">⚜️</div>
              <p class="font-serif text-base tracking-widest text-zinc-800 font-medium">Your Bag is Empty</p>
              <p class="text-xs text-zinc-500 mt-1.5 max-w-xs mx-auto font-light leading-relaxed">
                Explore our Haute Couture, Master Bespoke, and Fine Accessories to curate your wardrobe.
              </p>
              <button 
                v-if="cartStore.ordersCount > 0"
                @click="cartStore.cartTab = 'orders'"
                class="mt-4 inline-flex items-center gap-1.5 text-xs text-[#b8860b] hover:text-black font-semibold uppercase tracking-wider underline cursor-pointer"
              >
                View Placed Orders ({{ cartStore.ordersCount }}) →
              </button>
            </div>

            <!-- Items List -->
            <div v-else class="py-4 space-y-3.5 max-h-[50vh] overflow-y-auto pr-1">
              <div 
                v-for="item in cartStore.items" 
                :key="`${item.id}-${item.size}`"
                class="flex gap-3.5 p-3 bg-[#faf9f6] border border-zinc-200 rounded-sm"
              >
                <img :src="item.image" :alt="item.name" class="w-16 h-20 object-cover rounded-sm flex-shrink-0 border border-zinc-200" />
                <div class="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div class="flex justify-between items-start">
                      <h3 class="font-serif text-xs uppercase tracking-wider text-black font-medium truncate pr-2">{{ item.name }}</h3>
                      <button 
                        @click="cartStore.removeFromCart(item.id, item.size)" 
                        class="text-zinc-400 hover:text-red-600 text-xs cursor-pointer font-bold"
                        title="Remove from bag"
                      >
                        ✕
                      </button>
                    </div>
                    <p class="text-[11px] text-[#b8860b] font-semibold tracking-wider mt-0.5">₹{{ item.price.toLocaleString('en-IN') }}</p>
                    <p class="text-[10px] text-zinc-500 tracking-wider">Size: {{ item.size }}</p>
                  </div>
                  
                  <div class="flex items-center justify-between mt-2 pt-2 border-t border-zinc-200">
                    <div class="flex items-center border border-zinc-300 rounded-sm bg-white">
                      <button @click="cartStore.updateQuantity(item.id, item.size, -1)" class="px-2 py-0.5 text-xs text-zinc-600 hover:text-black">-</button>
                      <span class="px-2 text-xs text-zinc-800 font-medium">{{ item.quantity }}</span>
                      <button @click="cartStore.updateQuantity(item.id, item.size, 1)" class="px-2 py-0.5 text-xs text-zinc-600 hover:text-black">+</button>
                    </div>
                    <span class="text-xs font-serif text-black font-semibold">₹{{ (item.price * item.quantity).toLocaleString('en-IN') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 2: MY ORDERS CONTENT -->
          <div v-else-if="cartStore.cartTab === 'orders'">
            <!-- Empty State for Orders -->
            <div v-if="cartStore.orders.length === 0" class="py-14 text-center">
              <div class="text-4xl mb-3 opacity-60">📜</div>
              <p class="font-serif text-base tracking-widest text-zinc-800 font-medium">No Orders Placed Yet</p>
              <p class="text-xs text-zinc-500 mt-1.5 max-w-xs mx-auto font-light leading-relaxed">
                When you place bespoke or couture orders, their live craftsmanship status and receipts will appear here.
              </p>
              <button 
                @click="cartStore.cartTab = 'bag'"
                class="mt-4 px-4 py-2 bg-black text-[#fef08a] text-xs uppercase tracking-wider font-semibold hover:bg-[#b8860b] hover:text-black transition-all cursor-pointer"
              >
                Return to Bag
              </button>
            </div>

            <!-- Orders List -->
            <div v-else class="py-4 space-y-4 max-h-[62vh] overflow-y-auto pr-1">
              <div 
                v-for="order in cartStore.orders" 
                :key="order.orderId"
                class="p-4 bg-[#faf9f6] border border-zinc-200 rounded-sm space-y-3"
              >
                <!-- Order Header -->
                <div class="flex items-center justify-between border-b border-zinc-200 pb-2.5">
                  <div>
                    <span class="font-serif text-xs font-bold text-black tracking-wider block">{{ order.orderId }}</span>
                    <span class="text-[10px] text-zinc-400 font-light">
                      {{ new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) }}
                    </span>
                  </div>
                  <span class="text-[10px] font-semibold bg-[#b8860b]/15 text-[#b8860b] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    In Atelier Crafting
                  </span>
                </div>

                <!-- Order Pieces Thumbnails -->
                <div class="space-y-2">
                  <div 
                    v-for="item in order.items" 
                    :key="`${order.orderId}-${item.id}`"
                    class="flex items-center justify-between text-xs"
                  >
                    <div class="flex items-center gap-2">
                      <img :src="item.image" :alt="item.name" class="w-8 h-10 object-cover rounded-xs border border-zinc-200" />
                      <div class="max-w-[170px] truncate">
                        <p class="font-medium text-black truncate">{{ item.name }}</p>
                        <p class="text-[10px] text-zinc-500">Qty: {{ item.quantity }} · {{ item.size }}</p>
                      </div>
                    </div>
                    <span class="font-serif font-semibold text-zinc-800 text-[11px]">₹{{ (item.price * item.quantity).toLocaleString('en-IN') }}</span>
                  </div>
                </div>

                <!-- Shipping Address Summary -->
                <div class="text-[10.5px] text-zinc-600 bg-white p-2 rounded border border-zinc-200 space-y-0.5">
                  <p class="font-medium text-black">📍 {{ order.address?.firstName }} {{ order.address?.lastName }}</p>
                  <p class="truncate">{{ order.address?.street }}, {{ order.address?.city }} – {{ order.address?.pincode }}</p>
                </div>

                <!-- Order Footer & WhatsApp CTA -->
                <div class="pt-2 border-t border-zinc-200 flex items-center justify-between">
                  <div>
                    <span class="text-[10px] text-zinc-500 uppercase tracking-wider block">Total Amount</span>
                    <span class="font-serif text-sm font-bold text-[#b8860b]">₹{{ order.total?.toLocaleString('en-IN') }}</span>
                  </div>
                  <a 
                    :href="`https://wa.me/919876543210?text=Hello%20Lecotrus%20Atelier,%20checking%20status%20for%20order%20${order.orderId}`"
                    target="_blank"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#18181b] text-[#fef08a] hover:bg-[#b8860b] hover:text-black rounded-xs text-[10.5px] font-semibold tracking-wider transition-all"
                  >
                    <span>💬 WhatsApp Track</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FOOTER: ONLY FOR ACTIVE BAG TAB WITH ITEMS -->
        <div v-if="cartStore.cartTab === 'bag' && cartStore.items.length > 0" class="pt-5 border-t border-zinc-200 space-y-3.5">
          <div class="flex justify-between text-sm">
            <span class="text-zinc-600 tracking-widest text-xs uppercase">Subtotal (Taxes incl.)</span>
            <span class="font-serif text-[#b8860b] font-bold text-base">₹{{ cartStore.cartTotal.toLocaleString('en-IN') }}</span>
          </div>
          <div class="text-[11px] text-zinc-500 flex items-center gap-1.5 font-light">
            <span>✨</span> Complimentary White-Glove Atelier Delivery & Styling Guidance
          </div>
          <button 
            @click="goToCheckout"
            class="w-full py-3.5 bg-[#18181b] text-[#fef08a] font-semibold text-xs tracking-[0.25em] uppercase hover:bg-[#b8860b] hover:text-black transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <span>→</span>
          </button>
        </div>
        
        <!-- FOOTER: FOR ORDERS TAB -->
        <div v-else-if="cartStore.cartTab === 'orders' && cartStore.orders.length > 0" class="pt-4 border-t border-zinc-200">
          <button 
            @click="cartStore.cartTab = 'bag'"
            class="w-full py-2.5 border border-zinc-300 text-zinc-800 font-semibold text-xs tracking-wider uppercase hover:border-black transition-all text-center"
          >
            ← Back to Active Bag
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'

const router = useRouter()
const cartStore = useCartStore()

const goToCheckout = () => {
  cartStore.closeCart()
  router.push('/checkout')
}
</script>
