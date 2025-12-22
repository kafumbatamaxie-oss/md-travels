"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/hooks/use-language"
import type { LanguageCode } from "@/lib/i18n"
import { Menu, X, Globe } from "lucide-react"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const { language, changeLanguage, t, mounted } = useLanguage()

  if (!mounted) return null

  const languages: { code: LanguageCode; label: string }[] = [
    { code: "en", label: "English" },
    { code: "af", label: "Afrikaans" },
    { code: "zu", label: "Zulu" },
    { code: "xh", label: "Xhosa" },
    { code: "es", label: "Español" },
    { code: "fr", label: "Français" },
    { code: "de", label: "Deutsch" },
    { code: "pt", label: "Português" },
  ]

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg border-b border-border glass">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          {/* Logo - Mobile First */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 sm:gap-3">
            <Image
              src="/logo.png"
              alt="MD Travels"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
            />
            <div className="hidden xs:flex flex-col">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-secondary">MD</span>
              <span className="text-xs sm:text-sm text-text-secondary">Travels</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link href="/" className="text-sm text-text-secondary hover:text-secondary transition">
              {t("nav.home")}
            </Link>
            <Link href="/about" className="text-sm text-text-secondary hover:text-secondary transition">
              {t("nav.about")}
            </Link>
            <Link href="/services" className="text-sm text-text-secondary hover:text-secondary transition">
              {t("nav.services")}
            </Link>
            <Link href="/fleet" className="text-sm text-text-secondary hover:text-secondary transition">
              {t("nav.fleet")}
            </Link>
            <Link href="/gallery" className="text-sm text-text-secondary hover:text-secondary transition">
              {t("nav.gallery")}
            </Link>
            <Link href="/contact" className="text-sm text-text-secondary hover:text-secondary transition">
              {t("nav.contact")}
            </Link>

            {clerkKey && (
              <>
                <SignedOut>
                  <div className="text-sm font-semibold text-secondary hover:opacity-80 transition cursor-pointer">
                    <SignInButton mode="modal">{t("nav.signIn") || "Sign In"}</SignInButton>
                  </div>
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </>
            )}

            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition"
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs font-medium">{language.toUpperCase()}</span>
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-surface rounded-lg shadow-xl border border-border p-2 space-y-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code)
                        setLangOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2 rounded transition text-sm ${
                        language === lang.code ? "bg-secondary text-primary" : "text-text-secondary hover:bg-accent"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/quote"
              className="px-6 py-2 bg-secondary text-primary rounded-lg font-semibold hover:opacity-90 transition text-sm"
            >
              {t("nav.getQuote")}
            </Link>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-accent transition ml-auto"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-2 animate-slide-up">
            <Link
              href="/"
              className="block px-3 py-2 text-sm text-text-secondary hover:text-secondary hover:bg-accent rounded transition"
              onClick={() => setIsOpen(false)}
            >
              {t("nav.home")}
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-sm text-text-secondary hover:text-secondary hover:bg-accent rounded transition"
              onClick={() => setIsOpen(false)}
            >
              {t("nav.about")}
            </Link>
            <Link
              href="/services"
              className="block px-3 py-2 text-sm text-text-secondary hover:text-secondary hover:bg-accent rounded transition"
              onClick={() => setIsOpen(false)}
            >
              {t("nav.services")}
            </Link>
            <Link
              href="/fleet"
              className="block px-3 py-2 text-sm text-text-secondary hover:text-secondary hover:bg-accent rounded transition"
              onClick={() => setIsOpen(false)}
            >
              {t("nav.fleet")}
            </Link>
            <Link
              href="/gallery"
              className="block px-3 py-2 text-sm text-text-secondary hover:text-secondary hover:bg-accent rounded transition"
              onClick={() => setIsOpen(false)}
            >
              {t("nav.gallery")}
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-sm text-text-secondary hover:text-secondary hover:bg-accent rounded transition"
              onClick={() => setIsOpen(false)}
            >
              {t("nav.contact")}
            </Link>

            {clerkKey && (
              <div className="px-3 py-2 border-t border-border">
                <SignedOut>
                  <div className="text-sm font-semibold text-secondary py-2" onClick={() => setIsOpen(false)}>
                    <SignInButton mode="modal">{t("nav.signIn") || "Sign In"}</SignInButton>
                  </div>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center gap-3 py-2">
                    <UserButton afterSignOutUrl="/" />
                    <span className="text-xs text-text-secondary">Account Settings</span>
                  </div>
                </SignedIn>
              </div>
            )}

            <Link
              href="/quote"
              className="block px-6 py-2 bg-secondary text-primary rounded-lg font-semibold text-sm"
              onClick={() => setIsOpen(false)}
            >
              {t("nav.getQuote")}
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
