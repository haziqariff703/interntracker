"use client";

import React, { useMemo, useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import malaysiaTopoJSON from "./malaysia-states.json";

interface HeatmapDataPoint {
  lat: number;
  lng: number;
  weight: number;
  label: string; // state name e.g., "selangor"
}

interface MapClientProps {
  data: HeatmapDataPoint[];
  stateColors: Record<string, string>;
}

export default function MapClient({ data, stateColors }: MapClientProps) {
  const [scale, setScale] = useState(1800);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    stateName: string;
    weight: number;
  } | null>(null);
  const [selectedState, setSelectedState] = useState<{
    stateName: string;
    weight: number;
  } | null>(null);

  useEffect(() => {
    const handleResize = () => {
      // On mobile adjust to fit horizontally by default
      if (window.innerWidth < 768) {
        setScale(1850);
      } else {
        setScale(1800);
      }
    };

    // Initialize
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Create a map of state names to weights
  const stateWeights = useMemo(() => {
    const weights: Record<string, number> = {};
    data.forEach((d) => {
      const stateName = d.label.toLowerCase();
      // Aggregate weights per state if multiple points exist
      weights[stateName] = (weights[stateName] || 0) + d.weight;
    });
    return weights;
  }, [data]);

  return (
    <div className="w-full h-full bg-white relative overflow-hidden touching-none">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [109.5, 4.3], // Centered between Peninsula and Sabah/Sarawak
          scale: scale,
        }}
        width={800}
        height={window.innerWidth < 768 ? 400 : 400}
        viewBox={window.innerWidth < 768 ? "0 0 800 400" : "0 0 800 400"}
        className="w-full h-full outline-none"
      >
        <Geographies geography={malaysiaTopoJSON}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = (geo.properties.name || "").toLowerCase();
              const weight = stateWeights[stateName] || 0;

              // If it has volume, give it the explicit state categorical color. Else brutalist light-gray empty state.
              const fillCol =
                weight > 0 ? stateColors[stateName] || "#000" : "#F3F4F6";

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fillCol}
                  stroke="#000000"
                  strokeWidth={1}
                  onMouseEnter={(e: React.MouseEvent<SVGPathElement>) => {
                    setTooltip({
                      x: e.clientX,
                      y: e.clientY,
                      stateName: geo.properties.name,
                      weight: weight,
                    });
                  }}
                  onMouseMove={(e: React.MouseEvent<SVGPathElement>) => {
                    setTooltip((prev) =>
                      prev ? { ...prev, x: e.clientX, y: e.clientY } : prev,
                    );
                  }}
                  onMouseLeave={() => {
                    setTooltip(null);
                  }}
                  onClick={() => {
                    setSelectedState({
                      stateName: geo.properties.name,
                      weight: weight,
                    });
                  }}
                  style={{
                    default: { outline: "none", cursor: "pointer" },
                    hover: {
                      fill: "#EF4444",
                      outline: "none",
                      cursor: "pointer",
                    }, // Red hover
                    pressed: { fill: "#EF4444", outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Tooltip Overlay */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none bg-black text-white border-[3px] border-white p-3 shadow-[4px_4px_0px_rgba(255,255,255,1)]"
          style={{
            top: tooltip.y + 16,
            left: tooltip.x + 16,
          }}
        >
          <div className="font-black uppercase tracking-widest text-sm mb-1">
            {tooltip.stateName || "Unknown"}
          </div>
          <div className="font-mono text-xs text-white/70">
            TOTAL VOLUME:{" "}
            <span className="text-white font-bold">{tooltip.weight}</span>
          </div>
        </div>
      )}

      {/* Dialog Overlay */}
      {selectedState && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-black border-[3px] border-white p-6 max-w-sm w-full shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] flex flex-col gap-6 relative">
            <button
              onClick={() => setSelectedState(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border-[3px] border-white bg-black hover:bg-white hover:text-black transition-colors font-black text-white"
            >
              X
            </button>
            <div>
              <div className="text-white/50 text-xs font-black tracking-widest uppercase mb-2">
                REGION INSPECTION
              </div>
              <h2 className="text-3xl font-black uppercase text-white tracking-tighter leading-none mb-4">
                {selectedState.stateName || "Unknown"}
              </h2>
              <div className="flex flex-col gap-2 border-t-[3px] border-white pt-4">
                <div className="flex justify-between items-center text-sm font-mono uppercase text-white/80">
                  <span>DETECTED VOLUME</span>
                  <span className="font-black text-white text-lg">
                    {selectedState.weight}
                  </span>
                </div>
                {/* Visual meter bar just for aesthetics */}
                <div className="w-full h-3 border-[3px] border-white bg-black mt-2">
                  <div
                    className="h-full bg-white"
                    style={{
                      width: `${Math.min(
                        (selectedState.weight / 50) * 100, // naive max 50 for aesthetic
                        100,
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedState(null)}
              className="mt-4 w-full h-12 border-[3px] border-white bg-white text-black font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              ACKNOWLEDGE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
