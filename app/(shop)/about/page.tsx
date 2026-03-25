"use client"

import { Navbar } from "@/components/navbar"
import { FloatingElements } from "@/components/floating-elements"
import { useLanguage } from "@/hooks/use-language"
import { CheckCircle } from "lucide-react"
import CustomHero from "@/components/CustomHero"
import { MdAboutSection } from "@/components/MdAboutSection"
import { MissionVisionSection } from "@/components/MdMissionAboutSection"
import { StatsDashboardSection } from "@/components/StatsDashboardSection"
import { ContactConciergeSection } from "@/components/ContactConciergeSection"
export default function About() {
  const { t, mounted } = useLanguage()

  if (!mounted) return null

  return (
    <main className=" min-h-screen bg-background text-foreground w-full">
    
      {/* Hero */}
      <CustomHero 
        title="About Us" 
        subTitle="We are a premier transportation company committed to providing exceptional service" />
      

      {/* Mission & Vision */}
      <MdAboutSection />
      <MissionVisionSection />

      {/* Stats Section */}
      <StatsDashboardSection />

       {/* ===== Contact ===== */}
      <ContactConciergeSection />

      <FloatingElements />
    </main>
  )
}
