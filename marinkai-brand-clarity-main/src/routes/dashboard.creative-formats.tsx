import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardSelect, Panel, SegmentToggle } from "@/components/marinkai/primitives";
import { PageHeader } from "@/components/marinkai/shell";
import { BrandComparePicker } from "@/components/marinkai/brand-compare-picker";
import { ActivityMatrix } from "@/components/marinkai/matrix";
import { useWorkspace } from "@/components/marinkai/workspace";
import { compareRows } from "@/lib/drill-down-data";
import { BRANDS, FORMATS, FORMAT_DATA, compact } from "@/lib/marinkai-data";

export const Route = createFileRoute("/dashboard/creative-formats")({
  head: () => ({
    meta: [
      { title: "Creative Formats — Marinkai" },
      {
        name: "description",
        content:
          "Compare digital campaign performance by creative format across the skincare competitive set.",
      },
      { property: "og:title", content: "Creative Formats — Marinkai" },
      {
        property: "og:description",
        content: "Creative counts and impressions by display and video formats.",
      },
    ],
  }),
  component: CreativeFormatsPage,
});

function CreativeFormatsPage() {
  const { brand, period, compareBrands, set } = useWorkspace();
  const rows = compareRows(brand, compareBrands);

  const totals = FORMATS.map((f) => ({
    format: f,
    impressions: rows.reduce((sum, b) => sum + (FORMAT_DATA[b]?.[f]?.impressions ?? 0), 0),
    creatives: rows.reduce((sum, b) => sum + (FORMAT_DATA[b]?.[f]?.creatives ?? 0), 0),
  }));

  return (
    <>
      <PageHeader
        title="Creative Formats"
        subtitleBrand={brand}
        description={`Format mix and delivered impressions · ${period}`}
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
          </>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        {totals.map((t) => (
          <div key={t.format} className="panel px-6 py-5">
            <p className="label-caps">{t.format} · comparison total</p>
            <p className="num font-display mt-3 text-[28px] leading-none">
              {compact(t.impressions)}
            </p>
            <p className="num mt-2 text-[12.5px] text-muted-foreground">
              {t.creatives} creatives · impressions on social platforms
            </p>
          </div>
        ))}
      </div>

      <Panel
        title="Digital Campaign Performance by Format"
        subtitle="Impressions and creative counts · hover any cell for exact figures"
      >
        <ActivityMatrix
          brands={rows}
          columns={FORMATS}
          data={FORMAT_DATA}
          primaryBrand={brand}
        />
      </Panel>
    </>
  );
}
