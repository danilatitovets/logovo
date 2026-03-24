import Link from "next/link";
import type { TeamReview } from "@/data/team-reviews";
import { teamReviews } from "@/data/team-reviews";
import { team } from "@/data/team";

function authorInitial(name: string) {
  const t = name.trim();
  return t[0]?.toUpperCase() ?? "?";
}

/** Горизонтальная карточка в одном стиле с карточкой мастера: слева градиент + буква, справа контент. */
function HorizontalPersonCard({
  badge,
  title,
  subtitle,
  body,
}: {
  badge: string;
  title: string;
  subtitle?: string;
  body?: string;
}) {
  const letter = authorInitial(title);
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 sm:flex-row sm:items-stretch">
      <div className="relative aspect-5/3 shrink-0 sm:aspect-auto sm:w-[min(38%,280px)] sm:min-h-[200px]">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#ff5a5f_0%,#ff6e72_35%,#1a0f12_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/50" />
        <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/40 px-2.5 py-1 text-[10px] font-semibold tracking-widest text-zinc-100 uppercase">
          {badge}
        </span>
        <span className="absolute bottom-4 right-4 text-4xl font-bold tracking-tight text-white/90">{letter}</span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center p-6 md:p-8">
        <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl md:text-3xl">{title}</h3>
        {subtitle ? <p className="mt-2 text-[15px] text-zinc-400">{subtitle}</p> : null}
        {body ? <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">{body}</p> : null}
      </div>
    </article>
  );
}

function ReviewCard({ review }: { review: TeamReview }) {
  return (
    <HorizontalPersonCard
      badge="Отзыв"
      title={review.author}
      body={review.text}
    />
  );
}

export function TeamSection() {
  const featured = team[0]!;
  const initials = featured.name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <section id="team" className="scroll-mt-20 bg-black" data-header-theme="dark">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(260px,0.88fr)_minmax(0,1.45fr)] lg:items-start lg:gap-12">
          <aside className="self-start lg:sticky lg:top-24 lg:z-10 lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto lg:pr-2">
            <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">Наша команда</p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
              Люди, за которыми приезжают снова
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-zinc-400">
              Слева текст остаётся на экране. Справа — карточка мастера и такие же карточки с отзывами клиентов.
            </p>
            <Link
              href="/team"
              className="mt-6 inline-flex h-9 items-center rounded-full border border-white/20 px-4 text-[11px] font-semibold tracking-[0.12em] text-zinc-200 uppercase transition hover:border-white/40 hover:text-white"
            >
              Вся команда
            </Link>
          </aside>

          <div className="min-w-0 space-y-5">
            <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 sm:flex-row sm:items-stretch">
              <div className="relative aspect-5/3 shrink-0 sm:aspect-auto sm:w-[min(38%,280px)] sm:min-h-[200px]">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#ff5a5f_0%,#ff6e72_35%,#1a0f12_100%)]" />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/50" />
                <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/40 px-2.5 py-1 text-[10px] font-semibold tracking-widest text-zinc-100 uppercase">
                  Мастер
                </span>
                <span className="absolute bottom-4 right-4 text-4xl font-bold tracking-tight text-white/90">{initials}</span>
              </div>
              <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
                <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{featured.name}</h3>
                <p className="mt-2 text-[15px] text-zinc-400">{featured.role}</p>
                <p className="mt-1 text-sm text-zinc-500">Стаж: {featured.experience}</p>
              </div>
            </article>

            <p className="pt-2 text-xs font-semibold tracking-widest text-zinc-500 uppercase">Отзывы</p>
            <ul className="space-y-5">
              {teamReviews.map((review) => (
                <li key={`${review.author}-${review.text.slice(0, 32)}`}>
                  <ReviewCard review={review} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
