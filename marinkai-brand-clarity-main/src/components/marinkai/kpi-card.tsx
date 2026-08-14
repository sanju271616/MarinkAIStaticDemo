import { GrowthPill } from "./primitives";
import type { MetricSnapshot } from "@/lib/marinkai-data";

export function KpiCard({
  name,
  metric,
  color,
  primary = false,
}: {
  name: string;
  metric: MetricSnapshot;
  color: string;
  primary?: boolean;
}) {
  return (
    <article
      className="panel group relative overflow-hidden transition-transform duration-300 hover:-translate-y-0.5"
      style={{
        boxShadow: "var(--shadow-panel)",
        background: primary
          ? "linear-gradient(160deg, color-mix(in srgb, var(--gold) 7%, var(--surface)), var(--surface) 60%)"
          : undefined,
      }}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: color, opacity: primary ? 1 : 0.6 }}
      />
      <div className="px-6 pt-6 pb-5">
        <div className="flex items-center gap-2">
          <span aria-hidden className="size-1.5 rounded-full" style={{ background: color }} />
          <h3
            className="font-sans text-[12px] font-medium tracking-[0.06em] text-muted-foreground uppercase"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {name}
          </h3>
          {primary && (
            <span className="ml-auto rounded-full border border-gold/40 px-2 py-0.5 text-[10px] tracking-[0.1em] text-gold uppercase">
              Primary
            </span>
          )}
        </div>

        <div className="mt-4 flex items-end gap-3">
          <span
            className={`num font-display leading-none ${primary ? "text-[36px]" : "text-[28px]"}`}
          >
            {metric.score.toFixed(1)}
          </span>
          <span className="num mb-1 text-[13px] text-muted-foreground">
            Rank <span className="text-foreground">#{metric.rank}</span>
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <GrowthPill value={metric.growth} />
          <span className="text-[11.5px] text-subtle">vs. prior period</span>
        </div>
      </div>
    </article>
  );
}
