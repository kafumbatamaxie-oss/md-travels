"use client"

import HideOnQuote from "@/components/HideOnQuote"
import { Navbar } from "@/components/navbar"
import { ScrollToTop } from "@/components/ScrollToTop"

export default function ClientShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <HideOnQuote Component={Navbar} hidePath="/quote" />

      <HideOnQuote
        Component={ScrollToTop}
        hidePath="/quote"
      />

      <main className="relative">
        {children}
      </main>
    </>
  )
}