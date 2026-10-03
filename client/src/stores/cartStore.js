import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const isCartOpen = ref(false)
  const cartTab = ref('bag') // 'bag' | 'orders'
  const wishlist = ref([])
  const isWishlistOpen = ref(false)
  const lastOrder = ref(null)

  // Initialize orders from localStorage with fallback
  const loadSavedOrders = () => {
    try {
      const saved = localStorage.getItem('lecotrus_orders')
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.error('Error loading orders:', e)
    }
    return []
  }

  const orders = ref(loadSavedOrders())

  const cartTotal = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const cartCount = computed(() => {
    return items.value.reduce((count, item) => count + item.quantity, 0)
  })

  const ordersCount = computed(() => orders.value.length)
  const wishlistCount = computed(() => wishlist.value.length)

  const addToCart = (product, selectedSize = 'Custom Bespoke') => {
    const existing = items.value.find(i => i.id === product.id && i.size === selectedSize)
    if (existing) {
      existing.quantity += 1
    } else {
      items.value.push({
        ...product,
        size: selectedSize,
        quantity: 1
      })
    }
    cartTab.value = 'bag'
    isCartOpen.value = true
  }

  const removeFromCart = (id, size) => {
    items.value = items.value.filter(i => !(i.id === id && i.size === size))
  }

  const updateQuantity = (id, size, delta) => {
    const item = items.value.find(i => i.id === id && i.size === size)
    if (item) {
      item.quantity += delta
      if (item.quantity <= 0) {
        removeFromCart(id, size)
      }
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const addOrder = (order) => {
    orders.value.unshift(order)
    lastOrder.value = order
    try {
      localStorage.setItem('lecotrus_orders', JSON.stringify(orders.value))
    } catch (e) {
      console.error('Error saving orders:', e)
    }
  }

  const setLastOrder = (order) => {
    lastOrder.value = order
  }

  const toggleWishlist = (product) => {
    const index = wishlist.value.findIndex(p => p.id === product.id)
    if (index > -1) {
      wishlist.value.splice(index, 1)
    } else {
      wishlist.value.push(product)
    }
  }

  const isInWishlist = (productId) => {
    return wishlist.value.some(p => p.id === productId)
  }

  const openCart = (tab = 'bag') => { 
    cartTab.value = tab
    isCartOpen.value = true 
  }
  
  const closeCart = () => { 
    isCartOpen.value = false 
  }
  
  const openWishlist = () => { 
    isWishlistOpen.value = true 
  }
  
  const closeWishlist = () => { 
    isWishlistOpen.value = false 
  }

  return {
    items,
    orders,
    cartTab,
    isCartOpen,
    wishlist,
    isWishlistOpen,
    lastOrder,
    cartTotal,
    cartCount,
    ordersCount,
    wishlistCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addOrder,
    setLastOrder,
    toggleWishlist,
    isInWishlist,
    openCart,
    closeCart,
    openWishlist,
    closeWishlist
  }
})
