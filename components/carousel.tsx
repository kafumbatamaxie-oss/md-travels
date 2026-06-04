"use client"

import { useState, useEffect, useRef } from "react"
import BookingDialog from "@/components/booking/BookingDialog"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight, Shield, Clock, Star } from "lucide-react"

interface CarouselSlide {
  id: number
  title: string
  subtitle: string
  image: string
  mobileImage?: string
  cta: string
}

interface CarouselProps {
  slides: CarouselSlide[]
  onBookNow?: () => void
}

export function Carousel({
  slides,
  onBookNow,
}: CarouselProps) {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const startX = useRef<number | null>(null)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 7000)

    return () => clearInterval(timer)
  }, [autoPlay, slides.length])

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
    setAutoPlay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    setAutoPlay(false)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return

    const diff = startX.current - e.changedTouches[0].clientX

    if (diff > 50) next()
    if (diff < -50) prev()

    startX.current = null
  }

  return (
    <section
      className="relative h-screen overflow-hidden pt-30"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ${
            idx === current
              ? "opacity-100 scale-100 z-20"
              : "opacity-0 scale-105 z-0"
          }`}
        >
          {/* Background */}
          <div className="absolute inset-0">
            <Image
              src={slide.mobileImage || slide.image}
              alt={slide.title}
              fill
              priority={idx === 0}
              className="object-cover sm:hidden"
            />

            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={idx === 0}
              className="hidden sm:block object-cover"
            />
          </div>

          {/* Premium overlays */}
          <div className="absolute inset-0 bg-black/55" />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

          {/* Content */}
          <div className="relative z-30 h-full flex items-center">
            <div className="max-w-7xl mx-auto w-full px-6 md:px-10">

              {/* Trust Row */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="glass-pill px-4 py-2 rounded-full text-white text-xs font-bold flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  24/7 SERVICE
                </div>

                <div className="glass-pill px-4 py-2 rounded-full text-white text-xs font-bold flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  PROFESSIONAL DRIVERS
                </div>

                <div className="glass-pill px-4 py-2 rounded-full text-white text-xs font-bold flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  PREMIUM FLEET
                </div>
              </div>

              {/* Main Hero */}
              <div className="max-w-4xl">

                <p className="text-secondary font-black uppercase tracking-[0.35em] mb-4 text-xs md:text-sm">
                  Luxury Transportation • Cape Town
                </p>

                <h1 className="text-white font-black leading-[0.95] tracking-tight text-5xl md:text-7xl lg:text-8xl">
                  {slide.title}
                </h1>

                <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                  {slide.subtitle}
                </p>

                {/* CTA */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={onBookNow}
                    className="
                      bg-secondary
                      text-black
                      px-8
                      py-4
                      rounded-2xl
                      font-black
                      uppercase
                      tracking-wider
                      flex
                      items-center
                      justify-center
                      gap-3
                      hover:scale-105
                      transition
                    "
                  >
                    Book Now
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <a
                    href="https://wa.me/27606411703"
                    target="_blank"
                    className="
                      glass-pill
                      px-8
                      py-4
                      rounded-2xl
                      text-white
                      font-black
                      uppercase
                      tracking-wider
                      text-center
                    "
                  >
                    WhatsApp Us
                  </a>
                </div>

                {/* Service tags */}
                <div className="flex flex-wrap gap-3 mt-10">
                  {[
                    "Airport Transfers",
                    "Corporate Travel",
                    "Events",
                    "Tours",
                    "Chauffeur Services",
                  ].map((tag) => (
                    <div
                      key={tag}
                      className="
                        bg-white/10
                        backdrop-blur-md
                        border
                        border-white/10
                        text-white/90
                        px-4
                        py-2
                        rounded-full
                        text-xs
                        uppercase
                        tracking-widest
                        font-semibold
                      "
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Left Arrow */}
      <button
        onClick={prev}
        className="
          hidden
          lg:flex
          absolute
          left-8
          top-1/2
          -translate-y-1/2
          z-40
          w-14
          h-14
          rounded-full
          bg-white/10
          backdrop-blur-xl
          border
          border-white/10
          items-center
          justify-center
          text-white
          hover:bg-white/20
          transition
        "
      >
        <ChevronLeft />
      </button>

      {/* Right Arrow */}
      <button
        onClick={next}
        className="
          hidden
          lg:flex
          absolute
          right-8
          top-1/2
          -translate-y-1/2
          z-40
          w-14
          h-14
          rounded-full
          bg-white/10
          backdrop-blur-xl
          border
          border-white/10
          items-center
          justify-center
          text-white
          hover:bg-white/20
          transition
        "
      >
        <ChevronRight />
      </button>

      {/* Slide Counter */}
      <div className="absolute right-8 bottom-8 z-40 text-white font-black text-xl">
        {String(current + 1).padStart(2, "0")}
        <span className="text-white/30">
          /{String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-8 z-40 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrent(i)
              setAutoPlay(false)
            }}
            className={`transition-all rounded-full ${
              i === current
                ? "bg-secondary w-10 h-2"
                : "bg-white/40 w-2 h-2"
            }`}
          />
        ))}
      </div>
    </section>
  )
}