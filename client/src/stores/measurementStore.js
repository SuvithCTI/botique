import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMeasurementStore = defineStore('measurement', () => {
  // Default sample measurements
  const defaultMeasurements = [
    {
      id: 'm_1',
      orderNo: 'L-101',
      clientName: 'Priyanka Sundaram',
      phone: '+91 98422 12345',
      email: 'priyanka.s@gmail.com',
      date: '2026-10-01',
      dueDate: '2026-10-15',
      garmentType: 'Bridal Blouse & Lehenga',
      status: 'In Embroidery',
      measurements: {
        // Left Column
        shoulder: '14.5',
        frontNeckDepth: '7.5',
        backNeckDepth: '10.5',
        neckRound: '15.0',
        armhole: '16.5',
        chest: '36.0',
        bustToBust: '7.5',
        waist: '30.0',
        hip: '38.0',
        seat: '40.0',
        sleeveLength: '11.5',
        sleeveRound: '12.0',
        // Right Column
        wristRound: '6.5',
        shoulderToBust: '10.0',
        shoulderToWaist: '14.5',
        shoulderToHip: '21.0',
        shoulderToSeat: '25.0',
        fullLength: '42.0',
        thighRound: '22.0',
        kneeRound: '15.0',
        waistToThigh: '12.0',
        waistToKnee: '21.0',
        ankleRound: '11.0',
        waistToFloorLength: '41.5'
      },
      specifications: {
        frontNeck: 'Sweetheart Neck with Zardozi border',
        backNeck: 'Deep U with heavy Dori latkans',
        sleeveStyle: 'Elbow length with Maggam peacock motifs',
        pads: 'Yes (B-Cup padded)',
        hookOpening: 'Back Hook with concealed eyelets',
        lining: 'Pure Cotton double-washed',
        margin: '2.5 inches seam margin'
      },
      notes: 'Bridal Muhurtham wear. High contrast antique gold antique zari work on crimson silk. Trial scheduled 2 days prior to wedding.'
    },
    {
      id: 'm_2',
      orderNo: 'L-102',
      clientName: 'Aishwarya Ramanathan',
      phone: '+91 94433 67890',
      email: 'aishwarya.r@yahoo.com',
      date: '2026-10-02',
      dueDate: '2026-10-10',
      garmentType: 'Kanjeevaram Saree Blouse',
      status: 'In Cutting',
      measurements: {
        shoulder: '14.0',
        frontNeckDepth: '7.0',
        backNeckDepth: '9.0',
        neckRound: '14.5',
        armhole: '15.5',
        chest: '34.0',
        bustToBust: '7.0',
        waist: '28.0',
        hip: '36.0',
        seat: '37.5',
        sleeveLength: '10.5',
        sleeveRound: '11.0',
        wristRound: '6.0',
        shoulderToBust: '9.5',
        shoulderToWaist: '14.0',
        shoulderToHip: '20.5',
        shoulderToSeat: '24.5',
        fullLength: '14.5',
        thighRound: '20.0',
        kneeRound: '14.0',
        waistToThigh: '11.0',
        waistToKnee: '20.0',
        ankleRound: '10.0',
        waistToFloorLength: '39.0'
      },
      specifications: {
        frontNeck: 'Classic Round Neck',
        backNeck: 'Potli button keyhole back',
        sleeveStyle: 'Elbow with pure gold zari border cutwork',
        pads: 'No',
        hookOpening: 'Front Hook',
        lining: 'Pure Cotton',
        margin: '2 inches'
      },
      notes: 'Reception blouse for Emerald Green Kanjeevaram. Minimalist floral embroidery on sleeve cuffs.'
    },
    {
      id: 'm_3',
      orderNo: 'L-103',
      clientName: 'Divya Krishnan',
      phone: '+91 97909 54321',
      email: 'divyak@hotmail.com',
      date: '2026-10-03',
      dueDate: '2026-10-18',
      garmentType: 'Haute Couture Anarkali Set',
      status: 'Ready for Trial',
      measurements: {
        shoulder: '15.0',
        frontNeckDepth: '7.5',
        backNeckDepth: '8.0',
        neckRound: '15.5',
        armhole: '17.0',
        chest: '38.0',
        bustToBust: '8.0',
        waist: '32.0',
        hip: '40.0',
        seat: '42.0',
        sleeveLength: '21.0',
        sleeveRound: '10.5',
        wristRound: '6.5',
        shoulderToBust: '10.5',
        shoulderToWaist: '15.0',
        shoulderToHip: '22.0',
        shoulderToSeat: '26.0',
        fullLength: '52.0',
        thighRound: '23.0',
        kneeRound: '16.0',
        waistToThigh: '12.5',
        waistToKnee: '21.5',
        ankleRound: '11.5',
        waistToFloorLength: '42.0'
      },
      specifications: {
        frontNeck: 'Angrakha V-Neck',
        backNeck: 'High neck with teardrop keyhole',
        sleeveStyle: 'Full Churidar sleeves',
        pads: 'Yes (Soft molded)',
        hookOpening: 'Side Concealed YKK Zipper',
        lining: 'Mulmul Cotton & Silk Crepe',
        margin: '2 inches'
      },
      notes: 'Ivory & champagne georgette gown-style anarkali. Heavy flair with cancan attachment.'
    }
  ]

  // Load from localStorage
  const loadSavedMeasurements = () => {
    try {
      const saved = localStorage.getItem('lecotrus_measurements')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch (e) {
      console.error('Error reading measurements from localStorage:', e)
    }
    return defaultMeasurements
  }

  const measurements = ref(loadSavedMeasurements())

  // Save to localStorage
  const persistMeasurements = () => {
    try {
      localStorage.setItem('lecotrus_measurements', JSON.stringify(measurements.value))
    } catch (e) {
      console.error('Error saving measurements:', e)
    }
  }

  // Generate next order number
  const generateOrderNo = () => {
    const existingNumbers = measurements.value
      .map(m => {
        const match = m.orderNo && m.orderNo.match(/L-(\d+)/)
        return match ? parseInt(match[1], 10) : 0
      })
      .filter(n => !isNaN(n))

    const maxNum = existingNumbers.length > 0 ? Math.max(...existingNumbers) : 100
    return `L-${maxNum + 1}`
  }

  // Add new measurement
  const addMeasurement = (measurementData) => {
    const newEntry = {
      id: 'm_' + Date.now(),
      orderNo: measurementData.orderNo || generateOrderNo(),
      date: measurementData.date || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      ...measurementData
    }
    measurements.value.unshift(newEntry)
    persistMeasurements()
    return newEntry
  }

  // Update existing measurement
  const updateMeasurement = (id, updatedData) => {
    const index = measurements.value.findIndex(m => m.id === id)
    if (index !== -1) {
      measurements.value[index] = {
        ...measurements.value[index],
        ...updatedData,
        updatedAt: new Date().toISOString()
      }
      persistMeasurements()
      return measurements.value[index]
    }
    return null
  }

  // Delete measurement
  const deleteMeasurement = (id) => {
    measurements.value = measurements.value.filter(m => m.id !== id)
    persistMeasurements()
  }

  // Get measurement by ID
  const getMeasurementById = (id) => {
    return measurements.value.find(m => m.id === id) || null
  }

  // Computed metrics
  const totalClients = computed(() => measurements.value.length)
  const activeOrders = computed(() => measurements.value.filter(m => m.status !== 'Completed').length)
  const readyForTrial = computed(() => measurements.value.filter(m => m.status === 'Ready for Trial').length)

  return {
    measurements,
    totalClients,
    activeOrders,
    readyForTrial,
    addMeasurement,
    updateMeasurement,
    deleteMeasurement,
    getMeasurementById,
    generateOrderNo,
    persistMeasurements
  }
})
