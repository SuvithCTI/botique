<template>
  <div v-if="bridalStore.isModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" @click="bridalStore.closeBookingModal"></div>

    <div class="min-h-screen px-4 text-center flex items-center justify-center p-4">
      <div class="inline-block w-full max-w-2xl p-8 my-8 overflow-hidden text-left align-middle transition-all transform bg-white border border-zinc-200 shadow-2xl relative text-[#18181b] rounded-sm">
        <!-- Close Button -->
        <button 
          @click="bridalStore.closeBookingModal"
          class="absolute top-4 right-4 text-zinc-400 hover:text-black p-2 cursor-pointer font-bold text-lg"
        >
          ✕
        </button>

        <!-- Brand Crest -->
        <div class="text-center mb-6">
          <span class="text-xs uppercase tracking-[0.3em] text-[#b8860b] font-semibold">Lecotrus Haute Couture</span>
          <h2 class="font-serif text-2xl md:text-3xl tracking-widest text-black mt-1">Private Bridal Consultation</h2>
          <p class="text-xs text-zinc-600 mt-2 max-w-md mx-auto font-light">Experience bespoke heirloom couture with our master couturiers and head stylists.</p>
        </div>

        <!-- Success Screen -->
        <div v-if="bridalStore.isSubmitted" class="text-center py-8 space-y-4">
          <div class="text-5xl">💍</div>
          <h3 class="font-serif text-xl text-[#b8860b] tracking-wider font-semibold">Your Atelier Request is Reserved</h3>
          <p class="text-xs text-zinc-700 max-w-md mx-auto leading-relaxed">
            Thank you, <span class="font-semibold text-black">{{ bridalStore.lastBookingDetails?.name }}</span>. 
            Our Senior Bridal Concierge will reach out via WhatsApp & Email to confirm your private salon slot at {{ bridalStore.selectedBoutique }}.
          </p>
          <div class="pt-4">
            <button 
              @click="bridalStore.closeBookingModal"
              class="px-8 py-3 bg-[#18181b] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#b8860b] transition-colors cursor-pointer"
            >
              Return to Collection
            </button>
          </div>
        </div>

        <!-- Booking Form -->
        <form v-else @submit.prevent="handleSubmit" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-[11px] uppercase tracking-widest text-zinc-600 mb-1.5 font-medium">Bride / Groom Full Name</label>
              <input 
                v-model="form.name" 
                type="text" 
                required 
                placeholder="e.g. Maharani Ananya Rao"
                class="w-full bg-[#faf9f6] border border-zinc-300 px-3.5 py-2.5 text-xs text-black focus:border-[#b8860b] focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-[11px] uppercase tracking-widest text-zinc-600 mb-1.5 font-medium">Phone / WhatsApp</label>
              <input 
                v-model="form.phone" 
                type="tel" 
                required 
                placeholder="+91 90474 74454"
                class="w-full bg-[#faf9f6] border border-zinc-300 px-3.5 py-2.5 text-xs text-black focus:border-[#b8860b] focus:outline-none"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-[11px] uppercase tracking-widest text-zinc-600 mb-1.5 font-medium">Email Address</label>
              <input 
                v-model="form.email" 
                type="email" 
                required 
                placeholder="client@couture.com"
                class="w-full bg-[#faf9f6] border border-zinc-300 px-3.5 py-2.5 text-xs text-black focus:border-[#b8860b] focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-[11px] uppercase tracking-widest text-zinc-600 mb-1.5 font-medium">Wedding / Event Date</label>
              <input 
                v-model="form.eventDate" 
                type="date" 
                required 
                class="w-full bg-[#faf9f6] border border-zinc-300 px-3.5 py-2.5 text-xs text-black focus:border-[#b8860b] focus:outline-none"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-[11px] uppercase tracking-widest text-zinc-600 mb-1.5 font-medium">Flagship Boutique / Experience</label>
              <select 
                v-model="bridalStore.selectedBoutique"
                class="w-full bg-[#faf9f6] border border-zinc-300 px-3.5 py-2.5 text-xs text-black focus:border-[#b8860b] focus:outline-none"
              >
                <option value="New Delhi - The Manor & Bridal Suite">New Delhi — The Manor & Bridal Suite</option>
                <option value="Mumbai - Altamount Road Atelier">Mumbai — Altamount Road Atelier</option>
                <option value="London - Mayfair Salon">London — Mayfair Private Salon</option>
                <option value="New York - Fifth Avenue Suite">New York — Fifth Avenue Suite</option>
                <option value="Virtual VIP Video Consultation">Virtual VIP Video Styling Consultation</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] uppercase tracking-widest text-zinc-600 mb-1.5 font-medium">Budget Expectation</label>
              <select 
                v-model="form.budget"
                class="w-full bg-[#faf9f6] border border-zinc-300 px-3.5 py-2.5 text-xs text-black focus:border-[#b8860b] focus:outline-none"
              >
                <option value="₹2,00,000 - ₹5,00,000">₹2,00,000 - ₹5,00,000</option>
                <option value="₹5,00,000 - ₹10,00,000">₹5,00,000 - ₹10,00,000</option>
                <option value="₹10,00,000+ (Master Heirloom)">₹10,00,000+ (Master Heirloom Bespoke)</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-[11px] uppercase tracking-widest text-zinc-600 mb-1.5 font-medium">Couture Preferences & Notes</label>
            <textarea 
              v-model="form.notes"
              rows="3"
              placeholder="Tell us about your wedding theme, desired silhouette, color palette, or custom embroidery inspirations..."
              class="w-full bg-[#faf9f6] border border-zinc-300 px-3.5 py-2 text-xs text-black focus:border-[#b8860b] focus:outline-none resize-none"
            ></textarea>
          </div>

          <div class="pt-3">
            <button 
              type="submit" 
              class="w-full py-3.5 bg-[#18181b] text-white font-semibold text-xs tracking-[0.25em] uppercase hover:bg-[#b8860b] transition-all cursor-pointer shadow-lg"
            >
              Confirm VIP Bridal Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useBridalStore } from '@/stores/bridalStore'

const bridalStore = useBridalStore()

const form = reactive({
  name: '',
  phone: '',
  email: '',
  eventDate: '',
  budget: '₹5,00,000 - ₹10,00,000',
  notes: ''
})

const handleSubmit = () => {
  bridalStore.submitBooking(form)
}
</script>
