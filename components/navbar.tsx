"use client"

import { useState, useMemo, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"
import type { LanguageCode } from "@/lib/i18n"
import {
  Menu, X, Globe, Phone, Mail, Facebook, Instagram, ChevronDown
} from "lucide-react"
import { FaTiktok, FaWhatsapp } from "react-icons/fa"

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { language, changeLanguage, t, mounted } = useLanguage()

  /* ================= FLOWING SCROLL LOGIC ================= */
  useEffect(() => {
    const handleScroll = () => {
      // Trigger "pill" mode after 50px of scrolling
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const languages = useMemo<{ code: LanguageCode; label: string }[]>(
    () => [
      { code: "en", label: "English" }, { code: "af", label: "Afrikaans" },
      { code: "zu", label: "Zulu" }, { code: "xh", label: "Xhosa" },
      { code: "es", label: "Español" }, { code: "fr", label: "Français" },
      { code: "de", label: "Deutsch" }, { code: "pt", label: "Português" },
    ], []
  )

  const navItems: [string, string][] = [
    ["home", "/"], ["about", "/about"], ["services", "/services"],
    ["fleet", "/fleet"], ["gallery", "/gallery"], ["contact", "/contact"],
  ]

  if (!mounted) return null

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full pt-4 md:pt-8 pointer-events-none">
      <nav 
        className={`
          sticky top-4 md:top-6 mx-auto w-[92%] max-w-7xl 
          pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
          ${true 
            && "bg-white/50 backdrop-blur-2xl py-3 px-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20" 
            
          }
        `}
      >
        <div className="flex items-center justify-between">
          
          {/* Logo with flowing hover */}
          <Link href="/" className="relative group transition-transform hover:scale-105 active:scale-95">
            <Image 
              src="/logo.png" 
              alt="MD Travels" 
              width={140} 
              height={45} 
              className={`w-auto transition-all duration-500 ${scrolled ? "h-8 md:h-10" : "h-10 md:h-14"}`} 
              priority 
            />
          </Link>

          {/* DESKTOP FLOWING NAV */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center px-2">
              {navItems.map(([key, href]) => (
                <Link 
                  key={key} 
                  href={href} 
                  className={`
                    relative px-5 py-2 group overflow-hidden
                    text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-500
                    ${isActive(href) 
                      ? "text-black" 
                      : (scrolled ? "text-slate-500 hover:text-black" : "text-white/70 hover:text-white")
                    }
                  `}
                >
                  <span className="relative z-10">{t(`nav.${key}`)}</span>
                  {isActive(href) && (
                    <motion.div 
                      layoutId="nav-pill" 
                      className={`absolute inset-0 z-0 rounded-full ${scrolled ? "bg-slate-100" : "bg-white/10"}`} 
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Premium Language Dropdown */}
            <div className="relative ml-2">
              <button 
                onClick={() => setLangOpen(!langOpen)} 
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-500
                  ${scrolled 
                    ? "border-slate-200 text-slate-900 bg-white/50" 
                    : "border-white/20 text-white hover:bg-white/10"
                  }
                `}
              >
                <Globe className="w-3.5 h-3.5 opacity-60" />
                <span className="text-[10px] font-black uppercase">{language}</span>
                <ChevronDown className={`w-3 h-3 opacity-40 transition-transform duration-500 ${langOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                    exit={{ opacity: 0, y: 10, scale: 0.95 }} 
                    className="absolute right-0 mt-4 w-48 bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white p-2 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 gap-1">
                      {languages.map((lang) => (
                        <button 
                          key={lang.code} 
                          onClick={() => { changeLanguage(lang.code); setLangOpen(false); }} 
                          className={`
                            w-full text-left px-4 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all
                            ${language === lang.code ? "bg-black text-white shadow-lg" : "text-slate-600 hover:bg-slate-50"}
                          `}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* MOBILE TOGGLE - Elevated Z-index */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`
              lg:hidden relative z-[60] p-3 rounded-full transition-all duration-500
              ${scrolled || isOpen ? "bg-black text-white" : "bg-white/10 text-white backdrop-blur-md"}
            `}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MOBILE OVERLAY - Cinematic Full Screen */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }} 
              className="fixed inset-0 z-50 bg-white lg:hidden flex flex-col pt-32 px-10"
            >
              <div className="flex flex-col gap-6">
                {navItems.map(([key, href], idx) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link 
                      href={href} 
                      onClick={() => setIsOpen(false)} 
                      className="text-5xl font-black uppercase tracking-tighter text-slate-900 active:text-slate-400 transition-colors"
                    >
                      {t(`nav.${key}`)}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-auto pb-12 space-y-8">
                <div className="h-px w-full bg-slate-100" />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Direct Line</p>
                    <a href="tel:+27606411703" className="text-lg font-bold text-slate-900">+27 606 411 703</a>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100"><FaWhatsapp className="w-5 h-5" /></div>
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100"><Instagram className="w-5 h-5" /></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
