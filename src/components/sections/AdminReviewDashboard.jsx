import Panel from '../ui/Panel';
import SectionHeader from '../ui/SectionHeader';

const topMetrics = [
  { label: 'Preorder count', value: '042', note: 'Frontend total / no backend write path' },
  { label: 'Submissions', value: 'PLACEHOLDERS', note: 'Intake routed to local review fields' },
  { label: 'Export status', value: 'READY', note: 'Bundles staged for manual confirmation' },
  { label: 'Deployment status', value: 'GREEN', note: 'Public site build remains current' },
];

const systemHealth = [
  { label: 'API', value: 'SIMULATED' },
  { label: 'Exports', value: 'QUEUED' },
  { label: 'Routing', value: 'STABLE' },
  { label: 'Node mesh', value: 'ACTIVE' },
];

export default function AdminReviewDashboard() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
      <SectionHeader
        eyebrow="Admin review"
        title="Lightweight control surface."
        copy="A front-end only review route for preorder counts, submission placeholders, export status, deployment status, and mock health panels."
      />

      <div className="mt-8 grid gap-5 xl:grid-cols-4">
        {topMetrics.map((metric) => (
          <Panel key={metric.label} className="shadow-telemetry zc-interactive p-6">
            <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
              {metric.label}
            </div>
            <div className="mt-4 text-3xl font-black uppercase tracking-[-0.04em] text-[color:var(--text)]">
              {metric.value}
            </div>
            <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">{metric.note}</p>
          </Panel>
        ))}
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <Panel className="shadow-telemetry p-6">
          <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
            Submission placeholders
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {[
              'Enterprise preorder intake',
              'Private demo request',
              'Operator onboarding review',
              'Deployment readiness checkpoint',
            ].map((item, index) => (
              <div key={item} className="border border-[color:var(--line-soft)] bg-black/25 p-4">
                <div className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[color:var(--accent-strong)]">
                  0{index + 1}
                </div>
                <div className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">{item}</div>
                <div className="mt-4 h-2 bg-white/5">
                  <div
                    className="h-2 bg-[linear-gradient(90deg,rgba(241,75,95,0.9),rgba(177,18,38,0.25))]"
                    style={{ width: `${55 + index * 10}%` }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="shadow-telemetry p-6">
          <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
            System health
          </div>
          <div className="mt-4 space-y-3">
            {systemHealth.map((item) => (
              <div key={item.label} className="flex items-center justify-between border border-[color:var(--line-soft)] bg-black/25 px-4 py-3">
                <span className="text-sm uppercase tracking-[0.28em] text-[color:var(--text)]">
                  {item.label}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-[color:var(--accent-strong)]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-[color:var(--line-soft)] pt-4 text-sm leading-7 text-[color:var(--text-muted)]">
            The route is intentionally thin: no backend storage, no claims of live inventory, and no accidental promise of automation that does not exist.
          </div>
        </Panel>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1fr_1fr]">
        <Panel className="shadow-telemetry p-6">
          <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
            Export status
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              ['Preorder export', 'READY FOR MANUAL HANDOFF'],
              ['Client review packet', 'AVAILABLE'],
              ['Deployment bundle', 'STAGED'],
              ['Audit summary', 'DRAFT'],
            ].map(([label, value]) => (
              <div key={label} className="border border-[color:var(--line-soft)] bg-black/25 p-4">
                <div className="text-[0.66rem] uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
                  {label}
                </div>
                <div className="mt-3 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--accent-strong)]">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="shadow-telemetry p-6">
          <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
            Deployment status
          </div>
          <div className="mt-4 space-y-3">
            {[
              ['Public site', 'LIVE'],
              ['Product routes', 'ACTIVE'],
              ['Admin route', 'AVAILABLE'],
              ['Build health', 'PASS'],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between border-b border-[color:var(--line-soft)] pb-3">
                <span className="text-sm uppercase tracking-[0.28em] text-[color:var(--text-dim)]">
                  {label}
                </span>
                <span className="font-mono text-sm text-[color:var(--text)]">{value}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </section>
  );
}
