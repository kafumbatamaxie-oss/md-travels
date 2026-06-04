"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ShieldCheck, Clock3, Star } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

export default function WhyChooseUs() {
  const whatsappUrl =
    "https://wa.me/27606411703?text=Hello%20MD%20Travels,%20I%20would%20like%20to%20make%20a%20booking."

  const stats = [
    {
      icon: Clock3,
      value: "24/7",
      label: "Availability",
    },
    {
      icon: ShieldCheck,
      value: "100%",
      label: "Professional",
    },
    {
      icon: Star,
      value: "5★",
      label: "Experience",
    },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary via-[#07101d] to-black py-28">

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <span className="text-white/50 text-xs tracking-[0.4em] uppercase font-black">
            Why MD Travels
          </span>

          <h2 className="mt-6 text-white font-black leading-none tracking-tight text-5xl md:text-7xl">
            Cape Town's
            <br />
            Premium
            <br />
            Transport
            <br />
            Experience
          </h2>

          <p className="mt-8 text-white/60 text-lg md:text-xl max-w-xl leading-relaxed">
            Luxury transfers, professional chauffeurs and executive transport
            designed for business, leisure and special occasions.
          </p>
        </motion.div>

        {/* Image */}

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10">

            <div className="relative h-[450px] md:h-[650px]">

              <Image
                src="/luxury-transfer.jpg"
                alt="MD Travels Luxury Fleet"
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute bottom-8 left-8">

                <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-6">

                  <p className="text-white text-2xl font-black">
                    ★★★★★
                  </p>

                  <p className="text-white/70 text-sm mt-2">
                    Trusted by business and leisure travellers
                    throughout Cape Town.
                  </p>

                </div>

              </div>

            </div>

          </div>
        </motion.div>

        {/* Stats */}

        <div className="grid grid-cols-3 gap-4 mt-10">

          {stats.map((item, i) => {
            const Icon = item.icon

            return (
              <div
                key={i}
                className="
                rounded-3xl
                border
                border-white/10
                bg-white/[0.04]
                backdrop-blur-xl
                p-5
                text-center
              "
              >
                <Icon className="w-5 h-5 text-white/60 mx-auto mb-3" />

                <h3 className="text-white font-black text-xl">
                  {item.value}
                </h3>

                <p className="text-white/50 text-xs uppercase tracking-widest mt-1">
                  {item.label}
                </p>
              </div>
            )
          })}
        </div>

        {/* Services */}

        <div className="mt-10 overflow-x-auto">

          <div className="flex gap-4 min-w-max">

            {[
              "Airport Transfers",
              "Corporate Travel",
              "Private Tours",
              "Wedding Transport",
              "Event Transfers",
            ].map((item) => (
              <div
                key={item}
                className="
                px-6
                py-4
                rounded-full
                border
                border-white/10
                bg-white/[0.04]
                backdrop-blur-xl
                text-white
                font-semibold
                whitespace-nowrap
              "
              >
                {item}
              </div>
            ))}

          </div>

        </div>

        {/* CTA */}

        <div className="mt-20 text-center">

          <h3 className="text-white text-4xl md:text-5xl font-black">
            Ready To Travel In Comfort?
          </h3>

          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Executive transport solutions tailored to your journey.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

            <Link
              href="/quote"
              className="
                px-8 py-4
                rounded-2xl
                bg-white
                text-primary
                font-black
                inline-flex
                items-center
                justify-center
                gap-3
              "
            >
              Get Quote
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                px-8 py-4
                rounded-2xl
                bg-green-500
                text-white
                font-black
                inline-flex
                items-center
                justify-center
                gap-3
              "
            >
              <FaWhatsapp className="w-5 h-5" />
              WhatsApp
            </a>

          </div>

        </div>

      </div>
    </section>
  )
}