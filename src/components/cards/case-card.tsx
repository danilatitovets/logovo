import Image from "next/image";
import Link from "next/link";
import type { CaseItem } from "@/types";
import { cn } from "@/lib/utils";

type CaseCardProps = {
  item: CaseItem;
  /** `dark` — чёрно-серые карточки на тёмной странице; `light` — белые на светлой секции. */
  variant?: "light" | "dark";
};

export function CaseCard({ item, variant = "light" }: CaseCardProps) {
  const dark = variant === "dark";
  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl border transition-shadow duration-300",
        dark
          ? "border-white/10 bg-zinc-950 text-white shadow-[0_14px_48px_rgba(0,0,0,0.28)] hover:border-white/15 hover:shadow-[0_20px_56px_rgba(0,0,0,0.4)]"
          : "border-zinc-200 bg-white shadow-sm hover:shadow-md",
      )}
    >
      <Link
        href={`/cases/${item.slug}`}
        className={cn(
          "group block outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80 focus-visible:ring-offset-2",
          dark ? "focus-visible:ring-offset-black" : "focus-visible:ring-offset-white",
        )}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
          <Image
            src={item.coverImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover brightness-[0.9] opacity-90 transition duration-500 group-hover:scale-[1.03] group-hover:brightness-100 group-hover:opacity-100"
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-0 bg-linear-to-t from-black/62 via-black/10 to-transparent",
              !dark && "from-black/48",
            )}
          />
        </div>
        <div className="p-5 md:p-6">
          <h3 className={cn("text-lg font-semibold tracking-tight md:text-xl", dark ? "text-white" : "text-zinc-900")}>
            {item.title}
          </h3>
          <p className={cn("mt-2 text-sm leading-relaxed md:text-[15px]", dark ? "text-zinc-400" : "text-zinc-600")}>
            {item.challenge}
          </p>
          <span
            className={cn(
              "mt-4 inline-flex text-sm font-medium",
              dark ? "text-zinc-300 transition-colors group-hover:text-white" : "text-zinc-900",
            )}
          >
            Читать кейс
          </span>
        </div>
      </Link>
    </article>
  );
}
