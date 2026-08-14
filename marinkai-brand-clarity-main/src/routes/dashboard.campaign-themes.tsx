import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardSelect, Panel, SegmentToggle } from "@/components/marinkai/primitives";
import { PageHeader } from "@/components/marinkai/shell";
import { DrillDownPanel } from "@/components/marinkai/drill-down-panel";
import { QuadrantChart, quadrantOf, type QuadrantKey } from "@/components/marinkai/charts";
import { useWorkspace } from "@/components/marinkai/workspace";
import { BRANDS, CAMPAIGN_THEMES, compact } from "@/lib/marinkai-data";

export const Route = createFileRoute("/dashboard/campaign-themes")({
  head: () => ({
    meta: [
      { title: "Campaign Themes — Marinkai" },
      {
        name: "description",
        content:
          "Understand the buzz around brand campaign themes by velocity, net sentiment and paid impressions.",
      },
      { property: "og:title", content: "Buzz around Brand Campaign Themes — Marinkai" },
      {
        property: "og:description",
        content: "Which campaign themes are working, and which need reinvestment.",
      },
    ],
  }),
  component: CampaignThemesPage,
});

const LABELS = {
  topRight: "Continue",
  topLeft: "Opportunity to Drive",
  bottomRight: "Not Working",
  bottomLeft: "Reinvest in Other Themes",
};

const QUAD_FILTERS = [
  { value: "all", label: "All quadrants" },
  { value: "topRight", label: "Continue" },
  { value: "topLeft", label: "Opportunity to Drive" },
  { value: "bottomRight", label: "Not Working" },
  { value: "bottomLeft", label: "Reinvest" },
] as const;

function CampaignThemesPage() {
  const { brand, period, set } = useWorkspace();
  const [quad, setQuad] = useState<string>("all");
  const [topN, setTopN] = useState<"20" | "10">("20");
  const [selected, setSelected] = useState<string | null>(null);
  const [drillOpen, setDrillOpen] = useState(false);

  const topics = CAMPAIGN_THEMES.slice()
    .sort((a, b) => b.volume - a.volume)
    .slice(0, topN === "20" ? 20 : 10)
    .filter((t) => quad === "all" || quadrantOf(t) === quad);

  const selectedTopic = topics.find((t) => t.topic === selected) ?? null;
  const leading = topics.filter((t) => quadrantOf(t) === "topRight").slice(0, 3);
  const dragging = topics.filter((t) => quadrantOf(t) === "bottomRight").slice(0, 3);
  const activeQuad = (quad === "all" ? "all" : quad) as QuadrantKey | "all";

  return (
    <>
      <PageHeader
        title="Buzz around Brand Campaign Themes"
        subtitleBrand={brand}
        description={`Paid and organic theme resonance · ${period}`}
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

      <Panel
        title="Theme resonance"
        subtitle="Velocity (%) against net sentiment · bubble size reflects impressions"
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
            No campaign themes match this quadrant in {period}.
          </p>
        ) : (
          <QuadrantChart
            topics={topics}
            labels={LABELS}
            volumeLabel="Impressions"
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

      {drillOpen && selectedTopic && (
        <DrillDownPanel
          topic={selectedTopic.topic}
          topicData={selectedTopic}
          brand={brand}
          onClose={() => setDrillOpen(false)}
        />
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Working hardest" subtitle="Positive sentiment with accelerating volume">
          <ul className="divide-y divide-border">
            {leading.map((t) => (
              <li key={t.topic} className="flex items-center justify-between py-3 text-[13.5px]">
                <button
                  type="button"
                  className="text-left text-foreground hover:text-gold"
                  onClick={() => {
                    setSelected(t.topic);
                    setDrillOpen(true);
                  }}
                >
                  {t.topic}
                </button>
                <span className="num text-muted-foreground">
                  {compact(t.volume)} · +{t.velocity}%
                </span>
              </li>
            ))}
            {leading.length === 0 && (
              <li className="py-3 text-[13px] text-muted-foreground">
                No themes currently qualify.
              </li>
            )}
          </ul>
        </Panel>
        <Panel title="Needs intervention" subtitle="Gaining volume against negative sentiment">
          <ul className="divide-y divide-border">
            {dragging.map((t) => (
              <li key={t.topic} className="flex items-center justify-between py-3 text-[13.5px]">
                <button
                  type="button"
                  className="text-left text-foreground hover:text-gold"
                  onClick={() => {
                    setSelected(t.topic);
                    setDrillOpen(true);
                  }}
                >
                  {t.topic}
                </button>
                <span className="num text-muted-foreground">
                  {compact(t.volume)} · sentiment {t.sentiment}
                </span>
              </li>
            ))}
            {dragging.length === 0 && (
              <li className="py-3 text-[13px] text-muted-foreground">
                Nothing requires intervention this period.
              </li>
            )}
          </ul>
        </Panel>
      </div>
    </>
  );
}
