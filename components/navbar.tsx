"use client"

import { useState, useMemo, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
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
} from "lucide-react"

import { FaTiktok, FaFacebook } from "react-icons/fa"


import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export function Navbar() {
  /* ================= HOOKS ================= */
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [hideTopBar, setHideTopBar] = useState(false)
  const { language, changeLanguage, t, mounted } = useLanguage()

  /* ================= SCROLL HANDLER ================= */
  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          setHideTopBar(currentScrollY > lastScrollY && currentScrollY > 40)
          lastScrollY = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const languages = useMemo<{ code: LanguageCode; label: string }[]>(
    () => [
      { code: "en", label: "English" },
      { code: "af", label: "Afrikaans" },
      { code: "zu", label: "Zulu" },
      { code: "xh", label: "Xhosa" },
      { code: "es", label: "Español" },
      { code: "fr", label: "Français" },
      { code: "de", label: "Deutsch" },
      { code: "pt", label: "Português" },
    ],
    []
  )

  if (!mounted) return null

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  const navItems: [string, string][] = [
    ["home", "/"],
    ["about", "/about"],
    ["services", "/services"],
    ["fleet", "/fleet"],
    ["gallery", "/gallery"],
    ["contact", "/contact"],
  ]

  return (
    <>
      {/* ================= TOP INFO BAR ================= */}
      <div
        className={`w-full bg-secondary text-primary text-xs sm:text-sm transition-transform duration-300 ease-out ${
          hideTopBar ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+27606411703"
              className="flex items-center gap-1 hover:text-white/80 transition"
              aria-label="Call MD Travels"
            >
              <Phone className="w-4 h-4" />
              <span>+27 606 411 703</span>
            </a>

            <span className="opacity-60">|</span>

            <a
              href="mailto:info@mdtravels.co.za"
              className="flex items-center gap-1 hover:text-white/80 transition"
              aria-label="Email MD Travels"
            >
              <Mail className="w-4 h-4" />
              <span>info@mdtravels.co.za</span>
            </a>
          </div>

          {/* Right (md+) */}
          <div className="hidden md:flex items-center gap-4">
            {[ 
              { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61583066652705", label: "Facebook" },
              { Icon: Instagram, href: "https://www.instagram.com/md_travels_sa/?igsh=MmZ6cXl2dmxyZ25s#", label: "Instagram" },
              { Icon: FaTiktok, href: "", label: "Tiktok"},
              { Icon: Linkedin, href: "https://www.linkedin.com/in/malipheze-dlunge-735b70391?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", label: "LinkedIn" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`MD Travels on ${label}`}
                className="transform transition duration-300 ease-out hover:-translate-y-0.5 hover:scale-110 hover:opacity-90"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
            <a
                key='tiktok'
                href=''
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`MD Travels on Tiktok`}
                className="transform transition duration-300 ease-out hover:-translate-y-0.5 hover:scale-110 hover:opacity-90"
              >
                {/* Missing Tiktok Icon */}
              </a>
          </div>
        </div>
      </div>

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg border-b border-border glass">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-cente">
              <Image
                src="/logo.png"
                alt="MD Travels"
                width={48}
                height={48}
                priority
                className="w-12 h-12 sm:w-14 sm:h-14"
              />
              
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map(([key, href]) => (
                <Link
                  key={key}
                  href={href}
                  className={`text-sm transition ${
                    isActive(href)
                      ? "text-secondary font-semibold"
                      : "text-text-secondary hover:text-secondary"
                  }`}
                >
                  {t(`nav.${key}`).toUpperCase()}
                </Link>
              ))}

              {/* {clerkKey && (
                <>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <span className="text-sm font-semibold text-secondary cursor-pointer">
                        {t("nav.signIn") || "Sign In"}
                      </span>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                  </SignedIn>
                </>
              )} */}

              {/* Language */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-medium">
                    {language.toUpperCase()}
                  </span>
                </button>

                {langOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white/80 rounded-lg shadow-xl border border-border p-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code)
                          setLangOpen(false)
                        }}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition ${
                          language === lang.code
                            ? "bg-secondary text-primary"
                            : "hover:bg-secondary/10"
                        }`}
                      >
                        {lang.label.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/quote"
                className="px-6 py-2 bg-secondary text-primary rounded-lg font-semibold text-sm hover:opacity-90 transition"
              >
                {t("nav.getQuote").toUpperCase()}
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-accent transition"
              aria-label="Toggle menu"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Drawer */}
          {isOpen && (
            <div className="lg:hidden pb-4 space-y-1 animate-slide-up">
              {navItems.map(([key, href]) => (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded text-sm transition ${
                    isActive(href)
                      ? "bg-accent text-secondary font-semibold"
                      : "text-text-secondary hover:bg-accent"
                  }`}
                >
                  {t(`nav.${key}`).toUpperCase()}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Fixed CTA */}
      <div className="lg:hidden sticky top-[56px] z-40 bg-background border-b border-border px-4 py-3">
        <Link
          href="/quote"
          className="block w-full text-center bg-secondary text-primary py-3 rounded-lg font-semibold"
        >
          {t("nav.getQuote").toUpperCase()}
        </Link>
      </div>
    </>
  )
}
