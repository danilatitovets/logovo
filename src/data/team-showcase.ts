export type TeamShowcaseCard = {
  id: string;
  name: string;
  /** Путь в `public`, напр. `/images/team/alexander.jpg` — пока не добавили файл, карточка с градиентом */
  photo?: string;
};

/** Карточки мастеров на главной (только имя + фото). */
export const teamShowcaseCards: TeamShowcaseCard[] = [
  { id: "alexander", name: "Александр" },
  { id: "angelina", name: "Ангелина" },
  { id: "anzhelika", name: "Анжелика" },
  { id: "li", name: "Ли" },
  { id: "aleksey", name: "Алексей" },
  { id: "pavel", name: "Павел" },
  { id: "yulia", name: "Юлия" },
];
