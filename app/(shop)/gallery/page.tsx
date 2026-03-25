"use client"

import { FloatingElements } from "@/components/floating-elements"
import { useLanguage } from "@/hooks/use-language"
import CustomHero from "@/components/CustomHero"
import PremiumGallery from "@/components/PremiumGallery"

const galleryImages = [
  {
    category: "Fleet",
    image: "/p1.jpg",
    title: "Luxury Fleet",
  },
  {
    category: "Views",
    image: "/p2.jpg",
    title: "Cape Town Views",
  },
  {
    category: "Fleet",
    image: "/p5.jpg",
    title: "Group Transport",
  },
  {
    category: "Views",
    image: "/p4.jpg",
    title: "Mountain Scenery",
  },
  {
    category: "Fleet",
    image: "/p5.jpg",
    title: "Premium Vehicles",
  },
  {
    category: "Views",
    image: "/hero-mobile-3.jpg",
    title: "Coastal Beauty",
  },
  {
    category: "Fleet",
    image: "/hero-mobile-2.jpg",
    title: "Professional Service",
  },
  {
    category: "Views",
    image: "/hero-mobile-1.jpg",
    title: "Urban Exploration",
  },
]

export default function Gallery() {
  const { t, mounted } = useLanguage()

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
  

      {/* Hero */}
      <CustomHero title="Our Gallery" subTitle="Explore our fleet, services, and beautiful destinations" />

      {/* Gallery Grid */}
      <PremiumGallery galleryImages={galleryImages} />

      <FloatingElements />
    </main>
  )
}
