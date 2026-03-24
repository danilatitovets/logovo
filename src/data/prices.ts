import type { PriceItem } from "@/types";

/** Кратко для SEO; полные таблицы — `pricing-pricelist.ts` */
export const prices: PriceItem[] = [
  { id: "p1", service: "КОМПЛЕКС 1К (R13–14)", price: "20 ₽ / колесо" },
  { id: "p2", service: "КОМПЛЕКС 4К шиномонтаж (R15–16)", price: "80 ₽ / комплект" },
  { id: "p3", service: "КОМПЛЕКС 4К балансировка (R17–18)", price: "60 ₽ / комплект" },
  { id: "p4", service: "Латка (стандарт)", price: "15 ₽", note: "см. таблицу типов" },
];
