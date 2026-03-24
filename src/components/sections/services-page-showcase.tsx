"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Service } from "@/types";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "all" as const, label: "Все" },
  { id: "disks" as const, label: "Диски" },
  { id: "tires" as const, label: "Шины" },
  { id: "extra" as const, label: "Ещё" },
];

type TabId = (typeof TABS)[number]["id"];

const SLUG_CATEGORY: Record<string, Exclude<TabId, "all">> = {
  "powder-coating": "disks",
  "wheel-straightening": "disks",
  "tire-fitting": "tires",
  "puncture-repair": "tires",
  "wheel-storage": "extra",
  "ac-refill": "extra",
};

function categoryForService(slug: string): Exclude<TabId, "all"> {
  return SLUG_CATEGORY[slug] ?? "extra";
}

function shortLabel(title: string): string {
  const cut = title.split("(")[0]?.trim() ?? title;
  return cut.length > 28 ? `${cut.slice(0, 26)}…` : cut;
}

type PhoneCardProps = {
  item: Service;
};

function ServicePhoneCard({ item }: PhoneCardProps) {
  const href = `/services/${item.slug}`;
  return (
    <article className="flex w-[min(280px,100vw)] shrink-0 flex-col items-center md:w-[300px]">
      <p className="font-display mb-3 text-center text-[14px] font-semibold tracking-tight text-zinc-400 md:text-[15px]">
        {shortLabel(item.title)}
      </p>
      <Link
        href={href}
        aria-label={`${item.title} — открыть страницу услуги`}
        className="group relative w-full max-w-[280px] outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        <div
          className={cn(
            "relative aspect-9/16 w-full overflow-hidden rounded-[2.1rem] border border-white/[0.07]",
            "bg-[linear-gradient(165deg,#020205_0%,#000000_42%,#04040a_100%)]",
            "shadow-[0_28px_80px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_56px_rgba(76,29,149,0.06)]",
            "transition duration-300 group-hover:-translate-y-1 group-hover:border-violet-500/15",
            "group-hover:shadow-[0_36px_96px_rgba(0,0,0,0.88),0_0_72px_rgba(91,33,182,0.1)]",
          )}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(99,102,241,0.09),transparent_55%),radial-gradient(ellipse_70%_45%_at_80%_100%,rgba(30,27,75,0.35),transparent_60%)]"
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0 bg-black/25" aria-hidden />
          <div className="absolute inset-x-5 top-7 flex items-center justify-center">
            <div className="h-1 w-12 rounded-full bg-white/8" aria-hidden />
          </div>
          <div className="absolute inset-0 top-14 flex min-h-0 flex-col">
            <div className="flex min-h-0 flex-1 items-center justify-center px-3 pt-1">
              <Image
                src={item.coverImage}
                alt=""
                width={240}
                height={240}
                sizes="(max-width:768px) 70vw, 280px"
                className="h-auto w-full max-w-[200px] object-contain opacity-[0.88] transition duration-300 group-hover:scale-[1.03] group-hover:opacity-95"
              />
            </div>
            <div className="font-display shrink-0 border-t border-white/6 bg-[rgba(2,2,6,0.92)] px-5 py-4 backdrop-blur-md">
              <p className="text-pretty text-[16px] font-semibold leading-snug tracking-tight text-zinc-100 md:text-[17px]">
                {item.title}
              </p>
              <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-zinc-500 md:text-[14px]">{item.excerpt}</p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

type ServicesPageShowcaseProps = {
  services: Service[];
};

export function ServicesPageShowcase({ services }: ServicesPageShowcaseProps) {
  const [tab, setTab] = useState<TabId>("all");

  const filtered = useMemo(() => {
    if (tab === "all") return services;
    return services.filter((s) => categoryForService(s.slug) === tab);
  }, [services, tab]);

  return (
    <div className="relative z-10 w-full">
      <header className="mx-auto max-w-3xl px-4 pt-14 text-center md:px-6 md:pt-20">
        <p className="text-xs font-semibold tracking-[0.22em] text-zinc-500 uppercase">Услуги</p>
        <h1 className="mt-5 text-balance text-[2rem] font-bold tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.08]">
          Сервис для колёс — в одном месте
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-zinc-400 md:text-base">
          Покраска и правка дисков, шиномонтаж, хранение и заправка кондиционера — выберите направление или
          пролистайте все услуги.
        </p>
      </header>

      <nav
        className="mx-auto mt-10 flex justify-center px-4 md:mt-12 md:px-6"
        aria-label="Фильтр по категориям услуг"
      >
        <div
          className="inline-flex max-w-full flex-wrap items-center justify-center gap-1 rounded-full border border-white/10 bg-zinc-900/70 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md md:flex-nowrap md:gap-0"
          role="tablist"
        >
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t.id)}
                className={cn(
                  "min-h-10 shrink-0 rounded-full px-3.5 py-2 text-[13px] font-semibold tracking-tight transition md:px-5",
                  active
                    ? "bg-white text-zinc-950 shadow-[0_4px_24px_rgba(255,255,255,0.12)]"
                    : "text-zinc-400 hover:text-zinc-200",
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="relative mt-12 md:mt-16">
        <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
          {tab === "all" ? (
            <div className="overflow-hidden pb-10 pt-2 md:pb-14" aria-label="Все услуги — движущаяся лента">
              <div className="services-showcase-marquee-track flex w-max gap-6 md:gap-8">
                {[...filtered, ...filtered].map((item, loopIdx) => (
                  <ServicePhoneCard key={`${item.slug}-${loopIdx}`} item={item} />
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-6 px-4 pb-10 pt-2 md:gap-8 md:px-6 md:pb-14">
              {filtered.map((item) => (
                <ServicePhoneCard key={item.slug} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
