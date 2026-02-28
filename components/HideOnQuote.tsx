"use client"

import { usePathname } from "next/navigation"
import React from "react"

type ConditionalRenderProps = {
  Component: React.ComponentType,
  hidePath: string
}

export default function HideOnQuote({ Component, hidePath }: ConditionalRenderProps) {
  const pathname = usePathname()

  if (pathname === hidePath) return null

  return <Component />
}
