import Link from "next/link";
import { testimonials } from "@/data/testimonials";
import type { Testimonial, TestimonialSource } from "@/types";

function SourceIcon({ source }: { source: TestimonialSource }) {
  const common = "size-9 shrink-0 rounded-lg border border-zinc-700/80 bg-zinc-900 p-1.5 text-zinc-100";
  switch (source) {
    case "appstore":
      return (
        <span className={common} aria-hidden>
          <svg viewBox="0 0 24 24" className="size-full" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
        </span>
      );
    case "google":
      return (
        <span className={common} aria-hidden>
          <svg viewBox="0 0 24 24" className="size-full">
            <path
              fill="#EA4335"
              d="M12 10.2v3.6h5.1c-.22 1.14-.88 2.1-1.88 2.75l3.03 2.35c1.77-1.63 2.8-4.05 2.8-6.9 0-.67-.06-1.31-.18-1.93H12z"
            />
            <path
              fill="#4285F4"
              d="M12 22c2.43 0 4.47-.8 5.96-2.18l-3.03-2.35c-.84.56-1.91.9-2.93.9-2.25 0-4.15-1.52-4.84-3.56H3.18v2.44C4.66 20.03 8.07 22 12 22z"
            />
            <path
              fill="#FBBC05"
              d="M7.16 14.81c-.19-.56-.3-1.16-.3-1.81s.11-1.25.3-1.81V8.75H3.18A9.86 9.86 0 0 0 2 12c0 1.61.39 3.14 1.18 4.5l4-3.69z"
            />
            <path
              fill="#34A853"
              d="M12 5.38c1.24 0 2.36.43 3.24 1.27l2.43-2.43C16.45 2.89 14.43 2 12 2 8.07 2 4.66 3.97 3.18 7.25l3.98 3.09c.69-2.04 2.59-3.56 4.84-3.56z"
            />
          </svg>
        </span>
      );
    case "telegram":
      return (
        <span className={common} aria-hidden>
          <svg viewBox="0 0 24 24" className="size-full text-sky-400" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
          </svg>
        </span>
      );
    default:
      return (
        <span className={common} aria-hidden>
          <svg viewBox="0 0 24 24" className="size-full text-zinc-400" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" d="M8 12h8M12 8v8" />
          </svg>
        </span>
      );
  }
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-[#111111] p-6 shadow-sm">
      <p className="text-[15px] leading-relaxed text-zinc-100">{item.quote}</p>
      <div className="mt-5 flex items-center gap-3">
        <SourceIcon source={item.source} />
        <div className="min-w-0">
          <p className="truncate font-medium text-white">{item.author}</p>
          <p className="text-sm text-zinc-500">{item.sourceLabel}</p>
        </div>
      </div>
    </article>
  );
}

function splitIntoColumns(items: Testimonial[], columns: number): Testimonial[][] {
  const out: Testimonial[][] = Array.from({ length: columns }, () => []);
  items.forEach((item, i) => {
    out[i % columns]!.push(item);
  });
  return out;
}

type TestimonialsMarqueeProps = {
  /** Заголовок блока */
  title?: string;
  subtitle?: string;
  showCta?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
};

function MarqueeColumn({
  items,
  durationSec,
}: {
  items: Testimonial[];
  durationSec: number;
}) {
  const track = [...items, ...items];
  return (
    <div className="group relative h-[min(70vh,560px)] overflow-hidden md:h-[min(75vh,620px)]">
      <div
        className="testimonial-marquee-track flex flex-col gap-4 group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${durationSec}s` }}
      >
        {track.map((item, i) => (
          <TestimonialCard key={`${item.id}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export function TestimonialsMarquee({
  title = "Сделано для профессионалов. Оценивают все.",
  subtitle = "Реальные отзывы о работе с LOGOVO.",
  showCta = true,
  ctaHref = "/contacts",
  ctaLabel = "Связаться",
}: TestimonialsMarqueeProps) {
  const columns = splitIntoColumns(testimonials, 3);
  const durations = [52, 44, 58];

  return (
    <div className="w-full">
      <div className="mx-auto max-w-3xl px-4 pb-10 text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h2>
        {subtitle ? <p className="mt-3 text-zinc-500">{subtitle}</p> : null}
        {showCta ? (
          <Link
            href={ctaHref}
            className="mt-6 inline-flex items-center gap-1 rounded-full border border-white/90 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            {ctaLabel}
            <span aria-hidden className="text-zinc-400">
              →
            </span>
          </Link>
        ) : null}
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-linear-to-b from-black to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-linear-to-t from-black to-transparent"
          aria-hidden
        />

        <div className="md:hidden">
          <MarqueeColumn items={testimonials} durationSec={48} />
        </div>
        <div className="hidden gap-5 md:grid md:grid-cols-3">
          {columns.map((col, colIndex) => (
            <MarqueeColumn key={colIndex} items={col} durationSec={durations[colIndex]!} />
          ))}
        </div>
      </div>
    </div>
  );
}
