"use client"
import React from 'react'
import { 
  ShieldCheck, 
  Clock, 
  Handshake, 
  Heart, 
  Trophy, 
  Bus, 
  MapPin, 
  Mail, 
  Phone 
} from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-primary py-20 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
          <img 
            src="/transport-bg.jpg" 
            alt="Cape Town Transport" 
            className="h-full w-full object-cover"
          />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl">
            Malipheze Dlunge <span className="text-accent">Transport</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-200 md:text-xl">
            Safe, reliable, and efficient transportation solutions based in the heart of Cape Town.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-primary">Our Mission</h2>
              <p className="text-lg leading-relaxed text-gray-600">
                Our mission is to deliver exceptional transportation services that exceed our clients' expectations. 
                We strive to build long-term relationships with our clients, providing them with 
                personalized solutions that meet their unique needs.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-4 border-l-4 border-accent">
                  <h4 className="font-bold text-primary italic">"Safety First"</h4>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 border-l-4 border-accent">
                  <h4 className="font-bold text-primary italic">"Reliability Always"</h4>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <ValueCard 
                icon={<ShieldCheck className="h-8 w-8 text-accent" />}
                title="Safety First"
                desc="Highest safety standards for passengers and vehicles."
              />
              <ValueCard 
                icon={<Clock className="h-8 w-8 text-accent" />}
                title="Reliability"
                desc="Punctual services ensuring you arrive on time, every time."
              />
              <ValueCard 
                icon={<Handshake className="h-8 w-8 text-accent" />}
                title="Integrity"
                desc="Operating with honesty, transparency, and trust."
              />
              <ValueCard 
                icon={<Trophy className="h-8 w-8 text-accent" />}
                title="Excellence"
                desc="Continuously improving to meet your evolving needs."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-12 text-3xl font-bold text-primary">Our Modern Fleet</h2>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="flex flex-col md:flex-row">
              <div className="bg-accent p-8 text-white md:w-1/3 flex flex-col justify-center items-center">
                <Bus className="h-16 w-16 mb-4" />
                <span className="text-4xl font-bold">4</span>
                <p className="text-sm uppercase tracking-widest">Mini Buses</p>
              </div>
              <div className="p-8 text-left md:w-2/3">
                <h3 className="mb-4 text-xl font-bold">Vehicle Specifications</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    Comfortable seating for 15 passengers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    Safety belts & Fire extinguishers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    Fully equipped First Aid kits
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    Experienced & Qualified drivers
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section id="contact" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-3xl bg-primary p-8 text-white md:p-16">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold">Get In Touch</h2>
                <p className="mb-8 text-gray-300">
                  Ready to book your next trip? Contact us for a customized quote today.
                </p>
                <div className="space-y-6">
                  <ContactItem icon={<Mail />} text="Info@mdshuttles.co.za" />
                  <ContactItem icon={<Phone />} text="073 835 8504" />
                  <ContactItem 
                    icon={<MapPin />} 
                    text="129 Beaufort Street, Goodwood, Cape Town" 
                  />
                </div>
              </div>
              <div className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm border border-white/10">
                <h3 className="mb-4 text-xl font-bold">Why Choose Us?</h3>
                <ul className="space-y-4">
                  {['Reliable & Punctual', 'Experienced Drivers', 'Clean Safety Record', 'Competitive Pricing'].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="rounded-full bg-accent/20 p-1">
                        <ShieldCheck className="h-5 w-5 text-accent" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-hover hover:shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 font-bold text-primary">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  )
}

function ContactItem({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-accent">{icon}</div>
      <span className="text-lg">{text}</span>
    </div>
  )
}
