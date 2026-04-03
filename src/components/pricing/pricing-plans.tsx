"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { BookingConsentCheckbox } from "@/components/booking/booking-consent-checkbox";
import { forwardRef, type FormEvent, type ReactNode, useLayoutEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
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

/** Карточка формы — как на /book */
const bookingFormCard =
  "rounded-xl border border-white/10 bg-zinc-950/55 shadow-[0_20px_56px_rgba(0,0,0,0.4)] backdrop-blur-md";

const bookUnderlineInput = cn(
  "mt-1 w-full border-0 border-b border-white/20 bg-transparent py-1.5 text-[15px] text-white outline-none transition-colors",
  "placeholder:text-zinc-600 focus:border-b-amber-400/60",
);

function BookField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <span className="text-[11px] font-medium tracking-wide text-zinc-500 uppercase">{label}</span>
      {children}
    </div>
  );
}

/** Заголовки секций — как на остальных тёмных страницах */
const sectionTitle = "text-lg font-semibold tracking-tight text-white md:text-xl";
const sectionLead = "mt-2 text-[13px] leading-relaxed text-zinc-500";
const blockGap = "mt-12 md:mt-14";

const DISCOUNT_LINES = [
  <>
    <span className="font-semibold text-amber-400">5% скидка</span> за историю в Instagram с отметкой нашего
    шиномонтажа.
  </>,
  <>
    <span className="font-semibold text-amber-400">Сезон на переобувку</span> — скидки постоянным клиентам. Оставьте
    номер мастеру или администратору: пришлём SMS со скидкой.
  </>,
  <>
    <span className="font-semibold text-amber-400">Корпоративным клиентам и такси</span> — объёмные условия обсуждаем
    отдельно: почта или Telegram сети.
  </>,
] as const;

/** Левая колонка — в духе страницы /book */
function SaleDiscountBlock({ className }: { className?: string }) {
  return (
    <div className={cn("relative min-w-0", className)}>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[38%] bg-[radial-gradient(ellipse_88%_65%_at_50%_100%,rgba(220,90,50,0.11),transparent_62%)] opacity-90"
        aria-hidden
      />
      <p className="relative text-xs font-semibold tracking-[0.2em] text-amber-400 uppercase">Скидки</p>
      <h2 className="relative mt-2.5 max-w-xl text-balance text-2xl font-bold tracking-tight text-white md:text-[1.85rem] md:leading-[1.12]">
        Специальные условия и акции
      </h2>
      <p className="relative mt-3 max-w-lg text-[15px] leading-snug text-zinc-400">
        То же оформление, что на странице записи: коротко о скидках слева, заявка на программу «тайный покупатель» —
        справа.
      </p>
      <ul className="relative mt-6 space-y-2.5 text-[15px] leading-snug text-zinc-300">
        {DISCOUNT_LINES.map((line, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-0.5 shrink-0 text-[10px] text-white/80" aria-hidden>
              ▶
            </span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SecretShopperBlock({ className }: { className?: string }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const phone = String(fd.get("phone") ?? "").trim();
    const name = String(fd.get("name") ?? "").trim();
    const agree = fd.get("agree") === "on";
    if (!phone || !agree) return;

    const body = [
      "Заявка: программа «Тайный покупатель»",
      name ? `Имя: ${name}` : null,
      `Телефон: ${phone}`,
      "Прошу связаться и рассказать условия участия.",
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent("LOGOVO — тайный покупатель")}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  }

  return (
    <div className={cn("min-w-0", className)}>
      <div className={cn("p-5 md:p-6", bookingFormCard)}>
        <h2 className="text-lg font-bold text-white md:text-xl">Тайный покупатель</h2>
        <p className="mt-2 text-[14px] leading-snug text-zinc-500">
          Оставьте контакты — откроется письмо на почту сети. Администратор свяжется и расскажет правила программы и
          бонус после оценки визита.
        </p>

        {sent ? (
          <p className="mt-5 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2.5 text-sm text-amber-200">
            Если почта не открылась автоматически, напишите на {siteConfig.email} или позвоните {siteConfig.phone}.
          </p>
        ) : null}

        {!sent ? (
          <form className="mt-5 space-y-5" onSubmit={handleSubmit}>
            <BookField label="Имя (необязательно)">
              <input name="name" type="text" autoComplete="name" className={bookUnderlineInput} placeholder="" />
            </BookField>

            <BookField label="Телефон">
              <input
                required
                name="phone"
                type="tel"
                autoComplete="tel"
                className={bookUnderlineInput}
                placeholder=""
              />
            </BookField>

            <BookingConsentCheckbox
              description={
                <>
                  Согласен на обработку контакта для программы «Тайный покупатель». Условия — на странице{" "}
                  <Link href="/contacts" className="text-amber-400/90 underline-offset-2 hover:underline">
                    Контакты
                  </Link>
                  .
                </>
              }
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-white py-3 text-center text-sm font-bold text-zinc-950 transition hover:bg-zinc-100"
            >
              Отправить заявку
            </button>
          </form>
        ) : null}
      </div>
    </div>
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
    <div
      className={cn(
        "-mx-1 overflow-x-auto overscroll-x-contain px-1 [-webkit-overflow-scrolling:touch] sm:mx-0 sm:px-0",
        panel,
      )}
    >
      <table className="w-full min-w-[520px] border-collapse text-left text-[11px] sm:min-w-[600px] sm:text-[12px] md:min-w-[640px] md:text-[13px]">
        <thead>
          <tr className="border-b border-white/10 bg-zinc-950/80">
            <th className="sticky left-0 z-10 w-8 bg-zinc-950/95 px-1.5 py-2.5 backdrop-blur-sm sm:w-10 sm:px-3 sm:py-3.5" aria-hidden>
              {" "}
            </th>
            {columns.map((c, i) => (
              <th
                key={c}
                className={[
                  "whitespace-nowrap px-1 py-2.5 text-center text-[9px] font-semibold uppercase tracking-[0.06em] text-zinc-500 sm:px-2 sm:text-[10px] sm:tracking-[0.08em] md:py-3.5 md:text-xs md:tracking-widest",
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
                  "sticky left-0 z-10 max-w-[min(42vw,11rem)] truncate bg-zinc-950/95 px-1.5 py-2 text-left text-[11px] font-medium backdrop-blur-sm sm:max-w-none sm:whitespace-nowrap sm:px-3 sm:py-2.5 sm:text-[13px]",
                  row.accent ? "text-zinc-100" : "text-zinc-300",
                ].join(" ")}
                title={row.name}
              >
                {row.name}
              </th>
              {row.values.map((v, i) => (
                <td
                  key={i}
                  className={[
                    "px-1 py-2 text-center tabular-nums text-zinc-400 sm:px-2 sm:py-2.5",
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

type PricesMainTab = "prices" | "discounts";

export function PricingPlans({
  showVideoSlot = false,
  variant = "full",
}: PricingPlansProps) {
  const [mainTab, setMainTab] = useState<PricesMainTab>("prices");

  if (variant === "compact") {
    return (
      <div className="bg-black text-zinc-100">
        <div className="mx-auto w-full min-w-0 max-w-6xl px-3 py-14 sm:px-4 md:px-6 md:py-20">
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
      <div className="relative mx-auto w-full min-w-0 max-w-6xl px-3 pb-12 pt-8 sm:px-4 md:px-6 md:pb-20 md:pt-12">
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
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-zinc-500">
              Таблицы цен и состав работ — во вкладке «Прайс». Скидки и программа «тайный покупатель» — отдельно.
            </p>
          </header>

          <nav
            className="mx-auto mt-10 flex justify-center px-4 md:mt-12 md:px-6"
            aria-label="Разделы прейскуранта"
          >
            <div
              className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-full border border-white/15 bg-zinc-900/80 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md md:flex-nowrap md:gap-1"
              role="tablist"
            >
              {(
                [
                  { id: "prices" as const, label: "Прайс" },
                  { id: "discounts" as const, label: "Скидки и программы" },
                ] as const
              ).map((t) => {
                const active = mainTab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setMainTab(t.id)}
                    className={cn(
                      "min-h-11 shrink-0 rounded-full px-4 py-2.5 text-[15px] font-bold tracking-tight transition md:min-h-12 md:px-6 md:py-3 md:text-base",
                      active
                        ? "bg-white text-zinc-950 shadow-[0_4px_28px_rgba(255,255,255,0.18)]"
                        : "text-zinc-200 hover:bg-white/10 hover:text-white",
                    )}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </nav>

          {mainTab === "discounts" ? (
            <div className="mt-10 grid min-w-0 gap-8 lg:mt-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.92fr)] lg:items-start lg:gap-10">
              <SaleDiscountBlock />
              <SecretShopperBlock />
            </div>
          ) : (
            <>
          <p className="mx-auto mt-10 max-w-3xl text-pretty text-center text-[17px] leading-snug text-zinc-300 md:mt-12 md:text-xl md:leading-relaxed">
            В стоимость работ{" "}
            <span className="relative inline-block px-1 text-[1.35em] font-extrabold tracking-tight text-amber-400 md:text-[1.45em]">
              ВКЛЮЧЕНЫ
            </span>{" "}
            <span className="text-zinc-200">все расходные материалы:</span>
          </p>

          <section className={`mt-8 space-y-1 p-6 md:mt-10 md:p-8 ${panel} border-amber-400/20 shadow-[0_0_0_1px_rgba(250,204,21,0.06)_inset]`}>
            <h2 className="text-xl font-bold tracking-tight text-amber-300 md:text-2xl lg:text-[1.65rem]">
              Уже включено в работу
            </h2>
            <p className="pb-2 text-[14px] text-zinc-500 md:text-[15px]">Без доплат в строке чека — сразу в комплексе услуги.</p>
            <ul className="mt-2 space-y-0 divide-y divide-white/8">
              {freeIncludedItems.map((item) => (
                <li
                  key={item.label}
                  className="flex flex-wrap items-baseline justify-between gap-3 py-4 first:pt-3 md:py-5"
                >
                  <span className="text-[16px] font-medium text-zinc-100 md:text-lg">{item.label}</span>
                  <span className="text-lg font-bold tabular-nums text-amber-400/95 md:text-xl">{item.price}</span>
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
            </>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
