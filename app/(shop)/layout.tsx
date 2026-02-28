import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { LenisProvider } from "@/components/lenis-provider"
import { LanguageProvider } from "@/components/language-provider"
import { ScrollToTop } from "@/components/ScrollToTop"
import HideOnQuote from "@/components/HideOnQuote"

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
      <LenisProvider>
        <HideOnQuote Component={Navbar} hidePath="/quote" />
        <HideOnQuote Component={ScrollToTop} hidePath="/quote" />

        {children}

        <HideOnQuote Component={Footer} hidePath="/quote" />
      </LenisProvider>
    </LanguageProvider>
  )
}