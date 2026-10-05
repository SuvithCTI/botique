<template>
  <div class="w-full min-h-[calc(100vh-80px)] bg-gradient-to-b from-[#f9f6f0] via-[#f5f0e6] to-[#faf7f2] text-black pt-32 pb-24 overflow-hidden">
    <div class="max-w-[1360px] mx-auto px-6 md:px-12">
      <!-- Header -->
      <div class="text-center space-y-3 mb-16 animate-fade-in">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 border border-black/15 shadow-xs">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
          </span>
          <span class="text-[10px] uppercase tracking-[0.35em] text-black font-bold">COIMBATORE ATELIER</span>
        </div>
        <h1 class="font-serif text-4xl md:text-5xl tracking-[0.2em] text-black font-bold transform transition-all duration-700">
          VISIT US
        </h1>
        <p class="text-xs text-black tracking-widest font-normal max-w-md mx-auto">
          Experience haute couture craftsmanship & private salon styling
        </p>
      </div>

      <!-- Two Column Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        <!-- Left: Store Details (7 cols) -->
        <div class="lg:col-span-7 space-y-6">

          <!-- Atelier Location Card -->
          <div class="card-entrance-1 bg-white border border-[#dcd4c7] p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-500 space-y-6 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-black/5 to-transparent rounded-bl-full pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>

            <div class="flex items-start justify-between relative z-10">
              <div>
                <span class="text-[10px] uppercase tracking-[0.3em] text-black font-bold">Flagship Salon</span>
                <h2 class="font-serif text-2xl md:text-3xl tracking-wide text-black font-bold mt-1">
                  LECOTRUS Bridal & Haute Couture
                </h2>
              </div>
              <div class="flex items-center gap-1.5 bg-[#f5f0e6] border border-black/15 text-black px-3 py-1 rounded-full text-[11px] font-bold shadow-xs">
                <span class="text-black font-bold">★</span>
                <span>5.0</span>
                <span class="text-[10px] text-zinc-800 font-medium">Google Verified</span>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 relative z-10">
              <!-- Address -->
              <div class="space-y-2 border-l-2 border-black pl-4">
                <p class="text-[10px] uppercase tracking-[0.25em] text-black font-bold">Address</p>
                <p class="text-sm text-black font-medium leading-relaxed">
                  Venkatachalam Chetty St,<br />
                  R.S. Puram, Coimbatore – 641 002,<br />
                  Tamil Nadu, India
                </p>
                <div class="pt-1">
                  <a 
                    href="https://maps.app.goo.gl/exDw7KXJ4Tnr2BwP6?g_st=ic" 
                    target="_blank" 
                    class="inline-flex items-center gap-1.5 text-xs font-bold text-black hover:underline transition-all duration-300 group/link"
                  >
                    <span>📍 Open in Google Maps</span>
                    <span class="transform group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5 transition-transform duration-200">↗</span>
                  </a>
                </div>
              </div>

              <!-- Salon Hours -->
              <div class="space-y-2 border-l-2 border-black pl-4">
                <p class="text-[10px] uppercase tracking-[0.25em] text-black font-bold">Atelier Hours</p>
                <div class="text-xs text-black space-y-2 font-medium">
                  <div class="flex justify-between items-center py-0.5">
                    <span class="text-black font-medium">Monday – Saturday:</span>
                    <span class="font-bold text-black bg-[#f5f0e6] px-2 py-0.5 rounded">10:30 AM – 8:00 PM</span>
                  </div>
                  <div class="flex justify-between items-center py-0.5">
                    <span class="text-black font-medium">Sunday:</span>
                    <span class="font-bold text-black bg-[#f5f0e6] px-2 py-0.5 rounded">11:00 AM – 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Direct Contact Channels Card -->
          <div class="card-entrance-2 bg-white border border-[#dcd4c7] p-8 rounded-xl shadow-sm space-y-5">
            <h3 class="text-xs uppercase tracking-[0.3em] text-black font-bold">Direct Channels</h3>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Phone -->
              <a 
                href="tel:+919047474454" 
                class="flex flex-col p-4 rounded-lg bg-[#faf8f4] border border-[#dcd4c7] hover:border-black hover:bg-white hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 group cursor-pointer"
              >
                <span class="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-12 transition-all duration-300 mb-2 shadow-2xs">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.5 11.5 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.5 11.5 0 00.57 3.6 1 1 0 01-.25 1.01l-2.2 2.18z"/></svg>
                </span>
                <span class="text-[10px] uppercase tracking-wider text-black font-bold">Phone</span>
                <span class="text-xs font-bold text-black mt-0.5">+91 90474 74454</span>
              </a>

              <!-- WhatsApp -->
              <a 
                href="https://wa.me/919047474454" 
                target="_blank" 
                class="flex flex-col p-4 rounded-lg bg-[#faf8f4] border border-[#dcd4c7] hover:border-black hover:bg-white hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 group cursor-pointer"
              >
                <span class="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center group-hover:rotate-12 transition-all duration-300 mb-2 shadow-2xs">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2a10 10 0 00-8.955 14.424L2 22l5.683-1.035A10 10 0 1012 2z"/></svg>
                </span>
                <span class="text-[10px] uppercase tracking-wider text-black font-bold">WhatsApp</span>
                <span class="text-xs font-bold text-black mt-0.5">Chat Instantly</span>
              </a>

              <!-- Email -->
              <a 
                href="mailto:coimbatore@lecotrus.com" 
                class="flex flex-col p-4 rounded-lg bg-[#faf8f4] border border-[#dcd4c7] hover:border-black hover:bg-white hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 group cursor-pointer"
              >
                <span class="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-12 transition-all duration-300 mb-2 shadow-2xs">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </span>
                <span class="text-[10px] uppercase tracking-wider text-black font-bold">Email</span>
                <span class="text-xs font-bold text-black mt-0.5 truncate">coimbatore@lecotrus.com</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Right: Private Enquiry Form (5 cols) -->
        <div class="card-entrance-3 lg:col-span-5 bg-white border border-[#dcd4c7] p-8 md:p-10 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 space-y-6">
          <div class="space-y-1.5 border-b border-[#e8dfd1] pb-5">
            <span class="text-[10px] uppercase tracking-[0.35em] text-black font-bold">Private Concierge</span>
            <h2 class="font-serif text-2xl md:text-3xl tracking-wider text-black font-bold">Send a Message</h2>
            <p class="text-xs text-black font-medium">Our bespoke salon team will respond within 24 hours.</p>
          </div>

          <form @submit.prevent="submitEnquiry" class="space-y-4">
            <div class="space-y-1">
              <label class="block text-[10px] uppercase tracking-widest text-black font-bold">Full Name</label>
              <input
                v-model="name"
                type="text"
                required
                placeholder="e.g. Ananya Sharma"
                class="w-full bg-[#faf8f4] border border-[#dcd4c7] rounded-md px-4 py-3 text-xs text-black placeholder:text-zinc-500 font-medium focus:bg-white focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none tracking-wide transition-all duration-300"
              />
            </div>
            <div class="space-y-1">
              <label class="block text-[10px] uppercase tracking-widest text-black font-bold">Email Address</label>
              <input
                v-model="email"
                type="email"
                required
                placeholder="ananya@example.com"
                class="w-full bg-[#faf8f4] border border-[#dcd4c7] rounded-md px-4 py-3 text-xs text-black placeholder:text-zinc-500 font-medium focus:bg-white focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none tracking-wide transition-all duration-300"
              />
            </div>
            <div class="space-y-1">
              <label class="block text-[10px] uppercase tracking-widest text-black font-bold">Phone / WhatsApp</label>
              <input
                v-model="phone"
                type="tel"
                placeholder="+91 90474 74454"
                class="w-full bg-[#faf8f4] border border-[#dcd4c7] rounded-md px-4 py-3 text-xs text-black placeholder:text-zinc-500 font-medium focus:bg-white focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none tracking-wide transition-all duration-300"
              />
            </div>
            <div class="space-y-1">
              <label class="block text-[10px] uppercase tracking-widest text-black font-bold">How May We Assist You?</label>
              <textarea
                v-model="message"
                rows="4"
                required
                placeholder="Bridal styling, custom embroidery, bespoke measurement booking..."
                class="w-full bg-[#faf8f4] border border-[#dcd4c7] rounded-md px-4 py-3 text-xs text-black placeholder:text-zinc-500 font-medium focus:bg-white focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none resize-none tracking-wide transition-all duration-300"
              ></textarea>
            </div>
            <button
              type="submit"
              class="relative w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-[0.25em] overflow-hidden group/btn rounded-md shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-[0.98]"
            >
              <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out"></span>
              <span class="relative z-10 text-white">Send Message</span>
            </button>
          </form>

          <transition name="fade-slide">
            <div v-if="submitted" class="p-3.5 bg-black text-white rounded-md text-center text-xs font-medium tracking-wide shadow-xs flex items-center justify-center gap-2">
              <span class="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-bold">✓</span>
              <span>Message sent successfully. Our atelier concierge will contact you shortly.</span>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
    transform: translateY(-18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeInDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.card-entrance-1 {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s backwards;
}

.card-entrance-2 {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s backwards;
}

.card-entrance-3 {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s backwards;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
