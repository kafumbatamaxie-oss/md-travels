"use client"

import { useEffect, useState } from "react"
import { MessageCircle, ArrowUp } from "lucide-react"
import BottomTabBar from "./BottomTabBar"

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
        <div className="flex justify-between items-center fixed bottom-2 right-2 md:bottom-12 md:right-8 z-40 animate-slide-up w-full ">
          {<BottomTabBar />}
          <a
          href="https://wa.me/27719455941"
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
        <div className="relative">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-20" />
            <button className="relative w-14 h-14 md:w-16 md:h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110">
              <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </button>
        </div>
          </a>
        </div>
      )}

      
    </>
  )
}
