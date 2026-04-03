"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SERVICES_BORDER_RESET_EVENT,
  SERVICES_BORDER_SPREAD_EVENT,
} from "@/components/effects/hero-services-connector";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/** Только 3 услуги на лендинге — порядок совпадает с картинками */
const LANDING_SERVICE_SLICES = services.slice(0, 3);

const PLUS_PARTICLES = [
  { x: -14, y: -10, d: 0, s: 2, dur: 2.3 },
  { x: -3, y: -16, d: 70, s: 2.2, dur: 2.8 },
  { x: 9, y: -12, d: 110, s: 1.8, dur: 2.1 },
  { x: 14, y: -1, d: 40, s: 1.9, dur: 2.6 },
  { x: 8, y: 12, d: 90, s: 2.1, dur: 2.4 },
  { x: -9, y: 11, d: 120, s: 1.7, dur: 2.9 },
] as const;

const PLUS_SKY = [
  { x: 20, y: 23, s: 1.4, o: 0.85, d: 0, dur: 2.2 },
  { x: 32, y: 45, s: 1.2, o: 0.7, d: 60, dur: 2.8 },
  { x: 46, y: 26, s: 1.8, o: 0.95, d: 90, dur: 2.4 },
  { x: 58, y: 56, s: 1.3, o: 0.65, d: 30, dur: 3.1 },
  { x: 72, y: 34, s: 1.5, o: 0.8, d: 120, dur: 2.5 },
  { x: 40, y: 68, s: 1.1, o: 0.6, d: 150, dur: 2.9 },
] as const;

const SERVICE_QUOTE_SEGMENTS = [
  { text: "В Минске " },
  { text: "LOGOVO", marker: true },
  { text: " закрывает базовые задачи автомобиля: " },
  { text: "шиномонтаж", marker: true },
  { text: ", ремонт дисков и заправку кондиционеров — " },
  { text: "без сюрпризов", marker: true },
  {
    text: " и с понятным результатом. В Instagram шутят: «хейтеры скажут — это шиномонтаж». Мы добавляем к этому ",
  },
  { text: "аккуратность, скорость и честность", marker: true },
  {
    text: " — как в заголовке секции. Сеть на Гурского 34, Лещинского 2, пр-т Дзержинского 132/1 и Логойском тракте 46 — приезжайте ближе к дому.",
  },
] as const;

function renderServiceQuote(): ReactNode[] {
  return SERVICE_QUOTE_SEGMENTS.map((seg, i) => {
    if ("marker" in seg && seg.marker) {
      return (
        <span key={i} className="service-quote-accent-wrap" data-quote-accent>
          <span className="service-quote-accent-bar" aria-hidden />
          <span className="service-quote-accent-base">{seg.text}</span>
        </span>
      );
    }
    return <span key={i}>{seg.text}</span>;
  });
}

type FlipCardProps = {
  item: (typeof LANDING_SERVICE_SLICES)[number];
  index: number;
  imgSrc: string;
  isFlipped: boolean;
  onToggle: () => void;
  reduceMotion: boolean;
};

function ServiceFlipCard({ item, index, imgSrc, isFlipped, onToggle, reduceMotion }: FlipCardProps) {
  const backSummary = item.description.split("\n\n")[0] ?? item.excerpt;

  if (reduceMotion) {
    return (
      <div className="flex min-h-[min(100vw,420px)] w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-[0_14px_48px_rgba(0,0,0,0.38)] sm:min-h-[440px] md:aspect-4/5 md:min-h-0 md:max-h-[min(92vh,560px)]">
        {isFlipped ? (
          <div className="flex min-h-0 flex-1 flex-col bg-black p-6 md:p-7">
            <p className="min-h-0 flex-1 overflow-y-auto text-[15px] leading-relaxed text-zinc-200">{backSummary}</p>
            <div className="mt-6 flex shrink-0 items-center justify-between gap-4 pt-2">
              <p className="min-w-0 text-pretty text-base font-bold text-[#a3e635] md:text-lg">{item.title}</p>
              <button
                type="button"
                onClick={onToggle}
                className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/18 transition"
                aria-label="Закрыть"
              >
                <span className="text-2xl leading-none text-zinc-200" aria-hidden>
                  ×
                </span>
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex min-h-0 flex-1 items-center justify-center bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(255,255,255,0.025),transparent_65%),linear-gradient(180deg,#030306_0%,#09090b_100%)] px-4 py-6 sm:px-5">
              <Image
                src={imgSrc}
                alt=""
                width={280}
                height={220}
                sizes="(min-width:768px) 28vw, 90vw"
                className="h-auto w-full max-w-[min(100%,260px)] object-contain opacity-95 sm:max-w-[280px]"
              />
            </div>
            <div className="flex shrink-0 items-center justify-between gap-3 px-5 py-4 md:px-6">
              <h3 className="min-w-0 text-pretty text-base font-bold tracking-tight text-white md:text-lg">{item.title}</h3>
              <button
                type="button"
                onClick={onToggle}
                className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/12 transition"
                aria-label="Показать описание"
              >
                <span className="text-2xl text-zinc-200" aria-hidden>
                  +
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="group perspective-distant h-full w-full">
      <div
        className="relative min-h-[min(100vw,420px)] w-full sm:min-h-[440px] md:aspect-4/5 md:min-h-0 md:max-h-[min(92vh,560px)]"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Лицевая сторона */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-[0_14px_48px_rgba(0,0,0,0.38)] backface-hidden transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-white/12 group-hover:shadow-[0_20px_52px_rgba(0,0,0,0.48)]",
            isFlipped && "pointer-events-none",
          )}
        >
          <span
            className="pointer-events-none absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-white/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          />
          <div className="flex min-h-0 flex-1 items-center justify-center bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(255,255,255,0.025),transparent_65%),linear-gradient(180deg,#030306_0%,#09090b_100%)] px-4 py-6 sm:px-5">
            <Image
              src={imgSrc}
              alt=""
              width={280}
              height={220}
              sizes="(min-width:768px) 28vw, 90vw"
              className="h-auto w-full max-w-[min(100%,260px)] object-contain opacity-95 transition-transform duration-300 group-hover:scale-104 sm:max-w-[280px]"
            />
          </div>
          <div className="flex shrink-0 items-center justify-between gap-3 px-5 py-4 md:px-6">
            <h3 className="min-w-0 text-pretty text-base font-bold tracking-tight text-white md:text-lg">{item.title}</h3>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggle();
              }}
              className={cn(
                "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition duration-300",
                isFlipped ? "bg-white/18" : "bg-white/12 group-hover:bg-white/14",
              )}
              aria-label={isFlipped ? "Закрыть описание" : "Показать описание"}
            >
              <span
                className={cn(
                  "absolute text-2xl text-zinc-200 transition duration-200",
                  isFlipped ? "scale-50 opacity-0" : "scale-100 opacity-100",
                )}
                aria-hidden
              >
                +
              </span>
              {PLUS_PARTICLES.map((p, pIdx) => (
                <span
                  key={`svc-p-${index}-${pIdx}`}
                  className={cn(
                    "hero-star-twinkle absolute rounded-full bg-amber-200 shadow-[0_0_7px_rgba(255,255,255,0.45)] transition-all duration-300",
                    isFlipped ? "opacity-100" : "opacity-0",
                  )}
                  style={{
                    width: `${p.s}px`,
                    height: `${p.s}px`,
                    ["--star-op" as string]: 0.95,
                    animationDuration: `${p.dur}s`,
                    transform: isFlipped ? `translate(${p.x}px, ${p.y}px)` : "translate(0px, 0px)",
                    transitionDelay: `${p.d}ms`,
                  }}
                  aria-hidden
                />
              ))}
              {PLUS_SKY.map((s, sIdx) => (
                <span
                  key={`svc-sky-${index}-${sIdx}`}
                  className={cn(
                    "hero-star-twinkle pointer-events-none absolute rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.35)] transition-all duration-300",
                    isFlipped ? "opacity-100" : "opacity-0",
                  )}
                  style={{
                    left: `${s.x}%`,
                    top: `${s.y}%`,
                    width: `${s.s}px`,
                    height: `${s.s}px`,
                    ["--star-op" as string]: s.o,
                    animationDuration: `${s.dur}s`,
                    animationDelay: `${s.d}ms`,
                    transform: isFlipped ? "scale(1)" : "scale(0.4)",
                  }}
                  aria-hidden
                />
              ))}
              <span
                className={cn(
                  "pointer-events-none absolute inset-1 rounded-full transition duration-300",
                  isFlipped
                    ? "bg-[radial-gradient(circle_at_28%_30%,rgba(255,255,255,0.2),transparent_40%),radial-gradient(circle_at_72%_65%,rgba(56,189,248,0.25),transparent_35%),radial-gradient(circle_at_54%_24%,rgba(250,204,21,0.22),transparent_32%),linear-gradient(160deg,rgba(3,7,18,0.95)_0%,rgba(9,9,11,0.9)_100%)] opacity-100"
                    : "opacity-0",
                )}
                aria-hidden
              />
            </button>
          </div>
        </div>

        {/* Обратная сторона */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col rounded-2xl border border-white/10 bg-black p-6 shadow-[0_14px_48px_rgba(0,0,0,0.42)] backface-hidden md:p-7",
            !isFlipped && "pointer-events-none",
          )}
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="min-h-0 flex-1 overflow-y-auto text-[15px] leading-relaxed text-zinc-200">{backSummary}</p>
          <div className="mt-6 flex shrink-0 items-center justify-between gap-4 pt-2">
            <p className="min-w-0 text-pretty text-base font-bold text-[#a3e635] md:text-lg">{item.title}</p>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggle();
              }}
              className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/18 transition duration-300"
              aria-label="Закрыть"
            >
              {PLUS_PARTICLES.map((p, pIdx) => (
                <span
                  key={`svc-back-p-${index}-${pIdx}`}
                  className="hero-star-twinkle absolute rounded-full bg-amber-200 opacity-100 shadow-[0_0_7px_rgba(255,255,255,0.45)] transition-all duration-300"
                  style={{
                    width: `${p.s}px`,
                    height: `${p.s}px`,
                    ["--star-op" as string]: 0.95,
                    animationDuration: `${p.dur}s`,
                    transform: `translate(${p.x}px, ${p.y}px)`,
                    transitionDelay: `${p.d}ms`,
                  }}
                  aria-hidden
                />
              ))}
              {PLUS_SKY.map((s, sIdx) => (
                <span
                  key={`svc-back-sky-${index}-${sIdx}`}
                  className="hero-star-twinkle pointer-events-none absolute rounded-full bg-white opacity-100 shadow-[0_0_4px_rgba(255,255,255,0.35)] transition-all duration-300"
                  style={{
                    left: `${s.x}%`,
                    top: `${s.y}%`,
                    width: `${s.s}px`,
                    height: `${s.s}px`,
                    ["--star-op" as string]: s.o,
                    animationDuration: `${s.dur}s`,
                    animationDelay: `${s.d}ms`,
                    transform: "scale(1)",
                  }}
                  aria-hidden
                />
              ))}
              <span
                className="pointer-events-none absolute inset-1 rounded-full bg-[radial-gradient(circle_at_28%_30%,rgba(255,255,255,0.2),transparent_40%),radial-gradient(circle_at_72%_65%,rgba(56,189,248,0.25),transparent_35%),radial-gradient(circle_at_54%_24%,rgba(250,204,21,0.22),transparent_32%),linear-gradient(160deg,rgba(3,7,18,0.95)_0%,rgba(9,9,11,0.9)_100%)] opacity-100 transition duration-300"
                aria-hidden
              />
              <span className="relative z-10 text-2xl text-zinc-200" aria-hidden>
                ×
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServicesSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const headlineAccentRef = useRef<HTMLSpanElement | null>(null);
  const colsRef = useRef<HTMLDivElement | null>(null);
  const borderAccentRef = useRef<HTMLDivElement | null>(null);
  const quoteBlockRef = useRef<HTMLQuoteElement | null>(null);
  const [flippedIdx, setFlippedIdx] = useState<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  /** Жёлтая линия по верхней границе секции (после дорисовки линии из hero) — без полос по колонкам */
  useEffect(() => {
    const accent = borderAccentRef.current;
    if (!accent) return;

    const onSpread = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.killTweensOf(accent);
      gsap.set(accent, { transformOrigin: "50% 50%", scaleX: 0, opacity: 1 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(accent, { scaleX: 1, duration: 0.55 });
      tl.to(accent, { opacity: 0, duration: 0.45 }, ">-0.05");
      tl.set(accent, { scaleX: 0, opacity: 0 });
    };

    const onReset = () => {
      gsap.killTweensOf(accent);
      gsap.set(accent, { scaleX: 0, opacity: 0 });
    };

    window.addEventListener(SERVICES_BORDER_SPREAD_EVENT, onSpread);
    window.addEventListener(SERVICES_BORDER_RESET_EVENT, onReset);
    return () => {
      window.removeEventListener(SERVICES_BORDER_SPREAD_EVENT, onSpread);
      window.removeEventListener(SERVICES_BORDER_RESET_EVENT, onReset);
    };
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const head = headRef.current;
    const accentHeadline = headlineAccentRef.current;
    const cols = colsRef.current;
    if (!root || !head || !cols || !accentHeadline) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const children = cols.querySelectorAll<HTMLElement>("[data-service-col]");
    const ctx = gsap.context(() => {
      gsap.set(accentHeadline, { ["--services-accent-progress" as string]: "0%" });
      gsap.fromTo(
        head,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 97%",
            end: "top 78%",
            scrub: 0.4,
          },
        },
      );
      gsap.to(accentHeadline, {
        ["--services-accent-progress" as string]: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: head,
          start: "top 92%",
          end: "top 62%",
          scrub: 0.55,
        },
      });
      gsap.fromTo(
        children,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: {
            trigger: cols,
            start: "top 99%",
            end: "top 78%",
            scrub: 0.42,
          },
        },
      );
    });
    return () => {
      try {
        ctx.revert();
      } catch {
        /* ignore */
      }
    };
  }, []);

  useLayoutEffect(() => {
    const block = quoteBlockRef.current;
    if (!block) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wraps = Array.from(block.querySelectorAll<HTMLElement>("[data-quote-accent]"));
    if (wraps.length === 0) return;

    const setProgress = (el: HTMLElement, t: number) => {
      el.style.setProperty("--quote-accent-progress", `${Math.round(t * 1000) / 10}%`);
    };

    const ctx = gsap.context(() => {
      if (reduce) {
        wraps.forEach((el) => setProgress(el, 1));
        return;
      }

      wraps.forEach((el) => setProgress(el, 0));

      const n = wraps.length;
      ScrollTrigger.create({
        trigger: block,
        start: "top 85%",
        end: "bottom 30%",
        scrub: 0.55,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          wraps.forEach((el, i) => {
            const slot = 0.92 / n;
            const lo = (i / n) * 0.92;
            const hi = lo + slot;
            const t = hi <= lo ? 0 : gsap.utils.clamp(0, 1, (p - lo) / (hi - lo));
            setProgress(el, t);
          });
        },
      });
    }, block);

    const refreshId = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      window.clearTimeout(refreshId);
      try {
        ctx.revert();
      } catch {
        /* ignore */
      }
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="services"
      className="relative z-10 scroll-mt-20 -mt-14 bg-black md:-mt-20"
      data-header-theme="dark"
    >
      <div className="relative w-full" aria-hidden>
        <div className="h-px w-full bg-white/10" />
        <div
          ref={borderAccentRef}
          id="services-border-accent"
          className="pointer-events-none absolute inset-x-0 top-0 h-px origin-center scale-x-0 bg-amber-400 opacity-0 shadow-[0_0_12px_rgba(250,204,21,0.5)]"
        />
      </div>
      <div className="mx-auto min-w-0 max-w-6xl px-3 pt-8 pb-14 sm:px-4 md:px-6 md:pt-12 md:pb-24">
        <div ref={headRef} id="services-headline" className="relative z-30 max-w-3xl">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
            <span ref={headlineAccentRef} className="services-headline-wrap">
              <span className="services-headline-base">Сервис нового уровня.</span>
              <span className="services-headline-fill" aria-hidden />
            </span>{" "}
            <span className="font-normal text-zinc-500">
              Точность, скорость и честность — как в студии премиум-класса.
            </span>
          </h2>
        </div>

        <div
          ref={colsRef}
          className="mt-16 grid gap-5 border-t border-white/10 pt-10 sm:gap-6 md:grid-cols-3 md:gap-5 lg:gap-6"
        >
          {LANDING_SERVICE_SLICES.map((item, i) => {
            const imgSrc = item.coverImage;
            return (
              <div
                key={item.slug}
                data-service-col
                className="relative min-w-0 border-b border-white/10 pb-8 last:border-b-0 md:border-b-0 md:pb-0"
              >
                <ServiceFlipCard
                  item={item}
                  index={i}
                  imgSrc={imgSrc}
                  isFlipped={flippedIdx === i}
                  reduceMotion={reduceMotion}
                  onToggle={() => setFlippedIdx((prev) => (prev === i ? null : i))}
                />
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-10 text-center md:mt-14 md:gap-5 md:pt-12">
          <p className="max-w-md text-pretty text-sm leading-relaxed text-zinc-500 md:text-[15px]">
            Здесь только часть направлений. Полный список услуг, фильтры и карточки — на отдельной странице.
          </p>
          <Link
            href="/services"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-amber-400 px-8 py-3 text-[15px] font-bold text-zinc-950 shadow-[0_4px_24px_rgba(250,204,21,0.22)] transition hover:bg-amber-300 hover:shadow-[0_6px_28px_rgba(250,204,21,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Больше услуг
          </Link>
        </div>

        <div className="mt-16 bg-black px-6 sm:mt-20 sm:px-12 md:mt-24 md:px-20 lg:px-28 xl:px-36">
          <div className="mx-auto max-w-4xl">
            <header>
              <div>
                <p className="font-display text-lg font-bold tracking-[0.14em] text-white uppercase sm:text-xl">
                  Logovo
                </p>
                <p className="mt-1 text-sm text-zinc-500">Шиномонтаж · Минск · @Logovo_mnsk</p>
              </div>
            </header>

            <blockquote ref={quoteBlockRef} className="mt-10 sm:mt-12 md:mt-14">
              <div className="flex gap-3 sm:gap-5">
                <span
                  className="shrink-0 font-serif text-[4.5rem] leading-[0.85] text-zinc-800 select-none sm:text-[5.5rem] md:text-7xl"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <p className="text-pretty pt-1 text-xl font-bold leading-snug text-white sm:pt-2 sm:text-2xl sm:leading-snug md:text-[1.65rem] md:leading-[1.35]">
                  {renderServiceQuote()}
                  <span
                    className="ml-1 inline-block align-top font-serif text-4xl leading-none text-zinc-800 sm:text-5xl md:text-6xl"
                    aria-hidden
                  >
                    &rdquo;
                  </span>
                </p>
              </div>
            </blockquote>
          </div>
        </div>
      </div>
      <style jsx>{`
        .services-headline-wrap {
          --services-accent-progress: 0%;
          position: relative;
          display: inline-block;
          white-space: nowrap;
        }
        .services-headline-base {
          position: relative;
          z-index: 1;
          color: #ffffff;
        }
        .services-headline-fill {
          position: absolute;
          inset: -0.08em -0.12em;
          width: var(--services-accent-progress);
          overflow: hidden;
          border-radius: 0.22em;
          background: linear-gradient(90deg, rgba(217, 255, 88, 0.3), rgba(217, 255, 88, 0.44));
          box-shadow: 0 0 0 1px rgba(217, 255, 88, 0.12) inset;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}
