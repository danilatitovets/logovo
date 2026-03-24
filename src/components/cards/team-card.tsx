import { cn } from "@/lib/utils";
import type { TeamMember } from "@/types";

type TeamCardProps = {
  item: TeamMember;
  /** `dark` — чёрно-серые карточки на лендинге. */
  variant?: "light" | "dark";
  /** `feature` — карточка в стиле ленты/новостей. */
  layout?: "default" | "feature";
};

export function TeamCard({ item, variant = "light", layout = "default" }: TeamCardProps) {
  const dark = variant === "dark";
  const feature = layout === "feature";
  const initials = item.name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (feature) {
    return (
      <article className="group flex h-full flex-col">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
          <div className="aspect-16/10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.14),transparent_45%),linear-gradient(120deg,#151515_0%,#0a0a0a_55%,#1b1b1b_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-black/55 via-transparent to-white/8" />
          <span className="absolute left-5 top-5 text-3xl font-bold tracking-tight text-white/85">{initials}</span>
        </div>

        <div className="mt-4 flex flex-1 flex-col">
          <h3 className="text-xl font-semibold tracking-tight text-white">{item.name}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-zinc-400">{item.role}</p>
          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="text-[11px] tracking-[0.12em] text-zinc-500 uppercase">Стаж: {item.experience}</span>
            <button
              type="button"
              className="inline-flex h-9 items-center rounded-full border border-white/20 px-4 text-[11px] font-semibold tracking-[0.12em] text-zinc-200 uppercase transition hover:border-white/40 hover:text-white"
            >
              Профиль
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "rounded-2xl border p-5",
        dark ? "border-white/10 bg-zinc-950 text-white" : "border-zinc-200 bg-white",
      )}
    >
      <h3 className={cn("text-lg font-semibold", dark ? "text-white" : "text-zinc-900")}>{item.name}</h3>
      <p className={cn("mt-2 text-sm", dark ? "text-zinc-400" : "text-zinc-600")}>{item.role}</p>
      <p className={cn("mt-1 text-sm", dark ? "text-zinc-500" : "text-zinc-500")}>Стаж: {item.experience}</p>
    </article>
  );
}
