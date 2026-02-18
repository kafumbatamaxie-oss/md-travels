import React from 'react'

interface CustomHeroProps {
  title: string
  subTitle: string
}

export default function CustomHero({ title, subTitle }: CustomHeroProps) {
  return (
    <section className="relative min-h-[70vh] w-full flex items-center justify-center overflow-hidden py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      {/* 
          1. Video Background 
          - autoPlay + muted + playsInline: Required for mobile/Chrome autoplay
          - poster: Displays '/heritage.png' as a fallback while video loads
          - preload="auto": Optimizes for immediate playback
      */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/video-collection.mp4" type="video/mp4" />
      </video>

      {/* 2. Accessible Overlay - Ensures text contrast */}
      <div 
        className="absolute inset-0 z-[1] bg-sky-950/70 mix-blend-multiply pointer-events-none" 
        aria-hidden="true" 
      />

      {/* 3. Content - Lifted with z-index for visibility */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl text-white md:text-6xl font-extrabold mb-6 tracking-tight text-balance">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          {subTitle}
        </p>
      </div>
    </section>
  )
}
