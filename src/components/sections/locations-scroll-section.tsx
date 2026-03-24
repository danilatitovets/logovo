"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CircleMarker, MapContainer, Polyline, TileLayer } from "react-leaflet";
import type { LatLngTuple, Map as LeafletMap } from "leaflet";
import { locationSpots } from "@/data/locations-scroll";

const CITY_CENTER: LatLngTuple = [53.9023, 27.5619];

export function LocationsScrollSection() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const [routePoints, setRoutePoints] = useState<LatLngTuple[]>([]);

  const activeSpot = locationSpots[activeIndex];
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const section = rootRef.current;
      if (!section) return;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top+=72 top",
        end: `+=${locationSpots.length * 500}`,
        scrub: 0.7,
        pin: true,
        onUpdate: (self) => {
          const idx = Math.min(
            locationSpots.length - 1,
            Math.round(self.progress * (locationSpots.length - 1)),
          );
          setActiveIndex(idx);
          setHoveredIndex(idx);
        },
      });

      return () => trigger.kill();
    });

    mm.add("(max-width: 1023px)", () => {
      const section = rootRef.current;
      if (!section) return;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 85%",
        end: "bottom 15%",
        scrub: 0.45,
        onUpdate: (self) => {
          const idx = Math.min(
            locationSpots.length - 1,
            Math.round(self.progress * (locationSpots.length - 1)),
          );
          setActiveIndex(idx);
          setHoveredIndex(idx);
        },
      });

      return () => trigger.kill();
    });

    mm.add("(max-width: 640px)", () => {
      setHoveredIndex(0);
      setActiveIndex(0);
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo([activeSpot.lat, activeSpot.lng], activeSpot.zoom, {
        animate: true,
        duration: 1.2,
      });
    }
  }, [activeSpot]);

  useEffect(() => {
    let cancelled = false;
    const fetchRoute = async () => {
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${activeSpot.lng},${activeSpot.lat};${CITY_CENTER[1]},${CITY_CENTER[0]}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        const data = await res.json();
        const coords = data?.routes?.[0]?.geometry?.coordinates as [number, number][] | undefined;
        if (!coords || cancelled) return;

        const line: LatLngTuple[] = coords.map(([lng, lat]) => [lat, lng]);
        setRoutePoints(line);
      } catch {
        if (!cancelled) {
          setRoutePoints([
            [activeSpot.lat, activeSpot.lng],
            CITY_CENTER,
          ]);
        }
      }
    };

    void fetchRoute();
    return () => {
      cancelled = true;
    };
  }, [activeSpot]);

  return (
    <section
      ref={rootRef}
      className="relative bg-white px-4 pb-6 pt-12 text-zinc-900 scroll-mt-24 lg:pb-6 lg:pt-14"
      data-header-theme="light"
    >
      <div className="mx-auto mt-[42px] max-w-6xl lg:mt-[58px]">
        <div className="mb-6 border-b border-zinc-200 pb-6 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-zinc-500">СЕТЬ LOGOVO</p>
          <h2 className="mt-2.5 text-3xl font-semibold tracking-[-0.02em] text-zinc-900 md:text-5xl">
            Наши локации
          </h2>
          <p className="mt-2.5 text-lg font-normal tracking-[-0.01em] text-zinc-700 md:text-2xl">
            4 удобные точки шиномонтажа в городе
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8">
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-3 md:p-4">
            <div className="relative h-[280px] overflow-hidden rounded-2xl bg-zinc-950 md:h-[340px] lg:h-[380px]">
              <div className="absolute left-3 top-3 z-500 w-[300px] rounded-2xl border border-zinc-300/50 bg-white/90 p-3.5 text-zinc-900 shadow-[0_10px_24px_rgba(9,9,11,0.16)] backdrop-blur-xl md:w-[310px] md:p-4">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-800">
                    Маршруты LOGOVO
                  </p>
                  <span className="shrink-0 rounded-full border border-zinc-300 bg-white px-2.5 py-1 text-[11px] font-bold text-zinc-800">
                    4 точки
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {locationSpots.map((spot, idx) => (
                    <button
                      key={`chip-${spot.id}`}
                      type="button"
                      onClick={() => {
                        setActiveIndex(idx);
                        setHoveredIndex(idx);
                      }}
                      className={[
                        "flex items-center gap-2.5 rounded-xl border px-3 py-2 text-left text-[13px] font-semibold leading-snug tracking-tight transition-colors",
                        idx === activeIndex
                          ? "border-amber-400 bg-amber-50 text-zinc-900"
                          : "border-zinc-300 bg-white text-zinc-800 hover:border-zinc-500 hover:text-zinc-950",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "h-2 w-2 shrink-0 rounded-full",
                          idx === activeIndex ? "bg-amber-500" : "bg-zinc-400",
                        ].join(" ")}
                      />
                      {spot.address}
                    </button>
                  ))}
                </div>
              </div>

              <MapContainer
                ref={mapRef}
                center={CITY_CENTER}
                zoom={11}
                minZoom={10}
                maxZoom={16}
                zoomControl={false}
                scrollWheelZoom={false}
                className="h-full w-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {routePoints.length > 1 ? (
                  <Polyline positions={routePoints} pathOptions={{ color: "#facc15", weight: 5, opacity: 0.9 }} />
                ) : null}

                {locationSpots.map((spot, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <CircleMarker
                      key={spot.id}
                      center={[spot.lat, spot.lng]}
                      radius={isActive ? 10 : 7}
                      pathOptions={{
                        color: isActive ? "#fde047" : "#ffffff",
                        fillColor: isActive ? "#facc15" : "#18181b",
                        fillOpacity: 0.95,
                        weight: isActive ? 3 : 2,
                      }}
                      eventHandlers={{
                        mouseover: () => setHoveredIndex(idx),
                        click: () => {
                          setActiveIndex(idx);
                          setHoveredIndex(idx);
                        },
                      }}
                    />
                  );
                })}
              </MapContainer>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
