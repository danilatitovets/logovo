import Image from "next/image";
import Link from "next/link";
import { HeroNightSkyBackdrop } from "@/components/effects/hero-night-sky-backdrop";
import { siteConfig } from "@/data/site";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/data/social";
import { cn } from "@/lib/utils";

type ChannelKind = "external" | "tel" | "mailto";

type ContactCardDef = {
  key: string;
  label: string;
  line: string;
  detail: string;
  imageSrc: string;
  href: string;
  kind: ChannelKind;
};

const phoneDigits = siteConfig.phone.replace(/[^\d+]/g, "");
const phoneHref = `tel:${phoneDigits}`;

const CONTACT_CARDS: ContactCardDef[] = [
  {
    key: "instagram",
    label: "Instagram",
    line: `@${INSTAGRAM_HANDLE}`,
    detail: "Новости, работы и запись",
    imageSrc: "/images/planet/1.webp",
    href: INSTAGRAM_URL,
    kind: "external",
  },
  {
    key: "phone",
    label: "Позвонить",
    line: siteConfig.phone,
    detail: "Сразу по телефону",
    imageSrc: "/images/planet/2.webp",
    href: phoneHref,
    kind: "tel",
  },
  {
    key: "email",
    label: "Почта",
    line: siteConfig.email,
    detail: "Для заявок и вопросов",
    imageSrc: "/images/planet/3.webp",
    href: `mailto:${siteConfig.email}`,
    kind: "mailto",
  },
];

function ContactChannelCard({ card }: { card: ContactCardDef }) {
  const inner = (
    <>
      <div className="relative aspect-3/4 w-full overflow-hidden bg-zinc-950 sm:aspect-4/5">
        <Image
          src={card.imageSrc}
          alt=""
          fill
          sizes="(max-width:768px) 92vw, 320px"
          className="object-cover brightness-[0.9] contrast-[1.05] saturate-[1.12] transition duration-500 ease-out group-hover:brightness-[1.02] group-hover:saturate-[1.28] group-hover:contrast-110"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
          aria-hidden
        />
      </div>
      <div className="border-t border-white/10 bg-zinc-950/95 px-5 py-4 backdrop-blur-md">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-zinc-500 uppercase">{card.label}</p>
        <p className="font-display mt-2 text-lg font-bold tracking-tight text-white sm:text-xl">{card.line}</p>
        <p className="mt-1.5 text-[13px] leading-snug text-zinc-500">{card.detail}</p>
      </div>
    </>
  );

  const shellClass = cn(
    "group relative block overflow-hidden rounded-2xl border border-white/12 bg-black shadow-[0_24px_64px_rgba(0,0,0,0.65)]",
    "transition duration-300 ease-out",
    "hover:-translate-y-1 hover:border-white/22 hover:shadow-[0_32px_72px_rgba(0,0,0,0.75)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
  );

  const aria = `${card.label}: ${card.line}`;

  if (card.kind === "external") {
    return (
      <a
        href={card.href}
        target="_blank"
        rel="noopener noreferrer"
        className={shellClass}
        aria-label={aria}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={card.href} className={shellClass} aria-label={aria}>
      {inner}
    </Link>
  );
}

export function ContactSection() {
  return (
    <div
      className="relative min-h-[70vh] min-w-0 overflow-x-hidden bg-black text-zinc-100"
      data-header-theme="dark"
    >
      <HeroNightSkyBackdrop />
      <div className="relative z-10 mx-auto min-w-0 max-w-6xl px-3 pt-10 pb-14 sm:px-4 md:px-6 md:pt-16 md:pb-20">
        <header className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-yellow-400 uppercase">Контакты</p>
          <h1 className="font-display mt-4 text-balance text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.5rem]">
            Свяжитесь с LOGOVO
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-zinc-500">
            Instagram, звонок или почта — актуальные контакты сети LOGOVO в Минске.
          </p>
        </header>

        <nav
          className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-2 md:mt-16 md:grid-cols-3 md:gap-7"
          aria-label="Каналы связи"
        >
          {CONTACT_CARDS.map((card) => (
            <ContactChannelCard key={card.key} card={card} />
          ))}
        </nav>
      </div>
    </div>
  );
}
