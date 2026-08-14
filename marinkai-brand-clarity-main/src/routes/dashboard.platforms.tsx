import { createFileRoute } from "@tanstack/react-router";
import { DashboardSelect, Panel } from "@/components/marinkai/primitives";
import { PageHeader } from "@/components/marinkai/shell";
import { BrandComparePicker } from "@/components/marinkai/brand-compare-picker";
import { ActivityMatrix } from "@/components/marinkai/matrix";
import { PlatformIcon } from "@/components/marinkai/platform-icon";
import { useWorkspace } from "@/components/marinkai/workspace";
import { compareRows } from "@/lib/drill-down-data";
import { BRANDS, PLATFORMS, PLATFORM_DATA, compact } from "@/lib/marinkai-data";

export const Route = createFileRoute("/dashboard/platforms")({
  head: () => ({
    meta: [
      { title: "Platforms — Marinkai" },
      {
        name: "description",
        content:
          "Compare digital campaign performance across Facebook, Instagram, YouTube, TikTok and X for the competitive set.",
      },
      { property: "og:title", content: "Platforms — Marinkai" },
      {
        property: "og:description",
        content: "Platform-level creative counts and impressions by brand.",
      },
    ],
  }),
  component: PlatformsPage,
});

function PlatformsPage() {
  const { brand, period, compareBrands, set } = useWorkspace();
  const rows = compareRows(brand, compareBrands);

  const leadPlatform = [...PLATFORMS]
    .map((p) => ({
      platform: p,
      impressions: PLATFORM_DATA[brand]?.[p]?.impressions ?? 0,
    }))
    .sort((a, b) => b.impressions - a.impressions)[0];

  return (
    <>
      <PageHeader
        title="Platforms"
        subtitleBrand={brand}
        description={`Digital campaign performance by platform · ${period}`}
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

      {leadPlatform && (
        <p className="mb-6 max-w-[820px] text-[14px] text-muted-foreground">
          {brand} concentrates delivery on{" "}
          <span className="text-foreground">{leadPlatform.platform}</span> with{" "}
          <span className="num text-foreground">{compact(leadPlatform.impressions)}</span>{" "}
          impressions across social platforms.
        </p>
      )}

      <Panel
        title="Digital Campaign Performance by Platform"
        subtitle="Impressions and creative counts · hover any cell for exact figures"
      >
        <ActivityMatrix
          brands={rows}
          columns={[...PLATFORMS]}
          data={PLATFORM_DATA}
          primaryBrand={brand}
          renderColumnIcon={(c) => (
            <span className="text-muted-foreground">
              <PlatformIcon platform={c} className="size-3.5" />
            </span>
          )}
        />
      </Panel>
    </>
  );
}
