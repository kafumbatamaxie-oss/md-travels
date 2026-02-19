"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselSlide {
  id: number
  title: string
  subtitle: string
  image: string
  mobileImage?: string
  cta: string
}

export function Carousel({ slides }: { slides: CarouselSlide[] }) {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const startX = useRef<number | null>(null)

  /* ================= AUTOPLAY ================= */
  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [autoPlay, slides.length])

  const next = () => {
    setCurrent((p) => (p + 1) % slides.length)
    setAutoPlay(false)
  }

  const prev = () => {
    setCurrent((p) => (p - 1 + slides.length) % slides.length)
    setAutoPlay(false)
  }

  /* ================= TOUCH ================= */
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
      className="relative w-full h-[75vh] sm:h-screen overflow-hidden"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
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
              className="object-cover hidden sm:block"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

          {/* Content */}
          <div className="relative z-20 h-full flex items-center px-4 sm:px-20">
            <div className="max-w-xl sm:max-w-2xl animate-fade-in">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                {slide.title}
              </h1>

              <p className="text-sm sm:text-lg md:text-xl text-gray-200 mb-6">
                {slide.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={prev}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur"
        aria-label="Previous slide"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={next}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur"
        aria-label="Next slide"
      >
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrent(i)
              setAutoPlay(false)
            }}
            className={`rounded-full transition-all ${
              i === current
                ? "bg-secondary w-8 h-2"
                : "bg-white/40 w-2 h-2 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
