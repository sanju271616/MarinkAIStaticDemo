import { BRANDS, BRAND_SNAPSHOTS, hash, type QuadrantTopic } from "./marinkai-data";

export type DrillDownBrandRow = {
  brand: string;
  score: number;
  volume: number;
  sentiment: number;
  velocity: number;
  rank: number;
};

export type DrillDownDetailRow = {
  signal: string;
  mentions: number;
  sentiment: number;
  channel: string;
};

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

/** Brand-level breakdown for a topic/theme (All / Top 10 / Top 20). */
export function topicDrillDownBrands(topic: string, topicBase: QuadrantTopic, limit?: number): DrillDownBrandRow[] {
  const rnd = seeded(hash(topic) + 91);
  const rows = BRANDS.map((brand, i) => {
    const snap = BRAND_SNAPSHOTS[brand] ?? BRAND_SNAPSHOTS["CeraVe"]!;
    const wobble = (rnd() - 0.5) * 24;
    const volume = Math.round(topicBase.volume * (0.04 + rnd() * 0.22));
    return {
      brand,
      score: Number((snap.dis.score * (0.6 + rnd() * 0.8) + wobble * 0.1).toFixed(1)),
      volume,
      sentiment: Math.round(topicBase.sentiment + (rnd() - 0.5) * 28),
      velocity: Math.round(topicBase.velocity + (rnd() - 0.5) * 18),
      rank: Math.max(1, snap.dis.rank + Math.round((rnd() - 0.5) * 8) + i % 3),
    };
  })
    .sort((a, b) => b.volume - a.volume)
    .map((r, idx) => ({ ...r, rank: idx + 1 }));

  return limit ? rows.slice(0, limit) : rows;
}

/** Second-level drill-down signals for Future Focus. */
export function topicDrillDownDetails(topic: string, brand: string): DrillDownDetailRow[] {
  const rnd = seeded(hash(`${topic}-${brand}`) + 17);
  const channels = ["Instagram", "TikTok", "YouTube", "Editorial", "Reddit"];
  const signals = [
    "Ingredient conversation",
    "Clinical proof points",
    "Routine integration",
    "Price/value debate",
    "Creator endorsement",
    "Retail availability",
  ];
  return signals.slice(0, 4 + Math.floor(rnd() * 3)).map((signal, i) => ({
    signal,
    mentions: Math.round(1200 + rnd() * 48000),
    sentiment: Math.round((rnd() - 0.35) * 80),
    channel: channels[i % channels.length]!,
  }));
}

export function compareRows(primary: string, compareBrands: string[]): string[] {
  const seen = new Set<string>();
  const rows: string[] = [];
  for (const b of [primary, ...compareBrands]) {
    if (seen.has(b)) continue;
    seen.add(b);
    rows.push(b);
  }
  return rows.slice(0, 5);
}

export const DEFAULT_COMPARE_BRANDS = ["La Roche-Posay", "e.l.f", "EltaMD", "The Ordinary"];
