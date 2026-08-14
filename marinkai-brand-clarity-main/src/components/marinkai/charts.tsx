import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ReferenceArea,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { METRICS, compact, type MetricKey, type QuadrantTopic } from "@/lib/marinkai-data";

const axisStyle = { fontSize: 11, fill: "var(--text-muted)" } as const;

function TooltipShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-[14px] border border-border-strong bg-surface-elevated px-3.5 py-3 text-[12.5px]"
      style={{ boxShadow: "var(--shadow-panel)" }}
    >
      {children}
    </div>
  );
}

/* ---------------- TrendChart ---------------- */

export type TrendSeries = { key: string; label: string; color: string };

export function TrendChart({
  data,
  series,
  mode = "score",
  height = 380,
  valueFormatter,
}: {
  data: Record<string, string | number>[];
  series: TrendSeries[];
  mode?: "score" | "rank";
  height?: number;
  valueFormatter?: (v: number) => string;
}) {
  const [hidden, setHidden] = useState<string[]>([]);
  const visible = series.filter((s) => !hidden.includes(s.key));
  const fmt = valueFormatter ?? ((v: number) => (mode === "rank" ? `#${v}` : v.toFixed(1)));

  return (
    <div>
      <ul className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2">
        {series.map((s) => {
          const off = hidden.includes(s.key);
          return (
            <li key={s.key}>
              <button
                type="button"
                aria-pressed={!off}
                onClick={() =>
                  setHidden((h) => (h.includes(s.key) ? h.filter((k) => k !== s.key) : [...h, s.key]))
                }
                className={`flex items-center gap-2 text-[12.5px] transition-opacity ${
                  off ? "opacity-40" : "opacity-100"
                }`}
              >
                <span
                  aria-hidden
                  className="h-[3px] w-5 rounded-full"
                  style={{ background: s.color }}
                />
                <span className="text-muted-foreground">{s.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, bottom: 4, left: -8 }}>
            <CartesianGrid stroke="var(--grid-line)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={axisStyle}
              tickLine={false}
              axisLine={{ stroke: "var(--grid-line)" }}
              tickMargin={12}
            />
            <YAxis
              tick={axisStyle}
              tickLine={false}
              axisLine={false}
              width={56}
              reversed={mode === "rank"}
              tickFormatter={(v: number) => (mode === "rank" ? `#${v}` : String(v))}
            />
            <Tooltip
              cursor={{ stroke: "var(--border-strong)" }}
              content={({ active, payload, label }) =>
                active && payload?.length ? (
                  <TooltipShell>
                    <p className="mb-2 text-[11px] tracking-[0.09em] text-subtle uppercase">
                      {label}
                    </p>
                    <ul className="space-y-1.5">
                      {payload.map((p) => (
                        <li key={String(p.dataKey)} className="flex items-center gap-3">
                          <span
                            aria-hidden
                            className="size-1.5 rounded-full"
                            style={{ background: p.color }}
                          />
                          <span className="mr-auto text-muted-foreground">{p.name}</span>
                          <span className="num text-foreground">{fmt(Number(p.value))}</span>
                        </li>
                      ))}
                    </ul>
                  </TooltipShell>
                ) : null
              }
            />
            {visible.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label}
                stroke={s.color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
                animationDuration={400}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function metricSeries(keys: MetricKey[] = ["dis", "prominence", "affinity", "advocacy"]) {
  return keys.map((k) => {
    const m = METRICS.find((x) => x.key === k)!;
    return { key: k, label: m.label, color: m.color };
  });
}

/* ---------------- Sparkline ---------------- */

export function Sparkline({
  data,
  color = "var(--metric-dis)",
  height = 120,
}: {
  data: { month: string; value: number }[];
  color?: string;
  height?: number;
}) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: 4 }}>
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--text-subtle)" }} tickLine={false} axisLine={false} />
          <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
          <Tooltip
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <TooltipShell>
                  <span className="text-subtle">{label} · </span>
                  <span className="num text-foreground">{Number(payload[0]?.value).toFixed(1)}</span>
                </TooltipShell>
              ) : null
            }
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={{ r: 2, fill: color, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ---------------- QuadrantChart ---------------- */

export type QuadrantLabels = {
  topRight: string;
  topLeft: string;
  bottomRight: string;
  bottomLeft: string;
};

const QUAD_COLORS = {
  topRight: "var(--quad-strengthen)",
  topLeft: "var(--quad-grow)",
  bottomRight: "var(--quad-mitigate)",
  bottomLeft: "var(--quad-deprioritize)",
} as const;

export type QuadrantKey = keyof QuadrantLabels;

export function quadrantOf(t: QuadrantTopic): QuadrantKey {
  if (t.sentiment >= 0) return t.velocity >= 0 ? "topRight" : "topLeft";
  return t.velocity >= 0 ? "bottomRight" : "bottomLeft";
}

export function QuadrantChart({
  topics,
  labels,
  volumeLabel,
  selected,
  onSelect,
  height = 460,
  activeQuad = "all",
}: {
  topics: QuadrantTopic[];
  labels: QuadrantLabels;
  volumeLabel: string;
  selected?: string | null;
  onSelect?: (topic: string | null) => void;
  height?: number;
  activeQuad?: QuadrantKey | "all";
}) {
  const [zoom, setZoom] = useState(1);

  const bounds = useMemo(() => {
    if (!topics.length) return { xMin: -40, xMax: 70, yMin: -50, yMax: 80 };
    const xs = topics.map((t) => t.velocity);
    const ys = topics.map((t) => t.sentiment);
    const padX = Math.max(8, (Math.max(...xs) - Math.min(...xs)) * 0.15);
    const padY = Math.max(8, (Math.max(...ys) - Math.min(...ys)) * 0.15);
    return {
      xMin: Math.min(...xs, 0) - padX,
      xMax: Math.max(...xs, 0) + padX,
      yMin: Math.min(...ys, 0) - padY,
      yMax: Math.max(...ys, 0) + padY,
    };
  }, [topics]);

  const domain = useMemo(() => {
    const cx = (bounds.xMin + bounds.xMax) / 2;
    const cy = (bounds.yMin + bounds.yMax) / 2;
    const halfX = ((bounds.xMax - bounds.xMin) / 2) / zoom;
    const halfY = ((bounds.yMax - bounds.yMin) / 2) / zoom;
    return {
      x: [cx - halfX, cx + halfX] as [number, number],
      y: [cy - halfY, cy + halfY] as [number, number],
    };
  }, [bounds, zoom]);

  const points = useMemo(
    () =>
      topics.map((t) => ({
        ...t,
        quad: quadrantOf(t),
        fill: QUAD_COLORS[quadrantOf(t)],
      })),
    [topics],
  );

  const quadHighlight =
    activeQuad !== "all"
      ? {
          x1: activeQuad.endsWith("Left") ? domain.x[0] : 0,
          x2: activeQuad.endsWith("Left") ? 0 : domain.x[1],
          y1: activeQuad.startsWith("top") ? 0 : domain.y[0],
          y2: activeQuad.startsWith("top") ? domain.y[1] : 0,
          fill: QUAD_COLORS[activeQuad],
        }
      : null;

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          aria-label="Zoom in"
          className="control-base grid size-9 place-items-center px-0"
          onClick={() => setZoom((z) => Math.min(3, z * 1.25))}
        >
          <Plus className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Zoom out"
          className="control-base grid size-9 place-items-center px-0"
          onClick={() => setZoom((z) => Math.max(0.6, z / 1.25))}
        >
          <Minus className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Reset zoom"
          className="control-base flex h-9 items-center gap-1.5 px-3 text-[12px]"
          onClick={() => setZoom(1)}
        >
          <RotateCcw className="size-3.5" />
          Reset
        </button>
      </div>

      <div className="relative" style={{ height }}>
        <div className="pointer-events-none absolute inset-0 z-10">
          <span className="absolute top-3 right-4 text-[11px] tracking-[0.08em] uppercase" style={{ color: QUAD_COLORS.topRight }}>
            {labels.topRight}
          </span>
          <span className="absolute top-3 left-16 text-[11px] tracking-[0.08em] uppercase" style={{ color: QUAD_COLORS.topLeft }}>
            {labels.topLeft}
          </span>
          <span className="absolute right-4 bottom-[86px] text-[11px] tracking-[0.08em] uppercase" style={{ color: QUAD_COLORS.bottomRight }}>
            {labels.bottomRight}
          </span>
          <span className="absolute bottom-[86px] left-16 text-[11px] tracking-[0.08em] uppercase" style={{ color: QUAD_COLORS.bottomLeft }}>
            {labels.bottomLeft}
          </span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 28, right: 24, bottom: 40, left: 8 }}>
            <CartesianGrid stroke="var(--grid-line)" />
            {quadHighlight && (
              <ReferenceArea
                x1={quadHighlight.x1}
                x2={quadHighlight.x2}
                y1={quadHighlight.y1}
                y2={quadHighlight.y2}
                fill={quadHighlight.fill}
                fillOpacity={0.08}
                strokeOpacity={0}
              />
            )}
            <XAxis
              type="number"
              dataKey="velocity"
              name="Velocity"
              unit="%"
              domain={domain.x}
              allowDataOverflow
              tick={axisStyle}
              tickLine={false}
              axisLine={{ stroke: "var(--grid-line)" }}
              label={{
                value: "Velocity (%)",
                position: "insideBottom",
                offset: -18,
                style: { fontSize: 11, fill: "var(--text-subtle)" },
              }}
            />
            <YAxis
              type="number"
              dataKey="sentiment"
              name="Net Sentiment"
              domain={domain.y}
              allowDataOverflow
              tick={axisStyle}
              tickLine={false}
              axisLine={false}
              width={56}
              label={{
                value: "Net Sentiment",
                angle: -90,
                position: "insideLeft",
                offset: 18,
                style: { fontSize: 11, fill: "var(--text-subtle)" },
              }}
            />
            <ZAxis type="number" dataKey="volume" range={[90, 900]} name={volumeLabel} />
            <ReferenceLine x={0} stroke="var(--border-strong)" />
            <ReferenceLine y={0} stroke="var(--border-strong)" />
            <Tooltip
              cursor={false}
              content={({ active, payload }) => {
                const d = payload?.[0]?.payload as (QuadrantTopic & { quad: QuadrantKey }) | undefined;
                if (!active || !d) return null;
                return (
                  <TooltipShell>
                    <p className="mb-1.5 font-medium text-foreground">{d.topic}</p>
                    <p className="text-muted-foreground">
                      Velocity <span className="num text-foreground">{d.velocity > 0 ? "+" : ""}{d.velocity}%</span>
                    </p>
                    <p className="text-muted-foreground">
                      Net sentiment <span className="num text-foreground">{d.sentiment}</span>
                    </p>
                    <p className="text-muted-foreground">
                      {volumeLabel} <span className="num text-foreground">{compact(d.volume)}</span>
                    </p>
                    <p className="mt-1.5 text-[11px] uppercase" style={{ color: QUAD_COLORS[d.quad] }}>
                      {labels[d.quad]}
                    </p>
                  </TooltipShell>
                );
              }}
            />
            <Scatter
              data={points}
              shape={(props: unknown) => {
                const p = props as {
                  cx: number;
                  cy: number;
                  payload: QuadrantTopic & { fill: string };
                  size?: number;
                };
                const r = Math.sqrt((p.size ?? 200) / Math.PI);
                const isSel = selected === p.payload.topic;
                const dim = Boolean(selected) && !isSel;
                return (
                  <g
                    onClick={() => onSelect?.(isSel ? null : p.payload.topic)}
                    style={{ cursor: onSelect ? "pointer" : "default" }}
                  >
                    <circle
                      cx={p.cx}
                      cy={p.cy}
                      r={isSel ? r * 1.12 : r}
                      fill={p.payload.fill}
                      fillOpacity={dim ? 0.12 : 0.24}
                      stroke={p.payload.fill}
                      strokeWidth={isSel ? 2 : 1.2}
                      strokeOpacity={dim ? 0.3 : 1}
                      style={{ transition: "r 240ms ease, fill-opacity 240ms ease" }}
                    />
                    {(isSel || r > 20) && (
                      <text
                        x={p.cx}
                        y={p.cy + r + 13}
                        textAnchor="middle"
                        style={{
                          fontSize: 11,
                          fill: dim ? "var(--text-subtle)" : "var(--text-muted)",
                        }}
                      >
                        {p.payload.topic}
                      </text>
                    )}
                  </g>
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <ul className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-4">
        {(Object.keys(labels) as QuadrantKey[]).map((k) => (
          <li key={k} className="flex items-center gap-2 text-[12px] text-muted-foreground">
            <span aria-hidden className="size-2 rounded-full" style={{ background: QUAD_COLORS[k] }} />
            {labels[k]}
          </li>
        ))}
        <li className="ml-auto text-[11.5px] text-subtle">Bubble size = {volumeLabel}</li>
      </ul>
    </div>
  );
}
