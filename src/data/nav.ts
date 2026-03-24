import type { NavItem } from "@/types";

/** Только ключевые разделы в шапке; остальное — в футере и по прямым URL */
export const navItems: NavItem[] = [
  { label: "Услуги", href: "/services" },
  { label: "Прайс", href: "/prices" },
  { label: "Адреса", href: "/locations" },
  { label: "Поддержка", href: "/support" },
  { label: "Контакты", href: "/contacts" },
];
