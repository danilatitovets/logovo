import { PRICING_VIDEO_PAGE } from "@/data/pricing-videos";
import { PricingHoverVideo } from "@/components/pricing/pricing-hover-video";

type PricingCosmicVideoProps = {
  /** По умолчанию `2.mp4` со страницы прайса */
  src?: string;
};

/** Верхний визуальный блок страницы прайса — видео по наведению */
export function PricingCosmicVideo({ src = PRICING_VIDEO_PAGE }: PricingCosmicVideoProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <PricingHoverVideo src={src} />
    </div>
  );
}
