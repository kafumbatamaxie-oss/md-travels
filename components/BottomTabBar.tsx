// components/BottomTabBar.tsx
"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Info, Briefcase, Car, Image as Gallery, Phone } from "lucide-react"
import { usePathname } from "next/navigation"


const items = [
  { href: "/", icon: Home },
  { href: "/about", icon: Info },
  { href: "/services", icon: Briefcase },
  { href: "/fleet", icon: Car },
  { href: "/gallery", icon: Gallery },
  { href: "/contact", icon: Phone },
]

export default function BottomTabBar() {
    const pathname = usePathname()
  return (
    <AnimatePresence>
        <motion.div
          initial={{ y: 120, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 120, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="max-w-2xl md:w-full mx-auto "
        >
          <div className="flex items-center justify-between gap-6 px-6 py-3 rounded-4xl glass-pill bg-white backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.25)] border border-white/30">
            
            {items.map(({ href, icon: Icon }, i) => (
              <Link key={i} href={href}>
                <motion.div
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.1 }}
                  className={`flex flex-col items-center justify-center ${
                    pathname === href ? "text-secondary scale-120" : "text-primary"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
              </Link>
            ))}

          </div>
        </motion.div>
    </AnimatePresence>
  )
}