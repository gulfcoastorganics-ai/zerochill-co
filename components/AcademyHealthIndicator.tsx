"use client";

import { useEffect, useState } from "react";

type AcademyHealthResponse = {
  ok?: boolean;
  supabaseReachable?: boolean;
  academyOperational?: boolean;
  warnings?: string[];
};

type IndicatorState = {
  label: string;
  tone: "operational" | "degraded" | "offline" | "standby";
};

function getIndicatorState(health: AcademyHealthResponse | null): IndicatorState {
  if (!health) {
    return { label: "STANDBY", tone: "standby" };
  }

  if (!health.ok) {
    return { label: "OFFLINE", tone: "offline" };
  }

  if (health.academyOperational && health.supabaseReachable) {
    return { label: "OPERATIONAL", tone: "operational" };
  }

  if (health.supabaseReachable || (health.warnings?.length ?? 0) === 0) {
    return { label: "DEGRADED", tone: "degraded" };
  }

  return { label: "OFFLINE", tone: "offline" };
}

export default function AcademyHealthIndicator() {
  const [health, setHealth] = useState<AcademyHealthResponse | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadHealth() {
      try {
        const response = await fetch("/api/academy-health", { cache: "no-store" });
        const result = (await response.json().catch(() => null)) as AcademyHealthResponse | null;

        if (!cancelled && response.ok) {
          setHealth(result);
        } else if (!cancelled) {
          setHealth({ ok: false });
        }
      } catch {
        if (!cancelled) {
          setHealth({ ok: false });
        }
      }
    }

    void loadHealth();

    return () => {
      cancelled = true;
    };
  }, []);

  const indicator = getIndicatorState(health);

  return (
    <span
      className={
        indicator.tone === "operational"
          ? "inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 font-mono text-[0.64rem] uppercase tracking-[0.2em] text-emerald-200"
          : indicator.tone === "degraded"
            ? "inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 font-mono text-[0.64rem] uppercase tracking-[0.2em] text-amber-200"
            : indicator.tone === "offline"
              ? "inline-flex items-center gap-2 rounded-full border border-[color:var(--accent)]/20 bg-[color:var(--accent)]/10 px-3 py-1 font-mono text-[0.64rem] uppercase tracking-[0.2em] text-[color:var(--accent-soft)]"
              : "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[0.64rem] uppercase tracking-[0.2em] text-[color:var(--steel)]"
      }
    >
      <span
        className={
          indicator.tone === "operational"
            ? "h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(74,222,128,0.35)]"
            : indicator.tone === "degraded"
              ? "h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.35)]"
              : indicator.tone === "offline"
                ? "h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_12px_rgba(220,38,38,0.35)]"
                : "h-1.5 w-1.5 rounded-full bg-[color:var(--steel)]"
        }
      />
      <span>Academy {indicator.label}</span>
    </span>
  );
}
