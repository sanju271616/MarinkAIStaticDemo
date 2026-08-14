import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, LayoutGrid } from "lucide-react";
import { DashboardSelect, Panel, SegmentToggle } from "@/components/marinkai/primitives";
import { PageHeader } from "@/components/marinkai/shell";
import { BrandComparePicker } from "@/components/marinkai/brand-compare-picker";
import { MetricMatrix } from "@/components/marinkai/matrix";
import { TrendChart } from "@/components/marinkai/charts";
import { useWorkspace } from "@/components/marinkai/workspace";
import { compareRows } from "@/lib/drill-down-data";
import {
  BRANDS,
  BRAND_SNAPSHOTS,
  METRICS,
  brandMetricSeries,
  type MetricKey,
  type MetricSnapshot,
} from "@/lib/marinkai-data";

export const Route = createFileRoute("/dashboard/competitive-context")({
  head: () => ({
    meta: [
      { title: "Competitive Context — Marinkai" },
      {
        name: "description",
        content:
          "Benchmark your brand against the competitive set across Digital Impact Score, Prominence, Affinity and Advocacy.",
      },
      { property: "og:title", content: "Competitive Context — Marinkai" },
      {
        property: "og:description",
        content: "A scannable competitive matrix of impact metrics, ranks and growth.",
      },
    ],
  }),
  component: CompetitivePage,
});

const BRAND_LINE_COLORS = [
  "var(--gold)",
  "var(--metric-dis)",
  "var(--metric-affinity)",
  "var(--metric-prominence)",
  "var(--quad-deprioritize)",
];

function CompetitivePage() {
  const { brand, period, compareBrands, set } = useWorkspace();
  const [view, setView] = useState<"grid" | "chart">("grid");
  const [mode, setMode] = useState<"score" | "rank">("score");
  const [metric, setMetric] = useState<MetricKey>("dis");

  const rows = compareRows(brand, compareBrands);

  const matrixData: Record<string, Record<string, MetricSnapshot>> = Object.fromEntries(
    rows.map((b) => [b, (BRAND_SNAPSHOTS[b] ?? BRAND_SNAPSHOTS["CeraVe"]!) as Record<string, MetricSnapshot>]),
  );

  const metricLabel = METRICS.find((m) => m.key === metric)?.label ?? "Digital Impact Score";
  const chartData = brandMetricSeries(rows, metric, mode);

  return (
    <>
      <PageHeader
        title="Competitive Context"
        subtitleBrand={brand}
        description={`${period} · compare up to 4 rivals`}
        actions={
          <>
            <DashboardSelect
              label="Brand"
              value={brand}
              options={BRANDS}
              onChange={(v) => set({ brand: v })}
              minWidth={130}
            />
            <BrandComparePicker
              primary={brand}
              selected={compareBrands}
              onChange={(v) => set({ compareBrands: v })}
            />
            <SegmentToggle
              value={view}
              onChange={setView}
              options={[
                { value: "grid", label: "Grid", icon: <LayoutGrid className="size-3.5" /> },
                { value: "chart", label: "Chart", icon: <BarChart3 className="size-3.5" /> },
              ]}
            />
          </>
        }
      />

      {view === "grid" ? (
        <Panel
          title="Impact Metrics Comparison"
          subtitle={`${brand} shown in gold · score, category rank and period growth per metric`}
        >
          <MetricMatrix
            brands={rows}
            columns={METRICS.map((m) => ({ key: m.key, label: m.label, color: m.color }))}
            data={matrixData}
            primaryBrand={brand}
          />
        </Panel>
      ) : (
        <Panel
          title={`${metricLabel} — 12-month trajectory`}
          subtitle="Jun '24 → May '25"
          actions={
            <>
              <DashboardSelect
                label="Metric"
                value={metricLabel}
                options={METRICS.map((m) => m.label)}
                onChange={(v) => {
                  const found = METRICS.find((m) => m.label === v);
                  if (found) setMetric(found.key);
                }}
                minWidth={150}
              />
              <SegmentToggle
                value={mode}
                onChange={setMode}
                options={[
                  { value: "score", label: "Score" },
                  { value: "rank", label: "Rank" },
                ]}
              />
            </>
          }
        >
          <TrendChart
            data={chartData}
            mode={mode}
            height={420}
            series={rows.map((b, i) => ({
              key: b,
              label: b,
              color:
                b === brand
                  ? "var(--gold)"
                  : (BRAND_LINE_COLORS[(i + 1) % BRAND_LINE_COLORS.length] as string),
            }))}
          />
        </Panel>
      )}
    </>
  );
}
