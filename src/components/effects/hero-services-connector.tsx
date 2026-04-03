"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Секция услуг: жёлтый слой по горизонтальной линии */
export const SERVICES_BORDER_SPREAD_EVENT = "logovo:services-border-spread";
/** Сброс слоя при скролле вверх (до порога линии) */
export const SERVICES_BORDER_RESET_EVENT = "logovo:services-border-reset";

const SPREAD_AT = 0.96;
const RESET_BELOW = 0.93;

export function HeroServicesConnector() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathVRef = useRef<SVGPathElement | null>(null);
  const progressRef = useRef(0);
  const spreadDoneRef = useRef(false);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    const pathV = pathVRef.current;
    if (!svg || !pathV) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(svg, { opacity: 0 });
      return;
    }

    const updateGeometry = () => {
      const logo = document.querySelector<HTMLElement>("[data-hero-logo-anchor]");
      const servicesEl = document.getElementById("services");
      if (!logo || !servicesEl) return null;

      const a = logo.getBoundingClientRect();
      const sec = servicesEl.getBoundingClientRect();
      const cx = a.left + a.width / 2;
      const y1 = a.bottom - 4;
      const yEnd = sec.top + 0.5;
      pathV.setAttribute("d", `M ${cx} ${y1} L ${cx} ${yEnd}`);
      const lenV = pathV.getTotalLength();
      return { lenV };
    };

    const resetSpread = () => {
      if (!spreadDoneRef.current) return;
      spreadDoneRef.current = false;
      gsap.killTweensOf([pathV, svg]);
      pathV.style.removeProperty("stroke-dasharray");
      pathV.style.removeProperty("stroke-dashoffset");
      gsap.set(pathV, { opacity: 0.9 });
      gsap.set(svg, { opacity: 1 });
      window.dispatchEvent(new CustomEvent(SERVICES_BORDER_RESET_EVENT));
    };

    const runSpread = () => {
      if (spreadDoneRef.current) return;
      spreadDoneRef.current = true;
      window.dispatchEvent(new CustomEvent(SERVICES_BORDER_SPREAD_EVENT));
      gsap.to(pathV, { opacity: 0, duration: 0.4, ease: "power2.out" });
      gsap.to(svg, { opacity: 0, duration: 0.45, delay: 0.05 });
    };

    const applyDraw = (p: number) => {
      if (spreadDoneRef.current && p < RESET_BELOW) {
        resetSpread();
      }

      if (spreadDoneRef.current) return;

      const geom = updateGeometry();
      if (!geom) return;
      const { lenV } = geom;
      pathV.style.strokeDasharray = `${lenV}`;
      pathV.style.strokeDashoffset = `${lenV * (1 - Math.min(1, p))}`;

      if (p >= SPREAD_AT) {
        runSpread();
      }
    };

    if (!updateGeometry()) return;

    const st = ScrollTrigger.create({
      trigger: "[data-hero-root]",
      start: "top top",
      endTrigger: "#services",
      /** Выше % — линия и вспышка границы раньше, меньше скролла от лого */
      end: "top 88%",
      scrub: 0.55,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        applyDraw(self.progress);
      },
    });

    const onRefresh = () => {
      const p = progressRef.current;
      if (spreadDoneRef.current && p < RESET_BELOW) {
        resetSpread();
      }
      if (!spreadDoneRef.current) {
        applyDraw(p);
      } else {
        updateGeometry();
      }
    };
    ScrollTrigger.addEventListener("refresh", onRefresh);

    applyDraw(0);
    const refreshRaf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refreshRaf);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      st.kill();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none fixed inset-0 z-15 h-dvh w-full overflow-visible"
      aria-hidden
    >
      <path
        ref={pathVRef}
        fill="none"
        stroke="rgb(250, 204, 21)"
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={{ opacity: 0.9 }}
      />
    </svg>
  );
}
