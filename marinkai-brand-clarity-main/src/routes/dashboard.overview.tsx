import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardSelect, Panel, SegmentToggle } from "@/components/marinkai/primitives";
import { PageHeader } from "@/components/marinkai/shell";
import { KpiCard } from "@/components/marinkai/kpi-card";
import { TrendChart, metricSeries } from "@/components/marinkai/charts";
import { useWorkspace } from "@/components/marinkai/workspace";
import {
  BRANDS,
  BRAND_SNAPSHOTS,
  METRICS,
  brandTrend,
  type MetricKey,
} from "@/lib/marinkai-data";

export const Route = createFileRoute("/dashboard/overview")({
  head: () => ({
    meta: [
      { title: "Digital Impact Overview — Marinkai" },
      {
        name: "description",
        content:
          "Track Digital Impact Score, Prominence, Affinity and Advocacy for your brand across a 12-month trend.",
      },
      { property: "og:title", content: "Digital Impact Overview — Marinkai" },
      {
        property: "og:description",
        content: "Executive view of brand impact metrics, ranks and momentum.",
      },
    ],
  }),
  component: OverviewPage,
});

function OverviewPage() {
  const { brand, period, set } = useWorkspace();
  const [mode, setMode] = useState<"score" | "rank">("score");
  const snap = BRAND_SNAPSHOTS[brand] ?? BRAND_SNAPSHOTS["CeraVe"]!;

  const trend = brandTrend(brand).map((p) => ({
    month: p.month,
    dis: mode === "score" ? p.dis : p.disRank,
    prominence: mode === "score" ? p.prominence : p.prominenceRank,
    affinity: mode === "score" ? p.affinity : p.affinityRank,
    advocacy: mode === "score" ? p.advocacy : p.advocacyRank,
  }));

  const declining = METRICS.filter((m) => snap[m.key].growth < 0);

  return (
    <>
      <PageHeader
        title="Digital Impact Overview"
        subtitleBrand={brand}
        description={`${period} · United States · Skincare`}
        actions={
          <DashboardSelect
            label="Brand"
            value={brand}
            options={BRANDS}
            onChange={(v) => set({ brand: v })}
            minWidth={130}
          />
        }
      />

      <p className="mb-6 max-w-[860px] text-[14px] leading-relaxed text-muted-foreground">
        {declining.length >= 3 ? (
          <>
            {brand} holds category leadership on{" "}
            <span className="text-foreground">
              {METRICS.filter((m) => snap[m.key].rank <= 3).length} of 4 metrics
            </span>
            , but momentum is negative across{" "}
            <span className="text-foreground">{declining.length} metrics</span> — advocacy is the
            sharpest decline. Investigate messaging and campaign themes next.
          </>
        ) : (
          <>
            {brand} is building momentum. Prominence and advocacy movement suggests campaign
            activity is converting into conversation — validate which themes are driving it.
          </>
        )}
      </p>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {METRICS.map((m) => (
          <KpiCard
            key={m.key}
            name={m.label}
            metric={snap[m.key as MetricKey]}
            color={m.color}
            primary={m.key === "dis"}
          />
        ))}
      </div>

      <div className="mt-6">
        <Panel
          title="Impact Metrics Trend"
          subtitle="Jun '24 → May '25 · all four metrics indexed against the category"
          actions={
            <SegmentToggle
              value={mode}
              onChange={setMode}
              options={[
                { value: "score", label: "Score" },
                { value: "rank", label: "Rank" },
              ]}
            />
          }
        >
          <TrendChart data={trend} series={metricSeries()} mode={mode} height={420} />
        </Panel>
      </div>
    </>
  );
}
