<template>
  <div class="w-full max-w-[1400px] mx-auto px-8 md:px-16 pt-32 pb-20 bg-white text-[#18181b]">

    <!-- Header -->
    <div class="text-center space-y-3 mb-16">
      <span class="text-[10px] uppercase tracking-[0.4em] text-[#b8860b] font-semibold">LECOTRUS · COIMBATORE</span>
      <h1 class="font-serif text-4xl md:text-5xl tracking-[0.2em] text-black font-normal">VISIT US</h1>
      <p class="text-xs text-zinc-500 tracking-widest font-light">Our flagship atelier in the heart of Coimbatore</p>
    </div>

    <!-- Two Column Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

      <!-- Left: Store Details -->
      <div class="space-y-8">

        <!-- Address Card -->
        <div class="border-l-2 border-[#b8860b] pl-6 space-y-2">
          <div class="flex items-center gap-2">
            <p class="text-[10px] uppercase tracking-[0.3em] text-[#b8860b] font-semibold">Flagship Atelier</p>
            <span class="text-[10px] bg-[#d4af37]/15 text-[#b8860b] px-2 py-0.5 rounded-full font-bold">5.0 ★ (Google Verified)</span>
          </div>
          <h2 class="font-serif text-xl tracking-wider text-black">LECOTRUS Bridal & Haute Couture</h2>
          <p class="text-sm text-zinc-600 font-light leading-relaxed">
            Venkatachalam Chetty St,<br />
            R.S. Puram, Coimbatore – 641 002,<br />
            Tamil Nadu, India
          </p>
          <div class="pt-1">
            <a 
              href="https://maps.app.goo.gl/exDw7KXJ4Tnr2BwP6?g_st=ic" 
              target="_blank" 
              class="inline-flex items-center gap-1.5 text-xs font-bold text-[#b8860b] hover:text-black transition-colors"
            >
              <span>📍 Open in Google Maps</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        <!-- Hours -->
        <div class="border-l-2 border-[#b8860b] pl-6 space-y-2">
          <p class="text-[10px] uppercase tracking-[0.3em] text-[#b8860b] font-semibold mb-2">Atelier Hours</p>
          <div class="text-sm text-zinc-700 space-y-1 font-light">
            <div class="flex justify-between max-w-xs">
              <span>Monday – Saturday</span>
              <span class="font-medium text-black">10:30 AM – 8:00 PM</span>
            </div>
            <div class="flex justify-between max-w-xs">
              <span>Sunday</span>
              <span class="font-medium text-black">11:00 AM – 6:00 PM</span>
            </div>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="border-l-2 border-[#b8860b] pl-6 space-y-3">
          <p class="text-[10px] uppercase tracking-[0.3em] text-[#b8860b] font-semibold mb-2">Get in Touch</p>
          <a href="tel:+914222456789" class="flex items-center gap-3 text-sm text-zinc-700 hover:text-[#b8860b] transition-colors group">
            <span class="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-[#b8860b] group-hover:bg-[#b8860b] group-hover:text-white transition-all">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.5 11.5 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.5 11.5 0 00.57 3.6 1 1 0 01-.25 1.01l-2.2 2.18z"/></svg>
            </span>
            +91 422 245 6789
          </a>
          <a href="https://wa.me/919876543210" target="_blank" class="flex items-center gap-3 text-sm text-zinc-700 hover:text-[#b8860b] transition-colors group">
            <span class="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-[#b8860b] group-hover:bg-[#b8860b] group-hover:text-white transition-all">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2a10 10 0 00-8.955 14.424L2 22l5.683-1.035A10 10 0 1012 2z"/></svg>
            </span>
            WhatsApp Us
          </a>
          <a href="mailto:coimbatore@lecotrus.com" class="flex items-center gap-3 text-sm text-zinc-700 hover:text-[#b8860b] transition-colors group">
            <span class="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-[#b8860b] group-hover:bg-[#b8860b] group-hover:text-white transition-all">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </span>
            coimbatore@lecotrus.com
          </a>
        </div>

      </div>

      <!-- Right: Enquiry Form -->
      <div class="bg-[#faf9f6] border border-zinc-200 p-10 rounded-sm space-y-6 shadow-sm">
        <div class="space-y-1">
          <p class="text-[10px] uppercase tracking-[0.35em] text-[#b8860b] font-semibold">Private Enquiry</p>
          <h2 class="font-serif text-2xl tracking-widest text-black font-normal">Send a Message</h2>
          <p class="text-xs text-zinc-500 font-light">Our team will respond within 24 hours.</p>
        </div>

        <form @submit.prevent="submitEnquiry" class="space-y-4">
          <input
            v-model="name"
            type="text"
            required
            placeholder="Your Full Name"
            class="w-full bg-white border border-zinc-300 px-4 py-3 text-xs text-black focus:border-[#b8860b] focus:outline-none tracking-wide"
          />
          <input
            v-model="email"
            type="email"
            required
            placeholder="Email Address"
            class="w-full bg-white border border-zinc-300 px-4 py-3 text-xs text-black focus:border-[#b8860b] focus:outline-none tracking-wide"
          />
          <input
            v-model="phone"
            type="tel"
            placeholder="Phone / WhatsApp Number"
            class="w-full bg-white border border-zinc-300 px-4 py-3 text-xs text-black focus:border-[#b8860b] focus:outline-none tracking-wide"
          />
          <textarea
            v-model="message"
            rows="4"
            required
            placeholder="How may we assist you?"
            class="w-full bg-white border border-zinc-300 px-4 py-3 text-xs text-black focus:border-[#b8860b] focus:outline-none resize-none tracking-wide"
          ></textarea>
          <button
            type="submit"
            class="w-full py-3.5 bg-[#18181b] text-white text-xs font-semibold uppercase tracking-[0.25em] hover:bg-[#b8860b] transition-colors cursor-pointer"
          >
            Send Message
          </button>
        </form>

        <p v-if="submitted" class="text-center text-xs text-[#b8860b] font-medium tracking-wide">
          ✓ Message sent. We'll be in touch shortly.
        </p>
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
