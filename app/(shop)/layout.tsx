import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { LenisProvider } from "@/components/lenis-provider"
import { LanguageProvider } from "@/components/language-provider"
import { ScrollToTop } from "@/components/ScrollToTop"
import HideOnQuote from "@/components/HideOnQuote"
import ClientShell from "@/components/ClientShell"


export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>   
        <ClientShell>
          {children}
        </ClientShell>
        <Footer />
    </LanguageProvider>
  )
}