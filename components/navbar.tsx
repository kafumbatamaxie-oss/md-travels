"use client"

import { useState, useMemo, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"
import type { LanguageCode } from "@/lib/i18n"
import {
  Menu,
  X,
  Globe,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  ChevronDown,
} from "lucide-react"
import { FaTiktok, FaWhatsapp } from "react-icons/fa"

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hideTopBar, setHideTopBar] = useState(false)
  const { language, changeLanguage, t, mounted } = useLanguage()

  /* ================= FLOWING SCROLL LOGIC ================= */
  useEffect(() => {
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 20)
      setHideTopBar(currentScrollY > lastScrollY && currentScrollY > 50)
      lastScrollY = currentScrollY
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
    <header className="fixed top-0 left-0 right-0 z-[100] w-full pt-2 md:pt-4 pointer-events-none">
      {/* ================= TOP INFO BAR ================= */}
      <div className={`hidden md:block w-[92%] max-w-7xl mx-auto mb-2 bg-slate-950/80 backdrop-blur-md text-white/70 text-[10px] font-bold uppercase tracking-widest py-2 px-6 rounded-full transition-all duration-500 pointer-events-auto ${hideTopBar ? "-translate-y-20 opacity-0" : "translate-y-0 opacity-100"}`}>
        <div className="flex justify-between items-center">
          <div className="flex gap-6">
            <a href="tel:+27606411703" className="flex items-center gap-2 hover:text-secondary transition-colors"><Phone className="w-3 h-3" /> +27 606 411 703</a>
            <a href="mailto:info@mdtravels.co.za" className="flex items-center gap-2 hover:text-secondary transition-colors"><Mail className="w-3 h-3" /> info@mdtravels.co.za</a>
          </div>
          <div className="flex gap-4 items-center border-l border-white/10 pl-6">
             {[
              { Icon: FaWhatsapp, href: "https://wa.me/27719455941" },
              { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61583066652705" },
              { Icon: Instagram, href: "https://www.instagram.com/md_travels_sa/" },
              { Icon: FaTiktok, href: "https://www.tiktok.com/@mdtravels.za" },
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" className="hover:text-secondary transition-all hover:scale-110"><Icon className="w-3.5 h-3.5" /></a>
            ))}
          </div>
        </div>
      </div>

      {/* ================= FLOWING NAV PILL ================= */}
      <nav 
        className={`mx-auto w-[95%] max-w-7xl pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-[2rem] 
        ${scrolled 
          ? "bg-white/90 backdrop-blur-2xl py-3 px-6 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/20" 
          : "bg-transparent py-5 px-4"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="relative group transition-transform active:scale-95">
            <Image 
              src="/logo.png" 
              alt="MD Travels" 
              width={140} 
              height={45} 
              className={`w-auto transition-all duration-500 ${scrolled ? "h-8 md:h-10" : "h-10 md:h-14"}`} 
              priority 
            />
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map(([key, href]) => (
              <Link 
                key={key} 
                href={href} 
                className={`relative px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-500
                ${isActive(href) 
                  ? "text-black" 
                  : (scrolled ? "text-slate-500 hover:text-black" : "text-white/80 hover:text-white")
                }`}
              >
                <span className="relative z-10">{t(`nav.${key}`)}</span>
                {isActive(href) && (
                  <motion.div 
                    layoutId="nav-active-pill" 
                    className={`absolute inset-0 z-0 rounded-full ${scrolled ? "bg-slate-100" : "bg-white/10"}`} 
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}

            {/* Language Selector */}
            <div className="relative ml-4">
              <button 
                onClick={() => setLangOpen(!langOpen)} 
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-500 ${scrolled ? "border-slate-200 text-black" : "border-white/20 text-white hover:bg-white/10"}`}
              >
                <Globe className="w-3.5 h-3.5 opacity-60" />
                <span className="text-[10px] font-black uppercase">{language}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-500 ${langOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                    exit={{ opacity: 0, y: 10, scale: 0.95 }} 
                    className="absolute right-0 mt-4 w-48 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-100 p-2 overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button 
                        key={lang.code} 
                        onClick={() => { changeLanguage(lang.code); setLangOpen(false); }} 
                        className={`w-full text-left px-4 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all ${language === lang.code ? "bg-black text-white" : "text-slate-600 hover:bg-slate-50"}`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`lg:hidden p-3 rounded-full transition-all duration-500 ${scrolled || isOpen ? "bg-black text-white" : "bg-white/10 text-white backdrop-blur-md"}`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Fullscreen Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} 
              className="fixed inset-0 z-[-1] bg-white lg:hidden flex flex-col pt-32 px-10 pb-12"
            >
              <div className="flex flex-col gap-6">
                {navItems.map(([key, href], idx) => (
                  <motion.div key={key} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}>
                    <Link href={href} onClick={() => setIsOpen(false)} className="text-5xl font-black uppercase tracking-tighter text-slate-900 active:text-secondary transition-colors">
                      {t(`nav.${key}`)}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-8">
                <div className="h-px bg-slate-100 w-full" />
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Connect</p>
                    <div className="flex gap-4">
                      <FaWhatsapp className="w-6 h-6 text-slate-900" />
                      <Instagram className="w-6 h-6 text-slate-900" />
                    </div>
                  </div>
                  <Link href="/quote" onClick={() => setIsOpen(false)} className="bg-black text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs">
                    Get Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
