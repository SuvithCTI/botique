<template>
  <div class="min-h-screen bg-[#faf9f6] text-[#18181b] pt-28 md:pt-32 pb-20 px-4 sm:px-6 md:px-12 lg:px-16">
    <div class="max-w-[1300px] mx-auto">
      
      <!-- Back / Header Bar -->
      <div class="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <div class="text-[10px] uppercase tracking-[0.35em] text-[#b8860b] font-semibold">House of Lecotrus</div>
          <h1 class="font-serif text-2xl md:text-3xl tracking-wider text-black mt-1">Private Bespoke Checkout</h1>
        </div>
        <RouterLink 
          to="/" 
          class="inline-flex items-center gap-1.5 text-xs text-zinc-600 hover:text-[#b8860b] font-medium tracking-widest uppercase transition-colors"
        >
          <span>←</span> Back to Collections
        </RouterLink>
      </div>

      <!-- Empty Cart Screen (Only when not in Order Success state) -->
      <div v-if="cartStore.items.length === 0 && !orderPlaced" class="py-20 text-center bg-white border border-zinc-200 rounded-sm p-8 max-w-lg mx-auto shadow-sm">
        <div class="text-4xl mb-4">⚜️</div>
        <h2 class="font-serif text-xl tracking-widest text-zinc-900 font-normal">Your Couture Bag is Empty</h2>
        <p class="text-xs text-zinc-500 mt-2 max-w-xs mx-auto font-light leading-relaxed">
          Please select your desired pieces from our Haute Couture collections before proceeding to checkout.
        </p>
        <div class="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <RouterLink 
            to="/women" 
            class="px-6 py-2.5 bg-black text-white text-xs uppercase tracking-widest hover:bg-[#b8860b] transition-all"
          >
            Explore Women's
          </RouterLink>
          <RouterLink 
            to="/accessories" 
            class="px-6 py-2.5 border border-zinc-300 text-zinc-800 text-xs uppercase tracking-widest hover:border-black transition-all"
          >
            Fine Accessories
          </RouterLink>
        </div>
      </div>

      <!-- Active Checkout Flow -->
      <div v-else-if="!orderPlaced">
        <!-- 3-Step Progress Indicator -->
        <div class="max-w-3xl mx-auto mb-10">
          <div class="flex items-center justify-between relative">
            <!-- Connecting Line -->
            <div class="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-zinc-200 z-0"></div>
            <div 
              class="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#b8860b] z-0 transition-all duration-500"
              :style="{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }"
            ></div>

            <!-- Step 1: Address -->
            <button 
              @click="goToStep(1)"
              :disabled="currentStep < 1"
              class="relative z-10 flex flex-col items-center group cursor-pointer"
            >
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 shadow-sm"
                :class="currentStep >= 1 ? 'bg-black text-[#fef08a] ring-4 ring-[#b8860b]/20' : 'bg-zinc-200 text-zinc-500'"
              >
                <span v-if="currentStep > 1">✓</span>
                <span v-else>1</span>
              </div>
              <span 
                class="text-[11px] uppercase tracking-widest mt-2 font-medium transition-colors"
                :class="currentStep >= 1 ? 'text-black font-semibold' : 'text-zinc-400'"
              >
                1. Delivery Address
              </span>
            </button>

            <!-- Step 2: Payment -->
            <button 
              @click="goToStep(2)"
              :disabled="currentStep < 2"
              class="relative z-10 flex flex-col items-center group cursor-pointer"
            >
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 shadow-sm"
                :class="currentStep >= 2 ? 'bg-black text-[#fef08a] ring-4 ring-[#b8860b]/20' : 'bg-zinc-200 text-zinc-500'"
              >
                <span v-if="currentStep > 2">✓</span>
                <span v-else>2</span>
              </div>
              <span 
                class="text-[11px] uppercase tracking-widest mt-2 font-medium transition-colors"
                :class="currentStep >= 2 ? 'text-black font-semibold' : 'text-zinc-400'"
              >
                2. Payment Option
              </span>
            </button>

            <!-- Step 3: Review & Summary -->
            <button 
              @click="goToStep(3)"
              :disabled="currentStep < 3"
              class="relative z-10 flex flex-col items-center group cursor-pointer"
            >
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 shadow-sm"
                :class="currentStep >= 3 ? 'bg-black text-[#fef08a] ring-4 ring-[#b8860b]/20' : 'bg-zinc-200 text-zinc-500'"
              >
                3
              </div>
              <span 
                class="text-[11px] uppercase tracking-widest mt-2 font-medium transition-colors"
                :class="currentStep >= 3 ? 'text-black font-semibold' : 'text-zinc-400'"
              >
                3. Review & Place Order
              </span>
            </button>
          </div>
        </div>

        <!-- Main Layout: Step Content (Left) + Live Order Summary (Right) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          <!-- LEFT: Step Forms (7 cols) -->
          <div class="lg:col-span-7 space-y-6">
            
            <!-- STEP 1: SHIPPING & DELIVERY ADDRESS -->
            <div v-if="currentStep === 1" class="bg-white border border-zinc-200 p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
              <div class="border-b border-zinc-200 pb-4 flex items-center justify-between">
                <div>
                  <h2 class="font-serif text-xl tracking-wider text-black font-normal">Delivery Address & Recipient Details</h2>
                  <p class="text-xs text-zinc-500 font-light mt-0.5">Complimentary white-glove handover across Coimbatore and India.</p>
                </div>
                <span class="text-xs bg-[#b8860b]/10 text-[#b8860b] px-2.5 py-1 rounded font-medium">Step 1 of 3</span>
              </div>

              <!-- Form Fields -->
              <form @submit.prevent="proceedToPayment" class="space-y-4">
                <!-- Name Row -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-[11px] uppercase tracking-wider text-zinc-700 font-medium mb-1.5">First Name *</label>
                    <input 
                      v-model="addressForm.firstName" 
                      type="text" 
                      required 
                      placeholder="e.g. Aditi"
                      class="w-full px-3.5 py-2.5 border border-zinc-300 rounded-sm text-xs focus:outline-none focus:border-[#b8860b] bg-[#faf9f6]"
                    />
                  </div>
                  <div>
                    <label class="block text-[11px] uppercase tracking-wider text-zinc-700 font-medium mb-1.5">Last Name *</label>
                    <input 
                      v-model="addressForm.lastName" 
                      type="text" 
                      required 
                      placeholder="e.g. Sundaram"
                      class="w-full px-3.5 py-2.5 border border-zinc-300 rounded-sm text-xs focus:outline-none focus:border-[#b8860b] bg-[#faf9f6]"
                    />
                  </div>
                </div>

                <!-- Contact Row -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-[11px] uppercase tracking-wider text-zinc-700 font-medium mb-1.5">WhatsApp / Phone Number *</label>
                    <div class="flex">
                      <span class="inline-flex items-center px-3 border border-r-0 border-zinc-300 bg-zinc-100 text-xs text-zinc-600">+91</span>
                      <input 
                        v-model="addressForm.phone" 
                        type="tel" 
                        required 
                        placeholder="90474 74454"
                        class="w-full px-3.5 py-2.5 border border-zinc-300 rounded-r-sm text-xs focus:outline-none focus:border-[#b8860b] bg-[#faf9f6]"
                      />
                    </div>
                  </div>
                  <div>
                    <label class="block text-[11px] uppercase tracking-wider text-zinc-700 font-medium mb-1.5">Email Address *</label>
                    <input 
                      v-model="addressForm.email" 
                      type="email" 
                      required 
                      placeholder="aditi@example.com"
                      class="w-full px-3.5 py-2.5 border border-zinc-300 rounded-sm text-xs focus:outline-none focus:border-[#b8860b] bg-[#faf9f6]"
                    />
                  </div>
                </div>

                <!-- Street Address -->
                <div>
                  <label class="block text-[11px] uppercase tracking-wider text-zinc-700 font-medium mb-1.5">Flat, House No., Building / Estate *</label>
                  <input 
                    v-model="addressForm.street" 
                    type="text" 
                    required 
                    placeholder="e.g. Villa 14, Whispering Palms Estate, Race Course"
                    class="w-full px-3.5 py-2.5 border border-zinc-300 rounded-sm text-xs focus:outline-none focus:border-[#b8860b] bg-[#faf9f6]"
                  />
                </div>

                <!-- Locality & Landmark -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-[11px] uppercase tracking-wider text-zinc-700 font-medium mb-1.5">Locality / Area *</label>
                    <input 
                      v-model="addressForm.locality" 
                      type="text" 
                      required 
                      placeholder="e.g. Race Course / RS Puram"
                      class="w-full px-3.5 py-2.5 border border-zinc-300 rounded-sm text-xs focus:outline-none focus:border-[#b8860b] bg-[#faf9f6]"
                    />
                  </div>
                  <div>
                    <label class="block text-[11px] uppercase tracking-wider text-zinc-700 font-medium mb-1.5">Landmark (Optional)</label>
                    <input 
                      v-model="addressForm.landmark" 
                      type="text" 
                      placeholder="e.g. Near Coimbatore Club"
                      class="w-full px-3.5 py-2.5 border border-zinc-300 rounded-sm text-xs focus:outline-none focus:border-[#b8860b] bg-[#faf9f6]"
                    />
                  </div>
                </div>

                <!-- City, State, PIN -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-[11px] uppercase tracking-wider text-zinc-700 font-medium mb-1.5">City *</label>
                    <input 
                      v-model="addressForm.city" 
                      type="text" 
                      required 
                      placeholder="Coimbatore"
                      class="w-full px-3.5 py-2.5 border border-zinc-300 rounded-sm text-xs focus:outline-none focus:border-[#b8860b] bg-[#faf9f6]"
                    />
                  </div>
                  <div>
                    <label class="block text-[11px] uppercase tracking-wider text-zinc-700 font-medium mb-1.5">State *</label>
                    <input 
                      v-model="addressForm.state" 
                      type="text" 
                      required 
                      placeholder="Tamil Nadu"
                      class="w-full px-3.5 py-2.5 border border-zinc-300 rounded-sm text-xs focus:outline-none focus:border-[#b8860b] bg-[#faf9f6]"
                    />
                  </div>
                  <div>
                    <label class="block text-[11px] uppercase tracking-wider text-zinc-700 font-medium mb-1.5">PIN Code *</label>
                    <input 
                      v-model="addressForm.pincode" 
                      type="text" 
                      required 
                      placeholder="641018"
                      class="w-full px-3.5 py-2.5 border border-zinc-300 rounded-sm text-xs focus:outline-none focus:border-[#b8860b] bg-[#faf9f6]"
                    />
                  </div>
                </div>

                <!-- Address Type -->
                <div class="pt-2">
                  <label class="block text-[11px] uppercase tracking-wider text-zinc-700 font-medium mb-2">Address Classification</label>
                  <div class="flex gap-4">
                    <label 
                      v-for="type in ['Residence / Home', 'Corporate / Office', 'VIP Hotel Suite']" 
                      :key="type"
                      class="flex items-center gap-2 text-xs text-zinc-700 cursor-pointer"
                    >
                      <input 
                        type="radio" 
                        v-model="addressForm.type" 
                        :value="type" 
                        class="accent-[#b8860b]"
                      />
                      <span>{{ type }}</span>
                    </label>
                  </div>
                </div>

                <!-- White-Glove Handover Notes -->
                <div class="pt-2">
                  <label class="block text-[11px] uppercase tracking-wider text-zinc-700 font-medium mb-1.5">
                    White-Glove Handover & Bespoke Notes (Optional)
                  </label>
                  <textarea 
                    v-model="addressForm.notes" 
                    rows="2"
                    placeholder="e.g. Please deliver in heritage gold-embossed gift box; request trial fitting with advisor."
                    class="w-full px-3.5 py-2 border border-zinc-300 rounded-sm text-xs focus:outline-none focus:border-[#b8860b] bg-[#faf9f6]"
                  ></textarea>
                </div>

                <!-- Submit Step 1 Button -->
                <div class="pt-4 border-t border-zinc-200 flex justify-end">
                  <button 
                    type="submit" 
                    class="px-8 py-3.5 bg-black text-[#fef08a] font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#b8860b] hover:text-black transition-all cursor-pointer shadow-md flex items-center gap-2"
                  >
                    <span>Proceed to Payment Options</span>
                    <span>→</span>
                  </button>
                </div>
              </form>
            </div>

            <!-- STEP 2: PAYMENT OPTIONS -->
            <div v-if="currentStep === 2" class="bg-white border border-zinc-200 p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
              <div class="border-b border-zinc-200 pb-4 flex items-center justify-between">
                <div>
                  <h2 class="font-serif text-xl tracking-wider text-black font-normal">Select Preferred Payment Method</h2>
                  <p class="text-xs text-zinc-500 font-light mt-0.5">Encrypted 256-bit atelier checkout with instant confirmation.</p>
                </div>
                <span class="text-xs bg-[#b8860b]/10 text-[#b8860b] px-2.5 py-1 rounded font-medium">Step 2 of 3</span>
              </div>

              <!-- Payment Method Selector Tabs -->
              <div class="space-y-3">
                <!-- Option 1: UPI -->
                <div 
                  @click="paymentMethod = 'upi'"
                  class="border p-4 rounded-sm cursor-pointer transition-all"
                  :class="paymentMethod === 'upi' ? 'border-[#b8860b] bg-[#faf9f6] ring-1 ring-[#b8860b]' : 'border-zinc-200 hover:border-zinc-300'"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <input type="radio" v-model="paymentMethod" value="upi" class="accent-[#b8860b]" />
                      <div>
                        <span class="font-medium text-xs text-black uppercase tracking-wider">UPI / Instant QR Code</span>
                        <p class="text-[11px] text-zinc-500 font-light">Google Pay, PhonePe, Paytm, CRED & Any UPI App</p>
                      </div>
                    </div>
                    <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Instant 0% Fee</span>
                  </div>

                  <!-- UPI Form details if active -->
                  <div v-if="paymentMethod === 'upi'" class="mt-4 pt-4 border-t border-zinc-200 space-y-3">
                    <label class="block text-[11px] uppercase tracking-wider text-zinc-700 font-medium">Enter Virtual Payment Address (UPI ID)</label>
                    <div class="flex gap-2">
                      <input 
                        v-model="upiId"
                        type="text" 
                        placeholder="yourname@okhdfcbank / yourname@paytm"
                        class="flex-1 px-3.5 py-2 border border-zinc-300 rounded-sm text-xs focus:outline-none focus:border-[#b8860b] bg-white"
                      />
                      <button 
                        type="button" 
                        class="px-4 py-2 bg-zinc-900 text-white text-xs tracking-wider uppercase hover:bg-[#b8860b] transition-all"
                      >
                        Verify
                      </button>
                    </div>
                    <div class="p-3 bg-zinc-100 rounded text-[11px] text-zinc-600 flex items-center gap-2">
                      <span>📲</span> Scan & Pay QR option will be presented upon order placement.
                    </div>
                  </div>
                </div>

                <!-- Option 2: Cards -->
                <div 
                  @click="paymentMethod = 'card'"
                  class="border p-4 rounded-sm cursor-pointer transition-all"
                  :class="paymentMethod === 'card' ? 'border-[#b8860b] bg-[#faf9f6] ring-1 ring-[#b8860b]' : 'border-zinc-200 hover:border-zinc-300'"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <input type="radio" v-model="paymentMethod" value="card" class="accent-[#b8860b]" />
                      <div>
                        <span class="font-medium text-xs text-black uppercase tracking-wider">Luxury Credit & Debit Cards</span>
                        <p class="text-[11px] text-zinc-500 font-light">Visa, MasterCard, American Express, RuPay</p>
                      </div>
                    </div>
                    <span class="text-xs text-zinc-400">💳</span>
                  </div>

                  <!-- Card details form -->
                  <div v-if="paymentMethod === 'card'" class="mt-4 pt-4 border-t border-zinc-200 space-y-3">
                    <div>
                      <label class="block text-[11px] uppercase tracking-wider text-zinc-700 font-medium mb-1">Cardholder Name</label>
                      <input 
                        v-model="cardForm.name"
                        type="text" 
                        placeholder="Aditi Sundaram"
                        class="w-full px-3.5 py-2 border border-zinc-300 rounded-sm text-xs focus:outline-none focus:border-[#b8860b] bg-white"
                      />
                    </div>
                    <div>
                      <label class="block text-[11px] uppercase tracking-wider text-zinc-700 font-medium mb-1">16-Digit Card Number</label>
                      <input 
                        v-model="cardForm.number"
                        type="text" 
                        maxlength="19"
                        placeholder="4111 2222 3333 4444"
                        class="w-full px-3.5 py-2 border border-zinc-300 rounded-sm text-xs focus:outline-none focus:border-[#b8860b] bg-white tracking-widest font-mono"
                      />
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                      <div>
                        <label class="block text-[11px] uppercase tracking-wider text-zinc-700 font-medium mb-1">Expiry (MM/YY)</label>
                        <input 
                          v-model="cardForm.expiry"
                          type="text" 
                          maxlength="5"
                          placeholder="12/28"
                          class="w-full px-3.5 py-2 border border-zinc-300 rounded-sm text-xs focus:outline-none focus:border-[#b8860b] bg-white"
                        />
                      </div>
                      <div>
                        <label class="block text-[11px] uppercase tracking-wider text-zinc-700 font-medium mb-1">CVV / Security Code</label>
                        <input 
                          v-model="cardForm.cvv"
                          type="password" 
                          maxlength="4"
                          placeholder="•••"
                          class="w-full px-3.5 py-2 border border-zinc-300 rounded-sm text-xs focus:outline-none focus:border-[#b8860b] bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Option 3: Net Banking -->
                <div 
                  @click="paymentMethod = 'netbanking'"
                  class="border p-4 rounded-sm cursor-pointer transition-all"
                  :class="paymentMethod === 'netbanking' ? 'border-[#b8860b] bg-[#faf9f6] ring-1 ring-[#b8860b]' : 'border-zinc-200 hover:border-zinc-300'"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <input type="radio" v-model="paymentMethod" value="netbanking" class="accent-[#b8860b]" />
                      <div>
                        <span class="font-medium text-xs text-black uppercase tracking-wider">Net Banking (Premier Banks)</span>
                        <p class="text-[11px] text-zinc-500 font-light">HDFC, ICICI, SBI, Axis, Kotak, Standard Chartered</p>
                      </div>
                    </div>
                    <span class="text-xs text-zinc-400">🏛️</span>
                  </div>

                  <div v-if="paymentMethod === 'netbanking'" class="mt-4 pt-4 border-t border-zinc-200">
                    <select 
                      v-model="selectedBank"
                      class="w-full px-3.5 py-2.5 border border-zinc-300 rounded-sm text-xs focus:outline-none focus:border-[#b8860b] bg-white"
                    >
                      <option value="HDFC Bank">HDFC Bank Premier Banking</option>
                      <option value="ICICI Bank">ICICI Bank Wealth Management</option>
                      <option value="State Bank of India">State Bank of India</option>
                      <option value="Axis Bank">Axis Bank Burgundy</option>
                      <option value="Kotak Mahindra">Kotak Private Banking</option>
                      <option value="Standard Chartered">Standard Chartered Priority</option>
                    </select>
                  </div>
                </div>

                <!-- Option 4: Atelier Handover & Pay on Delivery -->
                <div 
                  @click="paymentMethod = 'cod'"
                  class="border p-4 rounded-sm cursor-pointer transition-all"
                  :class="paymentMethod === 'cod' ? 'border-[#b8860b] bg-[#faf9f6] ring-1 ring-[#b8860b]' : 'border-zinc-200 hover:border-zinc-300'"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <input type="radio" v-model="paymentMethod" value="cod" class="accent-[#b8860b]" />
                      <div>
                        <span class="font-medium text-xs text-black uppercase tracking-wider">Atelier Handover & Pay on Delivery</span>
                        <p class="text-[11px] text-zinc-500 font-light">Card / Cash / UPI upon doorstep trial & inspection</p>
                      </div>
                    </div>
                    <span class="text-xs bg-[#b8860b]/15 text-[#b8860b] px-2 py-0.5 rounded font-medium">VIP White-Glove</span>
                  </div>
                </div>
              </div>

              <!-- VIP Concierge Gift Voucher Code -->
              <div class="pt-4 border-t border-zinc-200 space-y-2">
                <label class="block text-[11px] uppercase tracking-wider text-zinc-700 font-medium">VIP Atelier Gift Voucher / Privileged Code</label>
                <div class="flex gap-2">
                  <input 
                    v-model="voucherCode"
                    type="text" 
                    placeholder="Try: ROYAL10 or LECOTRUS"
                    class="flex-1 px-3.5 py-2 border border-zinc-300 rounded-sm text-xs focus:outline-none focus:border-[#b8860b] uppercase tracking-widest bg-[#faf9f6]"
                  />
                  <button 
                    @click="applyVoucher"
                    type="button" 
                    class="px-5 py-2 bg-zinc-900 text-[#fef08a] text-xs uppercase tracking-wider hover:bg-[#b8860b] hover:text-black transition-all font-semibold"
                  >
                    Apply
                  </button>
                </div>
                <p v-if="voucherApplied" class="text-xs text-emerald-700 font-medium flex items-center gap-1">
                  <span>✓</span> {{ voucherMessage }}
                </p>
              </div>

              <!-- Nav Buttons Step 2 -->
              <div class="pt-4 border-t border-zinc-200 flex items-center justify-between">
                <button 
                  @click="currentStep = 1"
                  type="button" 
                  class="px-6 py-3 border border-zinc-300 text-zinc-700 text-xs uppercase tracking-wider hover:border-black transition-all"
                >
                  ← Edit Address
                </button>
                <button 
                  @click="proceedToReview" 
                  class="px-8 py-3.5 bg-black text-[#fef08a] font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#b8860b] hover:text-black transition-all cursor-pointer shadow-md flex items-center gap-2"
                >
                  <span>Review & Finalize Order</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            <!-- STEP 3: REVIEW, OTHERS & PLACE ORDER -->
            <div v-if="currentStep === 3" class="bg-white border border-zinc-200 p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
              <div class="border-b border-zinc-200 pb-4 flex items-center justify-between">
                <div>
                  <h2 class="font-serif text-xl tracking-wider text-black font-normal">Final Order Review & Atelier Dispatch</h2>
                  <p class="text-xs text-zinc-500 font-light mt-0.5">Please review your delivery details and order pieces before confirmation.</p>
                </div>
                <span class="text-xs bg-[#b8860b]/10 text-[#b8860b] px-2.5 py-1 rounded font-medium">Step 3 of 3</span>
              </div>

              <!-- Address Recap Box -->
              <div class="bg-[#faf9f6] border border-zinc-200 p-4 rounded-sm flex items-start justify-between">
                <div class="space-y-1 text-xs">
                  <div class="flex items-center gap-2">
                    <span class="font-semibold text-black uppercase tracking-wider">📍 Delivery Destination:</span>
                    <span class="text-[10px] bg-zinc-200 text-zinc-700 px-2 py-0.5 rounded">{{ addressForm.type }}</span>
                  </div>
                  <p class="font-medium text-zinc-900">{{ addressForm.firstName }} {{ addressForm.lastName }} · +91 {{ addressForm.phone }}</p>
                  <p class="text-zinc-600 font-light">{{ addressForm.street }}, {{ addressForm.locality }}</p>
                  <p class="text-zinc-600 font-light">{{ addressForm.city }}, {{ addressForm.state }} – {{ addressForm.pincode }}</p>
                  <p v-if="addressForm.notes" class="text-zinc-500 italic text-[11px] pt-1">Notes: "{{ addressForm.notes }}"</p>
                </div>
                <button 
                  @click="currentStep = 1"
                  class="text-[11px] text-[#b8860b] hover:text-black font-semibold uppercase tracking-wider underline cursor-pointer"
                >
                  Edit
                </button>
              </div>

              <!-- Payment Recap Box -->
              <div class="bg-[#faf9f6] border border-zinc-200 p-4 rounded-sm flex items-center justify-between">
                <div class="text-xs space-y-0.5">
                  <span class="font-semibold text-black uppercase tracking-wider">💳 Payment Method:</span>
                  <p class="text-zinc-800 font-medium capitalize">
                    <span v-if="paymentMethod === 'upi'">UPI / Instant QR ({{ upiId || 'Standard UPI App' }})</span>
                    <span v-else-if="paymentMethod === 'card'">Luxury Card (Ending in •••• {{ cardForm.number.slice(-4) || '4444' }})</span>
                    <span v-else-if="paymentMethod === 'netbanking'">Net Banking ({{ selectedBank }})</span>
                    <span v-else>Atelier Handover & Pay on Delivery</span>
                  </p>
                </div>
                <button 
                  @click="currentStep = 2"
                  class="text-[11px] text-[#b8860b] hover:text-black font-semibold uppercase tracking-wider underline cursor-pointer"
                >
                  Edit
                </button>
              </div>

              <!-- Pieces in Order -->
              <div class="space-y-3">
                <h3 class="text-xs uppercase tracking-widest text-black font-semibold">Curated Pieces ({{ cartStore.cartCount }})</h3>
                <div class="divide-y divide-zinc-200 border-y border-zinc-200">
                  <div 
                    v-for="item in cartStore.items" 
                    :key="`${item.id}-${item.size}`"
                    class="py-3 flex items-center justify-between gap-4"
                  >
                    <div class="flex items-center gap-3">
                      <img :src="item.image" :alt="item.name" class="w-14 h-16 object-cover rounded-sm border border-zinc-200" />
                      <div>
                        <h4 class="font-serif text-xs uppercase tracking-wider text-black font-medium">{{ item.name }}</h4>
                        <p class="text-[11px] text-zinc-500 font-light">Size: {{ item.size }} · Qty: {{ item.quantity }}</p>
                      </div>
                    </div>
                    <span class="text-xs font-serif text-[#b8860b] font-bold">₹{{ (item.price * item.quantity).toLocaleString('en-IN') }}</span>
                  </div>
                </div>
              </div>

              <!-- Atelier Guarantees -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px] text-zinc-600">
                <div class="flex items-center gap-2 p-2.5 bg-zinc-50 rounded border border-zinc-200">
                  <span>⚜️</span>
                  <span>100% Handcrafted Authenticity</span>
                </div>
                <div class="flex items-center gap-2 p-2.5 bg-zinc-50 rounded border border-zinc-200">
                  <span>✨</span>
                  <span>Complimentary Preservation Box</span>
                </div>
                <div class="flex items-center gap-2 p-2.5 bg-zinc-50 rounded border border-zinc-200">
                  <span>🛡️</span>
                  <span>Insured White-Glove Handover</span>
                </div>
              </div>

              <!-- Place Order Button -->
              <div class="pt-4 border-t border-zinc-200 flex items-center justify-between">
                <button 
                  @click="currentStep = 2"
                  type="button" 
                  class="px-6 py-3 border border-zinc-300 text-zinc-700 text-xs uppercase tracking-wider hover:border-black transition-all"
                >
                  ← Back to Payment
                </button>
                <button 
                  @click="placeFinalOrder" 
                  :disabled="isSubmitting"
                  class="px-10 py-4 bg-[#18181b] text-[#fef08a] font-semibold text-xs tracking-[0.25em] uppercase hover:bg-[#b8860b] hover:text-black transition-all cursor-pointer shadow-xl flex items-center gap-2"
                >
                  <span v-if="isSubmitting">Creating Atelier Order...</span>
                  <span v-else>Place Order & Dispatch Atelier ✦</span>
                </button>
              </div>
            </div>

          </div>

          <!-- RIGHT: LIVE ORDER SUMMARY CARD (5 cols) -->
          <div class="lg:col-span-5 bg-white border border-zinc-200 p-6 sm:p-7 rounded-sm shadow-sm space-y-6 sticky top-28">
            <div class="border-b border-zinc-200 pb-4">
              <h3 class="font-serif text-lg tracking-wider text-black font-semibold uppercase">Order Breakdown</h3>
              <p class="text-xs text-zinc-500 font-light mt-0.5">Coimbatore Flagship Direct Dispatch</p>
            </div>

            <!-- Items Quick View -->
            <div class="space-y-3 max-h-56 overflow-y-auto pr-1">
              <div 
                v-for="item in cartStore.items" 
                :key="`${item.id}-${item.size}`"
                class="flex items-center justify-between text-xs"
              >
                <div class="flex items-center gap-2.5">
                  <img :src="item.image" :alt="item.name" class="w-10 h-12 object-cover rounded-xs" />
                  <div>
                    <p class="font-serif text-black uppercase tracking-wider truncate max-w-[170px]">{{ item.name }}</p>
                    <span class="text-zinc-500 text-[10.5px]">Qty: {{ item.quantity }} · {{ item.size }}</span>
                  </div>
                </div>
                <span class="font-medium text-zinc-800">₹{{ (item.price * item.quantity).toLocaleString('en-IN') }}</span>
              </div>
            </div>

            <!-- Pricing Breakdown -->
            <div class="space-y-2.5 pt-4 border-t border-zinc-200 text-xs">
              <div class="flex justify-between text-zinc-600">
                <span>Items Subtotal</span>
                <span>₹{{ cartStore.cartTotal.toLocaleString('en-IN') }}</span>
              </div>
              
              <div v-if="discountAmount > 0" class="flex justify-between text-emerald-700 font-medium">
                <span>VIP Voucher Discount</span>
                <span>- ₹{{ discountAmount.toLocaleString('en-IN') }}</span>
              </div>

              <div class="flex justify-between text-zinc-600">
                <span>White-Glove Insured Delivery</span>
                <span class="text-[#b8860b] font-medium uppercase text-[11px]">Complimentary</span>
              </div>

              <div class="flex justify-between text-zinc-600">
                <span>Heritage Atelier Gift Packaging</span>
                <span class="text-[#b8860b] font-medium uppercase text-[11px]">Complimentary</span>
              </div>

              <div class="flex justify-between text-zinc-600">
                <span>Estimated GST & Atelier Duties</span>
                <span>Included</span>
              </div>

              <div class="flex justify-between items-baseline pt-4 border-t border-zinc-200">
                <div>
                  <span class="font-serif text-sm tracking-wider uppercase text-black font-semibold">Total Payable</span>
                  <p class="text-[10px] text-zinc-400 font-light">All duties and bespoke taxes included</p>
                </div>
                <span class="font-serif text-xl font-bold text-[#b8860b]">₹{{ finalPayable.toLocaleString('en-IN') }}</span>
              </div>
            </div>

            <!-- Direct Concierge Help -->
            <div class="p-3.5 bg-[#faf9f6] border border-[#d4af37]/30 rounded-sm text-center space-y-1">
              <p class="text-[11px] text-[#b8860b] font-semibold tracking-wider uppercase">Need Personal Atelier Assistance?</p>
              <p class="text-[11px] text-zinc-500 font-light">Direct WhatsApp Concierge: +91 90474 74454</p>
            </div>
          </div>

        </div>
      </div>

      <!-- ORDER SUCCESS CELEBRATION SCREEN -->
      <div v-else class="max-w-2xl mx-auto bg-white border border-[#d4af37]/40 p-8 sm:p-12 rounded-sm shadow-xl text-center space-y-6">
        <div class="w-16 h-16 mx-auto rounded-full bg-black text-[#fef08a] flex items-center justify-center text-2xl border-2 border-[#b8860b] shadow-lg">
          ⚜️
        </div>

        <div class="space-y-2">
          <div class="text-[10px] uppercase tracking-[0.4em] text-[#b8860b] font-semibold">Order Confirmed</div>
          <h2 class="font-serif text-3xl tracking-wide text-black font-normal">Thank You, {{ completedOrder?.address?.firstName }}</h2>
          <p class="text-xs text-zinc-600 font-light max-w-md mx-auto leading-relaxed">
            Your couture order has been registered at our Coimbatore flagship atelier. Our Master Tailor and VIP Client Advisor are preparing your pieces.
          </p>
        </div>

        <!-- Order Summary Card -->
        <div class="bg-[#faf9f6] border border-zinc-200 p-6 rounded-sm text-left space-y-4 text-xs">
          <div class="flex justify-between border-b border-zinc-200 pb-3">
            <div>
              <span class="text-zinc-500 text-[11px] block">Order Number</span>
              <span class="font-serif text-sm text-black font-bold tracking-wider">{{ completedOrder?.orderId }}</span>
            </div>
            <div class="text-right">
              <span class="text-zinc-500 text-[11px] block">Estimated Delivery</span>
              <span class="font-medium text-black">3 – 5 Business Days</span>
            </div>
          </div>

          <div class="space-y-1">
            <span class="text-zinc-500 text-[11px] block">Delivery Destination</span>
            <p class="font-medium text-black">{{ completedOrder?.address?.street }}, {{ completedOrder?.address?.city }} – {{ completedOrder?.address?.pincode }}</p>
            <p class="text-zinc-600 font-light">Contact: +91 {{ completedOrder?.address?.phone }} · {{ completedOrder?.address?.email }}</p>
          </div>

          <div class="border-t border-zinc-200 pt-3 flex justify-between items-center">
            <span class="text-zinc-600">Total Amount Paid / Payable</span>
            <span class="font-serif text-base font-bold text-[#b8860b]">₹{{ completedOrder?.total?.toLocaleString('en-IN') }}</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a 
            :href="`https://wa.me/919047474454?text=Hello%20Lecotrus%20Atelier,%20I%20have%20placed%20order%20${completedOrder?.orderId}.%20Please%20guide%20me%20on%20fitting%20and%20timeline.`"
            target="_blank"
            class="w-full sm:w-auto px-6 py-3 bg-[#18181b] text-[#fef08a] text-xs uppercase tracking-widest font-semibold hover:bg-[#b8860b] hover:text-black transition-all flex items-center justify-center gap-2"
          >
            <span>💬 Track with WhatsApp Concierge</span>
          </a>

          <RouterLink 
            to="/" 
            class="w-full sm:w-auto px-6 py-3 border border-zinc-300 text-zinc-800 text-xs uppercase tracking-widest hover:border-black transition-all text-center"
          >
            Continue Exploring Collections
          </RouterLink>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

// State
const currentStep = ref(1) // 1: Address, 2: Payment, 3: Review
const isSubmitting = ref(false)
const orderPlaced = ref(false)
const completedOrder = ref(null)

// Step 1 Form: Address
const addressForm = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  street: '',
  locality: '',
  landmark: '',
  city: 'Coimbatore',
  state: 'Tamil Nadu',
  pincode: '641018',
  type: 'Residence / Home',
  notes: ''
})

// Step 2 Form: Payment
const paymentMethod = ref('upi')
const upiId = ref('')
const selectedBank = ref('HDFC Bank')
const cardForm = reactive({
  name: '',
  number: '',
  expiry: '',
  cvv: ''
})

// Voucher discount
const voucherCode = ref('')
const voucherApplied = ref(false)
const voucherDiscountPercent = ref(0)
const voucherMessage = ref('')

const discountAmount = computed(() => {
  if (!voucherApplied.value) return 0
  return Math.round((cartStore.cartTotal * voucherDiscountPercent.value) / 100)
})

const finalPayable = computed(() => {
  return Math.max(0, cartStore.cartTotal - discountAmount.value)
})

const applyVoucher = () => {
  const code = voucherCode.value.trim().toUpperCase()
  if (code === 'ROYAL10' || code === 'LECOTRUS') {
    voucherApplied.value = true
    voucherDiscountPercent.value = 10
    voucherMessage.value = 'VIP 10% Atelier Privileged Savings Applied!'
  } else if (code === 'COIMBATORE') {
    voucherApplied.value = true
    voucherDiscountPercent.value = 15
    voucherMessage.value = 'Flagship Atelier 15% Welcome Privilege Applied!'
  } else {
    alert('Please enter a valid VIP voucher code (e.g. ROYAL10 or COIMBATORE)')
  }
}

// Navigation helpers
const goToStep = (step) => {
  if (step === 1) {
    currentStep.value = 1
  } else if (step === 2 && validateAddress()) {
    currentStep.value = 2
  } else if (step === 3 && validateAddress()) {
    currentStep.value = 3
  }
}

const validateAddress = () => {
  if (!addressForm.firstName || !addressForm.lastName || !addressForm.phone || !addressForm.street || !addressForm.city || !addressForm.pincode) {
    alert('Please fill in all mandatory delivery address fields (*).')
    return false
  }
  return true
}

const proceedToPayment = () => {
  if (validateAddress()) {
    currentStep.value = 2
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const proceedToReview = () => {
  currentStep.value = 3
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Final Submission
const placeFinalOrder = () => {
  isSubmitting.value = true
  
  setTimeout(() => {
    const orderId = `#LEC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`
    
    completedOrder.value = {
      orderId,
      items: [...cartStore.items],
      address: { ...addressForm },
      paymentMethod: paymentMethod.value,
      total: finalPayable.value,
      createdAt: new Date().toISOString()
    }

    cartStore.addOrder(completedOrder.value)
    cartStore.clearCart()
    isSubmitting.value = false
    orderPlaced.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, 1200)
}
</script>
