"use client"

import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Car,
  Settings,
  MapPin,
  FileText,
  MessageSquare,
  Calendar,
  Menu,
  X,
} from "lucide-react"
import { SignOutButton } from "@clerk/nextjs"

interface SidebarProps {
  mobileOpen: boolean
  setMobileOpen: (value: boolean) => void
}

const menuItems = [
  { name: "Vehicles", href: "/admin/vehicles", icon: Car },
  { name: "Services", href: "/admin/services", icon: Settings },
  { name: "Zones", href: "/admin/zones", icon: MapPin },
  { name: "Bookings", href: "/admin/bookings", icon: Calendar },
  { name: "Quotes", href: "/admin/quotes", icon: FileText },
  { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
]

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      {/* ================= MOBILE SIDEBAR ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 p-5 flex flex-col md:hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-lg">Admin</h2>
                <button onClick={() => setMobileOpen(false)}>
                  <X size={22} />
                </button>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
                    >
                      <Icon size={20} />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>

              {/* Logout */}
              <div className="mt-auto pt-6 border-t">
                <SignOutButton>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-red-50 text-red-600 transition">
                    Logout
                  </button>
                </SignOutButton>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <motion.aside
        animate={{ width: expanded ? 260 : 80 }}
        transition={{ duration: 0.3 }}
        className="hidden md:flex fixed top-0 left-0 h-screen bg-white shadow-lg flex-col p-4"
      >
        {/* Toggle Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mb-8 flex justify-center"
        >
          <Menu />
        </button>

        {/* Menu */}
        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 transition"
              >
                <Icon size={20} />

                {expanded && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm font-medium"
                  >
                    {item.name}
                  </motion.span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Logout Desktop */}
        <div className="pt-6 border-t">
          <SignOutButton>
            <button className="w-full text-left p-3 rounded-lg hover:bg-red-50 text-red-600 transition">
              {expanded ? "Logout" : "⎋"}
            </button>
          </SignOutButton>
        </div>
      </motion.aside>
    </>
  )
}