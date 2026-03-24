import { PricingPlans } from "@/components/pricing/pricing-plans";

export function PricesSection() {
  return (
    <section data-header-theme="dark">
      <PricingPlans showVideoSlot={false} variant="compact" />
    </section>
  );
}
