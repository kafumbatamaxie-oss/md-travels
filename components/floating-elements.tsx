"use client"

import { useEffect, useState } from "react"
import { MessageCircle, ArrowUp } from "lucide-react"

export function FloatingElements() {
  const [scrolled, setScrolled] = useState(false)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 500)
      setShowTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {/* WhatsApp Button - Shows after scroll */}
      {scrolled && (
        <a
          href="https://wa.me/27719455941"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-40 animate-slide-up"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-20" />
            <button className="relative w-14 h-14 md:w-16 md:h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110">
              <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </button>
          </div>
        </a>
      )}

      {/* Back to Top Button */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-24 md:bottom-12 md:right-28 z-40 animate-slide-up"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 bg-secondary hover:opacity-90 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110">
            <ArrowUp className="w-6 h-6 md:w-7 md:h-7 text-primary" />
          </div>
        </button>
      )}
    </>
  )
}
