export type LocationSpot = {
  id: string;
  title: string;
  address: string;
  description: string;
  phone: string;
  routeUrl: string;
  lat: number;
  lng: number;
  zoom: number;
};

export const locationSpots: LocationSpot[] = [
  {
    id: "gurskogo-34",
    title: "Локация 01",
    address: "Гурского 34",
    description: "Быстрый поток для сезонной шинки и экспресс-обслуживания.",
    phone: "+375291234567",
    routeUrl: "https://maps.google.com/?q=Минск+Гурского+34",
    lat: 53.8743,
    lng: 27.4772,
    zoom: 13,
  },
  {
    id: "leshchinskogo-2",
    title: "Локация 02",
    address: "Лещинского 2",
    description: "Удобный заезд и отдельная линия на ремонт дисков.",
    phone: "+375292234567",
    routeUrl: "https://maps.google.com/?q=Минск+Лещинского+2",
    lat: 53.9096,
    lng: 27.4311,
    zoom: 13,
  },
  {
    id: "dzerzhinskogo-132-1",
    title: "Локация 03",
    address: "пр-т Дзержинского 132/1",
    description: "Современные стенды и точная балансировка под высокие нагрузки.",
    phone: "+375293234567",
    routeUrl: "https://maps.google.com/?q=Минск+Дзержинского+132/1",
    lat: 53.8498,
    lng: 27.4735,
    zoom: 13,
  },
  {
    id: "logoyskiy-tract-46",
    title: "Локация 04",
    address: "Логойский тракт 46",
    description: "Премиальный сервис с акцентом на комфорт и скорость выдачи.",
    phone: "+375294234567",
    routeUrl: "https://maps.google.com/?q=Минск+Логойский+тракт+46",
    lat: 53.9535,
    lng: 27.6167,
    zoom: 13,
  },
];
