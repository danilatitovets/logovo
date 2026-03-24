import type { Metadata } from "next";
import { HeroNightSkyBackdrop } from "@/components/effects/hero-night-sky-backdrop";
import { CasesPageShowcase } from "@/components/sections/cases-page-showcase";
import { cases } from "@/data/cases";

export const metadata: Metadata = { title: "Кейсы" };

export default function CasesPage() {
  return (
    <section
      className="relative min-h-screen overflow-x-hidden bg-black text-zinc-100"
      data-header-theme="dark"
    >
      <HeroNightSkyBackdrop />
      <div className="relative z-10 w-full pb-16 md:pb-24">
        <CasesPageShowcase cases={cases} />
      </div>
    </section>
  );
}
