"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { translations, type LanguageCode } from "@/lib/i18n"

type LanguageContextType = {
  language: LanguageCode
  changeLanguage: (lang: LanguageCode) => void
  t: (key: string) => string
  mounted: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("mdtravels_language") as LanguageCode
    if (saved && saved in translations) {
      setLanguage(saved)
    }
    setMounted(true)
  }, [])

  const changeLanguage = (lang: LanguageCode) => {
    if (lang in translations) {
      setLanguage(lang)
      localStorage.setItem("mdtravels_language", lang)
    }
  }

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[language]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, mounted }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
