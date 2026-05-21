import Seo from '../components/Seo';
import Footer from '../components/layout/Footer';
import Panel from '../components/ui/Panel';
import { missionControlSignals } from '../data/site';

const metrics = [
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

export default function Admin() {
  return (
    <>
      <Seo
        title="Admin Review"
        description="Internal review surface for preorder counts, submission placeholders, export status, deployment status, and system health."
      />

      <section className="grid gap-5">
        <Panel className="p-6 sm:p-8">
          <div className="max-w-3xl">
            <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
              Admin review
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--text)] sm:text-5xl">
              A lightweight control surface.
            </h1>
            <p className="mt-4 text-sm leading-8 text-[color:var(--text-muted)]">
              This route stays front-end only and uses quiet status rows instead of a noisy simulated wall of telemetry.
            </p>
          </div>
        </Panel>

        <div className="grid gap-5 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-[color:var(--line-soft)] bg-white/[0.02] p-5">
              <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                {metric.label}
              </div>
              <div className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--text)]">
                {metric.value}
              </div>
              <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">{metric.note}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Panel className="p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                System health
              </div>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color:var(--text-dim)]">
                simulated
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {systemHealth.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-xl border border-[color:var(--line-soft)] bg-white/[0.02] px-4 py-3">
                  <span className="text-sm uppercase tracking-[0.24em] text-[color:var(--text-muted)]">
                    {item.label}
                  </span>
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color:var(--text)]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-6">
            <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
              Routing notes
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--text-muted)]">
              {[
                'The route is intentionally thin.',
                'No backend storage is implied.',
                'Public build state remains clean.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent-soft)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {[
            ['Preorder queue', 'READY FOR MANUAL HANDOFF'],
            ['Client review packet', 'AVAILABLE'],
            ['Deployment bundle', 'STAGED'],
            ['Audit summary', 'DRAFT'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-[color:var(--line-soft)] bg-white/[0.02] p-5">
              <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                {label}
              </div>
              <div className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color:var(--text-dim)]">
                {value}
              </div>
            </div>
          ))}
        </div>

        <Panel className="p-6">
          <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
            Control context
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {missionControlSignals.map((signal) => (
              <span key={signal.label} className="status-pill">
                {signal.label} {signal.value}
              </span>
            ))}
          </div>
        </Panel>
      </section>

      <Footer />
    </>
  );
}
