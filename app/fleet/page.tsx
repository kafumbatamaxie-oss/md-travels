"use client"
import { TransAbout } from "@/components/trans-about"
import { TransCTA } from "@/components/trans-cta"
import { TransFleet } from "@/components/trans-fleet"
import { TransSafety } from "@/components/trans-safety"
import { TransServices } from "@/components/trans-services"
import { Shield, Clock, CheckCircle } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function ProfessionalTransport() {
     const videoRef = useRef<HTMLVideoElement>(null)
    const [videoLoaded, setVideoLoaded] = useState(false)

      useEffect(() => {
        const video = videoRef.current
        if (video) {
          video.playbackRate = 0.75
          video.play().catch(() => {})
        }
      }, [])
  return (
    <>
      <section className="relative flex min-h-[90vh] items-center bg-primary pt-16">
        <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setVideoLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source
          src="/video-collection.mp4"
          type="video/mp4"
        />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)/0.08),transparent_70%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-20 text-center md:px-8 lg:py-32">
          <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            Western Cape Transport Specialists
          </span>
          <h1 className="max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Professional Transport{" "}
            <span className="text-accent">Services Proposal</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-primary-foreground/70 md:text-xl">
            Safe &bull; Reliable &bull; Fully Compliant &bull; 24/7 Operations
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Get a Quote
            </a>
            <a
              href="#fleet"
              className="rounded-lg border border-primary-foreground/20 px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              View Our Fleet
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <div className="flex items-center gap-2 text-primary-foreground/60">
              <Shield className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Fully Insured</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/60">
              <Clock className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">24/7 Operations</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/60">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Licensed Drivers</span>
            </div>
          </div>
        </div>
      </section>
      <TransFleet />
      <TransAbout />
      <TransServices />
      <TransSafety />
      <TransCTA />
    </>
  )
}
