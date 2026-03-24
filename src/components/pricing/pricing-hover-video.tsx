"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type PricingHoverVideoProps = {
  src: string;
  /** Постер до наведения (кадр из bg или пусто) */
  poster?: string;
  /** Крупнее рамка и подсказка — для лендинга */
  prominent?: boolean;
  /** Внутри карточки — компактные скругления */
  embedded?: boolean;
  /** Сразу воспроизводить видео (без hover-режима). */
  playOnMount?: boolean;
  className?: string;
};

export function PricingHoverVideo({
  src,
  poster = "/images/bg.webp",
  prominent = false,
  embedded = false,
  playOnMount = false,
  className = "",
}: PricingHoverVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /** Статичный кадр — середина ролика (не первый кадр) */
  const seekToMiddle = useCallback((v: HTMLVideoElement) => {
    try {
      const d = v.duration;
      if (Number.isFinite(d) && d > 0) {
        v.currentTime = d / 2;
      }
    } catch {
      /* ignore */
    }
  }, []);

  const play = useCallback(() => {
    const v = videoRef.current;
    if (!v || reducedMotion) return;
    void v.play().catch(() => {});
  }, [reducedMotion]);

  const pause = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    seekToMiddle(v);
  }, [seekToMiddle]);

  const frame =
    embedded
      ? "rounded-xl ring-0 shadow-none"
      : prominent
        ? "rounded-2xl ring-2 ring-amber-400/35 shadow-[0_0_0_1px_rgba(250,204,21,0.12),0_20px_50px_rgba(0,0,0,0.55)]"
        : "rounded-2xl ring-1 ring-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)]";

  const innerRound = embedded ? "rounded-xl" : "rounded-2xl";

  return (
    <div
      className={[
        "group relative w-full outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        frame,
        className,
      ].join(" ")}
      onMouseEnter={playOnMount ? undefined : play}
      onMouseLeave={playOnMount ? undefined : pause}
      onFocus={playOnMount ? undefined : play}
      onBlur={playOnMount ? undefined : pause}
      tabIndex={0}
      role="group"
      aria-label="Видео: воспроизведение при наведении или фокусе"
    >
      <div className={`relative aspect-video w-full overflow-hidden ${innerRound}`}>
        <video
          ref={videoRef}
          src={src}
          poster={playOnMount ? undefined : poster}
          muted
          playsInline
          loop
          autoPlay={playOnMount && !reducedMotion}
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover object-center"
          onLoadedMetadata={(e) => {
            if (playOnMount && !reducedMotion) return;
            seekToMiddle(e.currentTarget);
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20 transition-opacity duration-300 group-hover:opacity-90"
          aria-hidden
        />
      </div>
    </div>
  );
}
