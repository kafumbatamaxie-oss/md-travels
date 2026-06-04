"use client"

import Image from "next/image"
import clsx from "clsx"
import { useState } from "react"

import {
  ArrowRight,
  CheckCircle2,
  Star,
} from "lucide-react"

import { Reveal } from "@/components/ui/reveal"
import BookingDialog from "@/components/booking/BookingDialog"

type LuxurySectionProps = {
  title: string
  subtitle?: string
  description: string

  image: string
  imageAlt: string

  direction?: "left" | "right"
  eyebrow?: string

  features?: string[]

  href?: string
  ctaLabel?: string

  whatsappNumber?: string
  priceNote?: string
  highlight?: string

  priority?: boolean
}

export function LuxurySection({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  direction = "right",
  eyebrow,
  features,
  ctaLabel,
  whatsappNumber,
  priceNote,
  highlight,
  priority = false,
}: LuxurySectionProps) {
  const reversed = direction === "left"

  const [bookingOpen, setBookingOpen] =
    useState(false)

  return (
    <>
      <section className="relative isolate overflow-hidden bg-slate-950 py-24 lg:py-36">

        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">

          <div className="
            absolute
            left-1/2
            top-0
            h-[600px]
            w-[600px]
            -translate-x-1/2
            rounded-full
            bg-secondary/10
            blur-[140px]
          " />

          <div className="
            absolute
            bottom-0
            right-0
            h-[500px]
            w-[500px]
            rounded-full
            bg-primary/10
            blur-[140px]
          " />

        </div>

        <div
          className={clsx(
            "relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-6 lg:items-center lg:gap-24",
            reversed
              ? "lg:flex-row-reverse"
              : "lg:flex-row"
          )}
        >
          {/* IMAGE */}
          <div className="w-full lg:w-1/2">

            <Reveal>

              <div
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[32px]
                  border
                  border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  shadow-[0_30px_80px_rgba(0,0,0,0.45)]
                "
              >
                <Image
                  src={image}
                  alt={imageAlt}
                  width={1200}
                  height={900}
                  priority={priority}
                  sizes="(max-width:1024px)100vw,50vw"
                  className="
                    h-[420px]
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                    lg:h-[620px]
                  "
                />

                <div className="
                  absolute
                  inset-0
                  bg-gradient-to-tr
                  from-black/60
                  via-transparent
                  to-secondary/20
                " />

                <div
                  className="
                    absolute
                    bottom-6
                    left-6
                    bg-black/50
                    backdrop-blur-xl
                    border
                    border-white/10
                    rounded-full
                    px-5
                    py-3
                    text-white
                    text-xs
                    font-bold
                    tracking-[0.25em]
                    uppercase
                  "
                >
                  Premium Experience
                </div>
              </div>

            </Reveal>

          </div>

          {/* CONTENT */}
          <div className="w-full lg:w-1/2">

            <Reveal delay={0.15}>

              <div className="space-y-8">

                {eyebrow && (
                  <p className="
                    text-secondary
                    font-black
                    uppercase
                    tracking-[0.35em]
                    text-xs
                  ">
                    {eyebrow}
                  </p>
                )}

                <h2
                  className="
                    text-white
                    font-black
                    leading-[0.95]
                    tracking-tight
                    text-5xl
                    md:text-6xl
                    lg:text-7xl
                  "
                >
                  {title}
                </h2>

                {highlight && (
                  <div className="
                    inline-flex
                    items-center
                    rounded-full
                    border
                    border-secondary/20
                    bg-secondary/10
                    px-4
                    py-2
                    text-secondary
                    text-sm
                    font-bold
                  ">
                    {highlight}
                  </div>
                )}

                {subtitle && (
                  <p className="
                    text-secondary
                    text-xl
                    italic
                  ">
                    {subtitle}
                  </p>
                )}

                <p className="
                  max-w-xl
                  text-lg
                  leading-relaxed
                  text-white/70
                ">
                  {description}
                </p>

                {features && (
                  <div className="
                    grid
                    gap-4
                    md:grid-cols-2
                  ">
                    {features.map((item) => (
                      <div
                        key={item}
                        className="
                          flex
                          items-center
                          gap-3
                          rounded-2xl
                          border
                          border-white/10
                          bg-white/5
                          px-4
                          py-3
                          text-white/80
                        "
                      >
                        <CheckCircle2 className="
                          h-4
                          w-4
                          text-secondary
                        " />

                        {item}
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-2">

                  {priceNote && (
                    <div className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-secondary/20
                      bg-secondary/10
                      px-4
                      py-2
                      text-secondary
                      text-sm
                      font-semibold
                      mb-6
                    ">
                      <Star className="w-4 h-4 fill-current" />
                      {priceNote}
                    </div>
                  )}

                  <div className="
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                  ">
                    <button
                      onClick={() =>
                        setBookingOpen(true)
                      }
                      className="
                        group
                        bg-secondary
                        text-black
                        px-8
                        py-4
                        rounded-2xl
                        font-black
                        uppercase
                        tracking-wider
                        flex
                        items-center
                        justify-center
                        gap-3
                        hover:scale-105
                        transition
                      "
                    >
                      {ctaLabel || "Book Now"}

                      <ArrowRight
                        className="
                          w-5
                          h-5
                          group-hover:translate-x-1
                          transition
                        "
                      />
                    </button>

                    {whatsappNumber && (
                      <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          bg-white/5
                          backdrop-blur-xl
                          border
                          border-white/10
                          px-8
                          py-4
                          rounded-2xl
                          text-white
                          font-black
                          uppercase
                          tracking-wider
                          text-center
                          hover:bg-white/10
                          transition
                        "
                      >
                        WhatsApp Us
                      </a>
                    )}
                  </div>

                  <div className="
                    mt-8
                    flex
                    flex-wrap
                    gap-3
                  ">
                    {[
                      "Professional Chauffeurs",
                      "Luxury Fleet",
                      "24/7 Availability",
                      "Airport Transfers",
                    ].map((item) => (
                      <div
                        key={item}
                        className="
                          flex
                          items-center
                          gap-2
                          rounded-full
                          border
                          border-white/10
                          bg-white/5
                          px-4
                          py-2
                          text-sm
                          text-white/80
                        "
                      >
                        <CheckCircle2 className="
                          h-4
                          w-4
                          text-secondary
                        " />
                        {item}
                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </Reveal>

          </div>
        </div>
      </section>

      <BookingDialog
        open={bookingOpen}
        setOpen={setBookingOpen}
      />
    </>
  )
}