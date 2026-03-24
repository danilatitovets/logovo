"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { forwardRef, useLayoutEffect, useRef } from "react";
import { PricingCosmicVideo } from "@/components/pricing/pricing-cosmic-video";
import { PricingHoverVideo } from "@/components/pricing/pricing-hover-video";
import {
  PRICING_VIDEO_HOME_EXTRA,
  PRICING_VIDEO_LANDING,
  PRICING_VIDEO_PAGE,
} from "@/data/pricing-videos";
import {
  balanceColumns,
  balanceRows,
  boosterLine,
  diskRepair,
  extraServices,
  freeIncludedItems,
  pricingBottomBanner,
  pricingLandingCards,
  pricingPageIntro,
  tireComplexColumns,
  tireComplexRows,
  tireSurchargeNote,
  wheelRepairColumns,
  wheelRepairRows,
  type PricingLandingCard,
} from "@/data/pricing-pricelist";

gsap.registerPlugin(ScrollTrigger);

const panel =
  "rounded-2xl border border-white/10 bg-zinc-950/50 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-md";

/** Заголовки секций — как на остальных тёмных страницах */
const sectionTitle = "text-lg font-semibold tracking-tight text-white md:text-xl";
const sectionLead = "mt-2 text-[13px] leading-relaxed text-zinc-500";
const blockGap = "mt-12 md:mt-14";

function SaleDiscountBlock({ className = "" }: { className?: string }) {
  return (
    <section
      className={`relative overflow-hidden rounded-2xl border border-amber-400/35 bg-linear-to-br from-amber-400/12 via-zinc-950/85 to-zinc-950/90 p-5 shadow-[0_14px_50px_rgba(0,0,0,0.35)] md:p-6 ${className}`}
    >
      <div className="pointer-events-none absolute -top-16 -right-12 h-36 w-36 rounded-full bg-amber-300/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-amber-200/10 blur-3xl" aria-hidden />
      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/35 bg-amber-300/10 px-3 py-1">
          <span className="text-[10px] font-bold tracking-[0.2em] text-amber-300 uppercase">Sale</span>
          <span className="text-[10px] font-semibold tracking-[0.12em] text-zinc-100 uppercase">Скидки</span>
        </div>
        <ul className="mt-4 space-y-3 text-[14px] leading-relaxed text-zinc-200 md:text-[15px]">
          <li className="rounded-xl border border-white/10 bg-black/25 p-3.5 backdrop-blur-sm">
            <span className="font-semibold text-amber-300">5% скидка</span> за историю в Instagram с отметкой нашего
            шиномонтажа.
          </li>
          <li className="rounded-xl border border-white/10 bg-black/25 p-3.5 backdrop-blur-sm">
            Скидки постоянным клиентам в сезон на переобувку (оставьте ваш номер мастеру или администратору, и мы
            пришлём SMS со скидкой).
          </li>
        </ul>
      </div>
    </section>
  );
}

function formatCell(v: number | string): string {
  if (typeof v === "number") return `${v} ₽`;
  if (typeof v === "string" && (v.includes("₽") || v === "—")) return v;
  return `${v} ₽`;
}

function PriceTable({
  columns,
  rows,
  highlightColIndex,
}: {
  columns: readonly string[];
  rows: { name: string; values: (number | string)[]; accent?: boolean }[];
  highlightColIndex?: number;
}) {
  return (
    <div className={`overflow-x-auto ${panel}`}>
      <table className="w-full min-w-[640px] border-collapse text-left text-[13px]">
        <thead>
          <tr className="border-b border-white/10 bg-zinc-950/80">
            <th className="sticky left-0 z-10 w-10 bg-zinc-950/95 px-3 py-3.5 backdrop-blur-sm" aria-hidden>
              {" "}
            </th>
            {columns.map((c, i) => (
              <th
                key={c}
                className={[
                  "whitespace-nowrap px-2 py-3.5 text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-500 md:text-xs md:tracking-widest",
                  highlightColIndex === i ? "bg-white/4 text-zinc-200" : "",
                ].join(" ")}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.name}
              className={[
                "border-b border-white/6 transition-colors",
                row.accent ? "bg-white/3" : "hover:bg-white/2",
              ].join(" ")}
            >
              <th
                className={[
                  "sticky left-0 z-10 whitespace-nowrap bg-zinc-950/95 px-3 py-2.5 text-left text-[13px] font-medium backdrop-blur-sm",
                  row.accent ? "text-zinc-100" : "text-zinc-300",
                ].join(" ")}
              >
                {row.name}
              </th>
              {row.values.map((v, i) => (
                <td
                  key={i}
                  className={[
                    "px-2 py-2.5 text-center tabular-nums text-zinc-400",
                    highlightColIndex === i ? "bg-white/2 text-zinc-200" : "",
                  ].join(" ")}
                >
                  {formatCell(v)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CheckMini({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const LandingPlanCard = forwardRef<HTMLElement, { card: PricingLandingCard }>(function LandingPlanCard(
  { card },
  ref,
) {
  const hi = card.highlight;
  const videoByCard: Record<string, string> = {
    start: PRICING_VIDEO_PAGE,
    drive: PRICING_VIDEO_LANDING,
    max: PRICING_VIDEO_HOME_EXTRA,
  };
  const videoSrc = videoByCard[card.id];

  return (
    <article
      ref={ref}
      className={[
        "flex h-full flex-col rounded-2xl p-6 transition-shadow duration-300 md:p-7",
        panel,
        hi ? "border-2 border-amber-400/85 shadow-[0_0_0_1px_rgba(250,204,21,0.12)]" : "",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className={`text-lg font-semibold tracking-tight ${hi ? "text-amber-400" : "text-white"}`}>{card.title}</h3>
        {card.badge ? (
          <span className="shrink-0 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-amber-400 uppercase">
            {card.badge}
          </span>
        ) : null}
      </div>
      {videoSrc ? (
        <div className="mt-4 overflow-hidden rounded-xl border border-amber-400/35 bg-black/50">
          <PricingHoverVideo embedded src={videoSrc} playOnMount />
        </div>
      ) : null}
      <p className={`${videoSrc ? "mt-4" : "mt-3"} text-2xl font-semibold text-white`}>{card.priceLine}</p>
      {card.priceHint ? <p className="mt-1 text-xs text-zinc-500">{card.priceHint}</p> : null}
      <p className="mt-4 flex-1 text-[14px] leading-relaxed text-zinc-500">{card.description}</p>
      <ul className="mt-6 space-y-2.5">
        {card.bullets.map((b) => (
          <li key={b} className="flex gap-2 text-[13px] leading-snug text-zinc-300">
            <CheckMini className={`mt-0.5 size-4 shrink-0 ${hi ? "text-amber-400" : "text-zinc-500"}`} />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/prices"
        className={[
          "mt-8 inline-flex w-full items-center justify-center rounded-lg py-2.5 text-sm font-semibold transition",
          hi ? "bg-amber-400 text-zinc-950 hover:bg-amber-300" : "border border-white/20 text-white hover:bg-white/5",
        ].join(" ")}
      >
        Таблица цен
      </Link>
    </article>
  );
});

const CENTER_CARD_INDEX = 1;

function CompactLandingCardsGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    const center = centerCardRef.current;
    if (!grid || !center) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      center.style.boxShadow =
        "0 0 0 1px rgba(250,204,21,0.45), 0 0 24px rgba(250,204,21,0.08), 0 8px 40px rgba(0,0,0,0.35)";
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: grid,
        start: "top 78%",
        end: "bottom 28%",
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const t = self.progress;
          const line = 0.1 + t * 0.65;
          const glow = t * 0.09;
          center.style.boxShadow = [
            `0 0 0 1px rgba(250,204,21,${line})`,
            `0 0 ${16 + t * 32}px rgba(250,204,21,${glow})`,
            "0 8px 40px rgba(0,0,0,0.35)",
          ].join(", ");
        },
      });
    }, grid);

    const tid = window.setTimeout(() => ScrollTrigger.refresh(), 120);

    return () => {
      window.clearTimeout(tid);
      ctx.revert();
      center.style.boxShadow = "";
    };
  }, []);

  return (
    <div ref={gridRef} className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
      {pricingLandingCards.map((card, i) => (
        <LandingPlanCard key={card.id} ref={i === CENTER_CARD_INDEX ? centerCardRef : null} card={card} />
      ))}
    </div>
  );
}

type PricingPlansProps = {
  showVideoSlot?: boolean;
  variant?: "full" | "compact";
};

export function PricingPlans({
  showVideoSlot = false,
  variant = "full",
}: PricingPlansProps) {
  if (variant === "compact") {
    return (
      <div className="bg-black text-zinc-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">Прейскурант</p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
              {pricingPageIntro.subtitle}
            </h2>
            <p className="mt-4 text-[15px] text-zinc-500">
              Три ориентира по диаметру — детальные суммы в полной таблице.
            </p>
          </header>
          <CompactLandingCardsGrid />
          <div className="mt-12 text-center">
            <Link
              href="/prices"
              className="inline-flex items-center justify-center rounded-full border-2 border-amber-400 bg-transparent px-6 py-2.5 text-sm font-semibold text-amber-400 shadow-[0_0_20px_rgba(250,204,21,0.12)] transition hover:border-amber-300 hover:bg-amber-400/10 hover:text-amber-300"
            >
              Полный прейскурант и условия
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-zinc-100">
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-14 pt-10 md:px-6 md:pb-20 md:pt-12">
        <div className="relative z-10">
          {showVideoSlot ? (
            <div className="relative mx-auto mb-12 max-w-4xl overflow-hidden rounded-2xl md:mb-16">
              <PricingCosmicVideo />
            </div>
          ) : null}

          <div className="relative">
          <header className="text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">Прейскурант</p>
            <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
              {pricingPageIntro.subtitle}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-zinc-500">{pricingPageIntro.includedLine}</p>
          </header>
          <SaleDiscountBlock className="mt-8" />

          <section className={`mt-12 space-y-3 p-5 md:p-6 ${panel}`}>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-600">Уже включено</p>
            <ul className="space-y-2 text-[14px]">
              {freeIncludedItems.map((item) => (
                <li key={item.label} className="flex flex-wrap justify-between gap-2 border-b border-white/6 py-2.5 last:border-0">
                  <span className="text-zinc-300">{item.label}</span>
                  <span className="font-medium tabular-nums text-zinc-400">{item.price}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={blockGap}>
            <h2 className={sectionTitle}>Шиномонтаж, ₽ за 1 колесо</h2>
            <p className={sectionLead}>Если не оговорено иное — цена за одно колесо.</p>
            <div className="mt-6">
              <PriceTable columns={tireComplexColumns} rows={tireComplexRows} highlightColIndex={1} />
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-zinc-500">{tireSurchargeNote}</p>
          </section>

          <section className={blockGap}>
            <h2 className={sectionTitle}>Комплекс балансировки</h2>
            <div className="mt-6">
              <PriceTable columns={balanceColumns} rows={balanceRows} highlightColIndex={1} />
            </div>
          </section>

          <section className={blockGap}>
            <h2 className={sectionTitle}>{diskRepair.title}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {diskRepair.rows.map((r) => (
                <div key={r.type} className={`flex items-center justify-between rounded-xl px-4 py-3.5 ${panel}`}>
                  <span className="text-zinc-300">{r.type}</span>
                  <span className="font-semibold tabular-nums text-zinc-200">{r.price}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[13px] text-zinc-500">{diskRepair.note}</p>
          </section>

          <section className={blockGap}>
            <h2 className={sectionTitle}>Ремонт колеса</h2>
            <div className="mt-6">
              <PriceTable columns={wheelRepairColumns} rows={wheelRepairRows} highlightColIndex={1} />
            </div>
            <p className="mt-4 text-[14px] text-zinc-400">
              <span className="font-medium text-zinc-200">Варка резины</span> — от 70 ₽
            </p>
          </section>

          <section className={`${blockGap} flex flex-wrap items-baseline justify-between gap-3 rounded-2xl px-4 py-4 md:px-6 md:py-5 ${panel}`}>
            <span className="font-medium text-zinc-300">{boosterLine.label}</span>
            <span className="text-zinc-400">
              <span className="font-semibold tabular-nums text-zinc-200">{boosterLine.price}</span>
              <span className="ml-2 text-[13px] text-zinc-500">({boosterLine.hint})</span>
            </span>
          </section>

          <section className={blockGap}>
            <h2 className={sectionTitle}>Дополнительные услуги</h2>
            <ul
              className={`mt-4 list-inside list-disc space-y-2.5 p-5 text-[14px] leading-relaxed text-zinc-400 marker:text-zinc-600 md:p-6 ${panel}`}
            >
              {extraServices.map((line) => (
                <li key={line} className="pl-1">
                  {line}
                </li>
              ))}
            </ul>
          </section>

          <div className={`${blockGap} p-6 md:flex md:items-center md:justify-between md:gap-10 md:p-8 ${panel}`}>
            <div className="max-w-2xl">
              <h2 className={sectionTitle}>{pricingBottomBanner.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-zinc-500">{pricingBottomBanner.description}</p>
            </div>
            <Link
              href={pricingBottomBanner.ctaHref}
              className="mt-6 inline-flex w-full shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10 md:mt-0 md:w-auto"
            >
              {pricingBottomBanner.ctaLabel}
            </Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
