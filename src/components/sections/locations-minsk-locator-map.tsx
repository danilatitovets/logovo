"use client";

import { useEffect, useMemo } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import type { OfficePoint } from "@/data/locations-offices";
import { MINSK_CENTER } from "@/data/locations-offices";

function FlyToActive({ activeIndex, offices }: { activeIndex: number | null; offices: OfficePoint[] }) {
  const map = useMap();
  useEffect(() => {
    if (activeIndex === null || !offices[activeIndex]) return;
    const p = offices[activeIndex];
    map.flyTo([p.lat, p.lng], 14, { duration: 1.1 });
  }, [activeIndex, map, offices]);
  return null;
}

function makeOfficeIcon(n: number, isActive: boolean, isNearest: boolean) {
  const border = isActive ? "#facc15" : isNearest ? "#4ade80" : "#ff7a00";
  const bg = isActive ? "#422006" : isNearest ? "#14532d" : "#18181b";
  const fg = isActive ? "#fef9c3" : "#fafafa";
  return L.divIcon({
    className: "locations-num-marker",
    html: `<div style="display:flex;width:30px;height:30px;border-radius:8px;align-items:center;justify-content:center;font-weight:800;font-size:13px;border:2px solid ${border};background:${bg};color:${fg};box-shadow:0 4px 14px rgba(0,0,0,0.45)">${n}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

type LocationsMinskLocatorMapProps = {
  offices: OfficePoint[];
  activeIndex: number | null;
  userPos: { lat: number; lng: number } | null;
  nearestIndex: number | null;
  onOfficeActivate: (index: number) => void;
};

export function LocationsMinskLocatorMap({
  offices,
  activeIndex,
  userPos,
  nearestIndex,
  onOfficeActivate,
}: LocationsMinskLocatorMapProps) {
  const icons = useMemo(
    () =>
      offices.map((_, idx) =>
        makeOfficeIcon(idx + 1, activeIndex === idx, nearestIndex === idx && userPos !== null),
      ),
    [offices, activeIndex, nearestIndex, userPos],
  );

  const userIcon = useMemo(
    () =>
      L.divIcon({
        className: "locations-user-marker",
        html:
          '<div style="width:14px;height:14px;border-radius:50%;background:#0ea5e9;border:3px solid #e0f2fe;box-shadow:0 2px 10px rgba(14,165,233,0.5)"></div>',
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      }),
    [],
  );

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
      <MapContainer
        center={MINSK_CENTER}
        zoom={11}
        minZoom={10}
        maxZoom={17}
        scrollWheelZoom
        className="z-0 h-[min(52vh,420px)] w-full min-h-[280px] md:h-[380px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FlyToActive activeIndex={activeIndex} offices={offices} />

        {userPos ? <Marker position={[userPos.lat, userPos.lng]} icon={userIcon} /> : null}

        {offices.map((p, idx) => (
          <Marker
            key={p.id}
            position={[p.lat, p.lng]}
            icon={icons[idx]}
            eventHandlers={{
              click: () => onOfficeActivate(idx),
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
