"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselSlide {
  id: number
  title: string
  subtitle: string
  image: string
  cta: string
}

export function Carousel({ slides }: { slides: CarouselSlide[] }) {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
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

  return (
    <div
      className="relative w-full h-screen bg-background overflow-hidden group"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${slide.image}')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-start px-4 sm:px-8 md:px-12">
            <div className="max-w-2xl animate-fade-in">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 leading-tight text-balance">
                {slide.title}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-xl text-balance">
                {slide.subtitle}
              </p>
              <button className="px-6 sm:px-8 py-3 md:py-4 bg-secondary text-primary rounded-lg font-semibold hover:opacity-90 transition-all hover:scale-105 text-sm sm:text-base">
                {slide.cta}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons - Hidden on Mobile, Visible on Desktop */}
      <button
        onClick={prev}
        className="hidden sm:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 md:p-3 rounded-full transition backdrop-blur-sm group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <button
        onClick={next}
        className="hidden sm:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 md:p-3 rounded-full transition backdrop-blur-sm group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Dots Navigation - Mobile Friendly */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrent(idx)
              setAutoPlay(false)
            }}
            className={`transition-all rounded-full ${
              idx === current
                ? "bg-secondary w-8 sm:w-10 h-2 sm:h-3"
                : "bg-white/40 hover:bg-white/60 w-2 sm:w-3 h-2 sm:h-3"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Touch Navigation for Mobile */}
      <div className="absolute inset-0 z-10" />
    </div>
  )
}
