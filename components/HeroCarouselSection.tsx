"use client"

import { translations } from "@/lib/i18n"
import { Carousel } from "./carousel"
import { useLanguage } from "./language-provider"
import { motion } from "framer-motion"

export const HeroCarouselSection = () => {
  const { language, mounted } = useLanguage()
  const t = translations[language]

  // Cinematic mounting state to set the "Premium" tone immediately
  if (!mounted) {
    return (
      <div className="h-[100dvh] w-full bg-bleu-primary flex items-center justify-center">
        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/5 font-black text-6xl md:text-[12vw] tracking-tighter uppercase select-none"
        >
          Premium
        </motion.div>
      </div>
    )
  }

  const carouselSlides = [
    {
      id: 1,
      title: t.hero.title,
      subtitle: t.hero.subtitle,
      cta: t.hero.cta1,
      image: "/hero-1.jpg",
      mobileImage: "/hero-mobile-1.jpg",
    },
    {
      id: 2,
      title: t.services.airportTransfers,
      subtitle: "Reliable, on-time airport pickup and drop-off services for business and leisure travellers.",
      cta: t.hero.cta1,
      image: "/bg-2.jpeg",
      mobileImage: "/hero-mobile-2.jpg",
    },
    {
      id: 3,
      title: t.services.corporateTravel,
      subtitle: "Professional transportation for your business needs with experienced drivers and luxury vehicles.",
      cta: t.hero.cta1,
      image: "/images/toyota36seater_4x.png",
      mobileImage: "/images/toyota36seater.png",
    },
    {
      id: 4,
      title: t.services.events,
      subtitle: "Make your special day memorable with our premium transportation and professional service.",
      image: "/hero-9.jpg",
      mobileImage: "/hero-mobile-4.jpg",
      cta: t.hero.cta1,
    },
    {
      id: 100,
      title: t.hero.title,
      subtitle: t.hero.subtitle,
      cta: t.hero.cta1,
      image: "/quantum.jpeg",
      mobileImage: "/quantum.jpg",
    },
  ]

  return (
    <section className="relative h-[90dvh] md:h-screen w-full overflow-hidden bg-primary">
      {/* 
          PASSING REFINED DATA TO CAROUSEL:
          The Carousel should use the 'animate-shimmer' class for slide titles 
          to match our new global CSS theme.
      */}
      <Carousel slides={carouselSlides} />

      {/* GLOBAL CINEMATIC OVERLAYS */}
      
      {/* Heavy Bottom Vignette: Ensures text remains legible regardless of the slide image */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-primary via-transparent to-primary/20" />
      
      {/* 24/7 Availability Badge: Using the new 'glass-pill' class */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-10 left-10 z-20 hidden lg:block"
      >
        <div className="glass-pill px-6 py-2.5 rounded-full flex items-center gap-3">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
          </div>
          <p className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
            Available 24/7 <span className="text-white/40 ml-1">• Cape Town</span>
          </p>
        </div>
      </motion.div>

      {/* Floating Scroll Indicator: Vertical alignment for luxury feel */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 right-12 z-20 hidden md:flex flex-col items-center gap-6"
      >
        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] [writing-mode:vertical-lr] select-none">
          Explore
        </p>
        <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  )
}
