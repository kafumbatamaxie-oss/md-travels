"use client"

import { Navbar } from "@/components/navbar"
import { FloatingElements } from "@/components/floating-elements"
import { useLanguage } from "@/hooks/use-language"
import { CheckCircle } from "lucide-react"
import CustomHero from "@/components/CustomHero"
import { MdAboutSection } from "@/components/MdAboutSection"
export default function About() {
  const { t, mounted } = useLanguage()

  if (!mounted) return null

  return (
    <main className="bg-background px-4  md:px-8">
    
      {/* Hero */}
      <CustomHero 
        title="About Us" 
        subTitle="We are a premier transportation company committed to providing exceptional service" />
      

      {/* Mission & Vision */}
      <MdAboutSection />
      {/* <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                To provide safe, reliable, and luxurious transportation services that exceed our clients' expectations
                while maintaining the highest standards of professionalism and customer service.
              </p>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                To become the leading transportation service provider in Cape Town, known for our commitment to
                excellence, innovation, and customer satisfaction.
              </p>
            </div>

            <div className="animate-slide-up">
              <h2 className="text-3xl font-bold mb-8">Core Values</h2>
              <div className="space-y-4">
                {[
                  { title: "Safety First", desc: "Your security is our top priority" },
                  { title: "Reliability", desc: "Always on time, every single time" },
                  { title: "Excellence", desc: "Uncompromising quality in everything" },
                  { title: "Customer Focus", desc: "Your satisfaction drives our success" },
                ].map((value, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-4 glass rounded-lg border border-border hover:border-secondary transition"
                  >
                    <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold mb-1">{value.title}</h3>
                      <p className="text-sm text-text-secondary">{value.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Why Choose Us
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-balance">Why Choose MD Travels?</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "24/7 Availability", desc: "Round-the-clock service for your convenience" },
              { title: "Licensed & Insured", desc: "Fully licensed with comprehensive insurance coverage" },
              { title: "Professional Team", desc: "Experienced and courteous drivers" },
              { title: "Customer Satisfaction", desc: "Your comfort and satisfaction is our priority" },
              { title: "Fleet Quality", desc: "Modern vehicles with premium amenities" },
              { title: "Local Expertise", desc: "Deep knowledge of Cape Town and surroundings" },
            ].map((item, idx) => (
              <div key={idx} className="p-6 glass rounded-lg border border-border hover:border-secondary transition">
                <h3 className="text-lg font-bold mb-2 text-secondary">0{idx + 1}</h3>
                <h4 className="font-bold mb-2">{item.title}</h4>
                <p className="text-text-secondary text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Stats Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "5+", label: "Years Experience" },
              { number: "1000+", label: "Happy Customers" },
              { number: "50+", label: "Fleet Vehicles" },
              { number: "24/7", label: "Service Available" },
            ].map((stat, idx) => (
              <div key={idx} className="p-8 glass rounded-lg border border-border">
                <div className="text-4xl font-bold gradient-gold mb-2">{stat.number}</div>
                <p className="text-text-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* ===== Contact ===== */}
      <section className="rounded-2xl bg-primary text-primary-foreground py-10 text-center space-y-3  mb-20 md:px-20">
        <h2 className="text-xl font-semibold">Contact Us</h2>

        <p className="text-sm text-primary-foreground/90">
          For bookings or a custom quote, get in touch today.
        </p>

        <div className="space-y-1 text-sm">
          <p className="font-medium">Malipheze Dlunge Transport</p>
          <p>📧 Info@mdshuttles.co.za</p>
          <p>📞 +27 71 9455 941</p>
          <p>📞 +27 606 411 703</p>
          
          <p>📍 129 Beaufort Street, Goodwood, Cape Town</p>
        </div>
      </section>

      <FloatingElements />
    </main>
  )
}
