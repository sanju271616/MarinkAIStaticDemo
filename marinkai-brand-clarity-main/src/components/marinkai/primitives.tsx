import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, ChevronDown, TrendingDown, TrendingUp } from "lucide-react";

/* ---------- BrandLogo ---------- */

export function BrandLogo({
  showWordmark = true,
  size = 32,
}: {
  showWordmark?: boolean;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden
        className="grid shrink-0 place-items-center rounded-[12px] border border-gold/40"
        style={{
          width: size,
          height: size,
          background: "linear-gradient(145deg, var(--gold), var(--gold-2))",
        }}
      >
        <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 20 20" fill="none">
          <path
            d="M2 16V4l6 8 6-8v12"
            stroke="var(--gold-foreground)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[19px] tracking-[0.02em] text-foreground">
            Marinkai
          </span>
          <span className="mt-1 text-[9.5px] tracking-[0.22em] text-subtle uppercase">
            Brand Intelligence
          </span>
        </span>
      )}
    </div>
  );
}

/* ---------- Popover primitive ---------- */

export function Popover({
  trigger,
  children,
  align = "start",
  width = 260,
  label,
}: {
  trigger: (open: boolean) => ReactNode;
  children: (close: () => void) => ReactNode;
  align?: "start" | "end";
  width?: number;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
        className="control-base flex items-center gap-2 px-3.5"
        data-state={open ? "open" : "closed"}
      >
        {trigger(open)}
      </button>
      {open && (
        <div
          role="dialog"
          className="rise absolute top-[calc(100%+8px)] z-50 overflow-hidden rounded-[16px] border border-border-strong bg-surface-elevated p-2"
          style={{
            width,
            boxShadow: "var(--shadow-panel)",
            [align === "end" ? "right" : "left"]: 0,
          }}
        >
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

/* ---------- DashboardSelect ---------- */

export function DashboardSelect({
  value,
  options,
  onChange,
  label,
  width = 220,
  minWidth,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
  label?: string;
  width?: number;
  minWidth?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      {label && <span className="label-caps hidden lg:inline">{label}</span>}
      <Popover
        width={width}
        label={label ?? "Select"}
        trigger={(open) => (
          <span
            className="flex items-center gap-2"
            style={{ minWidth: minWidth ?? undefined }}
          >
            <span className="truncate text-[13px] font-medium">{value}</span>
            <ChevronDown
              className={`ml-auto size-3.5 text-subtle transition-transform ${open ? "rotate-180" : ""}`}
            />
          </span>
        )}
      >
        {(close) => (
          <ul className="max-h-[300px] overflow-y-auto" role="listbox">
            {options.map((o) => {
              const active = o === value;
              return (
                <li key={o}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onChange(o);
                      close();
                    }}
                    className={`flex w-full items-center justify-between rounded-[11px] px-3 py-2 text-left text-[13px] transition-colors hover:bg-surface ${
                      active ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <span className="truncate">{o}</span>
                    {active && <Check className="size-3.5 text-gold" />}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </Popover>
    </div>
  );
}

/* ---------- SegmentToggle ---------- */

export function SegmentToggle<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { value: T; label: string; icon?: ReactNode }[];
  onChange: (v: T) => void;
  label?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {label && <span className="label-caps hidden lg:inline">{label}</span>}
      <div
        role="group"
        aria-label={label}
        className="flex h-10 items-center gap-1 rounded-[14px] border border-border-strong bg-surface-elevated p-1"
      >
        {options.map((o) => {
          const active = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.value)}
              className={`flex h-8 items-center gap-1.5 rounded-[10px] px-3 text-[12.5px] font-medium transition-colors ${
                active
                  ? "bg-[color-mix(in_srgb,var(--accent-active)_16%,transparent)] text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={active ? { boxShadow: "inset 0 0 0 1px var(--accent-active)" } : undefined}
            >
              {o.icon}
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- GrowthPill ---------- */

export function GrowthPill({ value, size = "md" }: { value: number; size?: "sm" | "md" }) {
  const up = value >= 0;
  return (
    <span
      className={`num inline-flex items-center gap-1 rounded-full border px-2 font-medium ${
        size === "sm" ? "h-[19px] text-[11px]" : "h-[23px] text-[12px]"
      }`}
      style={{
        color: up ? "var(--positive)" : "var(--negative)",
        borderColor: `color-mix(in srgb, ${up ? "var(--positive)" : "var(--negative)"} 35%, transparent)`,
        background: `color-mix(in srgb, ${up ? "var(--positive)" : "var(--negative)"} 10%, transparent)`,
      }}
    >
      {up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
      {up ? "+" : ""}
      {value.toFixed(1)}%
    </span>
  );
}

/* ---------- GlassCard ---------- */

export function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`glass rounded-[18px] p-4 ${className}`}>{children}</div>;
}

/* ---------- Panel ---------- */

export function Panel({
  title,
  subtitle,
  actions,
  children,
  className = "",
  bodyClassName = "",
}: {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section
      className={`panel overflow-hidden ${className}`}
      style={{ boxShadow: "var(--shadow-panel)" }}
    >
      {(title || actions) && (
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border px-6 py-5">
          <div>
            {title && <h2 className="text-[20px] leading-tight text-foreground">{title}</h2>}
            {subtitle && (
              <p className="mt-1.5 text-[13px] text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className={`px-6 py-5 ${bodyClassName}`}>{children}</div>
    </section>
  );
}
