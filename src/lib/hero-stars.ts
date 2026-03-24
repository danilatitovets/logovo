/**
 * Детерминированное «астрономическое» поле: скопления + полоса сгущения,
 * без равномерной «решётки» от простого seed % 100.
 */

export type HeroStar = {
  left: number;
  top: number;
  size: number;
  opacity: number;
  dur: number;
  delay: number;
  /** 0 = холодный сине-белый, 1 = нейтральный, 2 = чуть теплее (яркие) */
  tone: 0 | 1 | 2;
  /** сильнее свечение у редких ярких */
  glow: "none" | "soft" | "strong";
};

function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Плотность «полосы Галактики»: диагональное сгущение */
function milkyWayDensity(x: number, y: number): number {
  const dx = x - 0.42;
  const dy = y - 0.18;
  const cos = 0.76;
  const sin = 0.65;
  const u = dx * cos + dy * sin;
  const v = -dx * sin + dy * cos;
  const along = Math.exp(-((u - 0.05) * (u - 0.05)) / (2 * 0.42 * 0.42));
  const across = Math.exp(-(v * v) / (2 * 0.11 * 0.11));
  return 0.12 + 0.88 * along * across;
}

/** Центр логотипа — реже мелочь, чтобы не шумело */
function logoMask(x: number, y: number): number {
  if (x > 0.34 && x < 0.66 && y > 0.38 && y < 0.62) return 0.22;
  return 1;
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function pushCluster(
  rng: () => number,
  out: HeroStar[],
  cx: number,
  cy: number,
  spread: number,
  count: number,
) {
  for (let i = 0; i < count; i++) {
    const a = rng() * Math.PI * 2;
    const r = spread * Math.sqrt(-2 * Math.log(rng() + 1e-12));
    const x = clamp01(cx + r * Math.cos(a));
    const y = clamp01(cy + r * Math.sin(a));
    if (logoMask(x, y) < rng()) continue;
    const roll = rng();
    const size = roll > 0.92 ? 2 + rng() * 0.9 : roll > 0.65 ? 1.5 : 1;
    const opacity =
      size > 2 ? 0.38 + rng() * 0.35 : 0.18 + rng() * 0.42;
    const tone: 0 | 1 | 2 = roll > 0.85 ? 2 : roll > 0.4 ? 1 : 0;
    const glow: HeroStar["glow"] =
      size > 2.2 ? "strong" : size > 1.6 ? "soft" : "none";
    out.push({
      left: x,
      top: y,
      size,
      opacity,
      dur: 2.4 + rng() * 2.2,
      delay: rng() * 4,
      tone,
      glow,
    });
  }
}

function buildBackLayer(rng: () => number): HeroStar[] {
  const out: HeroStar[] = [];

  const clusters: { cx: number; cy: number; spread: number; n: number }[] = [
    { cx: 0.09, cy: 0.07, spread: 0.038, n: 12 },
    { cx: 0.91, cy: 0.11, spread: 0.03, n: 10 },
    { cx: 0.24, cy: 0.32, spread: 0.045, n: 14 },
    { cx: 0.76, cy: 0.26, spread: 0.036, n: 11 },
    { cx: 0.5, cy: 0.12, spread: 0.028, n: 9 },
    { cx: 0.14, cy: 0.48, spread: 0.034, n: 10 },
    { cx: 0.86, cy: 0.4, spread: 0.032, n: 9 },
    { cx: 0.45, cy: 0.52, spread: 0.026, n: 7 },
  ];

  for (const c of clusters) pushCluster(rng, out, c.cx, c.cy, c.spread, c.n);

  let attempts = 0;
  while (out.length < 155 && attempts < 8000) {
    attempts++;
    const x = rng();
    const y = rng();
    const p = milkyWayDensity(x, y) * logoMask(x, y);
    if (rng() > p * 0.95) continue;
    const roll = rng();
    const size = roll > 0.97 ? 2.2 : roll > 0.82 ? 1.5 : 1;
    const opacity = 0.14 + rng() * 0.38 * (size > 1.8 ? 1.4 : 1);
    out.push({
      left: x,
      top: y,
      size,
      opacity,
      dur: 2.1 + rng() * 2.4,
      delay: rng() * 5,
      tone: roll > 0.75 ? 1 : 0,
      glow: size > 2 ? "soft" : "none",
    });
  }

  return out;
}

/** Координаты 0…1 внутри своего слоя (контейнера) */
function buildMidLayer(rng: () => number): HeroStar[] {
  const out: HeroStar[] = [];
  let attempts = 0;
  while (out.length < 48 && attempts < 5000) {
    attempts++;
    const x = rng();
    const y = rng();
    const skyX = 0.08 + x * 0.84;
    const skyY = 0.58 + y * 0.22;
    const p = milkyWayDensity(skyX, skyY) * 0.65 * logoMask(skyX, skyY);
    if (rng() > p) continue;
    const roll = rng();
    const size = roll > 0.88 ? 1.8 : 1.2;
    out.push({
      left: x,
      top: y,
      size,
      opacity: 0.12 + rng() * 0.3,
      dur: 2.6 + rng() * 2,
      delay: rng() * 3.5,
      tone: 0,
      glow: "soft",
    });
  }
  return out;
}

function buildFlowLayer(rng: () => number): HeroStar[] {
  const out: HeroStar[] = [];
  let attempts = 0;
  while (out.length < 32 && attempts < 4000) {
    attempts++;
    const x = rng();
    const y = rng();
    const skyX = 0.05 + x * 0.9;
    const skyY = 0.72 + y * 0.14;
    if (rng() > milkyWayDensity(skyX, skyY) * 0.45 + 0.25) continue;
    const size = 1 + rng() * 0.85;
    out.push({
      left: x,
      top: y,
      size,
      opacity: 0.16 + rng() * 0.32,
      dur: 2.2 + rng() * 1.8,
      delay: rng() * 2.5,
      tone: 1,
      glow: rng() > 0.72 ? "soft" : "none",
    });
  }
  while (out.length < 28) {
    out.push({
      left: rng(),
      top: rng(),
      size: 1 + rng() * 0.6,
      opacity: 0.14 + rng() * 0.25,
      dur: 2 + rng() * 1.5,
      delay: rng() * 2,
      tone: 1,
      glow: "none",
    });
  }
  return out;
}

const STAR_BACK = buildBackLayer(mulberry32(0x9e3779b9));
const STAR_MID = buildMidLayer(mulberry32(0x85ebca6b));
const STAR_FLOW = buildFlowLayer(mulberry32(0xc2b2ae35));

export { STAR_BACK, STAR_MID, STAR_FLOW };

export function heroStarClassName(s: HeroStar): string {
  const tone =
    s.tone === 0
      ? "bg-sky-100"
      : s.tone === 2
        ? "bg-amber-50"
        : "bg-white";
  const glow =
    s.glow === "strong"
      ? "shadow-[0_0_14px_rgba(165,200,255,0.55),0_0_4px_rgba(255,255,255,0.45)]"
      : s.glow === "soft"
        ? "shadow-[0_0_7px_rgba(255,255,255,0.38)]"
        : "shadow-[0_0_2px_rgba(255,255,255,0.2)]";
  return `hero-star-twinkle absolute rounded-full ${tone} ${glow}`;
}
