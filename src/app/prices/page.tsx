import type { Metadata } from "next";
import { HeroNightSkyBackdrop } from "@/components/effects/hero-night-sky-backdrop";
import { PricingPlans } from "@/components/pricing/pricing-plans";

export const metadata: Metadata = {
  title: "Прейскурант",
  description:
    "Прейскурант комплекса шиномонтажа: монтаж, балансировка, ремонт колёс, дополнительные услуги LOGOVO.",
};

export default function PricesPage() {
  return (
    <section className="relative overflow-hidden bg-black" data-header-theme="dark">
      <HeroNightSkyBackdrop />
      <div className="relative z-10">
        <PricingPlans showVideoSlot={false} />
      </div>
    </section>
  );
}
