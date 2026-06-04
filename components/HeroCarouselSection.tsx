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
  <section className="relative h-[100dvh] overflow-hidden bg-primary">
    <Carousel slides={carouselSlides} />

   {/* Luxury vignette */}
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-900/10 z-10 pointer-events-none" />

  {/* Top gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/20 to-transparent z-10 pointer-events-none" />
    {/* Availability Badge */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="
        hidden
        lg:flex
        absolute
        left-10
        bottom-10
        z-30
      "
    >
      <div
        className="
          glass-pill
          px-6
          py-3
          rounded-full
          flex
          items-center
          gap-3
        "
      >
        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />

        <span
          className="
            text-white
            text-[11px]
            uppercase
            tracking-[0.25em]
            font-black
          "
        >
          Available 24/7
        </span>
      </div>
    </motion.div>

    {/* Scroll Indicator */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      className="
        hidden
        md:flex
        absolute
        right-10
        bottom-10
        z-30
        flex-col
        items-center
        gap-4
      "
    >
      <span
        className="
          text-white/40
          text-[10px]
          uppercase
          tracking-[0.4em]
        "
      >
        Scroll
      </span>

      <div className="w-px h-20 bg-gradient-to-b from-white/50 to-transparent" />
    </motion.div>
  </section>
)
}
