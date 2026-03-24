import Link from "next/link";
import type { Service } from "@/types";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  item: Service;
  variant?: "light" | "dark";
  index?: number;
};

export function ServiceCard({ item, variant = "light", index }: ServiceCardProps) {
  const dark = variant === "dark";
  return (
    <article
      className={cn(
        "rounded-2xl border p-5",
        dark
          ? "group relative overflow-hidden border-white/12 bg-zinc-950/75 text-white shadow-[0_14px_48px_rgba(0,0,0,0.38)]"
          : "border-zinc-200 bg-white",
      )}
    >
      {dark ? (
        <>
          <div
            className="pointer-events-none absolute -top-18 -right-14 h-40 w-40 rounded-full bg-indigo-500/15 blur-2xl transition-opacity duration-300 group-hover:opacity-90"
            aria-hidden
          />
          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] text-zinc-300 uppercase">
              <span className="inline-flex size-5 items-center justify-center rounded bg-amber-400/15 text-[11px] text-amber-300">
                {String((index ?? 0) + 1).padStart(2, "0")}
              </span>
              Услуга
            </div>
            <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">{item.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-zinc-300">{item.excerpt}</p>
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-500">
              {item.description.replace(/\n+/g, " ")}
            </p>
            <Link
              className="mt-6 inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:border-white/35 hover:bg-white/10"
              href={`/services/${item.slug}`}
            >
              Подробнее
            </Link>
          </div>
        </>
      ) : null}

      {!dark ? (
        <>
      <h3 className={cn("text-lg font-semibold", dark ? "text-white" : "text-zinc-900")}>{item.title}</h3>
      <p className={cn("mt-2 text-sm", dark ? "text-zinc-400" : "text-zinc-600")}>{item.excerpt}</p>
      <Link
        className={cn(
          "mt-4 inline-block text-sm font-medium",
          dark ? "text-zinc-300 transition-colors hover:text-white" : "text-zinc-900",
        )}
        href={`/services/${item.slug}`}
      >
        Подробнее
      </Link>
        </>
      ) : null}
    </article>
  );
}
