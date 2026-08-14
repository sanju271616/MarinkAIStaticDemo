import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Globe2, Layers3, Tag } from "lucide-react";
import { BrandLogo, DashboardSelect, GrowthPill } from "@/components/marinkai/primitives";
import { ThemeToggle } from "@/components/marinkai/theme";
import { EarthBackdrop } from "@/components/marinkai/earth-backdrop";
import { Sparkline } from "@/components/marinkai/charts";
import { useWorkspace } from "@/components/marinkai/workspace";
import {
  BRANDS,
  BRAND_SNAPSHOTS,
  CATEGORIES,
  MARKETS,
  METRICS,
  sixMonthPreview,
} from "@/lib/marinkai-data";

export const Route = createFileRoute("/landing")({
  head: () => ({
    meta: [
      { title: "Configure your workspace — Marinkai" },
      {
        name: "description",
        content:
          "Set market, category and brand to shape your Marinkai brand intelligence workspace before entering the dashboard.",
      },
      { property: "og:title", content: "Configure your intelligence workspace — Marinkai" },
      {
        property: "og:description",
        content: "Select market, category and brand to focus your intelligence.",
      },
    ],
  }),
  component: LandingPage,
});

const STEPS = [
  {
    title: "Select Market",
    body: "Choose the geography that defines your competitive reality.",
    icon: <Globe2 className="size-4" />,
  },
  {
    title: "Select Category",
    body: "Scope the category conversation you compete inside.",
    icon: <Layers3 className="size-4" />,
  },
  {
    title: "Select Brand",
    body: "Pick the brand at the centre of your analysis.",
    icon: <Tag className="size-4" />,
  },
];

const CAPABILITIES = [
  "Competitive Benchmarking",
  "Paid Media Intelligence",
  "Organic Conversation",
  "Category Trends",
  "Executive Reporting",
];

function LandingPage() {
  const { market, category, brand, set } = useWorkspace();
  const [touched, setTouched] = useState<number>(3);
  const [formError, setFormError] = useState<string | null>(null);
  const snap = BRAND_SNAPSHOTS[brand] ?? BRAND_SNAPSHOTS["CeraVe"]!;
  const trend = sixMonthPreview(brand);

  function validate(): boolean {
    if (!market || !category || !brand) {
      setFormError("Please select market, category and brand before continuing.");
      return false;
    }
    setFormError(null);
    return true;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-canvas">
      <EarthBackdrop className="earth-fade bottom-auto h-[70vh]" />
      <header className="relative mx-auto flex h-20 max-w-[1680px] items-center justify-between px-6 xl:px-12">
        <BrandLogo />
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/login"
            className="control-base flex items-center px-4 text-muted-foreground hover:text-foreground"
          >
            Sign out
          </Link>
        </div>
      </header>

      <main className="relative mx-auto grid max-w-[1680px] gap-14 px-6 pt-8 pb-20 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] xl:px-12">
        <section className="rise max-w-[560px]">
          <p className="label-caps mb-5">Step 1 of 1 · Context setup</p>
          <h1 className="text-[clamp(34px,3.4vw,46px)] leading-[1.1]">
            Configure your intelligence workspace
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            Marinkai reads millions of paid, organic and editorial signals. Define the context and
            every screen that follows speaks to your brand.
          </p>

          <ol className="relative mt-12 space-y-8 border-l border-border pl-8">
            {STEPS.map((s, i) => {
              const done = i < touched;
              return (
                <li key={s.title} className="relative">
                  <span
                    aria-hidden
                    className="absolute top-0.5 -left-[44px] grid size-8 place-items-center rounded-full border"
                    style={{
                      borderColor: done ? "var(--gold)" : "var(--border-strong)",
                      background: done
                        ? "color-mix(in srgb, var(--gold) 14%, var(--surface))"
                        : "var(--surface)",
                      color: done ? "var(--gold)" : "var(--text-subtle)",
                    }}
                  >
                    {done ? <Check className="size-3.5" /> : s.icon}
                  </span>
                  <p className="text-[15px] font-medium text-foreground">{s.title}</p>
                  <p className="mt-1.5 text-[13px] text-muted-foreground">{s.body}</p>
                </li>
              );
            })}
          </ol>
        </section>

        <section
          className="panel rise overflow-hidden"
          style={{ boxShadow: "var(--shadow-panel)" }}
        >
          <div className="flex flex-wrap items-center gap-3 border-b border-border px-7 py-6">
            <DashboardSelect
              label="Market"
              value={market}
              options={MARKETS}
              onChange={(v) => {
                set({ market: v });
                setTouched(3);
              }}
              minWidth={140}
            />
            <DashboardSelect
              label="Category"
              value={category}
              options={CATEGORIES}
              onChange={(v) => set({ category: v })}
              minWidth={110}
            />
            <DashboardSelect
              label="Brand"
              value={brand}
              options={BRANDS}
              onChange={(v) => set({ brand: v })}
              minWidth={120}
            />
            <div className="flex items-center gap-2 opacity-60">
              <span className="label-caps hidden lg:inline">Sub-category</span>
              <div
                className="control-base flex min-w-[120px] cursor-not-allowed items-center px-3.5 text-[13px] text-subtle"
                title="Currently unavailable"
              >
                Currently unavailable
              </div>
            </div>
          </div>

          <div className="px-7 py-7">
            <div className="flex items-baseline justify-between">
              <h2 className="text-[20px]">
                <span className="text-gold">{brand}</span>
              </h2>
              <span className="text-[12px] text-subtle">
                {market} · {category} · May 2025
              </span>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
              {METRICS.map((m) => {
                const v = snap[m.key];
                return (
                  <div key={m.key} className="rounded-[16px] border border-border bg-surface-elevated p-4">
                    <dt className="flex items-center gap-2 text-[11px] tracking-[0.06em] text-muted-foreground uppercase">
                      <span aria-hidden className="size-1.5 rounded-full" style={{ background: m.color }} />
                      {m.short}
                    </dt>
                    <dd className="num font-display mt-3 text-[26px] leading-none">
                      {v.score.toFixed(1)}
                    </dd>
                    <dd className="num mt-2 text-[11.5px] text-subtle">Rank #{v.rank}</dd>
                  </div>
                );
              })}
            </dl>

            <div className="mt-7 rounded-[16px] border border-border bg-surface-elevated p-5">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-medium text-foreground">
                  Performance trajectory — Digital Impact Score
                </p>
                <GrowthPill value={snap.dis.growth} size="sm" />
              </div>
              <div className="mt-3">
                <Sparkline data={trend} />
              </div>
            </div>

            <ul className="mt-7 flex flex-wrap gap-2">
              {CAPABILITIES.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-border px-3 py-1.5 text-[11.5px] text-muted-foreground"
                >
                  {c}
                </li>
              ))}
            </ul>

            {formError && (
              <p
                role="alert"
                className="mt-6 rounded-[12px] border px-3.5 py-2.5 text-[12.5px]"
                style={{
                  color: "var(--negative)",
                  borderColor: "color-mix(in srgb, var(--negative) 35%, transparent)",
                  background: "color-mix(in srgb, var(--negative) 8%, transparent)",
                }}
              >
                {formError}
              </p>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/dashboard/overview"
                onClick={(e) => {
                  if (!validate()) e.preventDefault();
                }}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-[14px] text-[14px] font-medium transition-opacity hover:opacity-90"
                style={{ background: "var(--gold)", color: "var(--gold-foreground)" }}
              >
                Save and Proceed <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/login"
                className="control-base flex h-12 flex-1 items-center justify-center text-[14px] font-medium"
              >
                Back to login
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
