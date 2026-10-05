import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { luxuryProducts as defaultProducts } from '@/data/products'

export const useProductStore = defineStore('product', () => {
  // Load products from localStorage or fall back to default products
  const loadSavedProducts = () => {
    try {
      const saved = localStorage.getItem('lecotrus_custom_products')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge with updated default products for any core catalog items
          return parsed.map(item => {
            const defaultMatch = defaultProducts.find(d => d.id === item.id)
            if (defaultMatch) {
              // If image was a remote unsplash or placeholder, update to new local asset
              if (!item.image || item.image.includes('unsplash.com') || item.image.includes('placeholder')) {
                return {
                  ...item,
                  image: defaultMatch.image,
                  secondaryImage: defaultMatch.secondaryImage || defaultMatch.image,
                  images: defaultMatch.images || [defaultMatch.image]
                }
              }
            }
            return item
          })
        }
      }
    } catch (e) {
      console.error('Error reading products from localStorage:', e)
    }
    return JSON.parse(JSON.stringify(defaultProducts))
  }

  // Load boutique settings from localStorage
  const loadSavedSettings = () => {
    try {
      const saved = localStorage.getItem('lecotrus_boutique_settings')
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.error('Error reading settings:', e)
    }
    return {
      flagshipName: 'House of Lecotrus Bridal & Haute Couture',
      address: 'Venkatachalam Chetty St, R.S. Puram, Coimbatore, Tamil Nadu 641002',
      mapsUrl: 'https://maps.app.goo.gl/exDw7KXJ4Tnr2BwP6?g_st=ic',
      phone: '+91 90474 74454',
      whatsapp: '919047474454',
      email: 'coimbatore@lecotrus.com',
      hoursWeekday: 'Mon – Sat: 10:30 AM – 8:00 PM',
      hoursSunday: 'Sunday: 11:00 AM – 6:00 PM',
      announcementBar: 'COMPLIMENTARY WHITE-GLOVE ATELIER DELIVERY ACROSS COIMBATORE & INDIA · BESPOKE FITTINGS BY APPOINTMENT',
      promoCode1: 'ROYAL10',
      promoDiscount1: 10,
      promoCode2: 'COIMBATORE',
      promoDiscount2: 15
    }
  }

  const products = ref(loadSavedProducts())
  const settings = ref(loadSavedSettings())

  const syncProductsToStorage = () => {
    try {
      localStorage.setItem('lecotrus_custom_products', JSON.stringify(products.value))
    } catch (e) {
      console.error('Error saving products to localStorage:', e)
    }
  }

  const syncSettingsToStorage = () => {
    try {
      localStorage.setItem('lecotrus_boutique_settings', JSON.stringify(settings.value))
    } catch (e) {
      console.error('Error saving settings to localStorage:', e)
    }
  }

  // Getters
  const allProducts = computed(() => products.value)
  const womenProducts = computed(() => products.value.filter(p => p.category === 'women'))
  const menProducts = computed(() => products.value.filter(p => p.category === 'men'))
  const bridalProducts = computed(() => products.value.filter(p => p.category === 'bridal'))
  const accessoriesProducts = computed(() => products.value.filter(p => p.category === 'accessories'))

  const getProductById = (id) => {
    return products.value.find(p => String(p.id) === String(id))
  }

  // Mutations (CRUD)
  const addProduct = (newProduct) => {
    const id = newProduct.id || `custom-${Date.now()}`
    const imagesList = Array.isArray(newProduct.images) && newProduct.images.length > 0
      ? newProduct.images.slice(0, 5)
      : [newProduct.image || '/images/sarees/saree-1-banarasi.jpg']

    const productToAdd = {
      ...newProduct,
      id,
      images: imagesList,
      image: imagesList[0] || newProduct.image || '/images/sarees/saree-1-banarasi.jpg',
      secondaryImage: imagesList[1] || imagesList[0] || newProduct.secondaryImage,
      price: Number(newProduct.price) || 0,
      originalPrice: Number(newProduct.originalPrice) || Number(newProduct.price) || 0
    }
    products.value.unshift(productToAdd)
    syncProductsToStorage()
    return productToAdd
  }

  const updateProduct = (id, updatedFields) => {
    const index = products.value.findIndex(p => String(p.id) === String(id))
    if (index !== -1) {
      const existing = products.value[index]
      let imagesList = updatedFields.images
      if (Array.isArray(imagesList) && imagesList.length > 0) {
        imagesList = imagesList.slice(0, 5)
      } else if (updatedFields.image) {
        imagesList = [updatedFields.image]
      } else {
        imagesList = existing.images || [existing.image]
      }

      products.value[index] = {
        ...existing,
        ...updatedFields,
        images: imagesList,
        image: imagesList[0] || updatedFields.image || existing.image,
        secondaryImage: imagesList[1] || imagesList[0] || updatedFields.secondaryImage || existing.secondaryImage,
        price: Number(updatedFields.price !== undefined ? updatedFields.price : existing.price),
        originalPrice: Number(updatedFields.originalPrice !== undefined ? updatedFields.originalPrice : existing.originalPrice)
      }
      syncProductsToStorage()
      return products.value[index]
    }
    return null
  }

  const deleteProduct = (id) => {
    products.value = products.value.filter(p => String(p.id) !== String(id))
    syncProductsToStorage()
  }

  const resetToDefaultProducts = () => {
    products.value = JSON.parse(JSON.stringify(defaultProducts))
    localStorage.removeItem('lecotrus_custom_products')
  }

  const updateSettings = (newSettings) => {
    settings.value = { ...settings.value, ...newSettings }
    syncSettingsToStorage()
  }

  return {
    products,
    settings,
    allProducts,
    womenProducts,
    menProducts,
    bridalProducts,
    accessoriesProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDefaultProducts,
    updateSettings
  }
})
