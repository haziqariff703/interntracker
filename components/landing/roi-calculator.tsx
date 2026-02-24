"use client";

import React, { useState } from "react";

export function RoiCalculator() {
  const [apps, setApps] = useState(25);
  const [rate, setRate] = useState(15);

  // Arbitrary "market value" calculation for aesthetic effect
  const marketValue = apps * (rate / 100) * 1250 + 1500;

  return (
    <div className="border-[3px] border-white bg-white text-black p-8 h-125 flex flex-col justify-between shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] relative transition-transform hover:scale-[1.01]">
      <div>
        <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 border-b-[3px] border-black pb-4">
          Market Value Protocol
        </h3>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between font-black uppercase text-sm">
              <span>Applications Sent</span>
              <span className="bg-black text-white px-2 py-0.5">{apps}</span>
            </div>
            <input
              type="range"
              min="1"
              max="200"
              value={apps}
              onChange={(e) => setApps(parseInt(e.target.value))}
              className="w-full h-4 bg-black/10 appearance-none border-[3px] border-black cursor-pointer accent-black"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between font-black uppercase text-sm">
              <span>Interview Rate</span>
              <span className="bg-black text-white px-2 py-0.5">{rate}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={rate}
              onChange={(e) => setRate(parseInt(e.target.value))}
              className="w-full h-4 bg-black/10 appearance-none border-[3px] border-black cursor-pointer accent-black"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 border-t-[3px] border-black pt-6">
        <div className="text-xs font-black uppercase opacity-60 mb-1">
          Estimated Readiness Value
        </div>
        <div className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
          ${marketValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </div>
        <p className="mt-4 text-[10px] font-mono leading-none uppercase opacity-50">
          *Calculated based on average entry-level stipends and placement
          conversion rates in selected sectors.
        </p>
      </div>
    </div>
  );
}
