import type { CSSProperties } from "react";
import { heroStarClassName, STAR_BACK, STAR_FLOW, STAR_MID } from "@/lib/hero-stars";

const NIGHT_SKY_LAYERS = {
  backgroundImage: `
    radial-gradient(ellipse 90% 45% at 50% -5%, rgba(255,255,255,0.015), transparent 52%),
    linear-gradient(180deg, #000000 0%, #000000 45%, #020202 78%, #030303 100%)
  `,
} as const;

/**
 * Статичное ночное небо как на hero: градиенты + слои звёзд (без GSAP).
 * Обёртка должна быть `relative` с контентом поверх (`z-10`).
 */
export function HeroNightSkyBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 min-h-full will-change-transform" style={{ transform: "translateZ(0)" }}>
        <div className="hero-night-sky absolute inset-x-0 top-0 min-h-full" style={NIGHT_SKY_LAYERS} />
        <div className="pointer-events-none absolute inset-x-0 top-[62%] h-[18%] bg-linear-to-b from-transparent via-[#030303]/80 to-[#050505]/95" />
        <div className="pointer-events-none absolute inset-x-0 top-[78%] h-[14%] bg-linear-to-b from-[#050505]/90 via-[#030303] to-black" />
        <div className="absolute inset-x-0 top-[88%] bottom-0 bg-black" />
      </div>

      <div className="absolute inset-x-0 top-0 h-[72%] min-h-[55vh]">
        {STAR_BACK.map((s, i) => (
          <span
            key={`support-b-${i}-${s.left.toFixed(3)}`}
            className={heroStarClassName(s)}
            style={
              {
                left: `${s.left * 100}%`,
                top: `${s.top * 100}%`,
                width: s.size,
                height: s.size,
                ["--star-op"]: s.opacity,
                animationDuration: `${s.dur}s`,
                animationDelay: `${s.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="absolute inset-x-0 top-[52%] h-[22%] min-h-[28vh]">
        {STAR_MID.map((s, i) => (
          <span
            key={`support-m-${i}-${s.left.toFixed(3)}`}
            className={heroStarClassName(s)}
            style={
              {
                left: `${s.left * 100}%`,
                top: `${s.top * 100}%`,
                width: s.size,
                height: s.size,
                ["--star-op"]: s.opacity,
                animationDuration: `${s.dur}s`,
                animationDelay: `${s.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="absolute inset-x-0 top-[62%] z-5 h-[18%] min-h-[24vh]">
        {STAR_FLOW.map((s, i) => (
          <span
            key={`support-f-${i}-${s.left.toFixed(3)}`}
            className={heroStarClassName(s)}
            style={
              {
                left: `${s.left * 100}%`,
                top: `${s.top * 100}%`,
                width: s.size,
                height: s.size,
                ["--star-op"]: s.opacity,
                animationDuration: `${s.dur}s`,
                animationDelay: `${s.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
