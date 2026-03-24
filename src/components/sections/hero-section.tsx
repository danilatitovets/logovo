"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroServicesConnector } from "@/components/effects/hero-services-connector";
import { heroStarClassName, STAR_BACK, STAR_FLOW, STAR_MID } from "@/lib/hero-stars";

gsap.registerPlugin(ScrollTrigger);

const NIGHT_SKY_LAYERS = {
  backgroundImage: `
    radial-gradient(ellipse 90% 45% at 50% -5%, rgba(255,255,255,0.015), transparent 52%),
    linear-gradient(180deg, #000000 0%, #000000 45%, #020202 78%, #030303 100%)
  `,
} as const;

export function HeroSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const skyStackRef = useRef<HTMLDivElement | null>(null);
  const logoWrapRef = useRef<HTMLDivElement | null>(null);
  const starsBackRef = useRef<HTMLDivElement | null>(null);
  const starsFrontRef = useRef<HTMLDivElement | null>(null);
  const flowToServicesRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const logo = logoWrapRef.current;
    const skyStack = skyStackRef.current;
    const flow = flowToServicesRef.current;
    if (!root || !logo || !skyStack || !flow) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    /** Без scope-элемента: иначе revert() может конфликтовать с React при размонтировании */
    const ctx = gsap.context(() => {
      const scroll = {
        trigger: root,
        start: "top top",
        end: "+=90vh",
        scrub: 0.55,
      };

      /** Лого: длиннее дистанция + мягче scrub — уменьшение постепенное, не рывком */
      const scrollLogo = {
        trigger: root,
        start: "top top",
        end: "+=140vh",
        scrub: 1.35,
      };

      /** Небо + градиенты в одном блоке — без «разъезда» слоёв */
      gsap.fromTo(
        skyStack,
        { y: 0, force3D: true },
        { y: "12vh", ease: "none", force3D: true, scrollTrigger: scroll },
      );

      gsap.fromTo(logo, { scale: 1 }, { scale: 0.38, ease: "none", scrollTrigger: scrollLogo });

      /**
       * Звёзды без translateY: иначе при скролле вниз слои едут вниз сильнее фона — «падают».
       * Оставляем только лёгкое затухание нижней полосы звёзд к чёрному.
       */
      gsap.fromTo(flow, { opacity: 1 }, { opacity: 0.45, ease: "none", scrollTrigger: scroll });
    });

    return () => {
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
      data-hero-root
      data-header-theme="dark"
      className="relative -mt-16 min-h-[145vh] overflow-hidden"
    >
      <HeroServicesConnector />
      <div className="absolute inset-0 min-h-full overflow-hidden">
        <div
          ref={skyStackRef}
          className="absolute inset-0 min-h-full will-change-transform"
          style={{ transform: "translateZ(0)" }}
        >
          <div
            className="hero-night-sky absolute inset-x-0 top-0 min-h-[145vh]"
            style={NIGHT_SKY_LAYERS}
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-[62%] h-[18%] bg-linear-to-b from-transparent via-[#030303]/80 to-[#050505]/95"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-[78%] h-[14%] bg-linear-to-b from-[#050505]/90 via-[#030303] to-black"
            aria-hidden
          />
          <div className="absolute inset-x-0 top-[88%] bottom-0 bg-black" />
        </div>
      </div>

      <div
        ref={starsBackRef}
        className="pointer-events-none absolute inset-x-0 top-0 h-[72%] min-h-[105vh]"
        aria-hidden
      >
        {STAR_BACK.map((s, i) => (
          <span
            key={`b-${i}-${s.left.toFixed(3)}`}
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

      <div
        ref={starsFrontRef}
        className="pointer-events-none absolute inset-x-0 top-[52%] h-[22%] min-h-[36vh]"
        aria-hidden
      >
        {STAR_MID.map((s, i) => (
          <span
            key={`m-${i}-${s.left.toFixed(3)}`}
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

      <div
        ref={flowToServicesRef}
        className="pointer-events-none absolute inset-x-0 top-[62%] z-5 h-[18%] min-h-[30vh] will-change-[opacity]"
        aria-hidden
      >
        {STAR_FLOW.map((s, i) => (
          <span
            key={`flow-${i}-${s.left.toFixed(3)}`}
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

      <div className="relative z-20 mx-auto flex h-screen min-h-0 w-full max-w-6xl flex-col px-4 text-center">
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <div
            ref={logoWrapRef}
            data-hero-logo-anchor
            className="w-[min(88vw,280px)] will-change-transform md:w-[min(72vw,340px)] lg:w-[min(56vw,380px)]"
            style={{ transformOrigin: "center center" }}
          >
            <Image
              src="/images/logo.PNG"
              alt="LOGOVO logo"
              width={480}
              height={480}
              priority
              className="h-auto w-full drop-shadow-[0_0_40px_rgba(250,204,21,0.18)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
