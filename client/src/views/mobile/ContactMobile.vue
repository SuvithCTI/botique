<template>
  <div class="min-h-screen bg-gradient-to-b from-[#f9f6f0] via-[#f5f0e6] to-[#faf7f2] space-y-5 pb-12 px-4 pt-18 text-black overflow-hidden">
    <!-- Header -->
    <div class="text-center space-y-2 pt-2 pb-1 animate-fade-in">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/15 shadow-xs">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
        </span>
        <span class="text-[9px] uppercase tracking-[0.3em] text-black font-bold">COIMBATORE ATELIER</span>
      </div>
      <h1 class="font-serif text-2xl tracking-widest text-black font-bold">FLAGSHIP ATELIER</h1>
      <p class="text-[11px] text-black font-normal">Experience private salon consultations & bespoke master tailoring</p>
    </div>

    <!-- Store Info Card -->
    <div class="card-entrance-1 bg-white border border-[#dcd4c7] rounded-xl p-5 space-y-5 shadow-sm">
      <!-- Address -->
      <div class="border-l-2 border-black pl-3.5 space-y-1.5">
        <div class="flex items-center gap-2">
          <p class="text-[9px] uppercase tracking-[0.3em] text-black font-bold">Atelier Location</p>
          <span class="text-[9px] bg-[#f5f0e6] border border-black/15 text-black px-2 py-0.5 rounded font-bold shadow-2xs">
            ★ 5.0 Google Verified
          </span>
        </div>
        <p class="font-serif text-sm tracking-wide text-black font-bold">LECOTRUS Bridal & Haute Couture</p>
        <p class="text-[11.5px] text-black font-medium leading-relaxed">
          Venkatachalam Chetty St,<br />
          R.S. Puram, Coimbatore – 641 002,<br />
          Tamil Nadu, India
        </p>
        <div class="pt-0.5">
          <a 
            href="https://maps.app.goo.gl/exDw7KXJ4Tnr2BwP6?g_st=ic" 
            target="_blank" 
            class="inline-flex items-center gap-1 text-[11px] font-bold text-black hover:underline transition-colors"
          >
            <span>📍 Open in Google Maps</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      <!-- Hours -->
      <div class="border-l-2 border-black pl-3.5 space-y-1.5">
        <p class="text-[9px] uppercase tracking-[0.3em] text-black font-bold">Salon Hours</p>
        <div class="text-[11px] text-black font-medium space-y-1">
          <div class="flex justify-between items-center bg-[#faf8f4] px-2 py-1 rounded">
            <span>Monday – Saturday:</span><span class="font-bold text-black">10:30 AM – 8:00 PM</span>
          </div>
          <div class="flex justify-between items-center bg-[#faf8f4] px-2 py-1 rounded">
            <span>Sunday:</span><span class="font-bold text-black">11:00 AM – 6:00 PM</span>
          </div>
        </div>
      </div>

      <!-- Quick Contact Actions -->
      <div class="grid grid-cols-3 gap-2 pt-1">
        <a
          href="tel:+919047474454"
          class="flex flex-col items-center gap-1.5 py-3 bg-[#faf8f4] border border-[#dcd4c7] rounded-lg active:scale-95 hover:border-black transition-all text-center shadow-2xs group"
        >
          <span class="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.5 11.5 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.5 11.5 0 00.57 3.6 1 1 0 01-.25 1.01l-2.2 2.18z"/></svg>
          </span>
          <span class="text-[9.5px] uppercase tracking-wider font-bold text-black">Call Us</span>
        </a>
        <a
          href="https://wa.me/919047474454"
          target="_blank"
          class="flex flex-col items-center gap-1.5 py-3 bg-[#faf8f4] border border-[#dcd4c7] rounded-lg active:scale-95 hover:border-black transition-all text-center shadow-2xs group"
        >
          <span class="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2a10 10 0 00-8.955 14.424L2 22l5.683-1.035A10 10 0 1012 2z"/></svg>
          </span>
          <span class="text-[9.5px] uppercase tracking-wider font-bold text-black">WhatsApp</span>
        </a>
        <a
          href="mailto:coimbatore@lecotrus.com"
          class="flex flex-col items-center gap-1.5 py-3 bg-[#faf8f4] border border-[#dcd4c7] rounded-lg active:scale-95 hover:border-black transition-all text-center shadow-2xs group"
        >
          <span class="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          </span>
          <span class="text-[9.5px] uppercase tracking-wider font-bold text-black">Email</span>
        </a>
      </div>

      <!-- Book Consultation CTA in Card -->
      <div class="pt-2">
        <button 
          @click="bridalStore.openBookingModal()"
          class="relative w-full py-3.5 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] rounded-lg shadow-md active:scale-[0.98] transition-all cursor-pointer overflow-hidden group/cta"
        >
          <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000"></span>
          <span class="relative z-10">Book Private Salon Fitting</span>
        </button>
      </div>
    </div>

    <!-- Enquiry Form -->
    <div class="card-entrance-2 bg-white border border-[#dcd4c7] rounded-xl p-5 space-y-4 shadow-sm">
      <div class="space-y-0.5 border-b border-[#e8dfd1] pb-3">
        <p class="text-[9px] uppercase tracking-[0.3em] text-black font-bold">Direct Atelier Message</p>
        <p class="font-serif text-base tracking-wider text-black font-bold">Private Client Concierge</p>
      </div>

      <form @submit.prevent="submitEnquiry" class="space-y-3">
        <div>
          <label class="block text-[9px] uppercase tracking-widest text-black font-bold mb-1">Full Name</label>
          <input
            v-model="name"
            type="text"
            required
            placeholder="Your Full Name"
            class="w-full bg-[#faf8f4] border border-[#dcd4c7] px-3.5 py-2.5 text-xs text-black placeholder:text-zinc-500 font-medium focus:bg-white focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none rounded-md transition-all duration-300"
          />
        </div>
        <div>
          <label class="block text-[9px] uppercase tracking-widest text-black font-bold mb-1">Email Address</label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="Email Address"
            class="w-full bg-[#faf8f4] border border-[#dcd4c7] px-3.5 py-2.5 text-xs text-black placeholder:text-zinc-500 font-medium focus:bg-white focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none rounded-md transition-all duration-300"
          />
        </div>
        <div>
          <label class="block text-[9px] uppercase tracking-widest text-black font-bold mb-1">Phone / WhatsApp</label>
          <input
            v-model="phone"
            type="tel"
            placeholder="+91 90474 74454"
            class="w-full bg-[#faf8f4] border border-[#dcd4c7] px-3.5 py-2.5 text-xs text-black placeholder:text-zinc-500 font-medium focus:bg-white focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none rounded-md transition-all duration-300"
          />
        </div>
        <div>
          <label class="block text-[9px] uppercase tracking-widest text-black font-bold mb-1">How May We Assist You?</label>
          <textarea
            v-model="message"
            rows="3"
            required
            placeholder="How may our head stylists and master couturiers assist you?"
            class="w-full bg-[#faf8f4] border border-[#dcd4c7] px-3.5 py-2.5 text-xs text-black placeholder:text-zinc-500 font-medium focus:bg-white focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none resize-none rounded-md transition-all duration-300"
          ></textarea>
        </div>
        <button
          type="submit"
          class="relative w-full py-3.5 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-md shadow-md active:scale-[0.98] cursor-pointer overflow-hidden group/btn"
        >
          <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></span>
          <span class="relative z-10">Send Atelier Message</span>
        </button>
      </form>

      <transition name="fade-slide">
        <p v-if="submitted" class="text-center text-[11px] text-white font-medium tracking-wide bg-black p-3 rounded-md shadow-xs flex items-center justify-center gap-1.5">
          <span class="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center text-[9px] font-bold">✓</span>
          <span>Your message has been received by our Coimbatore Atelier concierge.</span>
        </p>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useBridalStore } from '@/stores/bridalStore'

const bridalStore = useBridalStore()

const name = ref('')
const email = ref('')
const phone = ref('')
const message = ref('')
const submitted = ref(false)

const submitEnquiry = () => {
  submitted.value = true
  name.value = ''
  email.value = ''
  phone.value = ''
  message.value = ''
  setTimeout(() => { submitted.value = false }, 5000)
}
</script>

<style scoped>
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeInDown 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.card-entrance-1 {
  animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s backwards;
}

.card-entrance-2 {
  animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s backwards;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
