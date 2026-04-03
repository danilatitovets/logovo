import type { Metadata } from "next";
import { HeroNightSkyBackdrop } from "@/components/effects/hero-night-sky-backdrop";
import { PricingPlans } from "@/components/pricing/pricing-plans";

export const metadata: Metadata = {
  title: "Прейскурант",
  description:
    "Прейскурант LOGOVO: шиномонтаж и ремонт. Отдельно — скидки и программа «тайный покупатель». В стоимость включены расходные материалы.",
};

export default function PricesPage() {
  return (
    <section className="relative min-w-0 overflow-x-hidden bg-black" data-header-theme="dark">
      <HeroNightSkyBackdrop />
      <div className="relative z-10">
        <PricingPlans showVideoSlot={false} />
      </div>
    </section>
  );
}
