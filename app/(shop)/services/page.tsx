"use client"

import { Navbar } from "@/components/navbar"
import { FloatingElements } from "@/components/floating-elements"
import { useLanguage } from "@/hooks/use-language"
import { Plane, Briefcase, MapPin, Heart, Compass, Truck } from "lucide-react"
import Link from "next/link"
import CustomHero from "@/components/CustomHero"
import { ServicesShowroom } from "@/components/ServicesShowroom"
import { WhyChooseSection } from "@/components/WhyChooseSection"

const services = [
  {
    icon: Plane,
    titleKey: "services.airportTransfers",
    desc: "Reliable and comfortable transfers to and from Cape Town International Airport with flight monitoring.",
    features: ["Flight monitoring", "Meet and greet", "Fixed pricing", "24/7 availability"],
  },
  {
    icon: Briefcase,
    titleKey: "services.corporateTravel",
    desc: "Professional transportation for business meetings, conferences, and corporate events.",
    features: ["Executive travel", "Client transfers", "Corporate accounts", "Professional drivers"],
  },
  {
    icon: MapPin,
    titleKey: "services.cityTours",
    desc: "Explore Cape Town with our knowledgeable drivers. From Table Mountain to V&A Waterfront.",
    features: ["Best tours", "Peninsula tours", "Half & full day", "Custom itineraries"],
  },
  {
    icon: Heart,
    titleKey: "services.weddings",
    desc: "Specialized wedding transportation with attention to detail for your special day.",
    features: ["Wedding vehicles", "Professional drivers", "Event coordination", "Custom packages"],
  },
  {
    icon: Compass,
    titleKey: "services.tours",
    desc: "Adventure experiences including shark cage diving, skydiving, hiking, and safari tours.",
    features: ["Wine tours", "Adventure activities", "Game reserves", "Guided experiences"],
  },
  {
    icon: Truck,
    titleKey: "services.events",
    desc: "Complete event transportation solutions for conferences, parties, and gatherings.",
    features: ["Event shuttles", "Large groups", "Flexible scheduling", "Coordination support"],
  },
]

export default function Services() {
  const { t, mounted } = useLanguage()

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
    

      {/* Hero */}
      <CustomHero title={t("services.title")} subTitle={t("services.subtitle")} />

      {/* Services Grid */}
      <ServicesShowroom services={services} t={t} />

      {/* Why Choose Section */}
      <WhyChooseSection />

      <FloatingElements />
    </main>
  )
}
