"use client";

import React from "react";

const proofData = [
  {
    text: "[SECURED] Student in Selangor just landed a Shopee Interview",
    time: "2m ago",
  },
  {
    text: "[OFFER] Applied Science major signed with Grab (Data Role)",
    time: "15m ago",
  },
  {
    text: "[SCREENING] 12 students just moved to Interview phase at Petronas",
    time: "1h ago",
  },
  {
    text: "[SECURED] Computer Science junior accepted offer at Maxis",
    time: "3h ago",
  },
  {
    text: "[SECURED] Business intern secured placement at Maybank",
    time: "5h ago",
  },
  {
    text: "[OFFER] UI/UX Designer secured full-time conversion at Foodpanda",
    time: "Yesterday",
  },
];

export function WallOfProof() {
  return (
    <div className="border-[3px] border-white bg-black p-8 h-125 flex flex-col overflow-hidden relative group">
      <div className="absolute inset-0 bg-dotted opacity-5 pointer-events-none" />
      <div className="mb-8 border-b-[3px] border-white pb-4 flex justify-between items-center relative z-10">
        <h3 className="text-2xl font-black uppercase tracking-tighter">
          Wall of Proof
        </h3>
        <span className="text-xs font-mono px-2 py-1 bg-white text-black font-bold animate-pulse uppercase">
          Live Feed
        </span>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <div className="flex flex-col gap-4 animate-scroll-vertical h-max">
          {[...Array(2)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex flex-col gap-4">
              {proofData.map((item, i) => (
                <div
                  key={i}
                  className="border-[3px] border-white p-4 bg-black hover:bg-white hover:text-black transition-colors group/item"
                >
                  <p className="font-bold text-sm leading-tight mb-2 uppercase">
                    {item.text}
                  </p>
                  <div className="flex justify-between items-center opacity-50 text-[10px] font-mono group-hover/item:opacity-100 uppercase">
                    <span>Protocol Verified</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
