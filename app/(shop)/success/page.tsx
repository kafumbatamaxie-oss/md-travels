"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function SuccessPage() {
  useEffect(() => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-bold mb-4">
        🎉 Booking Sent Successfully!
      </h1>

      <p className="text-gray-600">
        Our team will contact you shortly.
      </p>
    </div>
  );
}