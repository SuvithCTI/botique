<template>
  <div class="space-y-6 pb-10 px-3.5 pt-16 bg-white text-[#18181b]">
    <!-- MOBILE HERO (Women's Couture) -->
    <section class="relative h-[72vh] rounded-sm overflow-hidden flex flex-col justify-end p-6 border border-zinc-200 bg-[#18181b] shadow-md">
      <img 
        src="/images/hero/hero-womens-couture.jpg" 
        alt="Lecotrus Women's Couture Mobile Hero"
        class="absolute inset-0 w-full h-full object-cover opacity-100"
        loading="eager"
        fetchpriority="high"
        decoding="async"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

      <div class="relative z-10 space-y-3">
        <span class="text-[9px] uppercase tracking-[0.35em] text-[#fef08a] font-semibold drop-shadow">
          ATELIER AUTUMN / WINTER 2026
        </span>
        <h1 class="font-serif text-3xl tracking-widest text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          ARCHITECTURAL <br />
          <span class="text-[#fef08a] font-serif italic">OPULENCE</span>
        </h1>
        <p class="text-xs text-zinc-100 font-light leading-relaxed drop-shadow">
          Sculptural draping meets imperial Indian zardozi craftsmanship.
        </p>
        
        <div class="grid grid-cols-2 gap-2 pt-2">
          <RouterLink 
            to="/bridal" 
            class="block w-full py-3 bg-[#18181b]/90 text-white text-center text-[11px] font-semibold uppercase tracking-[0.15em] rounded-xs shadow-md border border-white/20"
          >
            Bridal Heirloom
          </RouterLink>
          <RouterLink 
            to="/women" 
            class="block w-full py-3 bg-white text-black text-center text-[11px] font-semibold uppercase tracking-[0.15em] rounded-xs shadow-sm hover:bg-[#faf9f6]"
          >
            Women's Edit
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- MOBILE SECTION 2: MENSWEAR CAMPAIGN -->
    <section class="relative h-[68vh] rounded-sm overflow-hidden flex flex-col justify-end p-6 border border-zinc-200 bg-[#18181b] shadow-md">
      <img 
        src="/images/hero/menswear-fullsize-banner.jpg" 
        alt="Lecotrus Menswear Mobile Campaign"
        class="absolute inset-0 w-full h-full object-cover opacity-100"
        loading="lazy"
        decoding="async"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent"></div>

      <div class="relative z-10 space-y-3">
        <span class="text-[9px] uppercase tracking-[0.35em] text-[#fef08a] font-semibold drop-shadow">
          MASTER BESPOKE & GROOMWEAR
        </span>
        <h2 class="font-serif text-3xl tracking-widest text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          MEN'S BESPOKE
        </h2>
        <p class="text-xs text-zinc-100 font-light leading-relaxed drop-shadow">
          Imperial achkans, tailored bandhgalas, and pure silk creations crafted for royalty.
        </p>
        
        <div class="pt-2">
          <RouterLink 
            to="/men" 
            class="block w-full py-3 bg-black/40 border-2 border-white text-white text-center text-xs font-semibold uppercase tracking-[0.2em] rounded-xs shadow-md hover:bg-white hover:text-black transition-colors backdrop-blur-xs"
          >
            Explore Men's Suite →
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- MOBILE SECTION 3: BRIDAL CAMPAIGN -->
    <section class="relative h-[68vh] rounded-sm overflow-hidden flex flex-col justify-end p-6 border border-zinc-200 bg-[#18181b] shadow-md">
      <img 
        src="/images/hero/bridal-fullsize-banner.jpg" 
        alt="Lecotrus Bridal Mobile Campaign"
        class="absolute inset-0 w-full h-full object-cover object-[center_20%] opacity-100"
        loading="lazy"
        decoding="async"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent"></div>

      <div class="relative z-10 space-y-3">
        <span class="text-[9px] uppercase tracking-[0.35em] text-[#fef08a] font-semibold drop-shadow">
          HAUTE COUTURE HEIRLOOM
        </span>
        <h2 class="font-serif text-3xl tracking-widest text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          BRIDAL SUITE
        </h2>
        <p class="text-xs text-zinc-100 font-light leading-relaxed drop-shadow">
          Generational lehengas, hand-embroidered zardozi ensembles, and bespoke trousseau.
        </p>
        
        <div class="pt-2">
          <RouterLink 
            to="/bridal" 
            class="block w-full py-3 bg-[#b8860b] text-black text-center text-xs font-bold uppercase tracking-[0.2em] rounded-xs shadow-md"
          >
            Explore Bridal Suite →
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- MOBILE SECTION 4: FINE ACCESSORIES CAMPAIGN -->
    <section class="relative h-[68vh] rounded-sm overflow-hidden flex flex-col justify-end p-6 border border-zinc-200 bg-[#18181b] shadow-md">
      <img 
        src="/images/hero/accessories-fullsize-banner.jpg" 
        alt="Lecotrus Fine Accessories Mobile Campaign"
        class="absolute inset-0 w-full h-full object-cover opacity-100"
        loading="lazy"
        decoding="async"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent"></div>

      <div class="relative z-10 space-y-3">
        <span class="text-[9px] uppercase tracking-[0.35em] text-[#fef08a] font-semibold drop-shadow">
          OBJET D'ART & FINE JEWELS
        </span>
        <h2 class="font-serif text-3xl tracking-widest text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          FINE ACCESSORIES
        </h2>
        <p class="text-xs text-zinc-100 font-light leading-relaxed drop-shadow">
          Mother-of-pearl minaudières, uncut polki jewels, luxury watches, and handcrafted bridal mojaris.
        </p>
        
        <div class="pt-2">
          <RouterLink 
            to="/accessories" 
            class="block w-full py-3 bg-black/40 border-2 border-white text-white text-center text-xs font-semibold uppercase tracking-[0.2em] rounded-xs shadow-md hover:bg-white hover:text-black transition-colors backdrop-blur-xs"
          >
            Explore Accessories →
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- MOBILE CATEGORY TILES (2-Column Grid) -->
    <section class="space-y-4 pt-2">
      <div class="flex items-center justify-between pb-2 border-b border-zinc-200">
        <span class="text-[10px] uppercase tracking-[0.3em] text-[#b8860b] font-semibold">THE HOUSES</span>
        <span class="text-xs font-serif tracking-widest text-black">CURATED UNIVERSES</span>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <RouterLink to="/women" class="relative h-48 rounded-sm overflow-hidden border border-zinc-200 block shadow-xs group">
          <img src="/images/sarees/saree-1-banarasi.jpg" loading="lazy" decoding="async" class="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-3">
            <span class="text-[8px] text-[#fef08a] uppercase tracking-wider font-semibold">Collection I</span>
            <h3 class="font-serif text-xs tracking-wider text-white">WOMEN'S COUTURE</h3>
            <p class="text-[9px] text-zinc-200">Explore Sarees & Gowns →</p>
          </div>
        </RouterLink>

        <RouterLink to="/men" class="relative h-48 rounded-sm overflow-hidden border border-zinc-200 block shadow-xs group">
          <img src="/images/hero/menswear-garden-campaign.jpg" loading="lazy" decoding="async" class="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-3">
            <span class="text-[8px] text-[#fef08a] uppercase tracking-wider font-semibold">Collection II</span>
            <h3 class="font-serif text-xs tracking-wider text-white">MEN'S BESPOKE</h3>
            <p class="text-[9px] text-zinc-200">Explore Sherwanis →</p>
          </div>
        </RouterLink>

        <RouterLink to="/bridal" class="relative h-48 rounded-sm overflow-hidden border border-zinc-200 block shadow-xs group">
          <img src="/images/lehengas/lehenga-1-crimson.jpg" loading="lazy" decoding="async" class="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-3">
            <span class="text-[8px] text-[#fef08a] uppercase tracking-wider font-semibold">Heirloom</span>
            <h3 class="font-serif text-xs tracking-wider text-white">BRIDAL SUITE</h3>
            <p class="text-[9px] text-zinc-200">Explore Lehengas →</p>
          </div>
        </RouterLink>

        <RouterLink to="/accessories" class="relative h-48 rounded-sm overflow-hidden border border-zinc-200 block shadow-xs group">
          <img src="/images/hero/accessories-fullsize-banner.jpg" loading="lazy" decoding="async" class="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-3">
            <span class="text-[8px] text-[#fef08a] uppercase tracking-wider font-semibold">Objet d'Art</span>
            <h3 class="font-serif text-xs tracking-wider text-white">ACCESSORIES</h3>
            <p class="text-[9px] text-zinc-200">Explore Jewels →</p>
          </div>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
