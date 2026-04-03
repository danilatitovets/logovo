export type OfficePoint = {
  id: string;
  /** Короткое имя для таблицы */
  city: string;
  /** Полный адрес для поиска в картах */
  fullAddress: string;
  lat: number;
  lng: number;
  coords: string;
  is24h?: boolean;
  markerLat: number;
  markerLng: number;
};

/** Реальные координаты точки входа; marker* — позиция метки на глобусе */
export const OFFICE_POINTS: OfficePoint[] = [
  {
    id: "lesh",
    city: "ул. Лещинского, 2/1",
    fullAddress: "Минск, ул. Лещинского, 2/1",
    lat: 53.9096,
    lng: 27.4311,
    coords: "КРУГЛОСУТОЧНО",
    is24h: true,
    markerLat: 53.935,
    markerLng: 27.37,
  },
  {
    id: "logo",
    city: "Логойский тракт, 46",
    fullAddress: "Минск, Логойский тракт, 46",
    lat: 53.9535,
    lng: 27.6167,
    coords: "КРУГЛОСУТОЧНО",
    is24h: true,
    markerLat: 53.978,
    markerLng: 27.67,
  },
  {
    id: "gurs",
    city: "ул. Гурского, 34",
    fullAddress: "Минск, ул. Гурского, 34",
    lat: 53.8743,
    lng: 27.4772,
    coords: "с 9:00 до 21:00",
    is24h: false,
    markerLat: 53.853,
    markerLng: 27.43,
  },
  {
    id: "dzer",
    city: "пр-т Дзержинского, 132/3",
    fullAddress: "Минск, проспект Дзержинского, 132/3",
    lat: 53.8498,
    lng: 27.4735,
    coords: "с 9:00 до 21:00",
    is24h: false,
    markerLat: 53.826,
    markerLng: 27.535,
  },
];

export const OFFICE_ARCS: Array<{ startLat: number; startLng: number; endLat: number; endLng: number }> = [
  { startLat: 53.935, startLng: 27.37, endLat: 53.978, endLng: 27.67 },
  { startLat: 53.978, startLng: 27.67, endLat: 53.853, endLng: 27.43 },
  { startLat: 53.853, startLng: 27.43, endLat: 53.826, endLng: 27.535 },
];

/** Центр Минска для карты-локатора */
export const MINSK_CENTER: [number, number] = [53.9023, 27.5619];
