"use client"

import { usePathname } from "next/navigation"
import React from "react"

type ConditionalRenderProps = {
  Component: React.ComponentType
}

export default function HideOnQuote({ Component }: ConditionalRenderProps) {
  const pathname = usePathname()

  if (pathname === "/quote") return null

  return <Component />
}
