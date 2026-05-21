import Link from "next/link";
import { getLaunchTarget, isExternalLaunchHref } from "@/lib/launchLinks";

const brandNodes = [
  {
    title: "ZEROCHILL CO.",
    copy: "The parent system. Editorial control, industrial restraint, and a black-metal surface.",
  },
  {
    title: "SOVEREIGN ZERO",
    copy: "The hardware line. Localized intelligence packaged for operator ownership.",
  },
  {
    title: "ZERO-STATE MATRIX",
    copy: "The terminal layer. Readable state, explicit policy, and machine-first visibility.",
  },
];

const problemStates = [
  {
    label: "WARNING // 01",
    title: "They Watch",
    copy: "Cloud platforms see the system, but the operator still does not own the perimeter.",
  },
  {
    label: "WARNING // 02",
    title: "They Switch",
    copy: "Rules, pricing, and access can change without warning or consent.",
  },
  {
    label: "WARNING // 03",
    title: "They Fail",
    copy: "When the connection breaks, rented intelligence loses its center with it.",
  },
];

const hardwareCards = [
  {
    name: "Sovereign Zero Lite",
    badge: "ENTRY NODE",
    copy: "A compact local intelligence profile for small teams and portable deployments.",
    specs: [
      { label: "Localized AI", value: "Local-first inference / operator-owned" },
      { label: "Private vault", value: "Encrypted workspace / narrow trust lane" },
      { label: "Off-grid", value: "Detached runtime / field ready" },
      { label: "Telemetry", value: "Zero cloud reliance / local observability" },
    ],
  },
  {
    name: "Sovereign Zero Core",
    badge: "STANDARD NODE",
    copy: "The production baseline for private AI operations and controlled workspaces.",
    specs: [
      { label: "Localized AI", value: "Private models / hardened execution" },
      { label: "Private vault", value: "Controlled archives / restricted surface" },
      { label: "Off-grid", value: "Air-gap capable / low-touch deployment" },
      { label: "Telemetry", value: "Zero telemetry reliance / internal trace only" },
    ],
  },
  {
    name: "Sovereign Zero Blacksite",
    badge: "SECURE NODE",
    copy: "An isolated configuration for sensitive rooms, private labs, and restricted lanes.",
    specs: [
      { label: "Localized AI", value: "Isolated model runtime / sealed system" },
      { label: "Private vault", value: "Locked digital vault / audit discipline" },
      { label: "Off-grid", value: "Detached operation / no external sync" },
      { label: "Telemetry", value: "Zero telemetry reliance / local logs only" },
    ],
  },
];

const terminalRows = [
  {
    label: "DEPLOY // BOOT",
    command: "$ zerochill boot --local --policy strict",
    body: "Brings the runtime up inside the operator perimeter without cloud dependency.",
    status: "ACTIVE",
    latency: "14ms",
  },
  {
    label: "DEPLOY // TRACE",
    command: "$ zerochill policy trace --surface minimal",
    body: "Surfaces only the controls required to inspect state and containment.",
    status: "SYNCED",
    latency: "11ms",
  },
  {
    label: "DEPLOY // EDGE",
    command: "$ zerochill deploy --target edge --watch disabled",
    body: "Optimized for compact machines, detached environments, and field hardware.",
    status: "SEALED",
    latency: "09ms",
  },
];

const terminalHealth = [
  { label: "NODE HEALTH", value: "99.98%" },
  { label: "SYNC STATE", value: "LOCAL" },
  { label: "LATENCY", value: "11ms" },
  { label: "TELEMETRY", value: "RESTRICTED" },
];

const nodeMetrics = [
  { label: "CPU", value: "61%", width: "61%" },
  { label: "MEM", value: "44%", width: "44%" },
  { label: "IO", value: "18%", width: "18%" },
];

const manifestPhases = [
  {
    phase: "PHASE_01",
    title: "THE DECLARATION",
    copy: "The operating stance is explicit: local intelligence, operator control, and no cloud dependency for core systems.",
    tags: ["LOCAL ONLY", "STRICT POLICY", "NO DRIFT"],
  },
  {
    phase: "PHASE_02",
    title: "THE HIERARCHY",
    copy: "Define the stack in order, from surface to runtime to machine authority.",
    tags: ["SURFACE", "RUNTIME", "AUTHORITY"],
  },
  {
    phase: "PHASE_03",
    title: "THE HARDWARE REVEAL",
    copy: "Show the system as an object, not a story. The hardware is the proof.",
    tags: ["STEEL", "EDGE", "SEALED"],
  },
];

const manifestPoints = [
  "Keep intelligence local and explicit.",
  "Expose the machine, not the user.",
  "Build for control before convenience.",
  "Treat connectivity as optional, not foundational.",
];

function SectionTitle({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-[0.64rem] uppercase tracking-[0.5em] text-[color:var(--steel)]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-pretty text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
        {copy}
      </p>
    </div>
  );
}

function PanelCard({
  title,
  copy,
  className = "",
}: {
  title: string;
  copy: string;
  className?: string;
}) {
  return (
    <article
      className={`zerochill-card rounded-2xl border border-white/10 bg-white/[0.03] p-6 ${className}`}
    >
      <div className="border-b border-[color:var(--accent)]/70 pb-3 text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
        {title}
      </div>
      <p className="mt-4 text-sm leading-7 text-white/68">{copy}</p>
    </article>
  );
}

function LaunchButton({
  href,
  label,
  className = "",
  external = false,
}: {
  href: string;
  label: string;
  className?: string;
  external?: boolean;
}) {
  const baseClasses =
    `zerochill-button inline-flex items-center justify-center border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={baseClasses}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={baseClasses}>
      {label}
    </Link>
  );
}

export default function Home() {
  const sovereignZeroLaunch = getLaunchTarget("sovereignZero");
  const matrixAccessLaunch = getLaunchTarget("matrixAccess");

  return (
    <main className="zerochill-shell bg-black text-white">
      <section id="hero" className="zerochill-section relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 zerochill-grid-overlay" />
        <div className="pointer-events-none absolute inset-0 zerochill-scanlines" />
        <div className="relative mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[0.64rem] uppercase tracking-[0.46em] text-[color:var(--steel)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_14px_rgba(185,28,28,0.45)]" />
                ZeroChill Co.
	          </div>
              <h1 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-[0.84] tracking-[-0.08em] sm:text-7xl lg:text-[clamp(4.8rem,9.2vw,9rem)]">
                YOUR AI.
                <span className="block text-[color:var(--accent)] drop-shadow-[0_0_18px_rgba(185,28,28,0.14)]">
                  UNPLUGGED.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-balance text-base leading-8 text-white/68 sm:text-lg">
                We build impenetrable hardware for localized intelligence.
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5 text-[0.64rem] uppercase tracking-[0.34em] text-[color:var(--steel)]">
                <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-2">LOCAL ONLY</span>
                <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-2">PRIVATE INFRASTRUCTURE</span>
                <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-2">STEEL / CRIMSON</span>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <LaunchButton
                  href={sovereignZeroLaunch.href}
                  label={sovereignZeroLaunch.label}
                  external={isExternalLaunchHref(sovereignZeroLaunch.href)}
                />
              </div>
            </div>

            <div className="zerochill-card rounded-3xl border border-white/10 bg-black/70 p-6 shadow-2xl shadow-black/50 sm:p-8">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <div className="text-[0.64rem] uppercase tracking-[0.48em] text-[color:var(--steel)]">
                    System status
                  </div>
                  <div className="mt-2 text-sm uppercase tracking-[0.24em] text-white/80">
                    Local / Hardened / Operator-owned
                  </div>
                </div>
                <span className="zerochill-pulse rounded-full border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[color:var(--accent)]">
                  ONLINE
                </span>
              </div>
              <div className="mt-5 space-y-4 font-mono text-[0.72rem] leading-7 text-white/70 sm:text-sm">
                <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-3">
                  <span className="uppercase tracking-[0.2em] text-[color:var(--steel)]">Surface</span>
                  <span className="text-right uppercase tracking-[0.16em] text-white">
                    Obsidian / Charcoal / Steel
                  </span>
                </div>
                <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-3">
                  <span className="uppercase tracking-[0.2em] text-[color:var(--steel)]">Role</span>
                  <span className="text-right uppercase tracking-[0.16em] text-white">
                    Dashboard / Storefront / Terminal
                  </span>
                </div>
                <div className="flex items-start justify-between gap-6">
                  <span className="uppercase tracking-[0.2em] text-[color:var(--steel)]">Mode</span>
                  <span className="text-right uppercase tracking-[0.16em] text-white">
                    Fast / Responsive / Production-ready
                  </span>
                </div>
                <div className="pt-2">
                  <div className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.3em] text-[color:var(--steel)]">
                    <span>Telemetry</span>
                    <span>Live</span>
                  </div>
                  <div className="mt-3 flex h-2 gap-1 overflow-hidden rounded-full bg-white/[0.04]">
                    <span className="zerochill-bar w-[28%]" />
                    <span className="zerochill-bar w-[22%] [animation-delay:180ms]" />
                    <span className="zerochill-bar w-[18%] [animation-delay:360ms]" />
                    <span className="zerochill-bar w-[26%] [animation-delay:540ms]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-b border-white/10 px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <SectionTitle
          eyebrow="Brand hierarchy"
          title="One parent, two systems below it."
          copy="The architecture should read like a controlled product stack, not a marketing collage."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {brandNodes.map((node) => (
            <PanelCard
              key={node.title}
              title={node.title}
              copy={node.copy}
              className="reveal-card"
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-b border-white/10 px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <SectionTitle
          eyebrow="Problem-state blueprint"
          title="Name the failure modes."
          copy="This section frames the reason for the product by showing what centralized systems take away."
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {problemStates.map((state, index) => (
            <article
              key={state.title}
              className="zerochill-card group rounded-2xl border border-white/10 bg-black/50 p-6"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                  {state.label}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_12px_rgba(185,28,28,0.28)] transition-transform duration-200 group-hover:scale-125" />
              </div>
              <div className="mt-5 text-xl font-semibold tracking-[-0.05em] text-white sm:text-2xl">
                {state.title}
              </div>
              <div className="mt-4 h-px w-16 bg-[color:var(--accent)]/80" />
              <p className="mt-4 text-sm leading-7 text-white/68">{state.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-b border-white/10 px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <SectionTitle
          eyebrow="Sovereign Zero hardware"
          title="A hardware line with explicit tiers."
          copy="Treat the storefront as a serious product index. Each card should read like a machine spec, not a promo tile."
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {hardwareCards.map((card, index) => (
            <article
              key={card.name}
              className="zerochill-card rounded-3xl border border-white/10 bg-white/[0.03] p-6"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                <span className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                  {card.badge}
                </span>
                <span className="h-px flex-1 bg-[color:var(--accent)]/70" />
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.04em] text-white">
                {card.name}
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/70">{card.copy}</p>
              <div className="mt-5 grid gap-3 border-t border-white/10 pt-4">
                {card.specs.map((spec) => (
                  <div key={spec.label} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                    <div className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                      {spec.label}
                    </div>
                    <div className="mt-2 text-sm leading-6 text-white/80">{spec.value}</div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-b border-white/10 px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <SectionTitle
          eyebrow="Zero-State Matrix terminal"
          title="Readable state, explicit instruction blocks."
          copy="Use terminal-grid structure and sharp separators so the machine language stays legible at a glance."
        />
        <div className="zerochill-card mt-8 rounded-3xl border border-white/10 bg-black/70 p-5 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--accent)]/70 pb-4">
            <div>
              <div className="text-[0.64rem] uppercase tracking-[0.48em] text-[color:var(--steel)]">
                Terminal grid
              </div>
              <div className="mt-2 font-mono text-xs uppercase tracking-[0.24em] text-white/80">
                command / instruction / response
              </div>
            </div>
            <div className="zerochill-flash font-mono text-[0.64rem] uppercase tracking-[0.28em] text-[color:var(--accent)]">
              crimson underline accents
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-4">
              {terminalRows.map((row, index) => (
                <article
                  key={row.label}
                  className="zerochill-card rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                      {row.label}
                    </div>
                    <div className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.3em] text-white/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                      {row.status}
                    </div>
                  </div>
                  <pre className="mt-4 overflow-x-auto border-l-2 border-[color:var(--accent)] pl-4 font-mono text-xs leading-7 text-white">
                    {row.command}
                  </pre>
                  <p className="mt-4 text-sm leading-7 text-white/68">{row.body}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-[color:var(--steel)]">
                    <span>Latency {row.latency}</span>
                    <span>Local node</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="grid gap-4">
              <article className="zerochill-card rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                    Local node
                  </span>
                  <span className="rounded-full border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/10 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.26em] text-[color:var(--accent)]">
                    Healthy
                  </span>
                </div>
                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl border border-white/10 bg-black/50 p-4">
                    <div className="flex items-center justify-between text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                      <span>Node map</span>
                      <span>Zero-hop</span>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/10">
                        <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_16px_rgba(185,28,28,0.45)]" />
                      </span>
                      <div>
                        <div className="text-sm uppercase tracking-[0.24em] text-white/80">
                          Sovereign Zero Node
                        </div>
                        <div className="mt-1 text-xs uppercase tracking-[0.2em] text-[color:var(--steel)]">
                          Offline-ready / operator controlled
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      {nodeMetrics.map((metric) => (
                        <div key={metric.label} className="flex items-center gap-3">
                          <span className="w-9 text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                            {metric.label}
                          </span>
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.04]">
                            <span
                              className="zerochill-bar block h-full"
                              style={{ width: metric.width }}
                            />
                          </div>
                          <span className="w-10 text-right font-mono text-[0.7rem] text-white/75">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>

              <div className="grid gap-3 sm:grid-cols-2">
                {terminalHealth.map((item) => (
                  <article key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                      {item.label}
                    </div>
                    <div className="mt-2 font-mono text-sm uppercase tracking-[0.2em] text-white">
                      {item.value}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-b border-white/10 px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <SectionTitle
          eyebrow="Deployment manifest"
          title="The operating principles stay short."
          copy="Keep the manifesto panel crisp and direct. This is the part that tells the reader how the system behaves."
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {manifestPhases.map((phase, index) => (
            <article
              key={phase.phase}
              className="zerochill-card rounded-3xl border border-white/10 bg-white/[0.03] p-6"
              style={{ animationDelay: `${index * 110}ms` }}
            >
              <div className="flex items-center justify-between border-b border-[color:var(--accent)]/70 pb-3">
                <span className="text-[0.64rem] uppercase tracking-[0.48em] text-[color:var(--steel)]">
                  {phase.phase}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_12px_rgba(185,28,28,0.3)]" />
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.04em] text-white">
                {phase.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/70">{phase.copy}</p>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                {phase.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[0.62rem] uppercase tracking-[0.28em] text-[color:var(--steel)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="zerochill-card rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="border-b border-[color:var(--accent)]/70 pb-3 text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
              Manifest
            </div>
            <ul className="mt-4 space-y-4">
              {manifestPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-7 text-white/70">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="zerochill-card rounded-3xl border border-white/10 bg-black/50 p-5 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["PERIMETER", "LOCAL ONLY"],
                ["SURFACE", "MINIMAL / READABLE"],
                ["AUTHORITY", "OPERATOR OWNED"],
                ["DEPLOYMENT", "EDGE / FIELD / PRIVATE"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                    {label}
                  </div>
                  <div className="mt-2 font-mono text-sm uppercase tracking-[0.18em] text-white">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="launch-access" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <SectionTitle
          eyebrow="Launch access"
          title="Move from reading to action."
          copy="Keep the close authoritative and simple. The launch path should read like a controlled terminal, not a generic storefront."
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <article className="zerochill-card rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
              <span className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                Sovereign Zero preorder
              </span>
              <span className="rounded-full border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/10 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.26em] text-[color:var(--accent)]">
                {sovereignZeroLaunch.status}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Reserve the hardware line for private intelligence, controlled deployment, and operator-owned infrastructure.
            </p>
            <div className="mt-5">
              <LaunchButton
                href={sovereignZeroLaunch.href}
                label={sovereignZeroLaunch.label}
                external={isExternalLaunchHref(sovereignZeroLaunch.href)}
                className="w-full"
              />
            </div>
          </article>

          <article className="zerochill-card rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
              <span className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                Zero-State Matrix access
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.26em] text-white/70">
                {matrixAccessLaunch.status}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Unlock the terminal layer, launch queue updates, and the access path for the digital matrix.
            </p>
            <div className="mt-5 grid gap-3">
              <LaunchButton
                href={matrixAccessLaunch.href}
                label={matrixAccessLaunch.label}
                external={isExternalLaunchHref(matrixAccessLaunch.href)}
                className="w-full"
              />
              {isExternalLaunchHref(matrixAccessLaunch.href) ? (
                <a
                  href={matrixAccessLaunch.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-black/40 px-4 py-3 text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--steel)] transition-colors hover:border-[color:var(--accent)]/60 hover:text-white"
                >
                  GET ACCESS
                </a>
              ) : (
                <Link
                  href={matrixAccessLaunch.href}
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-black/40 px-4 py-3 text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--steel)] transition-colors hover:border-[color:var(--accent)]/60 hover:text-white"
                >
                  GET ACCESS
                </Link>
              )}
            </div>
          </article>

          <article className="zerochill-card rounded-3xl border border-white/10 bg-black/50 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
              <span className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                Private digital vault
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.26em] text-white/70">
                Opening Soon
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Encrypted operator storage, private artifacts, and the sealed vault layer are staged for the launch queue.
            </p>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-[color:var(--steel)]">
              <div className="flex items-center justify-between">
                <span>Vault</span>
                <span>Awaiting release</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.04]">
                <span className="zerochill-bar block h-full w-[42%]" />
              </div>
            </div>
          </article>
        </div>

        <div className="zerochill-card mt-6 rounded-3xl border border-[color:var(--accent)]/30 bg-black/65 p-5 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="text-[0.64rem] uppercase tracking-[0.48em] text-[color:var(--steel)]">
                Final command
              </div>
              <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
                Choose preorder access for Sovereign Zero or queue into the Zero-State Matrix. If the Payhip URL is not present, this panel falls back here until the launch links are pasted in.
              </p>
            </div>
            <LaunchButton
              href={sovereignZeroLaunch.href}
              label={sovereignZeroLaunch.label}
              external={isExternalLaunchHref(sovereignZeroLaunch.href)}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
