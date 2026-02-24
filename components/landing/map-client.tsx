"use client";

import React, { useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
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
    <div className="w-full h-full bg-white relative">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [109.5, 4.3], // Centered between Peninsula and Sabah/Sarawak
          scale: 1800, // Zoomed in to Malaysia
        }}
        className="w-full h-full"
      >
        <ZoomableGroup center={[109.5, 4.3]} zoom={1} maxZoom={1}>
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
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#EF4444", outline: "none" }, // Red hover
                      pressed: { fill: "#EF4444", outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
