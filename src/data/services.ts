import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "powder-coating",
    title: "Покраска дисков (полимерная)",
    excerpt: "Полное восстановление внешнего вида дисков.",
    description:
      "Удаляем старое покрытие, подготавливаем поверхность и наносим прочную полимерную краску.\n\nДиски становятся устойчивыми к сколам, реагентам и погоде — выглядят как новые.",
    coverImage: "/images/services/pokraskadiskov.webp",
  },
  {
    slug: "wheel-straightening",
    title: "Правка дисков",
    excerpt: "Исправляем геометрию дисков после ударов и ям.",
    description:
      "Убираем биение, возвращаем ровную форму без потери прочности.\n\nРаботаем аккуратно, чтобы диск служил дальше без проблем.",
    coverImage: "/images/services/pravkadiskov.webp",
  },
  {
    slug: "tire-fitting",
    title: "Шиномонтаж",
    excerpt: "Полный комплекс работ: снятие, установка, балансировка.",
    description:
      "Оборудование позволяет работать с разными типами дисков без повреждений.\n\nДелаем быстро и аккуратно.",
    coverImage: "/images/services/hinomatah.webp",
  },
  {
    slug: "puncture-repair",
    title: "Ремонт прокола",
    excerpt: "Находим и устраняем проколы и мелкие повреждения.",
    description:
      "Используем проверенные материалы, чтобы ремонт держался, а не «на время».\n\nВ большинстве случаев — без необходимости менять шину.",
    coverImage: "/images/services/remontprokola.webp",
  },
  {
    slug: "wheel-storage",
    title: "Хранение колес",
    excerpt: "Принимаем колёса на сезонное хранение.",
    description:
      "Правильные условия без влаги и перепадов температуры.\n\nКолёса сохраняют форму и свойства до следующего сезона.",
    coverImage: "/images/services/hraneniakoles.webp",
  },
  {
    slug: "ac-refill",
    title: "Заправка кондиционера",
    excerpt: "Проверяем систему, заправляем фреон, выявляем утечки.",
    description:
      "Кондиционер работает стабильно и эффективно.\n\nБез лишних работ — только по факту.",
    coverImage: "/images/services/zapravkakomdi.webp",
  },
];
