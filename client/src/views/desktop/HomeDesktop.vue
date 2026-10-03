<template>
  <div class="space-y-6 pb-16 bg-white text-[#18181b] w-full">
    <!-- HERO SECTION (Cinematic Editorial Full-Width Widescreen - Women's Haute Couture) -->
    <section class="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-[#18181b] pt-16">
      <img 
        src="/images/hero/hero-womens-couture.jpg" 
        alt="Lecotrus Women's Haute Couture Hero"
        class="absolute inset-0 w-full h-full object-cover opacity-90 scale-100 transition-transform duration-1000 ease-out"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40"></div>

      <div class="relative z-10 max-w-4xl text-center px-6 space-y-6">
        <h1 class="font-serif text-5xl md:text-7xl font-normal tracking-[0.2em] text-white leading-tight drop-shadow-md">
          ARCHITECTURAL <br />
          <span class="text-[#fef08a] italic font-serif">OPULENCE</span>
        </h1>
        <p class="text-sm md:text-base text-zinc-100 max-w-xl mx-auto font-light tracking-widest leading-relaxed drop-shadow">
          Where sculptural avant-garde draping meets timeless generational Indian craftsmanship.
        </p>

        <div class="pt-6 flex items-center justify-center gap-6">
          <RouterLink 
            to="/bridal" 
            class="px-8 py-3.5 bg-[#18181b] text-white text-xs font-semibold uppercase tracking-[0.25em] hover:bg-[#b8860b] shadow-xl transition-all"
          >
            Explore Bridal Heirloom
          </RouterLink>
          <RouterLink 
            to="/women" 
            class="px-8 py-3.5 bg-white/95 border border-zinc-300 text-black text-xs font-medium uppercase tracking-[0.25em] hover:border-black hover:bg-white transition-all shadow-md backdrop-blur-sm"
          >
            View Women's Couture
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- SECTION 2: MENSWEAR EDITORIAL CAMPAIGN (Full-Width Cinematic Section) -->
    <section class="relative h-screen min-h-[700px] w-full flex flex-col justify-end items-center pb-16 md:pb-24 overflow-hidden bg-[#18181b]">
      <img 
        src="/images/hero/menswear-fullsize-banner.jpg" 
        alt="Lecotrus Royal Menswear Heritage Campaign"
        class="absolute inset-0 w-full h-full object-cover opacity-90 scale-100 hover:scale-105 transition-transform duration-1000 ease-out"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

      <div class="relative z-10 max-w-4xl text-center px-6 space-y-5">
        <h2 class="font-serif text-5xl md:text-7xl font-normal tracking-[0.2em] text-white leading-tight drop-shadow-md">
          MENSWEAR
        </h2>
        <p class="text-sm md:text-base text-zinc-100 max-w-xl mx-auto font-light tracking-widest leading-relaxed drop-shadow">
          Imperial silk achkans, tailored bandhgalas, and bespoke sherwanis hand-embroidered for the contemporary connoisseur.
        </p>

        <div class="pt-4 flex items-center justify-center">
          <RouterLink 
            to="/men" 
            class="px-10 py-4 bg-transparent border-2 border-white text-white text-xs font-semibold uppercase tracking-[0.3em] hover:bg-white hover:text-black shadow-2xl transition-all duration-300 backdrop-blur-xs"
          >
            Explore Collection →
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- SECTION 3: THE BRIDAL SUITE (Full-Width Cinematic Section) -->
    <section class="relative h-screen min-h-[700px] w-full flex flex-col justify-end items-center pb-16 md:pb-24 overflow-hidden bg-[#18181b]">
      <img 
        src="/images/hero/bridal-fullsize-banner.jpg" 
        alt="Lecotrus Royal Bridal Heirloom Campaign"
        class="absolute inset-0 w-full h-full object-cover opacity-90 scale-100 hover:scale-105 transition-transform duration-1000 ease-out"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

      <div class="relative z-10 max-w-4xl text-center px-6 space-y-5">
        <h2 class="font-serif text-5xl md:text-7xl font-normal tracking-[0.2em] text-white leading-tight drop-shadow-md">
          BRIDAL HEIRLOOM
        </h2>
        <p class="text-sm md:text-base text-zinc-100 max-w-xl mx-auto font-light tracking-widest leading-relaxed drop-shadow">
          Generational lehengas, hand-embroidered zardozi ensembles, and bespoke trousseau crafted for your eternal moment.
        </p>

        <div class="pt-4 flex items-center justify-center">
          <RouterLink 
            to="/bridal" 
            class="px-10 py-4 bg-transparent border-2 border-white text-white text-xs font-semibold uppercase tracking-[0.3em] hover:bg-white hover:text-black shadow-2xl transition-all duration-300 backdrop-blur-xs"
          >
            Explore Bridal Suite →
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- SECTION 4: FINE ACCESSORIES (Full-Width Cinematic Section) -->
    <section class="relative h-screen min-h-[700px] w-full flex flex-col justify-end items-center pb-16 md:pb-24 overflow-hidden bg-[#18181b]">
      <img 
        src="/images/hero/accessories-fullsize-banner.jpg" 
        alt="Lecotrus Fine Accessories & Jewels Campaign"
        class="absolute inset-0 w-full h-full object-cover opacity-90 scale-100 hover:scale-105 transition-transform duration-1000 ease-out"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

      <div class="relative z-10 max-w-4xl text-center px-6 space-y-5">
        <h2 class="font-serif text-5xl md:text-7xl font-normal tracking-[0.2em] text-white leading-tight drop-shadow-md">
          FINE ACCESSORIES
        </h2>
        <p class="text-sm md:text-base text-zinc-100 max-w-xl mx-auto font-light tracking-widest leading-relaxed drop-shadow">
          Sculpted mother-of-pearl minaudières, heirloom polki emerald necklaces, and hand-embroidered royal silk mojaris.
        </p>

        <div class="pt-4 flex items-center justify-center">
          <RouterLink 
            to="/accessories" 
            class="px-10 py-4 bg-transparent border-2 border-white text-white text-xs font-semibold uppercase tracking-[0.3em] hover:bg-white hover:text-black shadow-2xl transition-all duration-300 backdrop-blur-xs"
          >
            Explore Accessories →
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CURATED UNIVERSES (Full-Width Responsive 4-Grid) -->
    <section class="w-full px-8 md:px-16 max-w-[1800px] mx-auto">
      <div class="text-center space-y-2 mb-12">
        <span class="text-xs uppercase tracking-[0.3em] text-[#b8860b] font-semibold">THE HOUSES</span>
        <h2 class="font-serif text-3xl tracking-[0.2em] text-black font-normal">CURATED UNIVERSES</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <!-- Women -->
        <RouterLink to="/women" class="group relative h-[520px] overflow-hidden rounded-sm border border-zinc-200 shadow-sm hover:shadow-2xl transition-all">
          <img 
            src="/images/sarees/saree-1-banarasi.jpg" 
            alt="Women's Couture"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-end p-6 space-y-1.5">
            <span class="text-[10px] tracking-[0.3em] text-[#eab308] uppercase font-semibold">Collection I</span>
            <h3 class="font-serif text-xl tracking-widest text-white group-hover:text-[#fef08a] transition-colors">WOMEN'S COUTURE</h3>
            <p class="text-xs text-zinc-300 font-light leading-relaxed">Draped Concept Sarees, Anarkalis & Capes</p>
            <div class="pt-2 flex items-center text-xs text-[#fef08a] uppercase tracking-widest font-semibold group-hover:translate-x-1 transition-transform">
              <span>Explore Women →</span>
            </div>
          </div>
        </RouterLink>

        <!-- Men -->
        <RouterLink to="/men" class="group relative h-[520px] overflow-hidden rounded-sm border border-zinc-200 shadow-sm hover:shadow-2xl transition-all">
          <img 
            src="/images/hero/menswear-garden-campaign.jpg" 
            alt="Men's Bespoke"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-end p-6 space-y-1.5">
            <span class="text-[10px] tracking-[0.3em] text-[#eab308] uppercase font-semibold">Collection II</span>
            <h3 class="font-serif text-xl tracking-widest text-white group-hover:text-[#fef08a] transition-colors">MEN'S BESPOKE</h3>
            <p class="text-xs text-zinc-300 font-light leading-relaxed">Royal Sherwanis, Bandhgalas & Silk Shirts</p>
            <div class="pt-2 flex items-center text-xs text-[#fef08a] uppercase tracking-widest font-semibold group-hover:translate-x-1 transition-transform">
              <span>Explore Men's Bespoke →</span>
            </div>
          </div>
        </RouterLink>

        <!-- Bridal -->
        <RouterLink to="/bridal" class="group relative h-[520px] overflow-hidden rounded-sm border border-zinc-200 shadow-sm hover:shadow-2xl transition-all">
          <img 
            src="/images/lehengas/lehenga-1-crimson.jpg" 
            alt="The Bridal Suite"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-end p-6 space-y-1.5">
            <span class="text-[10px] tracking-[0.3em] text-[#eab308] uppercase font-semibold">Heirloom</span>
            <h3 class="font-serif text-xl tracking-widest text-white group-hover:text-[#fef08a] transition-colors">THE BRIDAL SUITE</h3>
            <p class="text-xs text-zinc-300 font-light leading-relaxed">Heirloom Lehengas, Gowns & Trousseau</p>
            <div class="pt-2 flex items-center text-xs text-[#fef08a] uppercase tracking-widest font-semibold group-hover:translate-x-1 transition-transform">
              <span>Explore Bridal →</span>
            </div>
          </div>
        </RouterLink>

        <!-- Accessories -->
        <RouterLink to="/accessories" class="group relative h-[520px] overflow-hidden rounded-sm border border-zinc-200 shadow-sm hover:shadow-2xl transition-all">
          <img 
            src="/images/hero/accessories-fullsize-banner.jpg" 
            alt="Fine Accessories"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-end p-6 space-y-1.5">
            <span class="text-[10px] tracking-[0.3em] text-[#eab308] uppercase font-semibold">Objet d'Art</span>
            <h3 class="font-serif text-xl tracking-widest text-white group-hover:text-[#fef08a] transition-colors">FINE ACCESSORIES</h3>
            <p class="text-xs text-zinc-300 font-light leading-relaxed">Brass Minaudières, Mojaris & Jewels</p>
            <div class="pt-2 flex items-center text-xs text-[#fef08a] uppercase tracking-widest font-semibold group-hover:translate-x-1 transition-transform">
              <span>Explore Accessories →</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
