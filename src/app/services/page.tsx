import type { Metadata } from "next";
import { HeroNightSkyBackdrop } from "@/components/effects/hero-night-sky-backdrop";
import { ServicesPageShowcase } from "@/components/sections/services-page-showcase";
import { services } from "@/data/services";

export const metadata: Metadata = { title: "Услуги" };

export default function ServicesPage() {
  return (
    <section
      className="relative min-h-screen overflow-x-hidden bg-black text-zinc-100"
      data-header-theme="dark"
    >
      <HeroNightSkyBackdrop />
      <div className="relative z-10 w-full min-w-0 pb-16 md:pb-24">
        <ServicesPageShowcase services={services} />
      </div>
    </section>
  );
}
