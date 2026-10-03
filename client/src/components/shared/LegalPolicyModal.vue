<template>
  <Transition name="fade">
    <div 
      v-if="legalStore.isOpen" 
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8"
      @click.self="legalStore.close()"
    >
      <div 
        class="bg-white border border-zinc-200 w-full max-w-3xl max-h-[85vh] rounded-sm shadow-2xl flex flex-col overflow-hidden text-[#18181b]"
      >
        <!-- Modal Header -->
        <div class="px-6 py-5 border-b border-zinc-200 flex items-center justify-between bg-[#faf9f6]">
          <div class="space-y-0.5">
            <span class="text-[9px] uppercase tracking-[0.35em] text-[#b8860b] font-semibold">LECOTRUS ATELIER CHARTER</span>
            <h2 class="font-serif text-xl tracking-wider text-black font-normal">
              {{ legalStore.activeTab === 'privacy' ? 'Privacy Policy & Client Data Charter' : 'Terms & Conditions of Bespoke Service' }}
            </h2>
          </div>
          <button 
            @click="legalStore.close()" 
            class="p-2 text-zinc-400 hover:text-black transition-colors cursor-pointer text-lg leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <!-- Navigation Tabs -->
        <div class="flex border-b border-zinc-200 px-6 bg-white gap-6 text-xs">
          <button 
            @click="legalStore.activeTab = 'privacy'"
            :class="[
              'py-3 font-medium uppercase tracking-wider transition-colors border-b-2 cursor-pointer',
              legalStore.activeTab === 'privacy' 
                ? 'border-[#b8860b] text-black font-semibold' 
                : 'border-transparent text-zinc-500 hover:text-black'
            ]"
          >
            Privacy Policy
          </button>
          <button 
            @click="legalStore.activeTab = 'terms'"
            :class="[
              'py-3 font-medium uppercase tracking-wider transition-colors border-b-2 cursor-pointer',
              legalStore.activeTab === 'terms' 
                ? 'border-[#b8860b] text-black font-semibold' 
                : 'border-transparent text-zinc-500 hover:text-black'
            ]"
          >
            Terms & Conditions
          </button>
        </div>

        <!-- Modal Body Content -->
        <div class="p-6 md:p-8 overflow-y-auto space-y-6 text-xs text-zinc-700 font-light leading-relaxed">
          
          <!-- PRIVACY POLICY CONTENT -->
          <div v-if="legalStore.activeTab === 'privacy'" class="space-y-5">
            <div class="space-y-1">
              <h3 class="font-serif text-sm font-semibold uppercase tracking-wider text-black">1. Commitment to Client Confidentiality</h3>
              <p>
                At House of Lecotrus (Coimbatore), we hold your personal discretion with the highest reverence. Any confidential details shared—including custom silhouette measurements, contact details, event dates, and personal styling preferences—are strictly safeguarded and utilized solely for artisanal tailoring, bespoke concierge communications, and white-glove order fulfillment.
              </p>
            </div>

            <div class="space-y-1">
              <h3 class="font-serif text-sm font-semibold uppercase tracking-wider text-black">2. Information We Collect</h3>
              <ul class="list-disc list-inside space-y-1 pl-2 text-zinc-600">
                <li>Client Contact Details: Name, email address, telephone number, and Coimbatore delivery or salon appointment requests.</li>
                <li>Bespoke Tailoring Profiles: Anatomical measurements, silhouette notes, fabric swatch selections, and bridal consultation history.</li>
                <li>Transaction Records: Secure billing information handled in compliance with bank-grade encryption standards.</li>
              </ul>
            </div>

            <div class="space-y-1">
              <h3 class="font-serif text-sm font-semibold uppercase tracking-wider text-black">3. Non-Disclosure & Security</h3>
              <p>
                We do not sell, license, or distribute your private client information to third-party marketing brokers. Data is accessible solely to authorized Lecotrus master tailors, stylists, and logistics concierges.
              </p>
            </div>

            <div class="space-y-1">
              <h3 class="font-serif text-sm font-semibold uppercase tracking-wider text-black">4. Digital Communications</h3>
              <p>
                You may opt out of seasonal atelier previews and digital event invitations at any time by contacting our VIP Concierge desk at <a href="mailto:coimbatore@lecotrus.com" class="text-[#b8860b] underline">coimbatore@lecotrus.com</a>.
              </p>
            </div>
          </div>

          <!-- TERMS & CONDITIONS CONTENT -->
          <div v-else class="space-y-5">
            <div class="space-y-1">
              <h3 class="font-serif text-sm font-semibold uppercase tracking-wider text-black">1. Bespoke & Made-to-Order Nature</h3>
              <p>
                Every couture silhouette, bridal heirloom lehenga, sherwani, and luxury garment is individualistically patterned and handcrafted upon order confirmation at our Coimbatore atelier. Dispatch timelines range from 2 to 5 weeks depending on zardozi, pita, and hand-embroidery density.
              </p>
            </div>

            <div class="space-y-1">
              <h3 class="font-serif text-sm font-semibold uppercase tracking-wider text-black">2. Fitting & Alterations Policy</h3>
              <p>
                We provide complimentary master fitting adjustments at our Flagship Salon in R.S. Puram, Coimbatore, or via structured digital consultation to ensure your garment achieves the intended anatomical drape.
              </p>
            </div>

            <div class="space-y-1">
              <h3 class="font-serif text-sm font-semibold uppercase tracking-wider text-black">3. Pricing & Taxes</h3>
              <p>
                All prices displayed are in Indian Rupees (INR) and are inclusive of standard applicable GST and insured white-glove packaging.
              </p>
            </div>

            <div class="space-y-1">
              <h3 class="font-serif text-sm font-semibold uppercase tracking-wider text-black">4. Salon Appointments & Cancellations</h3>
              <p>
                Private salon fittings and consultations may be scheduled or rescheduled with a 24-hour advance notice to ensure dedicated time with our lead couture designer.
              </p>
            </div>

            <div class="space-y-1">
              <h3 class="font-serif text-sm font-semibold uppercase tracking-wider text-black">5. Authenticity Guarantee</h3>
              <p>
                Every piece leaving our Coimbatore salon comes with the official Lecotrus Seal of Authenticity, certifying handloom origins, genuine zari purity, and master artisan lineage.
              </p>
            </div>
          </div>

        </div>

        <!-- Modal Footer Action -->
        <div class="px-6 py-4 border-t border-zinc-200 bg-[#faf9f6] flex items-center justify-between">
          <span class="text-[10px] text-zinc-500 font-light">House of Lecotrus · Venkatachalam Chetty St, R.S. Puram, Coimbatore</span>
          <button 
            @click="legalStore.close()"
            class="px-5 py-2 bg-[#18181b] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#b8860b] transition-colors rounded-xs cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useLegalStore } from '@/stores/legalStore'

const legalStore = useLegalStore()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
