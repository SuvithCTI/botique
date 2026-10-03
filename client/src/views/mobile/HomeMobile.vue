<template>
  <div class="space-y-6 pb-28 px-3.5 pt-16 bg-white text-[#18181b]">
    <!-- QUICK HORIZONTAL CATEGORY SCROLLER -->
    <div class="flex gap-2 overflow-x-auto pb-1 -mx-3.5 px-3.5 scrollbar-none text-[11px]">
      <RouterLink 
        to="/women" 
        class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#faf9f6] border border-zinc-200 text-zinc-800 font-medium whitespace-nowrap shadow-2xs hover:border-black"
      >
        <span>👗</span>
        <span>Women's Couture</span>
      </RouterLink>
      <RouterLink 
        to="/men" 
        class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#faf9f6] border border-zinc-200 text-zinc-800 font-medium whitespace-nowrap shadow-2xs hover:border-black"
      >
        <span>🤵</span>
        <span>Men's Bespoke</span>
      </RouterLink>
      <RouterLink 
        to="/bridal" 
        class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#faf9f6] border border-[#d4af37]/60 text-[#b8860b] font-semibold whitespace-nowrap shadow-2xs hover:border-black"
      >
        <span>💍</span>
        <span>Bridal Suite</span>
      </RouterLink>
      <RouterLink 
        to="/accessories" 
        class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#faf9f6] border border-zinc-200 text-zinc-800 font-medium whitespace-nowrap shadow-2xs hover:border-black"
      >
        <span>✨</span>
        <span>Fine Accessories</span>
      </RouterLink>
    </div>

    <!-- MOBILE HERO (Women's Couture) -->
    <section class="relative h-[72vh] rounded-sm overflow-hidden flex flex-col justify-end p-6 border border-zinc-200 bg-[#18181b] shadow-md">
      <img 
        src="/images/hero/hero-womens-couture.jpg" 
        alt="Lecotrus Women's Couture Mobile Hero"
        class="absolute inset-0 w-full h-full object-cover opacity-85"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

      <div class="relative z-10 space-y-3">
        <span class="text-[9px] uppercase tracking-[0.35em] text-[#fef08a] font-semibold">
          ATELIER AUTUMN / WINTER 2026
        </span>
        <h1 class="font-serif text-3xl tracking-widest text-white leading-tight">
          ARCHITECTURAL <br />
          <span class="text-[#fef08a] font-serif italic">OPULENCE</span>
        </h1>
        <p class="text-xs text-zinc-200 font-light leading-relaxed">
          Sculptural draping meets imperial Indian zardozi craftsmanship.
        </p>
        
        <div class="grid grid-cols-2 gap-2 pt-2">
          <RouterLink 
            to="/bridal" 
            class="block w-full py-3 bg-[#18181b] text-white text-center text-[11px] font-semibold uppercase tracking-[0.15em] rounded-xs shadow-md border border-white/20"
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
        class="absolute inset-0 w-full h-full object-cover opacity-85"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/30"></div>

      <div class="relative z-10 space-y-3">
        <span class="text-[9px] uppercase tracking-[0.35em] text-[#fef08a] font-semibold">
          MASTER BESPOKE & GROOMWEAR
        </span>
        <h2 class="font-serif text-3xl tracking-widest text-white leading-tight">
          MEN'S BESPOKE
        </h2>
        <p class="text-xs text-zinc-200 font-light leading-relaxed">
          Imperial achkans, tailored bandhgalas, and pure silk creations crafted for royalty.
        </p>
        
        <div class="pt-2">
          <RouterLink 
            to="/men" 
            class="block w-full py-3 bg-transparent border-2 border-white text-white text-center text-xs font-semibold uppercase tracking-[0.2em] rounded-xs shadow-md hover:bg-white hover:text-black transition-colors"
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
        class="absolute inset-0 w-full h-full object-cover opacity-85"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/30"></div>

      <div class="relative z-10 space-y-3">
        <span class="text-[9px] uppercase tracking-[0.35em] text-[#fef08a] font-semibold">
          HAUTE COUTURE HEIRLOOM
        </span>
        <h2 class="font-serif text-3xl tracking-widest text-white leading-tight">
          BRIDAL SUITE
        </h2>
        <p class="text-xs text-zinc-200 font-light leading-relaxed">
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
        class="absolute inset-0 w-full h-full object-cover opacity-85"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/30"></div>

      <div class="relative z-10 space-y-3">
        <span class="text-[9px] uppercase tracking-[0.35em] text-[#fef08a] font-semibold">
          OBJET D'ART & FINE JEWELS
        </span>
        <h2 class="font-serif text-3xl tracking-widest text-white leading-tight">
          FINE ACCESSORIES
        </h2>
        <p class="text-xs text-zinc-200 font-light leading-relaxed">
          Mother-of-pearl minaudières, uncut polki jewels, luxury watches, and handcrafted bridal mojaris.
        </p>
        
        <div class="pt-2">
          <RouterLink 
            to="/accessories" 
            class="block w-full py-3 bg-transparent border-2 border-white text-white text-center text-xs font-semibold uppercase tracking-[0.2em] rounded-xs shadow-md hover:bg-white hover:text-black transition-colors"
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
          <img src="/images/sarees/saree-1-banarasi.jpg" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-3">
            <span class="text-[8px] text-[#fef08a] uppercase tracking-wider font-semibold">Collection I</span>
            <h3 class="font-serif text-xs tracking-wider text-white">WOMEN'S COUTURE</h3>
            <p class="text-[9px] text-zinc-300">Explore Sarees & Gowns →</p>
          </div>
        </RouterLink>

        <RouterLink to="/men" class="relative h-48 rounded-sm overflow-hidden border border-zinc-200 block shadow-xs group">
          <img src="/images/hero/menswear-garden-campaign.jpg" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-3">
            <span class="text-[8px] text-[#fef08a] uppercase tracking-wider font-semibold">Collection II</span>
            <h3 class="font-serif text-xs tracking-wider text-white">MEN'S BESPOKE</h3>
            <p class="text-[9px] text-zinc-300">Explore Sherwanis →</p>
          </div>
        </RouterLink>

        <RouterLink to="/bridal" class="relative h-48 rounded-sm overflow-hidden border border-zinc-200 block shadow-xs group">
          <img src="/images/lehengas/lehenga-1-crimson.jpg" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-3">
            <span class="text-[8px] text-[#fef08a] uppercase tracking-wider font-semibold">Heirloom</span>
            <h3 class="font-serif text-xs tracking-wider text-white">BRIDAL SUITE</h3>
            <p class="text-[9px] text-zinc-300">Explore Lehengas →</p>
          </div>
        </RouterLink>

        <RouterLink to="/accessories" class="relative h-48 rounded-sm overflow-hidden border border-zinc-200 block shadow-xs group">
          <img src="/images/hero/accessories-fullsize-banner.jpg" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-3">
            <span class="text-[8px] text-[#fef08a] uppercase tracking-wider font-semibold">Objet d'Art</span>
            <h3 class="font-serif text-xs tracking-wider text-white">ACCESSORIES</h3>
            <p class="text-[9px] text-zinc-300">Explore Jewels →</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ATELIER TRUST PILLARS -->
    <section class="bg-[#faf9f6] border border-zinc-200 rounded-sm p-4 space-y-3.5 text-center">
      <span class="text-[9px] uppercase tracking-[0.35em] text-[#b8860b] font-semibold">THE LECOTRUS PROMISE</span>
      <div class="grid grid-cols-2 gap-3 text-left">
        <div class="p-2.5 bg-white border border-zinc-200 rounded-xs space-y-1">
          <span class="text-base">⚜️</span>
          <h4 class="font-serif text-[11px] font-semibold text-black">Artisanal Mastercraft</h4>
          <p class="text-[10px] text-zinc-600 font-light leading-snug">Hand-embroidered zardozi and pure Mulberry & Matka silks.</p>
        </div>
        <div class="p-2.5 bg-white border border-zinc-200 rounded-xs space-y-1">
          <span class="text-base">🏛️</span>
          <h4 class="font-serif text-[11px] font-semibold text-black">Flagship Atelier</h4>
          <p class="text-[10px] text-zinc-600 font-light leading-snug">Private salon consultations in R.S. Puram, Coimbatore.</p>
        </div>
        <div class="p-2.5 bg-white border border-zinc-200 rounded-xs space-y-1">
          <span class="text-base">✨</span>
          <h4 class="font-serif text-[11px] font-semibold text-black">Bespoke Fitting</h4>
          <p class="text-[10px] text-zinc-600 font-light leading-snug">Custom measurements taken by master couturiers.</p>
        </div>
        <div class="p-2.5 bg-white border border-zinc-200 rounded-xs space-y-1">
          <span class="text-base">📦</span>
          <h4 class="font-serif text-[11px] font-semibold text-black">White-Glove Delivery</h4>
          <p class="text-[10px] text-zinc-600 font-light leading-snug">Complimentary insured delivery across Coimbatore & India.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
