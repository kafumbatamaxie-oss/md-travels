"use client";

import { useState } from "react";

export default function TourSelector({
  onChange,
}: {
  onChange: (v: string) => void;
}) {
  const [selected, setSelected] = useState("half-day");

  function select(type: string) {
    setSelected(type);
    onChange(type);
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => select("half-day")}
        className={`w-full p-3 border rounded ${
          selected === "half-day" && "bg-black text-white"
        }`}
      >
        Half-Day Tour — R3500
      </button>

      <button
        type="button"
        onClick={() => select("full-day")}
        className={`w-full p-3 border rounded ${
          selected === "full-day" && "bg-black text-white"
        }`}
      >
        Full-Day Tour — R6000
      </button>

      <input type="hidden" name="tourType" value={selected} />
    </div>
  );
}