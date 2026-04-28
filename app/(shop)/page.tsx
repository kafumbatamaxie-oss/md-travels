"use client"
import { FloatingElements } from "@/components/floating-elements"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"
import { Shield, Clock, Users, Star, Award, HeartHandshake } from "lucide-react"
import { translations } from "@/lib/i18n"
import { SearchForm } from "@/components/search-form"
import { HeroCarouselSection } from "@/components/HeroCarouselSection"
import { AboutSection } from "@/components/AboutSection"
import { FeaturedCarsSection } from "@/components/FeaturedCardsSection"
import {OurHeritageSection} from "@/components/OurHeritageSection"
import { WhyChooseUs } from "@/components/why-choose-us"
import { ScrollReveal } from "@/components/scroll-reveal"
import SpecialPackageSection from "@/components/SpecialPackageSection"
import ProposalSection from "@/components/ProposalSection"
import StariaQuoteSection from "@/components/StariaQuoteSection"
import WinelandsSection from "@/components/WinelandsSection"
import ContractSection from "@/components/ContractSection"
import PartnershipArea from "@/components/PartnershipArea"
import CorollaSection from "@/components/CorollaSection"
import RomionSection from "@/components/RomionSection"
import ServiceFleetSection from "@/components/shop/services/ServiceFleetSection"
import AICallSection from "@/components/AICallSection"
import PremiumCTA from "@/components/PremiumCTA"
import CarSection from "@/components/CarSection"



export default function Home() {
  const { language, mounted } = useLanguage()
  const t = translations[language]

  if (!mounted) return null

   const whyChooseItems = [
    {
      icon: Clock,
      title: t.contact.whyTime,
      description: t.contact.whyTimeDesc,
    },
    {
      icon: Shield,
      title: t.contact.whySafe,
      description: t.contact.whySafeDesc,
    },
    {
      icon: Users,
      title: t.contact.whyTeam,
      description: t.contact.whyTeamDesc,
    },
    {
      icon: Star,
      title: t.contact.whyStars,
      description: t.contact.whyStarsDesc,
    },
    {
      icon: Award,
      title: t.contact.whyAward,
      description: t.contact.whyAwardDesc,
    },
    {
      icon: HeartHandshake,
      title: t.contact.whyClient,
      description: t.contact.whyClientDesc,
    },
  ]
 
  const phoneNumber = "27606411703"; 
  const message = "Hello MD Travels! 👋 I'm interested in your stransportation services and fleet. Could you help me with some details?";
  const whatsappUrl = `https://wa.me/27606411703?text=${encodeURIComponent(message)}`;
  
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroCarouselSection />
      {/* About Section */}
      <AboutSection 
        title={t.aboutSection.title}
        description1={t.aboutSection.description1}
        description2={t.aboutSection.description2}
        contactLabel={t.nav.contact}  
        quoteLabel={t.nav.getQuote}
      /> 
      <ServiceFleetSection /> 
      <CarSection title="Our collections" subTitle="Luxury Style" />
      <AICallSection />
      <OurHeritageSection t={t} />  
      <WhyChooseUs items={whyChooseItems} title={t.contact.whyTitle} />
      <PremiumCTA />
      <FloatingElements />
    </main>
  )
}
