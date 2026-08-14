import { createFileRoute } from "@tanstack/react-router";
import { DashboardSelect, Panel } from "@/components/marinkai/primitives";
import { PageHeader } from "@/components/marinkai/shell";
import { DateSlicer } from "@/components/marinkai/date-slicer";
import { useWorkspace } from "@/components/marinkai/workspace";
import { BRANDS, CATEGORIES, MARKETS } from "@/lib/marinkai-data";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({
    meta: [
      { title: "Workspace Settings — Marinkai" },
      {
        name: "description",
        content: "Manage the market, category, brand and reporting period for your workspace.",
      },
      { property: "og:title", content: "Workspace Settings — Marinkai" },
      { property: "og:description", content: "Control the context behind every dashboard." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { market, category, brand, period, set } = useWorkspace();

  const rows = [
    {
      label: "Market",
      help: "Geography used for competitive ranking.",
      control: (
        <DashboardSelect value={market} options={MARKETS} onChange={(v) => set({ market: v })} minWidth={140} />
      ),
    },
    {
      label: "Category",
      help: "Category conversation universe.",
      control: (
        <DashboardSelect
          value={category}
          options={CATEGORIES}
          onChange={(v) => set({ category: v })}
          minWidth={140}
        />
      ),
    },
    {
      label: "Brand",
      help: "Brand at the centre of the analysis.",
      control: (
        <DashboardSelect value={brand} options={BRANDS} onChange={(v) => set({ brand: v })} minWidth={140} />
      ),
    },
    {
      label: "Period",
      help: "Reporting period applied across all screens.",
      control: <DateSlicer value={period} onChange={(v) => set({ period: v })} />,
    },
  ];

  return (
    <>
      <PageHeader
        title="Settings"
        description="Workspace context applied to every intelligence screen"
      />

      <Panel title="Intelligence context" subtitle="Changes apply immediately across the workspace">
        <ul className="divide-y divide-border">
          {rows.map((r) => (
            <li key={r.label} className="flex flex-wrap items-center justify-between gap-4 py-5">
              <div>
                <p className="text-[14px] font-medium text-foreground">{r.label}</p>
                <p className="mt-1 text-[12.5px] text-muted-foreground">{r.help}</p>
              </div>
              {r.control}
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
