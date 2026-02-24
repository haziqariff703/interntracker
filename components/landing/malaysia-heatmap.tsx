"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Dynamically import the Leaflet map with SSR disabled.
// Leaflet uses the `window` object which causes issues during Next.js SSR.
const MapClient = dynamic<{
  data: HeatmapDataPoint[];
  stateColors: Record<string, string>;
}>(() => import("./map-client"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-90 md:h-130 bg-black border-[3px] border-white flex items-center justify-center font-mono text-white/50 text-sm uppercase tracking-widest">
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

export const STATE_COLORS: Record<string, string> = {
  johor: "#FF1493", // Deep Pink
  kedah: "#FF4500", // Orange Red
  kelantan: "#FFD700", // Gold
  "kuala lumpur": "#00FF00", // Lime
  labuan: "#00FFFF", // Cyan
  melaka: "#0000FF", // Blue
  "negeri sembilan": "#8A2BE2", // BlueViolet
  pahang: "#FF00FF", // Magenta
  perak: "#1E90FF", // Dodger Blue
  perlis: "#FF69B4", // HotPink
  "pulau pinang": "#32CD32", // Lime Green
  putrajaya: "#00CED1", // Dark Turquoise
  sabah: "#FF6347", // Tomato
  sarawak: "#9400D3", // Dark Violet
  selangor: "#00FA9A", // Medium Spring Green
  terengganu: "#FF8C00", // Dark Orange
};

export function MalaysiaHeatmap() {
  const [activeTab, setActiveTab] = useState<"postings" | "applications">(
    "postings",
  );
  const [data, setData] = useState<MapResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedState, setSelectedState] = useState<string>("all");

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

  const currentData = useMemo(() => {
    if (!data) return [];
    let tabData = data[activeTab];

    // Filter down to the selected state if it's not "all"
    if (selectedState !== "all") {
      tabData = tabData.filter((d) => d.label.toLowerCase() === selectedState);
    }
    return tabData;
  }, [data, activeTab, selectedState]);

  // Extract all unique available states to populate the dropdown
  const availableStates = useMemo(() => {
    if (!data) return [];
    const statesSet = new Set<string>();
    data[activeTab].forEach((d) => {
      statesSet.add(d.label.toLowerCase());
    });
    return Array.from(statesSet).sort();
  }, [data, activeTab]);

  return (
    <section className="px-6 lg:px-12 max-w-7xl mx-auto my-24 lg:my-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        {/* Left Column: Info & Details Panel */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
              Intelligence Map
            </h2>
            <p className="font-mono text-sm uppercase tracking-widest text-white/80 leading-relaxed mb-4">
              Geospatial density of opportunities.
            </p>
            <p className="text-white/50 text-xs font-mono uppercase tracking-widest leading-loose">
              Review volume across Malaysia for the past 30 days. Toggle
              datasets to contrast market supply versus talent demand.
            </p>
          </div>

          {/* Details Card */}
          <div className="border-[3px] border-white p-6 bg-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] md:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] mb-2 mr-2 md:mb-0 md:mr-0 flex flex-col gap-6">
            {/* Filter Section */}
            <div>
              <h3 className="text-xl font-black uppercase tracking-tighter mb-4 border-b-[3px] border-white pb-4">
                Region Filter
              </h3>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="ALL MALAYSIA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ALL MALAYSIA</SelectItem>
                  {availableStates.map((stateName) => (
                    <SelectItem key={stateName} value={stateName}>
                      {stateName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="font-mono text-sm text-white/70 min-h-25">
              <p className="mb-4 text-xs">
                Hover over regions to inspect the map.
              </p>
              {loading ? (
                <span>Loading active regions...</span>
              ) : currentData.length > 0 ? (
                <div className="flex flex-col gap-3 mt-6">
                  <div className="flex justify-between items-center text-white font-bold mb-2 border-b border-white/20 pb-2">
                    <span className="uppercase text-xs tracking-widest">
                      {activeTab} LEADERBOARD
                    </span>
                  </div>
                  {currentData
                    .sort((a, b) => b.weight - a.weight)
                    .slice(0, 3)
                    .map((pt, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center pb-2"
                      >
                        <span className="uppercase text-xs truncate max-w-[70%]">
                          {i + 1}. {pt.label}
                        </span>
                        <span className="font-black text-white text-xs whitespace-nowrap">
                          {pt.weight} vol
                        </span>
                      </div>
                    ))}
                </div>
              ) : (
                <span className="text-xs">
                  No volume detected in the last 30 days.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: The Map Container */}
        <div className="lg:col-span-8 relative">
          <div className="w-full h-100 md:h-150 bg-black border-[3px] border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] md:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] mb-4 mr-4 md:mb-0 md:mr-0 relative overflow-hidden flex flex-col">
            {/* Top Bar inside the map (optional, matching image header label) */}
            <div className="absolute top-4 right-4 z-10 font-black uppercase tracking-widest text-xs bg-black text-white px-3 py-1 border-[3px] border-white drop-shadow-[4px_4px_0px_rgba(255,255,255,1)] pointer-events-none">
              MALAYSIA
            </div>

            {/* Sub-Legend / Info Box inside Map */}
            <div className="absolute bottom-4 left-4 z-10 bg-black border-[3px] border-white p-4 min-w-40 max-w-50 drop-shadow-[6px_6px_0px_rgba(255,255,255,1)] pointer-events-none hidden sm:block">
              <div className="font-black uppercase text-xs border-b-[3px] border-white pb-2 mb-2">
                Legend
              </div>
              <div className="flex flex-col gap-2 max-h-37.5 overflow-y-auto no-scrollbar pointer-events-auto">
                {currentData.length > 0 ? (
                  [...currentData]
                    .sort((a, b) => b.weight - a.weight)
                    .map((pt) => {
                      const color = STATE_COLORS[pt.label] || "#FFFFFF";
                      return (
                        <div key={pt.label} className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 border border-white shrink-0"
                            style={{ backgroundColor: color }}
                          />
                          <span
                            className="text-[10px] uppercase font-mono truncate max-w-30"
                            title={pt.label}
                          >
                            {pt.label}
                          </span>
                        </div>
                      );
                    })
                ) : (
                  <span className="text-[10px] uppercase font-mono text-white/50">
                    NO DATA
                  </span>
                )}
              </div>
            </div>

            {/* Toggle Buttons (Bottom Right) */}
            <div className="absolute bottom-4 right-4 z-9999 flex flex-row gap-4">
              <button
                onClick={() => setActiveTab("postings")}
                className={`w-12 h-12 flex items-center justify-center border-[3px] transition-none drop-shadow-[4px_4px_0px_rgba(255,255,255,1)] ${
                  activeTab === "postings"
                    ? "bg-white text-black border-white"
                    : "bg-black text-white border-white hover:bg-neutral-800"
                }`}
                aria-label="View Postings"
                title="Postings"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </button>
              <button
                onClick={() => setActiveTab("applications")}
                className={`w-12 h-12 flex items-center justify-center border-[3px] transition-none drop-shadow-[4px_4px_0px_rgba(255,255,255,1)] ${
                  activeTab === "applications"
                    ? "bg-white text-black border-white"
                    : "bg-black text-white border-white hover:bg-neutral-800"
                }`}
                aria-label="View Applications"
                title="Applications"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </button>
            </div>

            {/* Actual Map */}
            <div className="flex-1 w-full relative z-0">
              {loading ? (
                <div className="w-full h-full flex items-center justify-center font-mono text-white/50 text-sm uppercase tracking-widest">
                  CONNECTING TO DATABASE...
                </div>
              ) : error ? (
                <div className="w-full h-full flex flex-col items-center justify-center font-mono text-white/50 text-sm uppercase tracking-widest gap-2">
                  <span className="text-red-500 font-bold">ERROR</span>
                  <span>FAILED TO LOAD GEOSPATIAL DATA</span>
                </div>
              ) : (
                <MapClient data={currentData} stateColors={STATE_COLORS} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
