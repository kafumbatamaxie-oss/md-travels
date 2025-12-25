"use client"

import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { translations, type LanguageCode } from "@/lib/i18n"
import Image from "next/image"
import { FaTiktok, FaClock, FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin, FaPhone, FaMailBulk } from "react-icons/fa"

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

  return (
    <footer className="bg-sky-950 text-white pt-20 pb-10 border-t border-white/5">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-x-8 gap-y-12 lg:gap-16 mb-20">
          {/* Logo Section */}
          <div className="flex-1 flex flex-col items-start justify-start space-y-2">
            <Link href="/" className="inline-block hover:opacity-80 transition">
              <Image
                src="/logo.png"
                alt="MD Travels"
                width={90}
                height={90}
                className="w-[80px] h-[80px] md:h-[100px] md:w-[100px] bg-white rounded-full"
              />
            </Link>

            <p className="text-sky-800 text-sm leading-relaxed">
              Premium luxury transportation services in the heart of Cape Town.
              Experience comfort, reliability, and style.
            </p>

            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <Image
                src="/Visa-Logo.webp"
                alt="Visa"
                width={40}
                height={12}
                className=""
              />
              <Image
                src="/Mastercard-Logo.webp"
                alt="Mastercard"
                width={30}
                height={18}
                className=""
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex-1">
            <h4 className="text-secondary font-bold mb-2 uppercase tracking-wider text-sm">
              {t.contact.quickLinks}
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition">{t.nav.about}</Link></li>
              <li><Link href="/fleet" className="hover:text-white transition">{t.nav.fleet}</Link></li>
              <li><Link href="/services" className="hover:text-white transition">{t.nav.services}</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition">{t.nav.gallery}</Link></li>
              <li><Link href="/quote" className="hover:text-white transition">{t.nav.getQuote}</Link></li>
            </ul>
          </div>

          {/* Quick Contact */}
          <div className="flex-1">
            <h4 className="text-secondary font-bold mb-2 uppercase tracking-wider text-sm">
              {t.contact.quickContact}
            </h4>

            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center gap-3 group">
                <FaPhone className="w-5 h-5 text-secondary group-hover:scale-110 transition" />
                <a href="tel:+27719455941" className="hover:text-white transition">
                  +27 71 9455 941
                </a>
              </li>

              <li className="flex items-center gap-3 group">
                <FaPhone className="w-5 h-5 text-secondary group-hover:scale-110 transition" />
                <a href="tel:+27606411703" className="hover:text-white transition">
                  +27 606 411 703
                </a>
              </li>

              <li className="flex items-center gap-3 group">
                <FaMailBulk className="w-5 h-5 text-secondary group-hover:scale-110 transition" />
                <a href={`mailto:${t.contact.email}`} className="hover:text-white transition">
                  {t.contact.email}
                </a>
              </li>

              <li className="flex items-center gap-3 group">
                <FaMailBulk className="w-5 h-5 text-secondary group-hover:scale-110 transition" />
                <a href="mailto:malipheze@mdtravels.co.za" className="hover:text-white transition">
                  malipheze@mdtravels.co.za
                </a>
              </li>

              <li className="flex gap-6 pt-4">
                 <a
                  href="https://wa.me/27719455941"
                  className="hover:text-green-500 transition transform hover:scale-110"
                  aria-label="WhatsApp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="w-6 h-6" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61583066652705" className="hover:text-secondary transition">
                  <FaFacebook className="w-6 h-6" />
                </a>
                <a href="https://www.tiktok.com/@mdtravels.za" className="hover:text-secondary transition">
                  <FaTiktok className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/md_travels_sa" className="hover:text-secondary transition">
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com" className="hover:text-secondary transition">
                  <FaLinkedin className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>

          {/* Call Center Hours */}
          <div className="flex-1">
            <h4 className="text-secondary font-bold mb-2 uppercase tracking-wider text-sm">
              {t.contact.hours}
            </h4>

            <ul className="space-y-5 text-sm">
              <li className="flex items-center gap-3 text-gray-300">
                <FaClock className="w-5 h-5 text-secondary animate-pulse" />
                <span className="text-white font-semibold">
                  24 Hours • Monday – Sunday
                </span>
              </li>

              <li className="flex gap-6 items-center ">
                <span className="text-white font-medium">Availability:</span>
                <span className="text-secondary font-bold ">Open 24/7</span>
              </li>
            </ul>

            {/* Language Selector */}
            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`text-[10px] px-2 py-1 rounded border transition-all ${
                      language === lang.code
                        ? "bg-secondary border-secondary text-white font-bold"
                        : "border-white/10 text-gray-500 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <div className="flex flex-wrap gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">
            <p>© 1997 - {new Date().getFullYear()} MD Travels</p>

            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-white transition">
              Terms & Conditions
            </Link>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            Web Development by MD Travels Digital
          </p>
        </div>
      </div>
    </footer>
  )
}
