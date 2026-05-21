import Seo from '../components/Seo';
import Footer from '../components/layout/Footer';
import Panel from '../components/ui/Panel';
import TerminalCard from '../components/ui/TerminalCard';
import { missionControlSignals, docsPreviewBlocks } from '../data/site';

const controlRows = [
  { k: 'Execution', v: 'Task routing, local policy enforcement, and state clarity' },
  { k: 'Visibility', v: 'Terminal-readable traces and operator-centered diagnostics' },
  { k: 'Surface', v: 'Minimal network touchpoints and narrow runtime exposure' },
];

export default function ZeroStateMatrix() {
  return (
    <>
      <Seo
        title="Mission Control"
        description="Mission Control for local AI orchestration, state visibility, and operator control."
      />

      <section className="grid gap-5">
        <Panel className="p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                Mission control
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--text)] sm:text-5xl">
                A real app screen, not a noise field.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-[color:var(--text-muted)]">
                This route now behaves like a live console: clear rows, subtle indicators, and enough structure to read the system without visual clutter.
              </p>
            </div>
            <div className="space-y-3">
              {missionControlSignals.map((signal) => (
                <div key={signal.label} className="flex items-center justify-between rounded-xl border border-[color:var(--line-soft)] bg-white/[0.02] px-4 py-3">
                  <span className="text-[0.66rem] uppercase tracking-[0.26em] text-[color:var(--text-faint)]">
                    {signal.label}
                  </span>
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color:var(--text)]">
                    {signal.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <div className="grid gap-5 lg:grid-cols-3">
          {controlRows.map((row) => (
            <TerminalCard key={row.k} label={row.k} body={row.v} />
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <TerminalCard
          label="State model"
          title="Local control loop"
          body="The matrix is organized around observability, policy, and execution. It reads like a console for real machines."
        >
          <div className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4">
            {[
              'Keep the critical loop local.',
              'Expose the machine, not the user.',
              'Use explicit states instead of decorative telemetry.',
            ].map((item) => (
              <div key={item} className="rounded-xl border border-[color:var(--line-soft)] bg-white/[0.02] p-4 text-sm leading-7 text-[color:var(--text-muted)]">
                {item}
              </div>
            ))}
          </div>
        </TerminalCard>

        <TerminalCard
          label="Docs preview"
          title="Operational packets"
          body="The same documentation language appears here as a live preview of how the platform reports itself."
        >
          <div className="mt-5 space-y-4 border-t border-[color:var(--line-soft)] pt-4">
            {docsPreviewBlocks.slice(0, 2).map((block) => (
              <div key={block.label} className="rounded-xl border border-[color:var(--line-soft)] bg-white/[0.02] p-4">
                <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                  {block.label}
                </div>
                <pre className="mt-3 overflow-x-auto font-mono text-xs leading-7 text-[color:var(--accent-soft)]">
                  {block.command}
                </pre>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                  {block.body}
                </p>
              </div>
            ))}
          </div>
        </TerminalCard>
      </section>

      <Footer />
    </>
  );
}
