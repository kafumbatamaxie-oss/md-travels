"use client"

import { useEffect, useState } from "react"
import BottomTabBar from "@/components/BottomTabBar"
import HideOnQuote from "@/components/HideOnQuote"
import { Navbar } from "@/components/navbar"
import { ScrollToTop } from "@/components/ScrollToTop"

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [showTabBar, setShowTabBar] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY

      // Show after threshold, stay visible
      if (scrollY > 120) {
        setShowTabBar(true)
      } else {
        setShowTabBar(false)
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <HideOnQuote Component={Navbar} hidePath="/quote" />
      <HideOnQuote Component={ScrollToTop} hidePath="/quote" />

      {children}

    </>
  )
}