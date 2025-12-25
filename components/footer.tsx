"use client"

import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { translations, type LanguageCode } from "@/lib/i18n"
import Image from "next/image"
import { Phone, Mail, Facebook, Instagram, Linkedin } from "lucide-react"
import { FaTiktok } from "react-icons/fa"

export function Footer() {
  const { language, changeLanguage, t: translate } = useLanguage()
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
    <footer className="bg-black text-white pt-20 pb-10 border-t border-white/5">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-x-8 gap-y-12 lg:gap-16 mb-20">
          {/* Logo Section - flex-1 */}
          <div className="flex-1 flex flex-col items-start  sm:items-start text-center sm:text-left space-y-2">
            <Link href="/" className="inline-block hover:opacity-80 transition">
              <Image
                src="/logo.png"
                alt="MD Travels"
                width={90}
                height={90}
                className="w-[150px] md:w-[180px]"
              />
            </Link>
            <p className="text-sky-800 text-sm leading-relaxed">
              Premium luxury transportation services in the heart of Cape Town. Experience comfort, reliability, and
              style.
            </p>
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                alt="Visa"
                width={40}
                height={12}
                className="opacity-80"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                alt="Mastercard"
                width={30}
                height={18}
                className="opacity-80"
              />
            </div>
          </div>

          {/* Quick Links Section - flex-1 */}
          <div className="flex-1">
            <h4 className="text-secondary font-bold mb-2 uppercase tracking-wider text-sm">{t.contact.quickLinks}</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/fleet" className="hover:text-white transition">
                  {t.nav.fleet}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition">
                  {t.nav.gallery}
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-white transition">
                  {t.nav.getQuote}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Contact Section - flex-1 */}
          <div className="flex-1">
            <h4 className="text-secondary font-bold mb-2 uppercase tracking-wider text-sm">{t.contact.quickContact}</h4>
            <ul className="space-y-4 text-sm gap-2 text-gray-400">
              
              <li className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-secondary group-hover:scale-110 transition" />
                <a href={`tel:+27719455941`} className="hover:text-white transition">
                  +27 71 9455 941
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-secondary group-hover:scale-110 transition" />
                <a href={`tel:+27606411703`} className="hover:text-white transition">
                  +27 606 411 703
                </a>
              </li>
              
              <li className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-secondary group-hover:scale-110 transition" />
                <a href={`mailto:${t.contact.email}`} className="hover:text-white transition">
                  {t.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-secondary group-hover:scale-110 transition" />
                <a href={`mailto:malipheze@mdtravels.co.za`} className="hover:text-white transition">
                  malipheze@mdtravels.co.za
                </a>
              </li>
              <li className="flex gap-6 pt-4">
                <a href="https://www.facebook.com/profile.php?id=61583066652705" className="text-white hover:text-secondary transition transform hover:scale-110">
                  <Facebook className="w-6 h-6 fill-current" />
                </a>
                <a href="https://www.tiktok.com/@mdtravels.za?_r=1&_t=ZS-92VqYCTMO25" className="text-white hover:text-secondary transition transform hover:scale-110">
                  <FaTiktok className="w-6 h-6 fill-current" />
                </a>
                <a href="https://www.instagram.com/md_travels_sa/?igsh=MmZ6cXl2dmxyZ25s#" className="text-white hover:text-secondary transition transform hover:scale-110">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/malipheze-dlunge-735b70391?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-white hover:text-secondary transition transform hover:scale-110">
                  <Linkedin className="w-6 h-6 fill-current" />
                </a>
              </li>
            </ul>
          </div>

          {/* Call Center Hours Section - flex-1 */}
          <div className="flex-1">
            <h4 className="text-secondary font-bold mb-2 uppercase tracking-wider text-sm">{t.contact.hours}</h4>
            <ul className="space-y-5 text-sm">
              <li className="flex justify-between items-center text-gray-400">
                <span className="text-white font-medium">{t.contact.monFri}:</span>
                <span className="text-gray-300">8am – 5pm</span>
              </li>
              <li className="flex justify-between items-center text-gray-400">
                <span className="text-white font-medium">{t.contact.sat}:</span>
                <span className="text-gray-300">8am – 12pm</span>
              </li>
              <li className="flex justify-between items-center text-gray-400">
                <span className="text-white font-medium">{t.contact.sunPublic}:</span>
                <span className="text-secondary font-bold">{t.contact.closed}</span>
              </li>
            </ul>

            {/* Language Selector */}
            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`text-[10px] px-2 py-1 rounded transition-all border ${
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
          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">
            <p>© 1997 - {new Date().getFullYear()} MD Travels</p>
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
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
