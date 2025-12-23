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
 

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Search Section - First Body Section */}
      {/* <section className="px-0 p-0">
        <div className="w-full mx-auto">
          <SearchForm />
        </div>
      </section> */}

      {/* Hero Carousel Section */}
      <HeroCarouselSection />

      <section className="h-30 w-full bg-secondary" >

      </section>

      {/* About Section */}
      <AboutSection title={t.aboutSection.title}
        description1={t.aboutSection.description1}
        description2={t.aboutSection.description2}
        contactLabel={t.nav.contact}  quoteLabel={t.nav.getQuote}
      />

      {/* Our Heritage Section with GIF background and Parallax */}
      <OurHeritageSection t={t} />

       {/* Why Choose Us - Mobile First Marquee */}
      <ScrollReveal className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 md:px-8">
        <WhyChooseUs items={whyChooseItems} title={t.contact.whyTitle} />
      </ScrollReveal>

      
      {/* Featured Cars Showcase - NEW */}
      <FeaturedCarsSection
        title="THE PERFECT CAR FOR YOUR NEXT TRIP"
        subtitle="Discover our premium fleet exclusively available in Cape Town"
      />



      {/* CTA Section - Mobile First */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 md:px-8 bg-sky-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-balance">
            <span className="text-secondary">Ready to</span> <span className="text-sky-950">Experience Premium Transportation?</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-sky-800 mb-8 sm:mb-10 md:mb-12 leading-relaxed">
            Contact us today for a personalized quote or to book your luxury journey with MD Travels.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link
              href="/quote"
              className="px-6 sm:px-8 py-3 md:py-4 bg-secondary hover:opacity-90 text-white rounded-lg font-semibold transition-all hover:scale-105 text-sm sm:text-base shadow-lg"
            >
              {t.nav.getQuote}
            </Link>
            <a
              href="https://wa.me/27719455941"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 md:py-4 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white rounded-lg font-semibold transition-all hover:scale-105 text-sm sm:text-base"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <FloatingElements />
    </main>
  )
}
