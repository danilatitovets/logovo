export type NavItem = {
  label: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  /** Путь к логотипу в `public`, например `/images/logo.png` */
  logoSrc: string;
  /**
   * Если логотип монохромный (тёмный на прозрачном), на тёмном хедере включается инверсия.
   * Для цветного логотипа поставьте `false`.
   */
  logoInvertOnDark?: boolean;
  description: string;
  phone: string;
  email: string;
  address: string;
  workHours: string;
};

export type Service = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  /** Обложка в `public/images/services/` */
  coverImage: string;
};

export type PriceItem = {
  id: string;
  service: string;
  price: string;
  note?: string;
};

export type Location = {
  slug: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  experience: string;
};

export type Client = {
  id: string;
  name: string;
  niche: string;
};

export type TestimonialSource = "appstore" | "google" | "telegram" | "web";

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  sourceLabel: string;
  source: TestimonialSource;
};

export type CaseItem = {
  slug: string;
  title: string;
  challenge: string;
  result: string;
  /** Обложка в `public` (например `/images/кейсы/1.png`) */
  coverImage: string;
};
