"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

type OfficePoint = {
  id: string;
  city: string;
  lat: number;
  lng: number;
  coords: string;
  is24h?: boolean;
  markerLat: number;
  markerLng: number;
};

const OFFICE_POINTS: OfficePoint[] = [
  {
    id: "lesh",
    city: "Лещинского 2/1",
    lat: 53.9096,
    lng: 27.4311,
    coords: "КРУГЛОСУТОЧНО",
    is24h: true,
    markerLat: 53.935,
    markerLng: 27.37,
  },
  {
    id: "logo",
    city: "Логойский тракт 46",
    lat: 53.9535,
    lng: 27.6167,
    coords: "КРУГЛОСУТОЧНО",
    is24h: true,
    markerLat: 53.978,
    markerLng: 27.67,
  },
  {
    id: "gurs",
    city: "Гурского 34",
    lat: 53.8743,
    lng: 27.4772,
    coords: "с 9:00 до 21:00",
    is24h: false,
    markerLat: 53.853,
    markerLng: 27.43,
  },
  {
    id: "dzer",
    city: "Дзержинского 132/3",
    lat: 53.8498,
    lng: 27.4735,
    coords: "с 9:00 до 21:00",
    is24h: false,
    markerLat: 53.826,
    markerLng: 27.535,
  },
];

const ARCS: Array<{ startLat: number; startLng: number; endLat: number; endLng: number }> = [
  { startLat: 53.935, startLng: 27.37, endLat: 53.978, endLng: 27.67 },
  { startLat: 53.978, startLng: 27.67, endLat: 53.853, endLng: 27.43 },
  { startLat: 53.853, startLng: 27.43, endLat: 53.826, endLng: 27.535 },
];

const COUNTRIES_GEOJSON_URL = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

export function LocationsPlanetSection() {
  const globeRef = useRef<any>(null);
  const globeWrapRef = useRef<HTMLDivElement | null>(null);
  const [polygons, setPolygons] = useState<any[]>([]);
  const [globeSize, setGlobeSize] = useState(560);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? OFFICE_POINTS[activeIndex] : null;

  useEffect(() => {
    let cancelled = false;
    const loadPolygons = async () => {
      try {
        const res = await fetch(COUNTRIES_GEOJSON_URL);
        const data = await res.json();
        if (!cancelled) setPolygons(data.features ?? []);
      } catch {
        if (!cancelled) setPolygons([]);
      }
    };
    void loadPolygons();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls?.();
    if (controls) {
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.minDistance = 260;
      controls.maxDistance = 260;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.33;
    }

    globeRef.current.pointOfView({ lat: 53.9, lng: 27.56, altitude: 0.95 }, 0);
  }, []);

  useEffect(() => {
    const el = globeWrapRef.current;
    if (!el) return;
    const resize = () => {
      const next = Math.max(280, Math.floor(el.clientWidth));
      setGlobeSize(next);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const htmlPoints = useMemo(() => OFFICE_POINTS.map((p, i) => ({ ...p, markerNo: i + 1 })), []);

  useEffect(() => {
    const root = globeWrapRef.current;
    if (!root) return;
    const markers = Array.from(root.querySelectorAll<HTMLElement>(".office-marker"));
    markers.forEach((marker) => {
      marker.classList.remove("is-active");
      const label = marker.querySelector<HTMLElement>(".office-label");
      const pointer = marker.querySelector<HTMLElement>(".office-pointer");
      if (label) label.style.opacity = "0";
      if (pointer) pointer.style.opacity = "0";
    });
    if (activeIndex === null) return;
    const activeId = OFFICE_POINTS[activeIndex]?.id;
    if (!activeId) return;
    const activeMarker = root.querySelector<HTMLElement>(`.office-marker[data-point-id="${activeId}"]`);
    if (!activeMarker) return;
    activeMarker.classList.add("is-active");
    const label = activeMarker.querySelector<HTMLElement>(".office-label");
    const pointer = activeMarker.querySelector<HTMLElement>(".office-pointer");
    if (label) label.style.opacity = "1";
    if (pointer) pointer.style.opacity = "1";
  }, [activeIndex]);

  const getMapLinks = (lat: number, lng: number) => {
    const q = `${lat},${lng}`;
    return {
      google: `https://www.google.com/maps/search/?api=1&query=${q}`,
      yandex: `https://yandex.by/maps/?ll=${lng}%2C${lat}&z=16&pt=${lng},${lat},pm2rdm`,
      gis: `https://2gis.by/minsk/search/${lat}%2C${lng}`,
    };
  };

  return (
    <section className="bg-black text-zinc-100" data-header-theme="dark">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-18">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:items-center">
          <div className="max-w-md">
            <p className="text-[11px] tracking-[0.24em] text-zinc-500 uppercase">[ OFFICES ]</p>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
              Сеть LOGOVO в Минске
            </h1>
            <p className="mt-6 text-[15px] leading-relaxed text-zinc-400">
              На глобусе отмечены наши шиномонтажи. Планета крутится постоянно, оранжевые точки показывают
              филиалы, а для круглосуточных адресов включается day/night режим.
            </p>
            <Link
              href="/contacts"
              className="mt-8 inline-flex h-10 items-center rounded-full border border-white/20 px-5 text-[11px] font-semibold tracking-[0.14em] text-zinc-200 uppercase transition hover:border-white/40 hover:text-white"
            >
              Все контакты
            </Link>
          </div>

          <div
            ref={globeWrapRef}
            className="relative mx-auto aspect-square w-full max-w-[620px] overflow-hidden rounded-2xl border border-white/5 bg-black"
          >
            <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_50%,transparent_52%,rgba(0,0,0,0.55)_100%)]" />
            <div className="pointer-events-none absolute inset-0 z-20 bg-linear-to-b from-black/40 via-transparent to-black/45" />

            <div
              className={cn(
                "pointer-events-none absolute inset-0 z-10 transition-opacity duration-500",
                active?.is24h ? "opacity-100" : "opacity-0",
              )}
            >
              <div className="absolute inset-0 bg-linear-to-r from-white/16 via-transparent to-black/42" />
            </div>

            <Globe
              ref={globeRef}
              width={globeSize}
              height={globeSize}
              backgroundColor="#000000"
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
              bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              showAtmosphere
              atmosphereColor="#7aa8ff"
              atmosphereAltitude={0.16}
              polygonsData={polygons}
              polygonCapColor={() => "rgba(0,0,0,0)"}
              polygonSideColor={() => "rgba(0,0,0,0)"}
              polygonStrokeColor={() => "rgba(255,255,255,0.25)"}
              polygonAltitude={0.0015}
              arcsData={ARCS}
              arcColor={() => "#ff7a00"}
              arcAltitude={0.08}
              arcStroke={0.9}
              arcDashLength={0.35}
              arcDashGap={1.1}
              arcDashAnimateTime={1800}
              htmlElementsData={htmlPoints}
              htmlLat={(d) => (d as OfficePoint).markerLat}
              htmlLng={(d) => (d as OfficePoint).markerLng}
              htmlElement={(d) => {
                const point = d as OfficePoint & { markerNo: number };
                const el = document.createElement("div");
                el.className = "office-marker";
                el.setAttribute("data-point-id", point.id);
                el.style.position = "relative";
                el.style.transform = "translate(-50%, -50%)";
                el.style.pointerEvents = "auto";
                el.style.cursor = "pointer";

                const dot = document.createElement("span");
                dot.className = "office-dot";
                dot.textContent = String(point.markerNo);
                dot.style.display = "inline-flex";
                dot.style.alignItems = "center";
                dot.style.justifyContent = "center";
                dot.style.width = "18px";
                dot.style.height = "18px";
                dot.style.borderRadius = "4px";
                dot.style.border = "1px solid #ffb27a";
                dot.style.background = "#ff7a00";
                dot.style.boxShadow = "0 0 0 7px rgba(255, 122, 0, 0.14)";
                dot.style.color = "#18181b";
                dot.style.fontSize = "10px";
                dot.style.fontWeight = "800";

                const label = document.createElement("span");
                label.className = "office-label";
                label.textContent = "Наш шиномонтаж";
                label.style.position = "absolute";
                label.style.left = "50%";
                label.style.top = "-10px";
                label.style.transform = "translate(-50%, -100%)";
                label.style.opacity = "0";
                label.style.whiteSpace = "nowrap";
                label.style.fontSize = "10px";
                label.style.fontWeight = "700";
                label.style.letterSpacing = "0.06em";
                label.style.textTransform = "uppercase";
                label.style.color = "#f4f4f5";
                label.style.pointerEvents = "none";

                const pointer = document.createElement("span");
                pointer.className = "office-pointer";
                pointer.style.position = "absolute";
                pointer.style.left = "50%";
                pointer.style.top = "-10px";
                pointer.style.width = "1px";
                pointer.style.height = "10px";
                pointer.style.background = "linear-gradient(to top, rgba(255, 122, 0, 0.8), rgba(255, 122, 0, 0))";
                pointer.style.transform = "translateX(-50%)";
                pointer.style.opacity = "0";
                pointer.style.pointerEvents = "none";

                el.append(dot, label, pointer);
                el.addEventListener("click", () => {
                  const nextIndex = OFFICE_POINTS.findIndex((item) => item.id === point.id);
                  if (nextIndex >= 0) setActiveIndex(nextIndex);
                });
                return el;
              }}
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mb-1 flex flex-wrap items-center gap-3 font-display text-sm font-bold tracking-[0.14em] text-white uppercase">
            <span className="inline-block h-2 w-2 shrink-0 rounded-sm bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.45)]" aria-hidden />
            Наш шиномонтаж
          </h3>
          <p className="mb-4 max-w-xl text-[13px] leading-relaxed text-zinc-500">
            Точки сети в Минске — выберите номер или откройте навигацию в картах.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/9 bg-[#070708]/90 shadow-[0_12px_48px_rgba(0,0,0,0.5)] backdrop-blur-lg">
          <table className="w-full min-w-[min(100%,680px)] table-fixed border-collapse text-left text-[13px] leading-snug">
            <colgroup>
              <col className="w-[52px]" />
              <col />
              <col className="min-w-[140px] w-[26%]" />
              <col className="w-[132px]" />
            </colgroup>
            <thead>
              <tr className="border-b border-white/10 bg-zinc-950/90">
                <th
                  scope="col"
                  className="px-2 py-2.5 text-center text-[10px] font-semibold tracking-[0.12em] text-zinc-500 uppercase"
                >
                  №
                </th>
                <th
                  scope="col"
                  className="px-3 py-2.5 text-left text-[10px] font-semibold tracking-[0.12em] text-yellow-400/95 uppercase"
                >
                  Адрес
                </th>
                <th
                  scope="col"
                  className="px-3 py-2.5 text-left text-[10px] font-semibold tracking-[0.12em] text-zinc-500 uppercase"
                >
                  Режим
                </th>
                <th
                  scope="col"
                  className="px-3 py-2.5 text-right text-[10px] font-semibold tracking-[0.12em] text-zinc-500 uppercase"
                >
                  Карты
                </th>
              </tr>
            </thead>
            <tbody>
              {OFFICE_POINTS.map((loc, idx) => {
                const links = getMapLinks(loc.lat, loc.lng);
                return (
                  <tr
                    key={`row-${loc.id}`}
                    className={cn(
                      "border-b border-white/5 transition-colors last:border-b-0",
                      idx % 2 === 1 && idx !== activeIndex ? "bg-white/2" : "",
                      idx === activeIndex
                        ? "bg-amber-400/[0.07] ring-1 ring-inset ring-amber-400/25"
                        : "hover:bg-white/4",
                    )}
                  >
                    <td className="align-middle px-2 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        className={cn(
                          "inline-flex size-7 items-center justify-center rounded-md border text-[11px] font-bold tabular-nums transition",
                          idx === activeIndex
                            ? "border-yellow-400/60 bg-yellow-400/15 text-yellow-300 shadow-[0_0_0_1px_rgba(250,204,21,0.2)_inset]"
                            : "border-white/15 text-zinc-400 hover:border-white/30 hover:text-zinc-200",
                        )}
                      >
                        {idx + 1}
                      </button>
                    </td>
                    <td className="align-middle px-3 py-2 font-semibold text-yellow-400/95">
                      {loc.city}
                    </td>
                    <td className="align-middle px-3 py-2">
                      <span
                        className={cn(
                          "inline-flex max-w-full items-center rounded-md border px-2 py-0.5 text-[11px] font-medium leading-tight tracking-wide uppercase",
                          loc.is24h
                            ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-200/95"
                            : "border-white/10 bg-white/4 text-zinc-400",
                        )}
                      >
                        {loc.coords}
                      </span>
                    </td>
                    <td className="align-middle px-3 py-2 text-right">
                      <div className="inline-flex items-center justify-end gap-2">
                        <a
                          href={links.google}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Открыть ${loc.city} в Google Maps`}
                          title="Google Maps"
                          className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-[12px] font-bold leading-none tracking-tight text-zinc-950 shadow-[0_1px_0_rgba(255,255,255,0.5)_inset] transition hover:bg-zinc-100 hover:shadow-md"
                        >
                          G
                        </a>
                        <a
                          href={links.yandex}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Открыть ${loc.city} в Яндекс Картах`}
                          title="Яндекс Карты"
                          className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-[12px] font-bold leading-none tracking-tight text-zinc-950 shadow-[0_1px_0_rgba(255,255,255,0.5)_inset] transition hover:bg-zinc-100 hover:shadow-md"
                        >
                          Я
                        </a>
                        <a
                          href={links.gis}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Открыть ${loc.city} в 2ГИС`}
                          title="2ГИС"
                          className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white px-0.5 text-[7.5px] font-extrabold leading-none tracking-tight text-zinc-950 shadow-[0_1px_0_rgba(255,255,255,0.5)_inset] transition hover:bg-zinc-100 hover:shadow-md sm:text-[8px]"
                        >
                          2GIS
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .office-marker.is-active :global(.office-dot) {
          box-shadow: 0 0 0 10px rgba(255, 122, 0, 0.2), 0 0 22px rgba(255, 122, 0, 0.35);
        }
      `}</style>
    </section>
  );
}
