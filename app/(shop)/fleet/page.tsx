"use client"
import ProfessionalHero from "@/components/ProfessionalHero"
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
      
      <ProfessionalHero />
      <TransFleet />
      <TransAbout />
      <TransServices />
      <TransSafety />
      {/* <TransCTA /> */}
    </>
  )
}
