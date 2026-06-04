"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

import { motion, AnimatePresence } from "framer-motion"

import {
  Menu,
  X,
  Globe,
  ChevronDown,
  Phone,
  ArrowRight,
} from "lucide-react"

import { FaWhatsapp } from "react-icons/fa"

import { useLanguage } from "@/hooks/use-language"
import type { LanguageCode } from "@/lib/i18n"
import BookingDialog from "./booking/BookingDialog"
// import BookNowButton from "./shop/BookNowButton"

export function Navbar() {
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const { language, changeLanguage, t, mounted } =
    useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    )

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      )
  }, [])

  const languages = useMemo<
    { code: LanguageCode; label: string }[]
  >(
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

  const navItems = [
    ["home", "/"],
    ["about", "/about"],
    ["services", "/services"],
    ["fleet", "/fleet"],
    ["gallery", "/gallery"],
    ["contact", "/contact"],
  ]

  if (!mounted) return null

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[99]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-4">
          <motion.nav
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className={`
              rounded-[28px]
              transition-all
              duration-500
              border

              ${
                scrolled
                  ? `
                  bg-white/90
                  backdrop-blur-2xl
                  border-black/5
                  shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                `
                  : `
                  bg-black/20
                  backdrop-blur-xl
                  border-white/10
                `
              }
            `}
          >
            <div className="h-[78px] px-5 md:px-8 flex items-center justify-between">
              {/* Logo */}

              <Link
                href="/"
                className="flex items-center"
              >
                <Image
                  src="/logo.png"
                  alt="MD Travels"
                  width={160}
                  height={60}
                  priority
                  className="w-auto h-10 md:h-12"
                />
              </Link>

              {/* Desktop Nav */}

              <div className="hidden lg:flex items-center gap-1">
                {navItems.map(([key, href]) => (
                  <Link
                    key={key}
                    href={href}
                    className={`
                      relative
                      px-5
                      py-3
                      rounded-full
                      text-[12px]
                      font-bold
                      uppercase
                      tracking-[0.15em]
                      transition-all
                      
                      ${
                        isActive(href)
                          ? scrolled
                            ? "text-primary"
                            : "text-white"
                          : scrolled
                          ? "text-slate-500 hover:text-primary"
                          : "text-white/70 hover:text-white"
                      }
                    `}
                  >
                    {isActive(href) && (
                      <motion.div
                        layoutId="active-nav"
                        className={`
                          absolute
                          inset-0
                          rounded-full
                          
                          ${
                            scrolled
                              ? "bg-primary/10"
                              : "bg-white/10"
                          }
                        `}
                      />
                    )}

                    <span className="relative z-10">
                      {t(`nav.${key}`)}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Right Side */}

              <div className="hidden lg:flex items-center gap-4">
                {/* WhatsApp */}

                <a
                  href="https://wa.me/27606411703"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    h-11
                    w-11
                    rounded-full
                    flex
                    items-center
                    justify-center
                    bg-green-500
                    text-white
                    hover:scale-110
                    transition
                  "
                >
                  <FaWhatsapp className="text-lg" />
                </a>

                {/* Language */}

                <div className="relative">
                  <button
                    onClick={() =>
                      setLangOpen(!langOpen)
                    }
                    className={`
                      h-11
                      px-4
                      rounded-full
                      flex
                      items-center
                      gap-2
                      border
                      
                      ${
                        scrolled
                          ? "border-slate-200 text-slate-800"
                          : "border-white/20 text-white"
                      }
                    `}
                  >
                    <Globe size={15} />

                    <span className="uppercase text-xs font-bold">
                      {language}
                    </span>

                    <ChevronDown size={14} />
                  </button>

                  <AnimatePresence>
                    {langOpen && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: 10,
                        }}
                        className="
                          absolute
                          right-0
                          mt-3
                          w-56
                          bg-white
                          rounded-3xl
                          border
                          shadow-2xl
                          p-2
                        "
                      >
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              changeLanguage(lang.code)
                              setLangOpen(false)
                            }}
                            className={`
                              w-full
                              text-left
                              px-4
                              py-3
                              rounded-2xl
                              text-sm
                              transition
                              
                              ${
                                language === lang.code
                                  ? "bg-primary text-white"
                                  : "hover:bg-slate-100"
                              }
                            `}
                          >
                            {lang.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* CTA */}

                {/* <Link
                  href="/quote"
                  className="
                    group
                    h-11
                    px-6
                    rounded-full
                    bg-secondary
                    text-white
                    flex
                    items-center
                    gap-2
                    font-bold
                    text-sm
                    hover:scale-105
                    transition
                  "
                >
                  {t("nav.getQuote")}

                  <ArrowRight
                    size={16}
                    className="
                      group-hover:translate-x-1
                      transition
                    "
                  />
                </Link> */}

                 {/* <BookNowButton /> */}
                 <button
  onClick={() => setBookingOpen(true)}
  className="
    group
    h-11
    px-6
    rounded-full
    bg-secondary
    text-white
    flex
    items-center
    gap-2
    font-bold
    text-sm
    hover:scale-105
    transition
  "
>
  Book Now

  <ArrowRight
    size={16}
    className="
      group-hover:translate-x-1
      transition
    "
  />
</button>
              </div>

              {/* Mobile Button */}

              <button
                onClick={() =>
                  setIsOpen(!isOpen)
                }
                className="
                  lg:hidden
                  w-12
                  h-12
                  rounded-full
                  bg-primary
                  text-white
                  flex
                  items-center
                  justify-center
                "
              >
                {isOpen ? (
                  <X />
                ) : (
                  <Menu />
                )}
              </button>
            </div>
          </motion.nav>
        </div>
      </header>

      {/* MOBILE MENU */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-[99899999999999]
              bg-primary
              lg:hidden
            "
          >
            <div className="pt-32 px-8 flex flex-col gap-8">
              {navItems.map(([key, href]) => (
                <Link
                  key={key}
                  href={href}
                  onClick={() =>
                    setIsOpen(false)
                  }
                  className="
                    text-white
                    text-4xl
                    font-black
                    uppercase
                  "
                >
                  {t(`nav.${key}`)}
                </Link>
              ))}

              {/* <BookNowButton /> */}
              <button
  onClick={() => setBookingOpen(true)}
  className="
    group
    h-11
    px-6
    rounded-full
    bg-secondary
    text-white
    flex
    items-center
    gap-2
    font-bold
    text-sm
    hover:scale-105
    transition
  "
>
  Book Now

  <ArrowRight
    size={16}
    className="
      group-hover:translate-x-1
      transition
    "
  />
</button>

              <a
                href="https://wa.me/27606411703"
                className="
                  border
                  border-white/20
                  rounded-2xl
                  py-4
                  text-center
                  text-white
                  font-semibold
                "
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <BookingDialog
        open={bookingOpen}
        setOpen={setBookingOpen}
      />
    </>
  )
}