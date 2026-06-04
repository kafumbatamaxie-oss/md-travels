"use client"

import { translations } from "@/lib/i18n"
import { Carousel } from "./carousel"
import { useLanguage } from "./language-provider"
import { motion } from "framer-motion"
import BookingDialog from "@/components/booking/BookingDialog"
import { useState } from "react"

export const HeroCarouselSection = () => {
  const [bookingOpen, setBookingOpen] = useState(false)

  const { language, mounted } = useLanguage()
  const t = translations[language]

  if (!mounted) {
    return (
      <div className="h-[100dvh] w-full bg-bleu-primary flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            text-white/5
            font-black
            text-6xl
            md:text-[12vw]
            tracking-tighter
            uppercase
            select-none
          "
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
      subtitle:
        "Reliable, on-time airport pickup and drop-off services for business and leisure travellers.",
      cta: t.hero.cta1,
      image: "/bg-2.jpeg",
      mobileImage: "/hero-mobile-2.jpg",
    },
    {
      id: 3,
      title: t.services.corporateTravel,
      subtitle:
        "Professional transportation for your business needs with experienced drivers and luxury vehicles.",
      cta: t.hero.cta1,
      image: "/images/toyota36seater_4x.png",
      mobileImage: "/images/toyota36seater.png",
    },
    {
      id: 4,
      title: t.services.events,
      subtitle:
        "Make your special day memorable with our premium transportation and professional service.",
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
    <>
      <section className="relative h-[100dvh] pt-30 overflow-hidden bg-primary">
        <Carousel
          slides={carouselSlides}
          onBookNow={() => setBookingOpen(true)}
        />
      </section>

      <BookingDialog
        open={bookingOpen}
        setOpen={setBookingOpen}
      />
    </>
  )
}