"use client";

import { IntelligenceDashboard } from "@/components/intelligence/intelligence-dashboard";
import { Navbar } from "@/components/layout/navbar";

export default function IntelligencePage() {
  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-12 pt-24 md:pt-32">
      <Navbar />
      <div className="flex flex-col gap-4 mb-4">
        <div className="inline-block px-4 py-2 border-[3px] border-black dark:border-white bg-black dark:bg-white text-white dark:text-black font-black uppercase text-xs tracking-widest self-start">
          System Overview
        </div>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
          Realtime Intelligence
        </h1>
        <p className="text-xl font-bold text-black/70 dark:text-white/70">
          Strategic metrics based on aggregate platform data and your active
          pipeline.
        </p>
      </div>

      <IntelligenceDashboard />
    </div>
  );
}
