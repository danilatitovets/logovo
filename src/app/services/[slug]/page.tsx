import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroNightSkyBackdrop } from "@/components/effects/hero-night-sky-backdrop";
import { services } from "@/data/services";

type ServiceDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: ServiceDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const item = services.find((service) => service.slug === slug);
  if (!item) return { title: "Услуга не найдена" };
  return { title: item.title, description: item.excerpt };
}

export default async function ServiceDetailPage({ params }: ServiceDetailProps) {
  const { slug } = await params;
  const item = services.find((service) => service.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <section className="relative min-w-0 overflow-x-hidden bg-black text-zinc-100" data-header-theme="dark">
      <HeroNightSkyBackdrop />
      <div className="relative z-10 mx-auto w-full min-w-0 max-w-4xl px-3 py-12 sm:px-4 md:px-6 md:py-16">
        <Link
          href="/services"
          className="inline-flex items-center text-xs font-semibold tracking-[0.14em] text-zinc-400 uppercase transition hover:text-zinc-200"
        >
          ← Все услуги
        </Link>
        <article className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/50 md:p-8">
          <div className="relative aspect-video w-full border-b border-white/10 bg-zinc-950 md:aspect-21/9 md:rounded-t-2xl md:border-b-0">
            <Image
              src={item.coverImage}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width:896px) 100vw, 896px"
              priority
            />
          </div>
          <div className="p-6 md:p-8 md:pt-6">
          <p className="text-xs tracking-[0.12em] text-zinc-500 uppercase">Услуга</p>
          <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">{item.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-300">{item.excerpt}</p>
          <p className="mt-6 whitespace-pre-line text-[15px] leading-relaxed text-zinc-400">{item.description}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
