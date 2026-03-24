"use client"

import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { translations, type LanguageCode } from "@/lib/i18n"
import Image from "next/image"
import { 
  FaTiktok, FaWhatsapp, FaFacebook, 
  FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelopeOpenText 
} from "react-icons/fa"

export function Footer() {
  const { language, changeLanguage } = useLanguage()
  const t = translations[language]

  const languages: { code: LanguageCode; name: string }[] = [
    { code: "en", name: "EN" },
    { code: "af", name: "AF" },
    { code: "zu", name: "ZU" },
    { code: "xh", name: "XH" },
    { code: "es", name: "ES" },
    { code: "fr", name: "FR" },
    { code: "de", name: "DE" },
    { code: "pt", name: "PT" },
  ]

  const socialLinks = [
    { Icon: FaWhatsapp, href: "https://wa.me", color: "hover:text-green-500" },
    { Icon: FaFacebook, href: "https://www.facebook.com", color: "hover:text-blue-500" },
    { Icon: FaTiktok, href: "https://www.tiktok.com", color: "hover:text-white" },
    { Icon: FaInstagram, href: "https://www.instagram.com", color: "hover:text-pink-500" },
    { Icon: FaLinkedin, href: "https://www.linkedin.com", color: "hover:text-blue-400" }
  ]

  const navLinks = [
    { key: 'about', href: '/about' },
    { key: 'fleet', href: '/fleet' },
    { key: 'services', href: '/services' },
    { key: 'gallery', href: '/gallery' },
    { key: 'getQuote', href: '/quote' }
  ]

  return (
    <footer className="relative bg-[#050506] text-white overflow-hidden border-t border-white/5">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay muted loop playsInline 
          className="w-full h-full object-cover opacity-10 grayscale"
        >
          <source src="/bg-vid.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-[#050506]/80 to-transparent" />
      </div>

      <div className="container relative z-10 px-6 pt-20 pb-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
          
          {/* Logo & Brand Identity */}
          <div className="space-y-8 flex flex-col items-start">
            <Link href="/" className="group transition-transform hover:scale-105 active:scale-95">
              <div className="bg-white p-1 rounded-full shadow-2xl">
                <Image
                  src="/logo.png"
                  alt="MD Travels"
                  width={100}
                  height={100}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full"
                />
              </div>
            </Link>

            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs">
              Premium luxury transportation in Cape Town. 
              Reliability is our foundation; comfort is our promise.
            </p>

            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <Image src="/Visa-Logo.webp" alt="Visa" width={35} height={10} className="opacity-60 hover:opacity-100 transition" />
              <div className="w-px h-4 bg-white/10" />
              <Image src="/Mastercard-Logo.webp" alt="Mastercard" width={25} height={15} className="opacity-60 hover:opacity-100 transition" />
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-6">
            <h4 className="text-secondary font-black text-xs uppercase tracking-[0.3em]">
              {t.contact.quickLinks}
            </h4>
            <nav className="flex flex-col gap-4 text-sm font-bold">
              {navLinks.map((link) => (
                <Link 
                  key={link.key} 
                  href={link.href} 
                  className="text-slate-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                >
                  <div className="w-1 h-1 rounded-full bg-secondary transition-all group-hover:w-3" />
                  {t.nav[link.key as keyof typeof t.nav] || link.key}
                </Link>
              ))}
            </nav>
          </div>

          {/* Concierge Contact */}
          <div className="space-y-6">
            <h4 className="text-secondary font-black text-xs uppercase tracking-[0.3em]">
              {t.contact.quickContact}
            </h4>

            <div className="space-y-4">
              <div className="flex flex-col gap-3">
                <a href="tel:+27606411703" className="flex items-center gap-3 text-sm font-bold text-slate-300 hover:text-secondary transition-colors group">
                  <FaPhoneAlt className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  +27 60 6411 703
                </a>
                <a href="tel:+27678142490" className="flex items-center gap-3 text-sm font-bold text-slate-300 hover:text-secondary transition-colors group">
                  <FaPhoneAlt className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  +27 67 8142 490
                </a>
                <a href="tel:+27719455941" className="flex items-center gap-3 text-sm font-bold text-slate-300 hover:text-secondary transition-colors group">
                  <FaPhoneAlt className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  +27 71 945 5941
                </a>
              </div>

              <div className="h-px w-full bg-white/5" />

              <div className="flex flex-col gap-3">
                <a href={`mailto:${t.contact.email}`} className="flex items-center gap-3 text-sm font-bold text-slate-300 hover:text-secondary transition-colors group">
                  <FaEnvelopeOpenText className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  {t.contact.email}
                </a>
                <a href="mailto:malipheze@mdtravels.co.za" className="flex items-center gap-3 text-sm font-bold text-slate-300 hover:text-secondary transition-colors group">
                  <FaEnvelopeOpenText className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  malipheze@mdtravels.co.za
                </a>
              </div>
            </div>

            {/* Social Dock */}
            <div className="flex gap-4 pt-4">
              {socialLinks.map(({ Icon, href, color }, i) => (
                <a 
                  key={i} 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 transition-all hover:-translate-y-1 hover:bg-white/10 ${color}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Availability & Language */}
          <div className="space-y-8">
            <div className="bg-secondary/5 border border-secondary/20 p-6 rounded-3xl space-y-4 shadow-2xl">
              <h4 className="text-secondary font-black text-xs uppercase tracking-[0.3em]">
                {t.contact.hours}
              </h4>
              <div className="flex items-center gap-3">
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </div>
                <span className="text-sm font-black text-white tracking-widest uppercase italic">Live 24/7 Ops</span>
              </div>
              <p className="text-xs font-medium text-slate-400">Available Monday – Sunday for all local and regional transport needs.</p>
            </div>

            {/* Language Selection Grid */}
            <div className="grid grid-cols-4 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`
                    text-[10px] py-2 rounded-lg font-black transition-all border
                    ${language === lang.code 
                      ? "bg-secondary border-secondary text-black shadow-lg shadow-secondary/20" 
                      : "border-white/10 text-slate-500 hover:border-white/40 hover:text-white bg-white/5"
                    }
                  `}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6">
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            <p className="hover:text-white transition cursor-pointer">Privacy Policy</p>
            <p className="hover:text-white transition cursor-pointer">Terms & Conditions</p>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
            © 1997 - {new Date().getFullYear()} MD Travels Cape Town. Premium Logistics.
          </p>
        </div>
      </div>
    </footer>
  )
}
