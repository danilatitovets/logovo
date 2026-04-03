import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cases } from "@/data/cases";

type CaseDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: CaseDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const item = cases.find((caseItem) => caseItem.slug === slug);
  if (!item) return { title: "Кейс не найден" };
  return { title: item.title, description: item.challenge };
}

export default async function CaseDetailPage({ params }: CaseDetailProps) {
  const { slug } = await params;
  const item = cases.find((caseItem) => caseItem.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <article className="min-h-[60vh] min-w-0 overflow-x-hidden bg-black text-zinc-100" data-header-theme="dark">
      <div className="mx-auto w-full min-w-0 max-w-4xl px-3 py-8 sm:px-4 md:px-6 md:py-14">
        <Link
          href="/cases"
          className="inline-flex text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-300"
        >
          ← Все кейсы
        </Link>

        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 md:aspect-[2/1]">
          <Image
            src={item.coverImage}
            alt=""
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20" />
        </div>

        <h1 className="mt-8 text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">{item.title}</h1>

        <div className="mt-8 space-y-5 text-[15px] leading-relaxed md:text-base">
          <p className="text-zinc-400">
            <span className="font-semibold text-zinc-200">Задача.</span> {item.challenge}
          </p>
          <p className="text-zinc-400">
            <span className="font-semibold text-zinc-200">Результат.</span> {item.result}
          </p>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <Link
            href="/cases"
            className="inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-white/35 hover:text-white"
          >
            Другие кейсы
          </Link>
        </div>
      </div>
    </article>
  );
}
