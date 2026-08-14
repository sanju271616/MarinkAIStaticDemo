import { compact, exact, type CellData } from "@/lib/marinkai-data";
import { GrowthPill } from "./primitives";
import type { MetricSnapshot } from "@/lib/marinkai-data";

/* ---------- Metric comparison matrix ---------- */

export function MetricMatrix({
  brands,
  columns,
  data,
  primaryBrand,
}: {
  brands: string[];
  columns: { key: string; label: string; color: string }[];
  data: Record<string, Record<string, MetricSnapshot>>;
  primaryBrand: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[860px] border-separate border-spacing-0 text-left">
        <caption className="sr-only">Competitive comparison of impact metrics by brand</caption>
        <thead>
          <tr>
            <th scope="col" className="label-caps sticky left-0 z-10 bg-surface pb-4 pl-1">
              Brand
            </th>
            {columns.map((c) => (
              <th key={c.key} scope="col" className="pb-4 pl-6">
                <span className="flex items-center gap-2">
                  <span aria-hidden className="size-1.5 rounded-full" style={{ background: c.color }} />
                  <span className="label-caps">{c.label}</span>
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {brands.map((b) => {
            const primary = b === primaryBrand;
            return (
              <tr key={b} className="group">
                <th
                  scope="row"
                  className="sticky left-0 z-10 border-t border-border bg-surface py-4 pl-1 text-left align-middle"
                >
                  <span className="flex items-center gap-2.5">
                    {primary && (
                      <span aria-hidden className="h-6 w-[2px] rounded-full bg-gold" />
                    )}
                    <span
                      className={`text-[14px] ${primary ? "font-medium text-gold" : "text-foreground"}`}
                    >
                      {b}
                    </span>
                  </span>
                </th>
                {columns.map((c) => {
                  const cell = data[b]?.[c.key];
                  if (!cell) {
                    return (
                      <td key={c.key} className="border-t border-border py-4 pl-6 text-subtle">
                        —
                      </td>
                    );
                  }
                  return (
                    <td
                      key={c.key}
                      className="border-t border-border py-4 pl-6 transition-colors group-hover:bg-surface-elevated/60"
                    >
                      <div className="flex items-baseline gap-2.5">
                        <span
                          className={`num font-display leading-none ${primary ? "text-[24px]" : "text-[21px]"}`}
                          style={primary ? { color: "var(--gold)" } : undefined}
                        >
                          {cell.score.toFixed(1)}
                        </span>
                        <span className="num text-[12px] text-muted-foreground">#{cell.rank}</span>
                      </div>
                      <div className="mt-2">
                        <GrowthPill value={cell.growth} size="sm" />
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Activity matrix (formats / platforms) ---------- */

export function ActivityMatrix({
  brands,
  columns,
  data,
  primaryBrand,
  renderColumnIcon,
}: {
  brands: string[];
  columns: string[];
  data: Record<string, Record<string, CellData>>;
  primaryBrand: string;
  renderColumnIcon?: (col: string) => React.ReactNode;
}) {
  const max = Math.max(
    1,
    ...brands.flatMap((b) => columns.map((c) => data[b]?.[c]?.impressions ?? 0)),
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] border-separate border-spacing-0 text-left">
        <caption className="sr-only">Digital campaign performance by brand</caption>
        <thead>
          <tr>
            <th scope="col" className="label-caps sticky left-0 z-10 bg-surface pb-4 pl-1">
              Brand
            </th>
            {columns.map((c) => (
              <th key={c} scope="col" className="pb-4 pl-6">
                <span className="flex items-center gap-2">
                  {renderColumnIcon?.(c)}
                  <span className="label-caps">{c}</span>
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {brands.map((b) => {
            const primary = b === primaryBrand;
            return (
              <tr key={b} className="group">
                <th
                  scope="row"
                  className="sticky left-0 z-10 border-t border-border bg-surface py-4 pl-1 text-left"
                >
                  <span className="flex items-center gap-2.5">
                    {primary && <span aria-hidden className="h-6 w-[2px] rounded-full bg-gold" />}
                    <span
                      className={`text-[14px] ${primary ? "font-medium text-gold" : "text-foreground"}`}
                    >
                      {b}
                    </span>
                  </span>
                </th>
                {columns.map((c) => {
                  const cell = data[b]?.[c];
                  const empty = !cell || cell.impressions === 0;
                  return (
                    <td
                      key={c}
                      title={
                        empty
                          ? "No activity detected in this period"
                          : `${exact(cell.creatives)} creatives · ${exact(cell.impressions)} impressions`
                      }
                      className="border-t border-border py-4 pl-6 transition-colors group-hover:bg-surface-elevated/60"
                    >
                      {empty ? (
                        <span className="text-[14px] text-subtle">No activity</span>
                      ) : (
                        <>
                          <div className="num font-display text-[21px] leading-none">
                            {compact(cell.impressions)}
                          </div>
                          <div className="num mt-1.5 text-[12px] text-muted-foreground">
                            {cell.creatives} creatives
                          </div>
                          <div
                            aria-hidden
                            className="mt-2.5 h-[3px] w-full max-w-[120px] overflow-hidden rounded-full bg-border-strong"
                          >
                            <span
                              className="block h-full rounded-full"
                              style={{
                                width: `${Math.max(4, (cell.impressions / max) * 100)}%`,
                                background: primary ? "var(--gold)" : "var(--metric-dis)",
                              }}
                            />
                          </div>
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
