import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LenisProvider } from "@/components/lenis-provider"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/components/language-provider"
import { Navbar } from "@/components/navbar"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"
import { ScrollToTop } from "@/components/ScrollToTop"
import HideOnQuote from "@/components/HideOnQuote"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MD Travels - Premium Transportation Services in Cape Town | Luxury Transfers",
  description:
    "Premium transportation services in Cape Town. Airport transfers, corporate travel, luxury fleet, reliable 24/7 service. Book your ride with MD Travels for exceptional travel experiences.",
  keywords:
    "MD Travels, Cape Town transportation, airport transfers, corporate travel, luxury fleet, premium transport, Cape Town travel, business travel, wedding transport",
  authors: [{ name: "MD Travels" }],
  creator: "MD Travels",
  publisher: "MD Travels",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mdtravels.co.za",
    title: "MD Travels - Premium Transportation in Cape Town",
    description: "Premium luxury transportation services available 24/7",
    images: [
      {
        url: "https://mdtravels.co.za/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MD Travels - Premium Transportation",
    description: "Luxury transportation services in Cape Town",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
    generator: 'v0.app'
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#d4af37",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
 

  const content = (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
      <body className={`${_geist.className} antialiased bg-background text-foreground`}>     
           
            {children}
      
        <Analytics />
      </body>
      </html>
    </ClerkProvider>
    
  )

  if (!clerkKey) {
    console.warn("[v0] Clerk Publishable Key is missing. Auth features will be disabled.")
    return content
  }

  return <ClerkProvider publishableKey={clerkKey}>{content}</ClerkProvider>
}
