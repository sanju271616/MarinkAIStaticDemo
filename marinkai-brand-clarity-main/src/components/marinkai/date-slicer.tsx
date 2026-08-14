import { useState } from "react";
import { CalendarRange, ChevronLeft, ChevronRight } from "lucide-react";
import { Popover } from "./primitives";

type Mode = "month" | "quarter" | "rolling" | "year";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const YEARS = [2023, 2024, 2025];

function availableMonths(year: number) {
  return year === 2025 ? MONTHS.slice(0, 5) : MONTHS;
}

function availableQuarters(year: number) {
  return year === 2025 ? ["Q1"] : ["Q1", "Q2", "Q3", "Q4"];
}

export function DateSlicer({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [mode, setMode] = useState<Mode>("month");
  const [year, setYear] = useState(2025);

  const yearIndex = YEARS.indexOf(year);

  const periods =
    mode === "month"
      ? availableMonths(year).map((m) => ({ label: m, value: `${m} '${String(year).slice(2)}` }))
      : mode === "quarter"
        ? availableQuarters(year).map((q) => ({ label: q, value: `${q} ${year}` }))
        : mode === "rolling"
          ? availableMonths(year)
              .slice(2)
              .map((m, i) => {
                const months = availableMonths(year);
                const start = months[i] ?? m;
                return {
                  label: `${start}–${m}`,
                  value: `${start}–${m} '${String(year).slice(2)}`,
                };
              })
          : [{ label: String(year), value: `FY ${year}` }];

  return (
    <Popover
      width={320}
      align="end"
      label="Reporting period"
      trigger={() => (
        <span className="flex items-center gap-2">
          <CalendarRange className="size-4 text-gold" />
          <span className="num text-[13px] font-medium">{value}</span>
        </span>
      )}
    >
      {(close) => (
        <div className="p-1">
          <div className="mb-3 grid grid-cols-2 gap-1 rounded-[12px] border border-border bg-surface p-1">
            {(
              [
                ["month", "Month"],
                ["quarter", "Quarter"],
                ["rolling", "Rolling 3M"],
                ["year", "Year"],
              ] as [Mode, string][]
            ).map(([m, label]) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
                className={`h-8 rounded-[9px] text-[12px] font-medium transition-colors ${
                  mode === m
                    ? "bg-[color-mix(in_srgb,var(--accent-active)_16%,transparent)] text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mb-3 flex items-center justify-between px-1">
            <button
              type="button"
              aria-label="Previous year"
              disabled={yearIndex <= 0}
              onClick={() => setYear(YEARS[Math.max(0, yearIndex - 1)] ?? year)}
              className="grid size-7 place-items-center rounded-[9px] border border-border text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
            >
              <ChevronLeft className="size-3.5" />
            </button>
            <span className="num text-[13px] font-medium">{year}</span>
            <button
              type="button"
              aria-label="Next year"
              disabled={yearIndex >= YEARS.length - 1}
              onClick={() => setYear(YEARS[Math.min(YEARS.length - 1, yearIndex + 1)] ?? year)}
              className="grid size-7 place-items-center rounded-[9px] border border-border text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>

          <div className={`grid gap-1.5 ${mode === "year" ? "grid-cols-1" : "grid-cols-4"}`}>
            {periods.map((p) => {
              const active = p.value === value;
              return (
                <button
                  key={p.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    onChange(p.value);
                    close();
                  }}
                  className={`h-9 rounded-[10px] border text-[12.5px] font-medium transition-colors ${
                    active
                      ? "text-foreground"
                      : "border-transparent text-muted-foreground hover:border-border-strong hover:text-foreground"
                  }`}
                  style={
                    active
                      ? {
                          borderColor: "var(--accent-active)",
                          background:
                            "color-mix(in srgb, var(--accent-active) 16%, transparent)",
                        }
                      : undefined
                  }
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {mode !== "year" && year === 2025 && (
            <p className="mt-3 px-1 text-[11.5px] text-subtle">
              Data available through May 2025.
            </p>
          )}
        </div>
      )}
    </Popover>
  );
}
