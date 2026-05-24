import type { Metadata } from "next";
import Link from "next/link";
import { getLaunchTarget, isExternalLaunchHref, launchFallbackHref } from "@/lib/launchLinks";

export const metadata: Metadata = {
  title: "Sovereign Zero Preorder | ZeroChill Co.",
  description: "Sovereign Zero preorder details, launch queue access, and Payhip checkout handoff.",
  openGraph: {
    title: "Sovereign Zero Preorder | ZeroChill Co.",
    description:
      "Reserve the operator-owned hardware path for private deployment and localized intelligence.",
    type: "website",
  },
};

function LaunchAction({
  href,
  label,
  external = false,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const className =
    "zerochill-button zerochill-action inline-flex w-full max-w-full items-center justify-center rounded-full border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] leading-tight text-white sm:w-auto sm:tracking-[0.22em]";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export default function PreorderPage() {
  const sovereignZero = getLaunchTarget("sovereignZero");
  const usingFallback = sovereignZero.href === launchFallbackHref;

  return (
    <main className="zerochill-shell min-h-screen bg-black text-white">
      <section className="zerochill-section mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[0.64rem] uppercase tracking-[0.46em] text-[color:var(--steel)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_14px_rgba(185,28,28,0.45)]" />
          Preorder / Launch Queue
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <article className="glass-panel-strong rounded-3xl p-6 sm:p-8">
            <div className="border-b border-[color:var(--accent)]/70 pb-3 text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
              Sovereign Zero preorder
            </div>
            <h1 className="mt-5 text-[clamp(2.5rem,5vw,4.75rem)] font-black uppercase leading-[0.9] tracking-[-0.08em] text-white">
              Operator-owned hardware for localized intelligence.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
              Sovereign Zero is the hardware line for private deployment, local execution, and a controlled
              intelligence surface. The preorder reserves your place in the launch queue and connects you to
              checkout when Payhip is live.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--steel)]">
              {["Local-first", "Private vault", "Edge-ready", "Operator-owned"].map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-black/40 px-3 py-2">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "What you get",
                  copy: "A preorder slot, launch queue placement, and the Sovereign Zero hardware path.",
                },
                {
                  title: "What happens next",
                  copy: "Confirmation and access details are emailed after checkout.",
                },
              ].map((item) => (
                <article key={item.title} className="terminal-surface rounded-2xl p-4">
                  <div className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                    {item.title}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-white/70">{item.copy}</p>
                </article>
              ))}
            </div>

            <div className="terminal-surface mt-8 rounded-2xl p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                    Checkout status
                  </div>
                  <div className="mt-2 font-mono text-sm uppercase tracking-[0.2em] text-white">
                    {usingFallback ? "Queue fallback active" : sovereignZero.status}
                  </div>
                </div>
                <span className="rounded-full border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[color:var(--accent)]">
                  {usingFallback ? "Opening Soon" : "Payhip Ready"}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/68">
                {usingFallback
                  ? "The Payhip URL is not connected yet. Use the homepage launch panel until the checkout link is added to .env.local."
                  : "You are being sent directly to Payhip for preorder checkout."}
              </p>
            </div>

            {usingFallback ? (
              <div className="mt-4 rounded-2xl border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/10 px-4 py-3 text-sm uppercase tracking-[0.2em] text-[color:var(--accent)]">
                Launch checkout opening soon.
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <LaunchAction
                href={sovereignZero.href}
                label={sovereignZero.label}
                external={isExternalLaunchHref(sovereignZero.href)}
              />
              <Link
                href="/#launch-access"
                className="zerochill-action inline-flex w-full max-w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] leading-tight text-[color:var(--steel)] transition-colors hover:border-[color:var(--accent)]/60 hover:text-white sm:w-auto sm:tracking-[0.22em]"
              >
                Launch Access
              </Link>
            </div>
          </article>

          <aside className="grid gap-4">
            <article className="glass-panel rounded-3xl p-6">
              <div className="border-b border-white/10 pb-3 text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                Buyer handoff
              </div>
              <ul className="mt-4 space-y-4">
                {[
                  "Payhip processes the preorder.",
                  "The email receipt confirms the order.",
                  "Access details are sent after checkout.",
                  "Launch queue updates from there.",
                ].map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-6 text-white/70">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="glass-panel-strong rounded-3xl p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                  Launch queue
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.26em] text-white/70">
                  Active
                </span>
              </div>
              <div className="mt-5 grid gap-3">
                {[
                  ["1", "Reserve preorder"],
                  ["2", "Payhip checkout"],
                  ["3", "Email confirmation"],
                  ["4", "Access follows"],
                ].map(([step, label]) => (
                  <div
                    key={step}
                    className="glass-card flex flex-col gap-1 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[color:var(--steel)]">
                      Step {step}
                    </span>
                    <span className="text-sm uppercase tracking-[0.12em] text-white sm:text-right">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </aside>
        </div>
      </section>
    </main>
  );
}
