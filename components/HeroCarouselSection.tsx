"use client"

import { translations } from "@/lib/i18n"
import { Carousel } from "./carousel"
import { useLanguage } from "./language-provider"
import { motion } from "framer-motion"

export const HeroCarouselSection = () => {
  const { language, mounted } = useLanguage()
  const t = translations[language]

  // Beautiful placeholder while mounting to prevent layout shift (CLS)
  if (!mounted) {
    return (
      <div className="h-[90dvh] w-full bg-[#0a0a0c] flex items-center justify-center">
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/10 font-black text-4xl md:text-8xl tracking-tighter uppercase"
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
      subtitle: "Reliable, on-time airport pickup and drop-off services for business and leisure travelers.",
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
    <section className="relative h-[90dvh] md:h-screen w-full overflow-hidden bg-black">
      {/* The Carousel handles the image/text logic internally */}
      <Carousel slides={carouselSlides} />

      {/* GLOBAL CINEMATIC OVERLAYS */}
      
      {/* Bottom shadow gradient to ensure text readability on all slides */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      
      {/* 24/7 Availability Badge */}
      <div className="absolute top-8 left-8 z-20 hidden lg:block">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <p className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">
              Available 24/7 in Cape Town
            </p>
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 right-12 z-20 hidden md:flex flex-col items-center gap-6"
      >
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.5em] [writing-mode:vertical-lr]">
          Scroll
        </p>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  )
}
