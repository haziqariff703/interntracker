"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import the Leaflet map with SSR disabled.
// Leaflet uses the `window` object which causes issues during Next.js SSR.
const MapClient = dynamic(() => import("./map-client"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[360px] md:h-[520px] bg-black border-[3px] border-white flex items-center justify-center font-mono text-white/50 text-sm uppercase tracking-widest">
      INITIALIZING SATELLITE FEED...
    </div>
  ),
});

interface HeatmapDataPoint {
  lat: number;
  lng: number;
  weight: number;
  label: string;
}

interface MapResponse {
  postings: HeatmapDataPoint[];
  applications: HeatmapDataPoint[];
}

export function MalaysiaHeatmap() {
  const [activeTab, setActiveTab] = useState<"postings" | "applications">(
    "postings",
  );
  const [data, setData] = useState<MapResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/public-map");
        if (!response.ok) throw new Error("Failed to fetch map data");
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const currentData = data ? data[activeTab] : [];

  return (
    <section className="px-6 lg:px-12 max-w-5xl mx-auto my-24 lg:my-32 flex flex-col gap-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-[3px] border-white pb-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">
            Malaysia Activity
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-white/60">
            Real-time geospatial clustering [ 30-Day Volume ]
          </p>
        </div>

        {/* Toggles */}
        <div className="flex bg-white p-[3px] rounded-none shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
          <button
            onClick={() => setActiveTab("postings")}
            className={`px-6 py-2 md:py-3 font-black uppercase text-xs md:text-sm tracking-widest transition-none ${
              activeTab === "postings"
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-neutral-200"
            }`}
          >
            Postings
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`px-6 py-2 md:py-3 font-black uppercase text-xs md:text-sm tracking-widest transition-none ${
              activeTab === "applications"
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-neutral-200"
            }`}
          >
            Applications
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full">
        {loading ? (
          <div className="w-full h-[360px] md:h-[520px] bg-black border-[3px] border-white flex items-center justify-center font-mono text-white/50 text-sm uppercase tracking-widest">
            CONNECTING TO DATABASE...
          </div>
        ) : error ? (
          <div className="w-full h-[360px] md:h-[520px] bg-black border-[3px] border-white flex flex-col items-center justify-center font-mono text-white/50 text-sm uppercase tracking-widest gap-2">
            <span className="text-red-500 font-bold">ERROR</span>
            <span>FAILED TO LOAD GEOSPATIAL DATA</span>
          </div>
        ) : (
          <MapClient data={currentData} />
        )}
      </div>
    </section>
  );
}
