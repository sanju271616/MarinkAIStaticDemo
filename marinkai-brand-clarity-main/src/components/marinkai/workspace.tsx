import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEFAULT_COMPARE_BRANDS } from "@/lib/drill-down-data";

export type WorkspaceContextValue = {
  market: string;
  category: string;
  brand: string;
  period: string;
  compareBrands: string[];
  set: (patch: Partial<Omit<WorkspaceContextValue, "set">>) => void;
};

const DEFAULTS = {
  market: "United States",
  category: "Skincare",
  brand: "CeraVe",
  period: "May '25",
  compareBrands: DEFAULT_COMPARE_BRANDS,
};

const Ctx = createContext<WorkspaceContextValue>({ ...DEFAULTS, set: () => {} });

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(DEFAULTS);

  useEffect(() => {
    const raw = window.localStorage.getItem("marinkai-workspace");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Partial<typeof DEFAULTS>;
      setState((s) => ({ ...s, ...parsed }));
    } catch {
      /* ignore malformed state */
    }
  }, []);

  const set: WorkspaceContextValue["set"] = (patch) => {
    setState((s) => {
      const next = { ...s, ...patch };
      window.localStorage.setItem("marinkai-workspace", JSON.stringify(next));
      return next;
    });
  };

  return <Ctx.Provider value={{ ...state, set }}>{children}</Ctx.Provider>;
}

export function useWorkspace() {
  return useContext(Ctx);
}
