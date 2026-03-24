"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

const PARTICLES = [
  { x: -14, y: -10, d: 0, s: 2, dur: 2.3 },
  { x: -3, y: -16, d: 70, s: 2.2, dur: 2.8 },
  { x: 9, y: -12, d: 110, s: 1.8, dur: 2.1 },
  { x: 14, y: -1, d: 40, s: 1.9, dur: 2.6 },
  { x: 8, y: 12, d: 90, s: 2.1, dur: 2.4 },
  { x: -9, y: 11, d: 120, s: 1.7, dur: 2.9 },
] as const;

const ICON_SKY = [
  { x: 20, y: 23, s: 1.4, o: 0.85, d: 0, dur: 2.2 },
  { x: 32, y: 45, s: 1.2, o: 0.7, d: 60, dur: 2.8 },
  { x: 46, y: 26, s: 1.8, o: 0.95, d: 90, dur: 2.4 },
  { x: 58, y: 56, s: 1.3, o: 0.65, d: 30, dur: 3.1 },
  { x: 72, y: 34, s: 1.5, o: 0.8, d: 120, dur: 2.5 },
  { x: 40, y: 68, s: 1.1, o: 0.6, d: 150, dur: 2.9 },
] as const;

type BookingConsentCheckboxProps = {
  className?: string;
};

export function BookingConsentCheckbox({ className }: BookingConsentCheckboxProps) {
  const id = useId();
  const [checked, setChecked] = useState(false);

  return (
    <label htmlFor={id} className={cn("flex cursor-pointer items-start gap-3 text-[12px] leading-snug text-zinc-400", className)}>
      <input
        id={id}
        name="agree"
        type="checkbox"
        required
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="sr-only"
      />

      <span
        className={cn(
          "relative mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-[background-color] duration-200",
          checked ? "bg-white/18" : "bg-white/12",
        )}
        aria-hidden
      >
        <span
          className={cn(
            "absolute text-2xl leading-none text-zinc-200 transition duration-200",
            checked ? "scale-50 opacity-0" : "scale-100 opacity-100",
          )}
        >
          +
        </span>

        {PARTICLES.map((p, pIdx) => (
          <span
            key={`consent-star-${pIdx}`}
            className={cn(
              "hero-star-twinkle absolute rounded-full bg-amber-200 shadow-[0_0_7px_rgba(255,255,255,0.45)] transition-all duration-300",
              checked ? "opacity-100" : "opacity-0",
            )}
            style={{
              width: `${p.s}px`,
              height: `${p.s}px`,
              ["--star-op" as string]: 0.95,
              animationDuration: `${p.dur}s`,
              transform: checked ? `translate(${p.x}px, ${p.y}px)` : "translate(0px, 0px)",
              transitionDelay: `${p.d}ms`,
            }}
          />
        ))}

        {ICON_SKY.map((s, sIdx) => (
          <span
            key={`consent-sky-${sIdx}`}
            className={cn(
              "hero-star-twinkle pointer-events-none absolute rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.35)] transition-all duration-300",
              checked ? "opacity-100" : "opacity-0",
            )}
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.s}px`,
              height: `${s.s}px`,
              ["--star-op" as string]: s.o,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.d}ms`,
              transform: checked ? "scale(1)" : "scale(0.4)",
            }}
          />
        ))}

        <span
          className={cn(
            "pointer-events-none absolute inset-1 rounded-full transition duration-300",
            checked
              ? "bg-[radial-gradient(circle_at_28%_30%,rgba(255,255,255,0.2),transparent_40%),radial-gradient(circle_at_72%_65%,rgba(56,189,248,0.25),transparent_35%),radial-gradient(circle_at_54%_24%,rgba(250,204,21,0.22),transparent_32%),linear-gradient(160deg,rgba(3,7,18,0.95)_0%,rgba(9,9,11,0.9)_100%)] opacity-100"
              : "opacity-0",
          )}
        />

        <span
          className={cn(
            "relative z-1 text-[1.35rem] font-light leading-none text-zinc-100 transition duration-200",
            checked ? "scale-100 opacity-100" : "scale-50 opacity-0",
          )}
        >
          ✓
        </span>
      </span>

      <span className="min-w-0 pt-0.5">
        Согласен с обработкой данных для связи по заявке. Политика и условия — на странице{" "}
        <Link href="/contacts" className="text-amber-400/90 underline-offset-2 hover:underline">
          Контакты
        </Link>
        .
      </span>
    </label>
  );
}
