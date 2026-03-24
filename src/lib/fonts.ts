import { Inter, Manrope } from "next/font/google";

/** Нейтральный UI: шапка, интерфейс, основной текст */
export const fontUi = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-ui",
});

/** Акцентные заголовки (блок услуг и т.п.) — не использовать в хедере */
export const fontDisplay = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});
