"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { LocationsMinskLocatorMap } from "@/components/sections/locations-minsk-locator-map";
import { OFFICE_ARCS, OFFICE_POINTS, type OfficePoint } from "@/data/locations-offices";
import { cn } from "@/lib/utils";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

const COUNTRIES_GEOJSON_URL = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/** Маршрут в Яндекс.Картах: с геолокацией — от вас до точки (lat,lng по докам Яндекса). */
function buildYandexRouteUrl(destLat: number, destLng: number, from: { lat: number; lng: number } | null) {
  if (from) {
    return `https://yandex.by/maps/?rtext=${from.lat},${from.lng}~${destLat},${destLng}&rtt=auto`;
  }
  return `https://yandex.by/maps/?pt=${destLng},${destLat},pm2rdm&z=17&l=map`;
}

export function LocationsPlanetSection() {
  const globeRef = useRef<any>(null);
  const globeWrapRef = useRef<HTMLDivElement | null>(null);
  const markerClickRef = useRef<(idx: number) => void>(() => {});
  const userLocationRef = useRef<{ lat: number; lng: number } | null>(null);

  const [polygons, setPolygons] = useState<any[]>([]);
  const [globeSize, setGlobeSize] = useState(560);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoMessage, setGeoMessage] = useState<string | null>(null);

  const active = activeIndex !== null ? OFFICE_POINTS[activeIndex] : null;

  const nearestIndex = useMemo(() => {
    if (!userLocation) return null;
    let bestI = 0;
    let bestD = Infinity;
    OFFICE_POINTS.forEach((p, i) => {
      const d = haversineKm(userLocation.lat, userLocation.lng, p.lat, p.lng);
      if (d < bestD) {
        bestD = d;
        bestI = i;
      }
    });
    return bestI;
  }, [userLocation]);

  const distancesKm = useMemo(() => {
    if (!userLocation) return null;
    return OFFICE_POINTS.map((p) => haversineKm(userLocation.lat, userLocation.lng, p.lat, p.lng));
  }, [userLocation]);

  useEffect(() => {
    userLocationRef.current = userLocation;
  }, [userLocation]);

  const openYandexRoute = useCallback((idx: number) => {
    const p = OFFICE_POINTS[idx];
    if (!p) return;
    const url = buildYandexRouteUrl(p.lat, p.lng, userLocationRef.current);
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  useLayoutEffect(() => {
    markerClickRef.current = (idx: number) => {
      setActiveIndex(idx);
      openYandexRoute(idx);
    };
  }, [openYandexRoute]);

  const flyGlobeToOffice = useCallback((idx: number) => {
    const g = globeRef.current;
    if (!g) return;
    const p = OFFICE_POINTS[idx];
    if (!p) return;
    const controls = g.controls?.();
    if (controls) {
      controls.autoRotate = false;
    }
    g.pointOfView({ lat: p.markerLat, lng: p.markerLng, altitude: 0.12 }, 1600);
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    flyGlobeToOffice(activeIndex);
  }, [activeIndex, flyGlobeToOffice]);

  const requestGeolocation = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setGeoMessage("Геолокация не поддерживается в этом браузере.");
      return;
    }
    setGeoLoading(true);
    setGeoMessage(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoLoading(false);
      },
      () => {
        setGeoLoading(false);
        setGeoMessage("Не удалось получить координаты. Разрешите доступ к геолокации в настройках браузера.");
      },
      { enableHighAccuracy: true, timeout: 14000, maximumAge: 60_000 },
    );
  }, []);

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

  const getMapLinks = (loc: OfficePoint) => {
    const { lat, lng } = loc;
    const from = userLocation;
    const yandex = buildYandexRouteUrl(lat, lng, from);
    return {
      google: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.fullAddress)}`,
      yandex,
      gis: `https://2gis.by/minsk/search/${lat}%2C${lng}`,
    };
  };

  const selectOfficeOnly = (idx: number) => {
    setActiveIndex(idx);
  };

  return (
    <section className="min-w-0 overflow-x-hidden bg-black text-zinc-100" data-header-theme="dark">
      <div className="mx-auto w-full min-w-0 max-w-6xl px-3 py-12 sm:px-4 md:px-6 md:py-18">
        <div className="grid min-w-0 gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:items-center">
          <div className="min-w-0 max-w-md">
            <p className="text-[11px] tracking-[0.24em] text-zinc-500 uppercase">[ OFFICES ]</p>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
              Сеть LOGOVO в Минске
            </h1>
            <p className="mt-6 text-[15px] leading-relaxed text-zinc-400">
              На глобусе — четыре филиала. Нажмите номер в таблице — камера приблизит Беларусь и Минск к выбранной
              точке. Клик по оранжевой метке на глобусе или на карте ниже открывает маршрут в Яндекс.Картах (если
              включите геолокацию — маршрут от вас до адреса).
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
              arcsData={OFFICE_ARCS}
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
                dot.style.width = "22px";
                dot.style.height = "22px";
                dot.style.borderRadius = "6px";
                dot.style.border = "1px solid #ffb27a";
                dot.style.background = "#ff7a00";
                dot.style.boxShadow = "0 0 0 7px rgba(255, 122, 0, 0.14)";
                dot.style.color = "#18181b";
                dot.style.fontSize = "11px";
                dot.style.fontWeight = "800";

                const label = document.createElement("span");
                label.className = "office-label";
                label.textContent = "Маршрут в Яндексе";
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
                el.addEventListener("click", (ev) => {
                  ev.stopPropagation();
                  const nextIndex = OFFICE_POINTS.findIndex((item) => item.id === point.id);
                  if (nextIndex >= 0) markerClickRef.current(nextIndex);
                });
                return el;
              }}
            />
          </div>
        </div>

        <div className="mt-10 md:mt-12">
          <LocationsMinskLocatorMap
            offices={OFFICE_POINTS}
            activeIndex={activeIndex}
            userPos={userLocation}
            nearestIndex={nearestIndex}
            onOfficeActivate={(idx) => markerClickRef.current(idx)}
          />
        </div>

        <div className="mt-10 md:mt-12">
          <h3 className="mb-1 flex flex-wrap items-center gap-3 font-display text-sm font-bold tracking-[0.14em] text-white uppercase">
            <span
              className="inline-block h-2 w-2 shrink-0 rounded-sm bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.45)]"
              aria-hidden
            />
            Наш шиномонтаж
          </h3>
          <p className="mb-4 max-w-2xl text-[14px] leading-relaxed text-zinc-500 md:text-[15px]">
            Номер в кружке — как на глобусе и на карте Минска. Включите геолокацию, чтобы увидеть расстояние до каждого
            филиала и подсказку «ближайший».
          </p>

          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={requestGeolocation}
              disabled={geoLoading}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/10 px-5 text-[13px] font-bold text-amber-200 transition hover:border-amber-400/60 hover:bg-amber-400/15 disabled:opacity-50"
            >
              {geoLoading ? "Определяем…" : userLocation ? "Обновить моё местоположение" : "Моё местоположение — расстояния"}
            </button>
            {userLocation ? (
              <span className="text-[13px] text-zinc-500">
                Ближайший пункт:{" "}
                <strong className="text-zinc-200">
                  №{nearestIndex !== null ? nearestIndex + 1 : "—"} — {nearestIndex !== null ? OFFICE_POINTS[nearestIndex]?.city : ""}
                </strong>
              </span>
            ) : null}
          </div>
          {geoMessage ? <p className="mb-4 text-[13px] text-red-400/90">{geoMessage}</p> : null}
        </div>

        <div className="overflow-hidden rounded-xl border border-white/9 bg-[#070708]/90 shadow-[0_12px_48px_rgba(0,0,0,0.5)] backdrop-blur-lg">
          <table className="w-full max-w-full table-fixed border-collapse text-left leading-snug">
            <colgroup>
              <col className="w-[48px] sm:w-[56px]" />
              <col />
              <col className="w-[26%] md:w-[22%]" />
              <col className="w-[18%]" />
              <col className="w-[92px] sm:w-[108px] md:w-[128px]" />
            </colgroup>
            <thead>
              <tr className="border-b border-white/10 bg-zinc-950/90">
                <th
                  scope="col"
                  className="px-1.5 py-3 text-center text-[9px] font-semibold tracking-[0.12em] text-zinc-500 uppercase sm:px-2 sm:text-[10px]"
                >
                  №
                </th>
                <th
                  scope="col"
                  className="min-w-0 px-2 py-3 text-left text-[9px] font-semibold tracking-[0.12em] text-yellow-400/95 uppercase sm:px-3 sm:text-[10px]"
                >
                  Адрес
                </th>
                <th
                  scope="col"
                  className="px-1.5 py-3 text-left text-[9px] font-semibold tracking-[0.12em] text-zinc-500 uppercase sm:px-3 sm:text-[10px]"
                >
                  Режим
                </th>
                <th
                  scope="col"
                  className="px-1.5 py-3 text-left text-[9px] font-semibold tracking-[0.12em] text-zinc-500 uppercase sm:px-3 sm:text-[10px]"
                >
                  До вас
                </th>
                <th
                  scope="col"
                  className="px-1.5 py-3 text-right text-[9px] font-semibold tracking-[0.12em] text-zinc-500 uppercase sm:px-3 sm:text-[10px]"
                >
                  Карты
                </th>
              </tr>
            </thead>
            <tbody>
              {OFFICE_POINTS.map((loc, idx) => {
                const links = getMapLinks(loc);
                const dist = distancesKm?.[idx];
                return (
                  <tr
                    key={`row-${loc.id}`}
                    className={cn(
                      "border-b border-white/5 transition-colors last:border-b-0",
                      idx % 2 === 1 && idx !== activeIndex ? "bg-white/2" : "",
                      idx === activeIndex
                        ? "bg-amber-400/[0.07] ring-1 ring-inset ring-amber-400/25"
                        : "hover:bg-white/4",
                      nearestIndex === idx && userLocation ? "ring-1 ring-inset ring-emerald-500/30" : "",
                    )}
                  >
                    <td className="align-middle px-1.5 py-3 text-center sm:px-2">
                      <button
                        type="button"
                        onClick={() => selectOfficeOnly(idx)}
                        className={cn(
                          "inline-flex size-8 items-center justify-center rounded-md border text-[11px] font-bold tabular-nums transition sm:size-9 sm:text-[12px] md:size-10 md:text-[13px]",
                          idx === activeIndex
                            ? "border-yellow-400/60 bg-yellow-400/15 text-yellow-300 shadow-[0_0_0_1px_rgba(250,204,21,0.2)_inset]"
                            : "border-white/15 text-zinc-400 hover:border-white/30 hover:text-zinc-200",
                        )}
                      >
                        {idx + 1}
                      </button>
                    </td>
                    <td className="min-w-0 align-middle px-2 py-3 sm:px-3">
                      <div className="flex min-w-0 flex-col gap-1">
                        <span className="text-pretty wrap-break-word text-[14px] font-bold leading-snug text-yellow-400/95 sm:text-[16px] md:text-lg lg:text-xl">
                          {loc.city}
                        </span>
                        {nearestIndex === idx && userLocation ? (
                          <span className="inline-flex w-fit items-center rounded-md border border-emerald-500/35 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-emerald-200">
                            Ближайший к вам
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td className="min-w-0 align-middle px-1.5 py-3 sm:px-3">
                      <span
                        className={cn(
                          "inline-flex max-w-full items-center rounded-md border px-1.5 py-1 text-[9px] font-semibold leading-tight tracking-wide uppercase sm:px-2 sm:text-[11px] md:text-xs",
                          loc.is24h
                            ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-200/95"
                            : "border-white/10 bg-white/4 text-zinc-400",
                        )}
                      >
                        {loc.coords}
                      </span>
                    </td>
                    <td className="min-w-0 align-middle px-1.5 py-3 text-[12px] font-semibold tabular-nums text-zinc-300 sm:px-3 sm:text-[14px] md:text-[15px]">
                      {dist !== undefined ? (
                        <>
                          {dist < 1 ? `${Math.round(dist * 1000)} м` : `${dist.toFixed(1)} км`}
                        </>
                      ) : (
                        <span className="text-zinc-600">—</span>
                      )}
                    </td>
                    <td className="align-middle px-1 py-3 text-right sm:px-2 md:px-3">
                      <div className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
                        <a
                          href={links.google}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Открыть ${loc.city} в Google Maps`}
                          title="Google Maps"
                          className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-bold leading-none tracking-tight text-zinc-950 shadow-[0_1px_0_rgba(255,255,255,0.5)_inset] transition hover:bg-zinc-100 hover:shadow-md sm:size-9 sm:text-[11px] md:size-10 md:text-[12px]"
                        >
                          G
                        </a>
                        <a
                          href={links.yandex}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={
                            userLocation
                              ? `Маршрут до ${loc.city} в Яндекс Картах`
                              : `Открыть ${loc.city} в Яндекс Картах`
                          }
                          title={userLocation ? "Яндекс: маршрут от вас" : "Яндекс Карты"}
                          className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-bold leading-none tracking-tight text-zinc-950 shadow-[0_1px_0_rgba(255,255,255,0.5)_inset] transition hover:bg-zinc-100 hover:shadow-md sm:size-9 sm:text-[11px] md:size-10 md:text-[12px]"
                        >
                          Я
                        </a>
                        <a
                          href={links.gis}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Открыть ${loc.city} в 2ГИС`}
                          title="2ГИС"
                          className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white px-0.5 text-[6px] font-extrabold leading-none tracking-tight text-zinc-950 shadow-[0_1px_0_rgba(255,255,255,0.5)_inset] transition hover:bg-zinc-100 hover:shadow-md sm:size-9 sm:text-[7px] md:size-10 md:text-[8px]"
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
