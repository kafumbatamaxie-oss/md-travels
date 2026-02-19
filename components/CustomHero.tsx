"use client";

import React from 'react';

interface CustomHeroProps {
  title: string;
  subTitle: string;
}

export default function CustomHero({ title, subTitle }: CustomHeroProps) {
  return (
    <section className="relative min-h-[70vh] w-full flex items-center justify-center overflow-hidden py-16 md:py-24 px-4">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        // This prevents the "black flash" before the video starts
        poster="/heritage.png" 
        className="absolute inset-0 z-0 h-[300px] w-full object-cover"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* High-Contrast Overlay */}
      <div 
        className="absolute inset-0 z-[1] bg-sky-950/70 mix-blend-multiply pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl text-white md:text-6xl font-extrabold mb-6 tracking-tight text-balance">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          {subTitle}
        </p>
      </div>
    </section>
  );
}
