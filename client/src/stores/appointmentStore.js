import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppointmentStore = defineStore('appointment', () => {
  const initialAppointments = [
    {
      id: 'apt-101',
      name: 'Priyanka & Arjun Natarajan',
      phone: '+91 98430 12345',
      email: 'priyanka.n@gmail.com',
      service: 'Bridal Heirloom Lehenga Consultation',
      date: '2026-10-05',
      time: '11:30 AM',
      guests: 3,
      status: 'Confirmed',
      notes: 'Requested private bridal suite and trial with Master Zari Embroiderer.'
    },
    {
      id: 'apt-102',
      name: 'Dr. Vigneshwar Rao',
      phone: '+91 97890 54321',
      email: 'vignesh.rao@hospital.com',
      service: "Men's Groom Sherwani & Silk Bundi",
      date: '2026-10-06',
      time: '03:00 PM',
      guests: 2,
      status: 'Confirmed',
      notes: 'Custom chest measurement fitting for Imperial Velvet Sherwani.'
    },
    {
      id: 'apt-103',
      name: 'Meenakshi Sundaram',
      phone: '+91 94431 87654',
      email: 'meenakshi.s@outlook.com',
      service: 'Banarasi Brocade & Zari Saree Drape',
      date: '2026-10-07',
      time: '05:00 PM',
      guests: 1,
      status: 'Pending',
      notes: 'First time atelier visit for daughter wedding reception.'
    },
    {
      id: 'apt-104',
      name: 'Rajesh & Sneha Kothari',
      phone: '+91 99440 22334',
      email: 'rajesh.kothari@textiles.in',
      service: 'Fine Jewellery & Heritage Minaudiere Styling',
      date: '2026-10-08',
      time: '02:30 PM',
      guests: 2,
      status: 'Confirmed',
      notes: 'VIP client styling for Diwali Royal Gala.'
    }
  ]

  const loadSaved = () => {
    try {
      const saved = localStorage.getItem('lecotrus_appointments')
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.error('Error reading appointments:', e)
    }
    return initialAppointments
  }

  const appointments = ref(loadSaved())

  const syncToStorage = () => {
    try {
      localStorage.setItem('lecotrus_appointments', JSON.stringify(appointments.value))
    } catch (e) {
      console.error('Error saving appointments:', e)
    }
  }

  const addAppointment = (apt) => {
    const newApt = {
      ...apt,
      id: `apt-${Date.now()}`,
      status: apt.status || 'Confirmed'
    }
    appointments.value.unshift(newApt)
    syncToStorage()
    return newApt
  }

  const updateAppointment = (id, fields) => {
    const index = appointments.value.findIndex(a => a.id === id)
    if (index !== -1) {
      appointments.value[index] = { ...appointments.value[index], ...fields }
      syncToStorage()
    }
  }

  const deleteAppointment = (id) => {
    appointments.value = appointments.value.filter(a => a.id !== id)
    syncToStorage()
  }

  return {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment
  }
})
