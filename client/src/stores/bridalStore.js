import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBridalStore = defineStore('bridal', () => {
  const isModalOpen = ref(false)
  const selectedBoutique = ref('New Delhi - The Manor & Bridal Suite')
  const consultationType = ref('In-Person Salon Experience') // or 'Virtual Couture Concierge'
  const isSubmitted = ref(false)
  const lastBookingDetails = ref(null)

  const openBookingModal = (boutique = null) => {
    if (boutique) {
      selectedBoutique.value = boutique
    }
    isSubmitted.value = false
    isModalOpen.value = true
  }

  const closeBookingModal = () => {
    isModalOpen.value = false
  }

  const submitBooking = (formData) => {
    lastBookingDetails.value = { ...formData, boutique: selectedBoutique.value, type: consultationType.value }
    isSubmitted.value = true
  }

  return {
    isModalOpen,
    selectedBoutique,
    consultationType,
    isSubmitted,
    lastBookingDetails,
    openBookingModal,
    closeBookingModal,
    submitBooking
  }
})
