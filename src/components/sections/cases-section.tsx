import Image from "next/image";
import Link from "next/link";
import { cases } from "@/data/cases";

function marqueeSlice(start: number, length: number) {
  return Array.from({ length }, (_, i) => {
    const c = cases[(start + i) % cases.length];
    return {
      id: `${c.slug}-${start + i}`,
      src: c.coverImage,
      title: c.title,
      href: `/cases/${c.slug}` as const,
    };
  });
}

export function CasesSection() {
  const topRow = marqueeSlice(0, 6);
  const bottomRow = marqueeSlice(4, 6);

  return (
    <section className="min-w-0 overflow-x-hidden bg-black" data-header-theme="dark">
      <div className="mx-auto w-full min-w-0 max-w-[1440px] px-0 py-12 md:py-20">
        <div className="mx-auto w-full min-w-0 max-w-6xl px-3 sm:px-4 md:px-6">
          <p className="text-xs font-semibold tracking-[0.2em] text-amber-400 uppercase">Реальные задачи</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-5xl">
            <span className="text-amber-400">Кейсы</span>
            <span className="text-white"> в действии</span>
          </h2>
        </div>

        <div className="relative mt-10 overflow-hidden border-y border-white/10 bg-black md:mt-12">
          <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-r from-black via-transparent to-black" />
          <div className="space-y-3 py-3 md:space-y-4 md:py-4">
            <div
              className="cases-marquee-track-left flex w-max gap-2 pr-2"
              style={{ animationDuration: "52s" }}
            >
              {[...topRow, ...topRow].map((item, i) => (
                <Link
                  key={`${item.id}-${i}`}
                  href={item.href}
                  className="group relative block h-36 w-64 shrink-0 overflow-hidden rounded-sm border border-white/10 bg-zinc-950 sm:h-40 sm:w-72 md:h-48 md:w-80 lg:h-52 lg:w-96"
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 260px, (max-width: 1024px) 320px, 384px"
                    className="object-cover brightness-[0.88] opacity-90 transition duration-500 group-hover:scale-105 group-hover:brightness-100 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/82 via-black/32 to-black/10" />
                  <p className="absolute inset-x-3 bottom-2 text-sm font-medium text-zinc-100 md:bottom-3 md:text-base">
                    <span className="inline-block rounded-md bg-black/35 px-2 py-1 backdrop-blur-[2px]">
                      {item.title}
                    </span>
                  </p>
                </Link>
              ))}
            </div>

            <div
              className="cases-marquee-track-right flex w-max gap-2 pr-2"
              style={{ animationDuration: "58s" }}
            >
              {[...bottomRow, ...bottomRow].map((item, i) => (
                <Link
                  key={`${item.id}-${i}`}
                  href={item.href}
                  className="group relative block h-36 w-64 shrink-0 overflow-hidden rounded-sm border border-white/10 bg-zinc-950 sm:h-40 sm:w-72 md:h-48 md:w-80 lg:h-52 lg:w-96"
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 260px, (max-width: 1024px) 320px, 384px"
                    className="object-cover brightness-[0.88] opacity-90 transition duration-500 group-hover:scale-105 group-hover:brightness-100 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/82 via-black/32 to-black/10" />
                  <p className="absolute inset-x-3 bottom-2 text-sm font-medium text-zinc-100 md:bottom-3 md:text-base">
                    <span className="inline-block rounded-md bg-black/35 px-2 py-1 backdrop-blur-[2px]">
                      {item.title}
                    </span>
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
