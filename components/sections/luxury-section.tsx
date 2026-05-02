import Image from "next/image"
import Link from "next/link"
import clsx from "clsx"
import { Reveal } from "@/components/ui/reveal"

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
  href,
  ctaLabel,
  whatsappNumber,
  priceNote,
  highlight,
  priority = false,
}: LuxurySectionProps) {
  const reversed = direction === "left"

  return (
    <section className="relative isolate overflow-hidden py-24 lg:py-36">
      
      {/* BACKGROUND GLOW */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div
        className={clsx(
          "mx-auto flex max-w-7xl flex-col gap-14 px-6 lg:items-center lg:gap-24",
          reversed ? "lg:flex-row-reverse" : "lg:flex-row"
        )}
      >
        {/* IMAGE */}
        <div className="w-full lg:w-1/2">
          <Reveal>
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">

              <Image
                src={image}
                alt={imageAlt}
                width={1200}
                height={900}
                priority={priority}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:h-[560px]"
              />

              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-secondary/20" />

              {/* FLOATING BADGE */}
              <div className="absolute bottom-6 left-6 glass-pill px-4 py-2 text-xs tracking-wide">
                Exclusive Package
              </div>
            </div>
          </Reveal>
        </div>

        {/* CONTENT */}
        <div className="w-full lg:w-1/2">
          <Reveal delay={0.15}>
            <div className="space-y-7">

              {eyebrow && (
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-secondary">
                  {eyebrow}
                </p>
              )}

              <h2 className="text-4xl font-bold leading-tight lg:text-6xl">
                <span className="gradient-gold">{title}</span>
              </h2>

              {highlight && (
                <div className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary text-xs tracking-wide">
                  {highlight}
                </div>
              )}

              {subtitle && (
                <p className="text-secondary italic text-lg">
                  {subtitle}
                </p>
              )}

              <p className="max-w-xl text-lg leading-relaxed text-text-secondary">
                {description}
              </p>

              {features && (
                <div className="grid grid-cols-2 gap-3 text-sm text-text-secondary pt-2">
                  {features.map((item, i) => (
                    <div key={i}>• {item}</div>
                  ))}
                </div>
              )}

              {/* CTA BLOCK */}
              <div className="pt-6 space-y-4">

                {priceNote && (
                  <p className="text-sm text-secondary font-medium">
                    {priceNote}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-4">

                  {href && ctaLabel && (
                    <Link
                      href={href}
                      className="inline-flex justify-center items-center rounded-xl bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.04] hover:bg-primary-dark"
                    >
                      {ctaLabel}
                    </Link>
                  )}

                  {whatsappNumber && (
                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex justify-center items-center rounded-xl border border-green-500 px-7 py-4 text-sm font-semibold text-green-500 hover:bg-green-500/10 transition-all"
                    >
                      Chat on WhatsApp
                    </a>
                  )}
                </div>

                <p className="text-xs text-text-secondary">
                  Trusted across Cape Town • Professional chauffeurs • On-time guarantee
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}