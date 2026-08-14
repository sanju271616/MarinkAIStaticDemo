import { Check } from "lucide-react";
import { Popover } from "./primitives";
import { BRANDS } from "@/lib/marinkai-data";

const MAX_COMPARE = 4;

export function BrandComparePicker({
  primary,
  selected,
  onChange,
}: {
  primary: string;
  selected: string[];
  onChange: (brands: string[]) => void;
}) {
  const pool = BRANDS.filter((b) => b !== primary);
  const label =
    selected.length === 0
      ? "Select rivals"
      : selected.length === 1
        ? selected[0]!
        : `${selected.length} rivals`;

  function toggle(brand: string) {
    if (selected.includes(brand)) {
      onChange(selected.filter((b) => b !== brand));
      return;
    }
    if (selected.length >= MAX_COMPARE) return;
    onChange([...selected, brand]);
  }

  return (
    <Popover
      width={260}
      label="Compare brands"
      trigger={(open) => (
        <span className="flex min-w-[130px] items-center gap-2">
          <span className="label-caps hidden lg:inline">Compare</span>
          <span className="truncate text-[13px] font-medium">{label}</span>
          <span className="ml-auto text-[10px] text-subtle">{selected.length}/{MAX_COMPARE}</span>
        </span>
      )}
    >
      {(close) => (
        <div>
          <p className="px-3 pb-2 text-[11px] text-muted-foreground">
            Select up to {MAX_COMPARE} brands to compare with{" "}
            <span className="text-gold">{primary}</span>
          </p>
          <ul className="max-h-[280px] overflow-y-auto" role="listbox">
            {pool.map((b) => {
              const active = selected.includes(b);
              const disabled = !active && selected.length >= MAX_COMPARE;
              return (
                <li key={b}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    disabled={disabled}
                    onClick={() => toggle(b)}
                    className={`flex w-full items-center justify-between rounded-[11px] px-3 py-2 text-left text-[13px] transition-colors hover:bg-surface disabled:opacity-40 ${
                      active ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <span className="truncate">{b}</span>
                    {active && <Check className="size-3.5 text-gold" />}
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            className="control-base mt-2 w-full text-[12.5px] font-medium"
            onClick={() => {
              onChange([]);
              close();
            }}
          >
            Clear selection
          </button>
        </div>
      )}
    </Popover>
  );
}
