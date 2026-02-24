"use client"

import Image from "next/image"
import { Shield, Users, Clock, CheckCircle } from "lucide-react"

export default function MdAboutPage() {
  return (
    <section className="bg-background px-4 py-16 md:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl space-y-16">

        {/* ===== Header ===== */}
        <div className="text-center space-y-4">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Company Profile
          </span>

          <h1 className="text-3xl font-bold md:text-4xl">
            Malipheze Dlunge Transport
          </h1>

          <p className="mx-auto max-w-2xl text-muted-foreground">
            A reputable transportation company based in Cape Town,
            providing safe, reliable, and efficient services to individuals,
            groups, and organizations across the Western Cape.
          </p>
        </div>

        {/* ===== Leadership ===== */}
        <div className="space-y-10">
          <h2 className="text-2xl font-semibold text-center">
            Our Leadership
          </h2>

          <div className="grid gap-8 sm:grid-cols-2">

            {/* CEO */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm text-center space-y-4">
              <div className="mx-auto h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src="/ceo.jpeg"   // <-- replace with real image
                  alt="CEO"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  Malipheze Dlunge
                </h3>
                <p className="text-sm text-accent font-medium">
                  Founder & CEO
                </p>
              </div>

              <p className="text-sm text-muted-foreground">
                Visionary leader committed to delivering safe,
                reliable transportation solutions while building
                long-term relationships with clients across Cape Town.
              </p>
            </div>

            {/* Tech Manager */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm text-center space-y-4">
              <div className="mx-auto h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src="/ceo_2.jpg"  // <-- replace
                  alt="Tech Manager"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  Tech Manager
                </h3>
                <p className="text-sm text-accent font-medium">
                  Technology & Systems
                </p>
              </div>

              <p className="text-sm text-muted-foreground">
                Oversees digital systems, automation, and website
                infrastructure to ensure seamless operations and
                efficient customer service.
              </p>
            </div>

          </div>
        </div>

        {/* ===== Mission ===== */}
        <div className="rounded-2xl border bg-card p-6 md:p-8 space-y-3">
          <h2 className="text-xl font-semibold">Our Mission</h2>

          <p className="text-muted-foreground">
            To deliver exceptional transportation services that exceed
            expectations while building long-term partnerships through
            personalized, reliable, and professional solutions.
          </p>
        </div>

        {/* ===== Core Values ===== */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">
            Our Core Values
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <ValueCard
              icon={<Shield />}
              title="Safety First"
              text="We maintain the highest safety standards for passengers, drivers, and vehicles."
            />

            <ValueCard
              icon={<Clock />}
              title="Reliability"
              text="Punctual, dependable services that ensure you always arrive on time."
            />

            <ValueCard
              icon={<CheckCircle />}
              title="Integrity"
              text="Honest and transparent operations that build trust with clients."
            />

            <ValueCard
              icon={<Users />}
              title="Respect"
              text="We treat every client, driver, and colleague with dignity."
            />

            <ValueCard
              icon={<CheckCircle />}
              title="Excellence"
              text="Continuous improvement to meet evolving transportation needs."
            />

          </div>
        </div>

        {/* ===== Fleet ===== */}
        <div className="rounded-2xl border bg-card p-6 md:p-8 space-y-3">
          <h2 className="text-xl font-semibold">Our Fleet</h2>

          <p className="text-muted-foreground">
            Our fleet consists of four modern mini buses designed
            for comfort, safety, and reliability.
          </p>

          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Comfortable seating for up to 15 passengers</li>
            <li>Safety belts for all passengers</li>
            <li>First aid kits and fire extinguishers</li>
            <li>Experienced and qualified drivers</li>
          </ul>
        </div>

        {/* ===== Services ===== */}
        <div className="rounded-2xl border bg-card p-6 md:p-8 space-y-3">
          <h2 className="text-xl font-semibold">Our Services</h2>

          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Short-term contracts for events and conferences</li>
            <li>Long-term corporate transportation solutions</li>
            <li>Customized transport tailored to client needs</li>
          </ul>
        </div>

        {/* ===== Contact ===== */}
        <div className="rounded-2xl bg-primary p-6 text-primary-foreground text-center space-y-3 md:p-8">
          <h2 className="text-xl font-semibold">Contact Us</h2>

          <p className="text-sm text-primary-foreground/90">
            For bookings or a custom quote, get in touch today.
          </p>

          <div className="space-y-1 text-sm">
            <p className="font-medium">Malipheze Dlunge Transport</p>
            <p>📧 Info@mdshuttles.co.za</p>
            <p>📞 073 835 8504</p>
            <p>📍 129 Beaufort Street, Goodwood, Cape Town</p>
          </div>
        </div>

      </div>
    </section>
  )
}

function ValueCard({ icon, title, text }: any) {
  return (
    <div className="rounded-xl border bg-card p-5 space-y-2">
      <div className="text-accent">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  )
}
