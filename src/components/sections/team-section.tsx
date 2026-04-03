import Image from "next/image";
import Link from "next/link";
import type { TeamShowcaseCard } from "@/data/team-showcase";
import { teamShowcaseCards } from "@/data/team-showcase";

function authorInitial(name: string) {
  const t = name.trim();
  return t[0]?.toUpperCase() ?? "?";
}

function MasterPhotoCard({ card }: { card: TeamShowcaseCard }) {
  const letter = authorInitial(card.name);
  const hasPhoto = Boolean(card.photo?.trim());

  return (
    <article className="group relative aspect-3/4 w-full max-w-[min(100%,16rem)] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 sm:max-w-[min(100%,18rem)] md:max-w-[min(100%,19rem)]">
      {hasPhoto && card.photo ? (
        <Image
          src={card.photo}
          alt={card.name}
          fill
          sizes="(max-width: 767px) 42vw, (max-width: 1023px) 22vw, 200px"
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
        />
      ) : null}
      {hasPhoto ? (
        <span className="absolute left-3 top-3 z-10 rounded-full border border-white/25 bg-black/40 px-2.5 py-1 text-[9px] font-semibold tracking-widest text-white/95 uppercase backdrop-blur-sm">
          Мастер
        </span>
      ) : null}
      {!hasPhoto ? (
        <div className="absolute inset-0 bg-[linear-gradient(160deg,#ff5a5f_0%,#ff6e72_32%,#1a0f12_88%)]">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/55" />
          <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-black/35 px-2.5 py-1 text-[9px] font-semibold tracking-widest text-white/95 uppercase">
            Мастер
          </span>
          <span className="absolute bottom-16 left-1/2 -translate-x-1/2 text-5xl font-bold tracking-tight text-white/25 sm:text-6xl">
            {letter}
          </span>
        </div>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/75 to-transparent px-3 pb-3 pt-14 sm:px-4 sm:pb-4">
        <h3 className="text-pretty text-base font-semibold tracking-tight text-white sm:text-lg">{card.name}</h3>
      </div>
    </article>
  );
}

export function TeamSection() {
  return (
    <section id="team" className="scroll-mt-20 min-w-0 overflow-x-clip bg-black" data-header-theme="dark">
      <div className="mx-auto w-full min-w-0 max-w-6xl px-3 py-14 sm:px-4 md:px-6 md:py-20">
        <div className="grid grid-cols-[minmax(14.5rem,48%)_minmax(0,1fr)] items-start gap-3 sm:grid-cols-[minmax(15.5rem,42%)_minmax(0,1fr)] sm:gap-4 md:grid-cols-[minmax(15rem,0.4fr)_minmax(0,1fr)] md:gap-10 lg:grid-cols-[minmax(17rem,0.42fr)_minmax(0,1fr)] lg:gap-12">
          <aside className="sticky top-20 z-10 min-w-0 self-start text-left md:top-24">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-zinc-500 uppercase sm:text-[12px] sm:tracking-[0.2em]">
              Наша команда
            </p>
            <h2 className="mt-2.5 text-[17px] font-bold leading-snug tracking-tight text-white sm:mt-3 sm:text-xl md:text-4xl md:leading-tight lg:text-[2.5rem] lg:leading-tight">
              <span className="block">
                Люди, за&nbsp;которыми
              </span>
              <span className="block">
                приезжают&nbsp;снова
              </span>
            </h2>
            <p className="mt-3 max-w-md text-[13px] leading-relaxed text-zinc-400 sm:mt-4 sm:text-[15px] md:text-base">
              Прокручивайте страницу вниз: блок слева остаётся на месте, справа по очереди проходят карточки мастеров.
            </p>
            <Link
              href="/team"
              className="mt-5 inline-flex h-9 max-w-full items-center justify-center rounded-full border border-white/20 px-4 text-[11px] font-semibold tracking-[0.12em] text-zinc-200 uppercase transition hover:border-white/40 hover:text-white sm:mt-6 sm:h-10 sm:px-5 sm:text-xs"
            >
              Вся команда
            </Link>
          </aside>

          <div className="min-w-0 text-center md:text-right">
            <p className="mb-4 text-[10px] font-semibold tracking-widest text-zinc-500 uppercase sm:mb-5 sm:text-xs md:mb-6">
              Мастера
            </p>
            <ul className="grid grid-cols-1 justify-items-center gap-10 sm:gap-12 md:grid-cols-2 md:justify-items-end md:gap-x-6 md:gap-y-12 lg:gap-x-8 lg:gap-y-14">
              {teamShowcaseCards.map((card) => (
                <li key={card.id} className="flex w-full justify-center md:justify-end">
                  <MasterPhotoCard card={card} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
