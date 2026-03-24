/** Прейскурант: комплекс шиномонтажа и сопутствующие услуги */

export const pricingPageIntro = {
  title: "Прейскурант",
  subtitle: "Комплекс шиномонтажа",
  includedLine: "В стоимость ВКЛЮЧЕНЫ все расходные материалы:",
};

export const freeIncludedItems: { label: string; price: string }[] = [
  { label: "Проверка диска на биение", price: "0 ₽" },
  { label: "Грузики, пакеты, вентиль", price: "0 ₽" },
];

/** Заголовки колонок основной таблицы */
export const tireComplexColumns = [
  "R13–R14",
  "R15–R16",
  "R17",
  "R18",
  "R19",
  "R20",
  "R21",
  "от R22",
] as const;

export type TireRow = {
  name: string;
  /** Числа или строки вида «от 9» */
  values: (number | string)[];
  /** Подсветка строки (жёлтый акцент) */
  accent?: boolean;
};

export const tireComplexRows: TireRow[] = [
  { name: "Снятие", values: [4, 4, 5, 6, 7, 8, 8, "от 9"] },
  { name: "Установка", values: [4, 4, 5, 6, 7, 8, 8, "от 9"] },
  { name: "Демонтаж", values: [4, 4, 5, 6, 7, 8, 8, "от 9"] },
  { name: "Монтаж", values: [4, 4, 5, 6, 7, 8, 8, "от 9"] },
  { name: "Балансировка", values: [4, 4, 5, 6, 7, 8, 8, "от 9"] },
  { name: "КОМПЛЕКС 1К", values: [20, 20, 25, 30, 35, 40, 40, "от 45"], accent: true },
  { name: "КОМПЛЕКС 4К", values: [70, 80, 90, 100, 110, 120, 130, "от 140"], accent: true },
];

export const tireSurchargeNote =
  "Надбавка за профиль от 45, 40, 35, 30, а также RFT, RSC, С, A/T, L/T и т.д. — +30%";

/** Комплекс балансировки (отдельная таблица) */
export const balanceColumns = ["R13–R14", "R15–R16", "R17–R18", "R19–R20", "R21 и более"] as const;

export const balanceRows: { name: string; values: number[] }[] = [
  { name: "КОМПЛЕКС 4К", values: [40, 50, 60, 70, 80] },
];

export const diskRepair = {
  title: "Правка дисков",
  rows: [
    { type: "Железо", price: "от 40 ₽" },
    { type: "Литьё", price: "от 50 ₽" },
  ],
  note: "В зависимости от количества и сложности работы",
};

export const wheelRepairColumns = ["СТАНДАРТ", "ГРИБОК", "TL110", "TL113–115", "TL119–120"] as const;

export const wheelRepairRows: { name: string; values: (number | string)[] }[] = [
  { name: "Латка", values: [15, 20, 25, 30, 40] },
];

export const boosterLine = {
  label: "Взрывная накачка (бустер)",
  price: "5 ₽",
  hint: "1 колесо",
};

export const extraServices: string[] = [
  "Выкрутка сломанных секреток и болтов — 50 ₽ / шт",
  "Выкрутка проблемных болтов и гаек (распухшие, зализанные, заломанные) — 5 ₽ / шт",
  "Чистка посадочного / ступицы + обработка медной смазкой — 5 ₽ / шт",
  "Аргонная сварка — от 80 ₽ (в зависимости от количества и сложности работы)",
  "Подкачка 4-х колёс — 5 ₽",
  "Утилизация резины — 20 ₽ / 1 колесо (кроме шипованной)",
];

export const pricingBottomBanner = {
  title: "Записаться на сервис",
  description: "Уточните удобное время и адрес — перезвоним и подтвердим запись.",
  ctaLabel: "Записаться",
  ctaHref: "/book",
};

/** Три карточки на лендинге (логика «Старт — Драйв — Максимум», центр с жёлтым акцентом) */
export type PricingLandingCard = {
  id: string;
  title: string;
  badge?: string;
  priceLine: string;
  priceHint?: string;
  description: string;
  bullets: string[];
  highlight: boolean;
};

export const pricingLandingCards: PricingLandingCard[] = [
  {
    id: "start",
    title: "Старт",
    priceLine: "от 4 ₽",
    priceHint: "операция · R13–R16",
    description: "Снятие, монтаж, демонтаж и баланс по отдельности — малые диаметры.",
    bullets: ["КОМПЛЕКС 1К — 20 ₽ / комплект", "КОМПЛЕКС 4К — от 70 ₽", "Расходники и вентиль — 0 ₽"],
    highlight: false,
  },
  {
    id: "drive",
    title: "Драйв",
    badge: "Чаще всего",
    priceLine: "от 6–8 ₽",
    priceHint: "операция · R17–R21",
    description: "Средний и крупный радиус: кроссоверы, спорт, низкий профиль.",
    bullets: ["КОМПЛЕКС 1К — от 25 ₽", "КОМПЛЕКС 4К — от 90–120 ₽", "Надбавка за профиль и тип шины +30%"],
    highlight: true,
  },
  {
    id: "max",
    title: "Максимум",
    priceLine: "от 9 ₽",
    priceHint: "от R22 · флот",
    description: "Крупногабарит, парки и юрлица — условия и график по договору.",
    bullets: ["Индивидуальный расчёт", "Закрывающие документы", "Персональный контакт"],
    highlight: false,
  },
];
