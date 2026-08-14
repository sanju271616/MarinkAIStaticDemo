import { useMemo, useState } from "react";
import { ChevronLeft, X } from "lucide-react";
import { SegmentToggle } from "./primitives";
import {
  topicDrillDownBrands,
  topicDrillDownDetails,
  type DrillDownBrandRow,
  type DrillDownDetailRow,
} from "@/lib/drill-down-data";
import { compact, type QuadrantTopic } from "@/lib/marinkai-data";

type Scope = "all" | "10" | "20";

export function DrillDownPanel({
  topic,
  topicData,
  brand,
  onClose,
  enableSecondLevel = false,
}: {
  topic: string;
  topicData: QuadrantTopic;
  brand?: string;
  onClose: () => void;
  enableSecondLevel?: boolean;
}) {
  const [scope, setScope] = useState<Scope>("20");
  const [detailBrand, setDetailBrand] = useState<string | null>(null);

  const rows = useMemo(() => {
    const limit = scope === "all" ? undefined : scope === "10" ? 10 : 20;
    return topicDrillDownBrands(topic, topicData, limit);
  }, [topic, topicData, scope]);

  const details = useMemo(() => {
    if (!detailBrand) return [] as DrillDownDetailRow[];
    return topicDrillDownDetails(topic, detailBrand);
  }, [topic, detailBrand]);

  return (
    <section
      className="panel mt-6 overflow-hidden"
      style={{ boxShadow: "var(--shadow-panel)" }}
      aria-label="Drill-down detail"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-5">
        <div className="min-w-0">
          <p className="label-caps mb-1">Drill down</p>
          <h2 className="truncate text-[20px] text-foreground">{topic}</h2>
          <p className="mt-1 text-[13px] text-muted-foreground">
            {brand ? `${brand} · ` : ""}
            Velocity {topicData.velocity > 0 ? "+" : ""}
            {topicData.velocity}% · Sentiment {topicData.sentiment} · Volume {compact(topicData.volume)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!detailBrand && (
            <SegmentToggle
              value={scope}
              onChange={setScope}
              options={[
                { value: "all", label: "All brands" },
                { value: "10", label: "Top 10" },
                { value: "20", label: "Top 20" },
              ]}
            />
          )}
          <button
            type="button"
            aria-label="Close drill down"
            className="control-base grid size-10 place-items-center px-0"
            onClick={onClose}
          >
            <X className="size-4" />
          </button>
        </div>
      </header>

      <div className="px-6 py-5">
        {detailBrand ? (
          <>
            <button
              type="button"
              className="mb-4 flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground"
              onClick={() => setDetailBrand(null)}
            >
              <ChevronLeft className="size-4" />
              Back to brand list
            </button>
            <h3 className="text-[16px] font-medium text-foreground">
              {detailBrand} · signal breakdown
            </h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-[13px]">
                <thead>
                  <tr className="label-caps border-b border-border">
                    <th className="pb-3 pr-4">Signal</th>
                    <th className="pb-3 pr-4">Channel</th>
                    <th className="pb-3 pr-4">Mentions</th>
                    <th className="pb-3">Sentiment</th>
                  </tr>
                </thead>
                <tbody>
                  {details.map((d) => (
                    <tr key={d.signal} className="border-b border-border">
                      <td className="py-3 pr-4 text-foreground">{d.signal}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{d.channel}</td>
                      <td className="num py-3 pr-4">{compact(d.mentions)}</td>
                      <td className="num py-3">{d.sentiment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <BrandDrillTable
            rows={rows}
            onBrandClick={enableSecondLevel ? setDetailBrand : undefined}
          />
        )}
      </div>
    </section>
  );
}

function BrandDrillTable({
  rows,
  onBrandClick,
}: {
  rows: DrillDownBrandRow[];
  onBrandClick?: (brand: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-[13px]">
        <thead>
          <tr className="label-caps border-b border-border">
            <th className="pb-3 pr-4">Rank</th>
            <th className="pb-3 pr-4">Brand</th>
            <th className="pb-3 pr-4">Score</th>
            <th className="pb-3 pr-4">Volume</th>
            <th className="pb-3 pr-4">Velocity</th>
            <th className="pb-3">Sentiment</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.brand} className="border-b border-border">
              <td className="num py-3 pr-4 text-muted-foreground">#{r.rank}</td>
              <td className="py-3 pr-4">
                {onBrandClick ? (
                  <button
                    type="button"
                    className="font-medium text-gold hover:underline"
                    onClick={() => onBrandClick(r.brand)}
                  >
                    {r.brand}
                  </button>
                ) : (
                  <span className="text-foreground">{r.brand}</span>
                )}
              </td>
              <td className="num py-3 pr-4">{r.score.toFixed(1)}</td>
              <td className="num py-3 pr-4">{compact(r.volume)}</td>
              <td className="num py-3 pr-4">
                {r.velocity > 0 ? "+" : ""}
                {r.velocity}%
              </td>
              <td className="num py-3">{r.sentiment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
