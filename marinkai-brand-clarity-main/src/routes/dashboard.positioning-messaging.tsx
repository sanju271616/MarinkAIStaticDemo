import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardSelect, Panel, SegmentToggle } from "@/components/marinkai/primitives";
import { PageHeader } from "@/components/marinkai/shell";
import { DrillDownPanel } from "@/components/marinkai/drill-down-panel";
import { QuadrantChart, quadrantOf, type QuadrantKey } from "@/components/marinkai/charts";
import { useWorkspace } from "@/components/marinkai/workspace";
import { BRANDS, METRICS, POSITIONING_TOPICS, compact, type MetricKey } from "@/lib/marinkai-data";

export const Route = createFileRoute("/dashboard/positioning-messaging")({
  head: () => ({
    meta: [
      { title: "Positioning & Messaging — Marinkai" },
      {
        name: "description",
        content:
          "See which messaging territories are driving or dragging brand impact using velocity, sentiment and conversation volume.",
      },
      { property: "og:title", content: "Positioning & Messaging — Marinkai" },
      {
        property: "og:description",
        content: "Strategic quadrant of the topics moving your brand impact.",
      },
    ],
  }),
  component: PositioningPage,
});

const QUAD_FILTERS = [
  { value: "all", label: "All quadrants" },
  { value: "topRight", label: "Differentiate & Strengthen" },
  { value: "topLeft", label: "Grow Presence" },
  { value: "bottomRight", label: "Need for Mitigation" },
  { value: "bottomLeft", label: "Lower Priority" },
] as const;

const LABELS = {
  topRight: "Differentiate & Strengthen",
  topLeft: "Grow Presence",
  bottomRight: "Need for Mitigation",
  bottomLeft: "Lower Priority",
};

function PositioningPage() {
  const { brand, period, set } = useWorkspace();
  const [metric, setMetric] = useState<MetricKey>("affinity");
  const [quad, setQuad] = useState<string>("all");
  const [topN, setTopN] = useState<"20" | "10">("20");
  const [selected, setSelected] = useState<string | null>(null);
  const [drillOpen, setDrillOpen] = useState(false);

  const metricLabel = METRICS.find((m) => m.key === metric)?.label ?? "Affinity";

  const topics = POSITIONING_TOPICS.slice()
    .sort((a, b) => b.volume - a.volume)
    .slice(0, topN === "20" ? 20 : 10)
    .filter((t) => quad === "all" || quadrantOf(t) === quad);

  const selectedTopic = topics.find((t) => t.topic === selected) ?? null;
  const activeQuad = (quad === "all" ? "all" : quad) as QuadrantKey | "all";

  return (
    <>
      <PageHeader
        title="Positioning & Messaging"
        subtitleBrand={brand}
        description={`What is driving or dragging my Impact Metrics? · ${period}`}
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
              minWidth={180}
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

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Panel
          title={`${metricLabel} drivers by messaging territory`}
          subtitle="Velocity (%) against net sentiment · bubble size reflects prominence volume"
        >
          {topics.length === 0 ? (
            <p className="py-16 text-center text-[13.5px] text-muted-foreground">
              No topics fall in this quadrant for {brand} in {period}. Widen the quadrant filter to
              see the full messaging landscape.
            </p>
          ) : (
            <QuadrantChart
              topics={topics}
              labels={LABELS}
              volumeLabel="Prominence volume"
              selected={selected}
              onSelect={(t) => {
                setSelected(t);
                setDrillOpen(false);
              }}
              activeQuad={activeQuad}
              height={480}
            />
          )}
        </Panel>

        <Panel title="Investigation" subtitle="Select a topic to inspect the signal">
          {selectedTopic ? (
            <div className="space-y-5">
              <div>
                <p className="label-caps mb-1.5">Topic</p>
                <p className="text-[18px] text-foreground">{selectedTopic.topic}</p>
              </div>
              <dl className="space-y-3 border-t border-border pt-4 text-[13px]">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Velocity</dt>
                  <dd className="num text-foreground">
                    {selectedTopic.velocity > 0 ? "+" : ""}
                    {selectedTopic.velocity}%
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Net sentiment</dt>
                  <dd className="num text-foreground">{selectedTopic.sentiment}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Prominence volume</dt>
                  <dd className="num text-foreground">{compact(selectedTopic.volume)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Recommended action</dt>
                  <dd className="text-right text-foreground">
                    {LABELS[quadrantOf(selectedTopic)]}
                  </dd>
                </div>
              </dl>
              <button
                type="button"
                className="control-base w-full font-medium hover:border-gold"
                style={{ background: "var(--gold)", color: "var(--gold-foreground)" }}
                onClick={() => setDrillOpen(true)}
              >
                Drill down
              </button>
              <button
                type="button"
                className="control-base w-full font-medium hover:border-gold"
                onClick={() => {
                  setSelected(null);
                  setDrillOpen(false);
                }}
              >
                Clear selection
              </button>
            </div>
          ) : (
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              Click any bubble to isolate a messaging territory, then drill down to compare all
              brands, top 10 or top 20.
            </p>
          )}
        </Panel>
      </div>

      {drillOpen && selectedTopic && (
        <DrillDownPanel
          topic={selectedTopic.topic}
          topicData={selectedTopic}
          brand={brand}
          onClose={() => setDrillOpen(false)}
        />
      )}
    </>
  );
}
