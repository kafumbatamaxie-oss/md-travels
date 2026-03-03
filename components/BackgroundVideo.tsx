"use client";

export default function BackgroundVideo() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="
          w-full h-full
          object-cover
        "
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}