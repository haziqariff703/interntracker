"use client";

import React from "react";

const tickerData = [
  { label: "FINTECH", value: "+12%", color: "text-green-500" },
  { label: "NEXT.JS", value: "HOT", color: "text-orange-500" },
  { label: "PYTHON", value: "400+ OPENINGS", color: "text-blue-500" },
  { label: "AI_ML", value: "URGENT", color: "text-purple-500" },
  { label: "CYBERSEC", value: "+18%", color: "text-red-500" },
  { label: "TYPESCRIPT", value: "STANDARD", color: "text-cyan-500" },
];

export function IndustryTicker() {
  return (
    <section className="border-y-[3px] border-white bg-black py-8 overflow-hidden relative">
      <div className="flex overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
        <div className="flex items-center gap-16 animate-marquee-fast whitespace-nowrap min-w-full">
          {[...Array(3)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex items-center gap-16 px-8">
              {tickerData.map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <span className="text-white/40 font-black text-xs md:text-sm tracking-widest uppercase">
                    {item.label}
                  </span>
                  <span
                    className={`text-xl md:text-3xl font-black ${item.color} uppercase tracking-tighter`}
                  >
                    {item.value}
                  </span>
                  <div className="w-2 h-2 bg-white/20 rounded-full" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
