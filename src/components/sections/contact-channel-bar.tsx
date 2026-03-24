import Link from "next/link";
import { Fragment } from "react";
import { siteConfig } from "@/data/site";
import { INSTAGRAM_URL } from "@/data/social";
import { cn } from "@/lib/utils";

type Kind = "external-http" | "tel" | "mailto" | "internal";

type Channel = { label: string; href: string; kind: Kind };

/**
 * Чёрно-белая «дорожка» каналов: стекло без цветных оттенков, много воздуха по бокам.
 */
export function ContactChannelBar() {
  const phoneHref = `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;

  const channels: Channel[] = [
    { label: "Instagram", href: INSTAGRAM_URL, kind: "external-http" },
    { label: "Позвонить", href: phoneHref, kind: "tel" },
    { label: "Почта", href: `mailto:${siteConfig.email}`, kind: "mailto" },
  ];

  const segmentClass =
    "inline-flex min-h-10 flex-1 items-center justify-center rounded-full px-2.5 py-2 text-center text-[11px] font-medium text-white transition hover:bg-white/12 sm:min-h-11 sm:flex-initial sm:px-4 sm:text-sm";

  const link = (item: Channel) =>
    item.kind === "internal" ? (
      <Link href={item.href} className={cn(segmentClass)}>
        {item.label}
      </Link>
    ) : (
      <a
        href={item.href}
        className={cn(segmentClass)}
        {...(item.kind === "external-http"
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {item.label}
      </a>
    );

  return (
    <div className="mx-auto w-full max-w-lg px-6 sm:max-w-xl sm:px-10 md:max-w-2xl md:px-16 lg:max-w-3xl lg:px-20 xl:px-24">
      <div className="relative overflow-hidden rounded-full border border-white/25 bg-black/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div
          className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-r from-white/[0.07] via-white/[0.03] to-white/[0.07]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-px rounded-full bg-linear-to-b from-white/[0.06] to-transparent opacity-70"
          aria-hidden
        />
        <nav
          className="relative flex flex-wrap items-stretch justify-center gap-1.5 p-2 backdrop-blur-xl sm:flex-nowrap sm:gap-0 sm:p-1.5"
          aria-label="Каналы связи"
        >
          {channels.map((item, i) => (
            <Fragment key={item.href}>
              {i > 0 ? (
                <span
                  className="hidden h-8 w-px shrink-0 self-center bg-white/20 sm:block"
                  aria-hidden
                />
              ) : null}
              {link(item)}
            </Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
}
