import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"
import ClientProviders from "@/components/ClientProviders"
import { BookingProvider } from "@/components/booking/BookingProvider"


const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mdtravels.co.za"),

  title: {
    default: "MD Travels | Premium Transportation Services Cape Town",
    template: "%s | MD Travels",
  },

  description:
    "Luxury airport transfers, executive travel, chauffeur services and premium transportation across Cape Town. Available 24/7.",

  keywords: [
    "Cape Town airport transfer",
    "Luxury chauffeur Cape Town",
    "Corporate transportation",
    "Executive transport",
    "MD Travels",
  ],

  authors: [{ name: "MD Travels" }],
  creator: "MD Travels",
  publisher: "MD Travels",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.mdtravels.co.za",
    siteName: "MD Travels",
    title: "MD Travels | Luxury Transportation Cape Town",
    description:
      "Premium chauffeur and transportation services in Cape Town.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "MD Travels",
    description:
      "Premium transportation services in Cape Town.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#005d91",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const clerkKey =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable}`}
    >
      <body className="antialiased bg-white text-black">
        <ClerkProvider publishableKey={clerkKey}>
          <ClientProviders>
            <BookingProvider>
              
              
                {children}
           
            </BookingProvider>
            
            <Analytics />
          </ClientProviders>
        </ClerkProvider>
      </body>
    </html>
  )
}