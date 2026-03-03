"use client";

import { useState, useEffect } from "react";

type Props = {
  onChange: (v: string, total: number) => void;
};

const SHUTTLE_PRICE = 1600;
const PRICES = {
  "half-day": 3500,
  "full-day": 6000,
};

export default function TourSelector({ onChange }: Props) {
  const [selected, setSelected] = useState<"half-day" | "full-day">(
    "half-day"
  );

  const total = SHUTTLE_PRICE + PRICES[selected];

  useEffect(() => {
    onChange(selected, total);
  }, [selected]);

  function select(type: "half-day" | "full-day") {
    setSelected(type);
  }

  return (
    <div className="space-y-4">

      {/* HALF DAY */}
      <button
        type="button"
        onClick={() => select("half-day")}
        className={`w-full text-left p-4 rounded-xl border transition
        ${
          selected === "half-day"
            ? "bg-black text-white border-black"
            : "bg-white hover:bg-gray-50"
        }`}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">Half-Day Winelands Tour</p>
            <p className="text-sm opacity-70">
              Perfect short wine experience
            </p>
          </div>

          <p className="font-bold">R3,500</p>
        </div>
      </button>

      {/* FULL DAY */}
      <button
        type="button"
        onClick={() => select("full-day")}
        className={`w-full text-left p-4 rounded-xl border transition
        ${
          selected === "full-day"
            ? "bg-black text-white border-black"
            : "bg-white hover:bg-gray-50"
        }`}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">Full-Day Winelands Tour</p>
            <p className="text-sm opacity-70">
              Complete wine estate experience
            </p>
          </div>

          <p className="font-bold">R6,000</p>
        </div>
      </button>

      {/* PRICE SUMMARY */}
      <div className="bg-gray-50 rounded-xl p-4 text-center">
        <p className="text-sm text-gray-500">
          Estimated Total
        </p>
        <p className="text-2xl font-bold">
          R{total.toLocaleString()}
        </p>
      </div>

      {/* Hidden field for server action */}
      <input type="hidden" name="tourType" value={selected} />
    </div>
  );
}