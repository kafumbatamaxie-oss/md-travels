"use client"
import { FloatingElements } from "@/components/floating-elements"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"
import { Shield, Clock, Users, Star, Award, HeartHandshake } from "lucide-react"
import { translations } from "@/lib/i18n"
import { SearchForm } from "@/components/search-form"
import { AnimatedStats } from "@/components/animated-stats"
import { HeroCarouselSection } from "@/components/HeroCarouselSection"

export default function Home() {
  const { language, mounted } = useLanguage()
  const t = translations[language]

  if (!mounted) return null

 

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

       {/* About Section with GIF background and Parallax */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Added GIF background with parallax effect using CSS */}
        <div
          className="absolute inset-0 z-0 opacity-10 grayscale pointer-events-none bg-fixed bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/Flag_of_South_Africa.gif')",
          }}
        />

        <div className="container relative z-10 mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none italic">
                {t.about.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">{t.about.description1}</p>

              {/* Integrated AnimatedStats component for counters */}
              <AnimatedStats experienceLabel={t.about.experience} clientsLabel={t.about.customers} />
            </div>

            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl group border-8 border-white">
              <img
                src="https://images.unsplash.com/photo-1730379944611-960081d38bf7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Luxury Vehicle Interior"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Mobile First Grid */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-balance">
            Why Choose MD Travels
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Clock,
                title: "Always On Time",
                desc: "We understand the value of your time and ensure punctual service every journey.",
              },
              {
                icon: Shield,
                title: "Safe & Secure",
                desc: "Licensed drivers and regularly maintained vehicles for your complete safety.",
              },
              {
                icon: Users,
                title: "Professional Team",
                desc: "Experienced and courteous drivers dedicated to service excellence.",
              },
              {
                icon: Star,
                title: "5-Star Service",
                desc: "Exceptional customer satisfaction with personalized attention to detail.",
              },
              {
                icon: Award,
                title: "Award Winning",
                desc: "Recognized for excellence in luxury transportation services.",
              },
              {
                icon: HeartHandshake,
                title: "Client Focused",
                desc: "Your comfort and satisfaction are our top priorities always.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 bg-card rounded-xl border border-border hover:border-secondary hover:shadow-lg transition-all group"
              >
                <item.icon className="w-10 sm:w-12 h-10 sm:h-12 text-secondary mb-3 sm:mb-4 group-hover:scale-110 transition" />
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile First */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 md:px-8 bg-secondary/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-balance">
            Ready to Experience Premium Transportation?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary mb-8 sm:mb-10 md:mb-12 leading-relaxed">
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
