import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardSelect, Panel, SegmentToggle } from "@/components/marinkai/primitives";
import { PageHeader } from "@/components/marinkai/shell";
import { DrillDownPanel } from "@/components/marinkai/drill-down-panel";
import { QuadrantChart, quadrantOf, type QuadrantKey } from "@/components/marinkai/charts";
import { useWorkspace } from "@/components/marinkai/workspace";
import { BRANDS, FUTURE_THEMES, compact } from "@/lib/marinkai-data";

export const Route = createFileRoute("/dashboard/future-focus")({
  head: () => ({
    meta: [
      { title: "Future Focus — Marinkai" },
      {
        name: "description",
        content:
          "Identify emerging skincare category themes by velocity, sentiment and total conversation volume.",
      },
      { property: "og:title", content: "Future Focus — Marinkai" },
      {
        property: "og:description",
        content: "Emerging category opportunities before they become mainstream.",
      },
    ],
  }),
  component: FutureFocusPage,
});

const LABELS = {
  topRight: "Top Interest Themes",
  topLeft: "Possible Opportunities",
  bottomRight: "Wait & Watch",
  bottomLeft: "Lower Priority",
};

const QUAD_FILTERS = [
  { value: "all", label: "All quadrants" },
  { value: "topRight", label: "Top Interest Themes" },
  { value: "topLeft", label: "Possible Opportunities" },
  { value: "bottomRight", label: "Wait & Watch" },
  { value: "bottomLeft", label: "Lower Priority" },
] as const;

function FutureFocusPage() {
  const { brand, category, period, set } = useWorkspace();
  const [quad, setQuad] = useState<string>("all");
  const [topN, setTopN] = useState<"20" | "10">("20");
  const [selected, setSelected] = useState<string | null>(null);
  const [drillOpen, setDrillOpen] = useState(false);

  const topics = FUTURE_THEMES.slice()
    .sort((a, b) => b.volume - a.volume)
    .slice(0, topN === "20" ? 20 : 10)
    .filter((t) => quad === "all" || quadrantOf(t) === quad);

  const selectedTopic = topics.find((t) => t.topic === selected) ?? null;
  const emerging = FUTURE_THEMES.slice()
    .sort((a, b) => b.velocity - a.velocity)
    .slice(0, 4);
  const activeQuad = (quad === "all" ? "all" : quad) as QuadrantKey | "all";

  return (
    <>
      <PageHeader
        title="Future Focus"
        subtitleBrand={brand}
        description={`What ${brand} should work on next · ${category} · ${period}`}
        actions={
          <>
            <DashboardSelect
              label="Brand"
              value={brand}
              options={BRANDS}
              onChange={(v) => set({ brand: v })}
              minWidth={130}
            />
            <DashboardSelect
              label="Quadrant"
              value={QUAD_FILTERS.find((q) => q.value === quad)?.label ?? "All quadrants"}
              options={QUAD_FILTERS.map((q) => q.label)}
              onChange={(v) => {
                const found = QUAD_FILTERS.find((q) => q.label === v);
                setQuad(found?.value ?? "all");
                setSelected(null);
                setDrillOpen(false);
              }}
              minWidth={170}
            />
            <SegmentToggle
              value={topN}
              onChange={setTopN}
              options={[
                { value: "20", label: "Top 20" },
                { value: "10", label: "Top 10" },
              ]}
            />
          </>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {emerging.map((t) => (
          <button
            key={t.topic}
            type="button"
            className="glass rounded-[18px] px-5 py-4 text-left transition-opacity hover:opacity-90"
            onClick={() => {
              setSelected(t.topic);
              setDrillOpen(true);
            }}
          >
            <p className="label-caps">Fastest rising</p>
            <p className="mt-2.5 text-[15px] text-foreground">{t.topic}</p>
            <p className="num mt-2 text-[12.5px] text-muted-foreground">
              +{t.velocity}% velocity · {compact(t.volume)} posts
            </p>
          </button>
        ))}
      </div>

      <Panel
        title="Emerging category themes"
        subtitle="Velocity (%) against net sentiment · bubble size reflects total post volume"
        actions={
          selectedTopic ? (
            <button
              type="button"
              className="control-base px-4 text-[12.5px] font-medium"
              style={{ background: "var(--gold)", color: "var(--gold-foreground)" }}
              onClick={() => setDrillOpen(true)}
            >
              Drill down · {selectedTopic.topic}
            </button>
          ) : undefined
        }
      >
        {topics.length === 0 ? (
          <p className="py-16 text-center text-[13.5px] text-muted-foreground">
            No emerging themes match this quadrant. Broaden the filter to see the full category
            landscape.
          </p>
        ) : (
          <QuadrantChart
            topics={topics}
            labels={LABELS}
            volumeLabel="Total post volume"
            selected={selected}
            onSelect={(t) => {
              setSelected(t);
              setDrillOpen(false);
            }}
            activeQuad={activeQuad}
            height={500}
          />
        )}
      </Panel>

      {drillOpen && selectedTopic && (
        <DrillDownPanel
          topic={selectedTopic.topic}
          topicData={selectedTopic}
          brand={brand}
          enableSecondLevel
          onClose={() => setDrillOpen(false)}
        />
      )}
    </>
  );
}
