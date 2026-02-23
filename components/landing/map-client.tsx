"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";

interface HeatmapDataPoint {
  lat: number;
  lng: number;
  weight: number;
  label: string;
}

interface MapClientProps {
  data: HeatmapDataPoint[];
}

function HeatmapLayer({ data }: { data: HeatmapDataPoint[] }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !data || data.length === 0) return;

    // Convert to Leaflet Heat data format: [lat, lng, intensity]
    const heatData = data.map(
      (point) => [point.lat, point.lng, point.weight] as L.HeatLatLngTuple,
    );

    // Provide some maximum intensity scaling based on our arbitrary weights
    const maxWeight = Math.max(...data.map((d) => d.weight));

    // Type assertion because leaflet.heat types can sometimes be missing from standard @types/leaflet
    const heat = (L as any)
      .heatLayer(heatData, {
        radius: 26,
        blur: 18,
        maxZoom: 8,
        max: maxWeight > 0 ? maxWeight : 1.0,
        gradient: { 0.4: "cyan", 0.6: "yellow", 1: "red" }, // Brutalist highly visible gradient
      })
      .addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [map, data]);

  return null;
}

export default function MapClient({ data }: MapClientProps) {
  // Center of Malaysia
  const center: [number, number] = [4.2105, 101.9758];

  // We enforce dark mode tiles via NEXT_PUBLIC_URL (or fallbacks to standard Stadia if missing)
  const TILE_URL =
    process.env.NEXT_PUBLIC_TILE_URL ||
    process.env.NEXT_PUBLIC_URL ||
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";

  return (
    <div className="w-full h-[360px] md:h-[520px] bg-black border-[3px] border-white relative z-0">
      <MapContainer
        center={center}
        zoom={6}
        minZoom={6}
        maxBounds={[
          [0.8, 99.5], // South-West bound (near Sumatra)
          [7.5, 119.5], // North-East bound (near Sabah)
        ]}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
        style={{ background: "#000" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={TILE_URL}
        />
        <HeatmapLayer data={data} />
      </MapContainer>
    </div>
  );
}
