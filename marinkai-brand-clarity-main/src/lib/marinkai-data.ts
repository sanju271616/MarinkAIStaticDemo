export type MetricKey = "dis" | "prominence" | "affinity" | "advocacy";

export const METRICS: { key: MetricKey; label: string; short: string; color: string }[] = [
  { key: "dis", label: "Digital Impact Score", short: "DIS", color: "var(--metric-dis)" },
  { key: "prominence", label: "Prominence", short: "PRM", color: "var(--metric-prominence)" },
  { key: "affinity", label: "Affinity", short: "AFF", color: "var(--metric-affinity)" },
  { key: "advocacy", label: "Advocacy", short: "ADV", color: "var(--metric-advocacy)" },
];

export const MARKETS = ["United States", "United Kingdom", "Canada"];
export const CATEGORIES = ["Skincare", "Haircare", "Personal Care"];
export const BRANDS = [
  "CeraVe",
  "Allies of Skin",
  "La Roche-Posay",
  "e.l.f",
  "EltaMD",
  "The Ordinary",
  "Neutrogena",
  "Olay",
  "Dove",
];

export const COMPETITIVE_SET = ["Allies of Skin", "CeraVe", "EltaMD", "e.l.f", "La Roche-Posay"];

export const MONTHS_12 = [
  "Jun '24",
  "Jul '24",
  "Aug '24",
  "Sep '24",
  "Oct '24",
  "Nov '24",
  "Dec '24",
  "Jan '25",
  "Feb '25",
  "Mar '25",
  "Apr '25",
  "May '25",
];

export type MetricSnapshot = { score: number; rank: number; growth: number };
export type BrandSnapshot = Record<MetricKey, MetricSnapshot>;

export const BRAND_SNAPSHOTS: Record<string, BrandSnapshot> = {
  CeraVe: {
    dis: { score: 22.2, rank: 1, growth: -55.8 },
    prominence: { score: 41.1, rank: 1, growth: -28.9 },
    affinity: { score: 19.9, rank: 1, growth: -57.3 },
    advocacy: { score: 4.9, rank: 27, growth: -89.0 },
  },
  "Allies of Skin": {
    dis: { score: 9.4, rank: 12, growth: 18.6 },
    prominence: { score: 11.8, rank: 14, growth: 12.4 },
    affinity: { score: 14.2, rank: 6, growth: 24.9 },
    advocacy: { score: 8.1, rank: 9, growth: 41.2 },
  },
  "La Roche-Posay": {
    dis: { score: 18.7, rank: 2, growth: -12.3 },
    prominence: { score: 27.4, rank: 3, growth: -8.1 },
    affinity: { score: 17.1, rank: 3, growth: -15.6 },
    advocacy: { score: 6.4, rank: 18, growth: -34.7 },
  },
  "e.l.f": {
    dis: { score: 16.2, rank: 4, growth: 32.5 },
    prominence: { score: 24.9, rank: 4, growth: 46.1 },
    affinity: { score: 12.6, rank: 9, growth: 21.7 },
    advocacy: { score: 9.8, rank: 5, growth: 58.4 },
  },
  EltaMD: {
    dis: { score: 11.5, rank: 8, growth: -4.2 },
    prominence: { score: 13.7, rank: 11, growth: 2.8 },
    affinity: { score: 15.9, rank: 4, growth: -9.4 },
    advocacy: { score: 7.2, rank: 12, growth: -18.1 },
  },
  "The Ordinary": {
    dis: { score: 17.4, rank: 3, growth: 6.9 },
    prominence: { score: 29.1, rank: 2, growth: 11.2 },
    affinity: { score: 13.4, rank: 8, growth: -2.4 },
    advocacy: { score: 5.8, rank: 21, growth: -12.6 },
  },
  Neutrogena: {
    dis: { score: 14.8, rank: 5, growth: -19.4 },
    prominence: { score: 22.6, rank: 5, growth: -16.8 },
    affinity: { score: 11.9, rank: 11, growth: -22.1 },
    advocacy: { score: 4.2, rank: 29, growth: -41.3 },
  },
  Olay: {
    dis: { score: 12.9, rank: 6, growth: -7.8 },
    prominence: { score: 19.4, rank: 7, growth: -5.2 },
    affinity: { score: 10.7, rank: 14, growth: -11.9 },
    advocacy: { score: 3.9, rank: 31, growth: -26.5 },
  },
  Dove: {
    dis: { score: 12.1, rank: 7, growth: 3.4 },
    prominence: { score: 20.8, rank: 6, growth: 8.7 },
    affinity: { score: 9.8, rank: 17, growth: -1.6 },
    advocacy: { score: 4.4, rank: 28, growth: 5.9 },
  },
};

/* Deterministic pseudo-random so mock data is stable across renders. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

export function hash(str: string) {
  let h = 7;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 100000;
  return h;
}

export type TrendPoint = {
  month: string;
  dis: number;
  prominence: number;
  affinity: number;
  advocacy: number;
  disRank: number;
  prominenceRank: number;
  affinityRank: number;
  advocacyRank: number;
};

export function brandTrend(brand: string): TrendPoint[] {
  const snap = (BRAND_SNAPSHOTS[brand] ?? BRAND_SNAPSHOTS["CeraVe"]) as BrandSnapshot;
  const rnd = seeded(hash(brand) + 17);
  return MONTHS_12.map((month, i) => {
    const t = i / (MONTHS_12.length - 1);
    const build = (m: MetricSnapshot, wobble: number) => {
      const start = m.score / (1 + m.growth / 100);
      const base = start + (m.score - start) * Math.pow(t, 1.15);
      const value = base * (1 + (rnd() - 0.5) * wobble);
      return Math.max(0.6, Number(value.toFixed(1)));
    };
    const rankOf = (m: MetricSnapshot) =>
      Math.max(1, Math.round(m.rank + (1 - t) * (rnd() * 6 - 2)));
    return {
      month,
      dis: build(snap.dis, 0.12),
      prominence: build(snap.prominence, 0.1),
      affinity: build(snap.affinity, 0.14),
      advocacy: build(snap.advocacy, 0.2),
      disRank: rankOf(snap.dis),
      prominenceRank: rankOf(snap.prominence),
      affinityRank: rankOf(snap.affinity),
      advocacyRank: rankOf(snap.advocacy),
    };
  });
}

export function brandMetricSeries(brands: string[], metric: MetricKey, mode: "score" | "rank") {
  const series = brands.map((b) => ({ brand: b, points: brandTrend(b) }));
  return MONTHS_12.map((month, i) => {
    const row: Record<string, string | number> = { month };
    for (const s of series) {
      const p = s.points[i] as TrendPoint;
      row[s.brand] =
        mode === "score"
          ? p[metric]
          : (p[
              `${metric}Rank` as "disRank" | "prominenceRank" | "affinityRank" | "advocacyRank"
            ] as number);
    }
    return row;
  });
}

export function sixMonthPreview(brand: string) {
  return brandTrend(brand)
    .slice(-6)
    .map((p) => ({ month: p.month, value: p.dis }));
}

/* ---------- Quadrant topics ---------- */

export type QuadrantTopic = {
  topic: string;
  velocity: number;
  sentiment: number;
  volume: number;
};

export const POSITIONING_TOPICS: QuadrantTopic[] = [
  { topic: "Skin Barrier", velocity: 34, sentiment: 62, volume: 184000 },
  { topic: "Dermatologist Recommended", velocity: 12, sentiment: 71, volume: 142000 },
  { topic: "Ceramides", velocity: 28, sentiment: 55, volume: 96000 },
  { topic: "Fragrance Free", velocity: 8, sentiment: 48, volume: 74000 },
  { topic: "Sensitive Skin", velocity: 19, sentiment: 44, volume: 121000 },
  { topic: "Hydration Science", velocity: 41, sentiment: 38, volume: 88000 },
  { topic: "Sustainability", velocity: -14, sentiment: 26, volume: 52000 },
  { topic: "Clean Formulation", velocity: -6, sentiment: 31, volume: 61000 },
  { topic: "Price Value", velocity: -22, sentiment: -18, volume: 78000 },
  { topic: "Packaging Waste", velocity: 16, sentiment: -34, volume: 34000 },
  { topic: "Product Availability", velocity: -31, sentiment: -26, volume: 41000 },
  { topic: "Breakout Concerns", velocity: 24, sentiment: -42, volume: 47000 },
  { topic: "Retinol Tolerance", velocity: 37, sentiment: -12, volume: 58000 },
  { topic: "Dupe Culture", velocity: 46, sentiment: 8, volume: 66000 },
  { topic: "Pharmacy Distribution", velocity: -18, sentiment: 12, volume: 29000 },
  { topic: "Clinical Trials", velocity: -9, sentiment: 51, volume: 23000 },
  { topic: "Teen Skincare", velocity: 52, sentiment: -6, volume: 71000 },
  { topic: "Sunscreen Layering", velocity: 21, sentiment: 34, volume: 63000 },
  { topic: "Ingredient Transparency", velocity: 6, sentiment: 41, volume: 39000 },
  { topic: "Refill Programs", velocity: -27, sentiment: 9, volume: 18000 },
];

export const CAMPAIGN_THEMES: QuadrantTopic[] = [
  { topic: "Barrier Repair", velocity: 38, sentiment: 58, volume: 141100000 },
  { topic: "Peptide Science", velocity: 46, sentiment: 44, volume: 92400000 },
  { topic: "Influencer Collaboration", velocity: 27, sentiment: 21, volume: 118600000 },
  { topic: "Celebrity Partnership", velocity: -12, sentiment: -16, volume: 74800000 },
  { topic: "Dermatologist Endorsement", velocity: 14, sentiment: 66, volume: 86200000 },
  { topic: "Value Bundles", velocity: -24, sentiment: 12, volume: 41300000 },
  { topic: "Sun Protection Ritual", velocity: 33, sentiment: 49, volume: 68900000 },
  { topic: "Men's Skincare", velocity: 51, sentiment: 18, volume: 29700000 },
  { topic: "Clinical Proof Points", velocity: 9, sentiment: 54, volume: 53400000 },
  { topic: "Sustainability Pledge", velocity: -18, sentiment: 28, volume: 32100000 },
  { topic: "TikTok Shop Drops", velocity: 62, sentiment: -8, volume: 47600000 },
  { topic: "Loyalty Rewards", velocity: -31, sentiment: 6, volume: 21800000 },
  { topic: "Back to School", velocity: 22, sentiment: -22, volume: 18400000 },
  { topic: "Retail Media Push", velocity: 7, sentiment: -34, volume: 26200000 },
  { topic: "Sampling Program", velocity: -9, sentiment: 37, volume: 15900000 },
  { topic: "Skin Quiz Activation", velocity: 41, sentiment: 31, volume: 12700000 },
  { topic: "Price Promotion", velocity: -42, sentiment: -28, volume: 34500000 },
  { topic: "Editorial Partnership", velocity: 11, sentiment: 42, volume: 19300000 },
  { topic: "Athlete Sponsorship", velocity: -6, sentiment: -12, volume: 9800000 },
  { topic: "Live Shopping", velocity: 57, sentiment: 14, volume: 23600000 },
];

export const FUTURE_THEMES: QuadrantTopic[] = [
  { topic: "Skin Barrier Science", velocity: 44, sentiment: 64, volume: 212000 },
  { topic: "Microbiome Skincare", velocity: 58, sentiment: 51, volume: 148000 },
  { topic: "AI Skin Analysis", velocity: 71, sentiment: 34, volume: 96000 },
  { topic: "Blue Light Protection", velocity: 39, sentiment: 22, volume: 74000 },
  { topic: "Longevity Skincare", velocity: 66, sentiment: 47, volume: 118000 },
  { topic: "Menopause Skin", velocity: 48, sentiment: 41, volume: 64000 },
  { topic: "Exosome Actives", velocity: 54, sentiment: -14, volume: 38000 },
  { topic: "Refillable Formats", velocity: -16, sentiment: 29, volume: 42000 },
  { topic: "Skin Cycling", velocity: 12, sentiment: 44, volume: 88000 },
  { topic: "Waterless Formulas", velocity: -9, sentiment: 18, volume: 27000 },
  { topic: "Slugging", velocity: -28, sentiment: 26, volume: 56000 },
  { topic: "Peptide Stacking", velocity: 61, sentiment: 12, volume: 49000 },
  { topic: "Scalp as Skin", velocity: 43, sentiment: 36, volume: 71000 },
  { topic: "Cortisol & Skin", velocity: 37, sentiment: -22, volume: 34000 },
  { topic: "Ingestible Beauty", velocity: 18, sentiment: -31, volume: 45000 },
  { topic: "Barrier Damage Backlash", velocity: 26, sentiment: -46, volume: 29000 },
  { topic: "Teen Regimen Debate", velocity: 49, sentiment: -38, volume: 62000 },
  { topic: "Fermented Actives", velocity: -12, sentiment: 33, volume: 22000 },
  { topic: "Clinic-at-Home Devices", velocity: 34, sentiment: 8, volume: 58000 },
  { topic: "Sunscreen Reformulation", velocity: -22, sentiment: -12, volume: 31000 },
];

/* ---------- Creative formats & platforms ---------- */

export type CellData = { creatives: number; impressions: number };

export const FORMATS = ["Display / Banner", "Videos"];

export const FORMAT_DATA: Record<string, Record<string, CellData>> = {
  "Allies of Skin": {
    "Display / Banner": { creatives: 42, impressions: 8420000 },
    Videos: { creatives: 18, impressions: 12680000 },
  },
  CeraVe: {
    "Display / Banner": { creatives: 386, impressions: 141086056 },
    Videos: { creatives: 214, impressions: 268410000 },
  },
  EltaMD: {
    "Display / Banner": { creatives: 96, impressions: 21740000 },
    Videos: { creatives: 34, impressions: 18260000 },
  },
  "e.l.f": {
    "Display / Banner": { creatives: 248, impressions: 96420000 },
    Videos: { creatives: 312, impressions: 341870000 },
  },
  "La Roche-Posay": {
    "Display / Banner": { creatives: 174, impressions: 62310000 },
    Videos: { creatives: 88, impressions: 74920000 },
  },
};

export const PLATFORMS = ["Facebook", "Instagram", "YouTube", "TikTok", "X"] as const;
export type Platform = (typeof PLATFORMS)[number];

export const PLATFORM_DATA: Record<string, Record<Platform, CellData>> = {
  "Allies of Skin": {
    Facebook: { creatives: 14, impressions: 3120000 },
    Instagram: { creatives: 26, impressions: 9840000 },
    YouTube: { creatives: 6, impressions: 4210000 },
    TikTok: { creatives: 12, impressions: 3860000 },
    X: { creatives: 0, impressions: 0 },
  },
  CeraVe: {
    Facebook: { creatives: 168, impressions: 92460000 },
    Instagram: { creatives: 214, impressions: 138720000 },
    YouTube: { creatives: 92, impressions: 118340000 },
    TikTok: { creatives: 118, impressions: 56180000 },
    X: { creatives: 8, impressions: 3860000 },
  },
  EltaMD: {
    Facebook: { creatives: 42, impressions: 11240000 },
    Instagram: { creatives: 58, impressions: 18690000 },
    YouTube: { creatives: 18, impressions: 7420000 },
    TikTok: { creatives: 12, impressions: 2650000 },
    X: { creatives: 0, impressions: 0 },
  },
  "e.l.f": {
    Facebook: { creatives: 104, impressions: 48210000 },
    Instagram: { creatives: 186, impressions: 121460000 },
    YouTube: { creatives: 64, impressions: 86930000 },
    TikTok: { creatives: 206, impressions: 174280000 },
    X: { creatives: 12, impressions: 6140000 },
  },
  "La Roche-Posay": {
    Facebook: { creatives: 86, impressions: 34120000 },
    Instagram: { creatives: 112, impressions: 58470000 },
    YouTube: { creatives: 48, impressions: 39860000 },
    TikTok: { creatives: 26, impressions: 9240000 },
    X: { creatives: 4, impressions: 1180000 },
  },
};

export function compact(n: number) {
  if (n === 0) return "0";
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export function exact(n: number) {
  return n.toLocaleString("en-US");
}
