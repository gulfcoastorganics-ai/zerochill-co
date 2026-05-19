import SectionHeader from '../ui/SectionHeader';
import Panel from '../ui/Panel';
import { localAiComparison } from '../../data/site';

export default function WhyLocalAI() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <SectionHeader
        eyebrow="Why local AI"
        title="Ownership beats distance."
        copy="The comparison is simple: if the stack is local, the operator gets control, lower latency, and far fewer surprises."
      />

      <Panel className="shadow-telemetry mt-8 overflow-hidden">
        <div className="grid grid-cols-[1.3fr_1fr_1fr] border-b border-[color:var(--line)] bg-black/35 px-4 py-4 text-[0.7rem] uppercase tracking-[0.3em] text-[color:var(--text-dim)] sm:px-6">
          <div>Factor</div>
          <div>Local AI</div>
          <div>Cloud AI</div>
        </div>
        <div className="divide-y divide-[color:var(--line-soft)]">
          {localAiComparison.map((row) => (
            <div key={row.label} className="grid grid-cols-1 gap-3 px-4 py-5 sm:grid-cols-[1.3fr_1fr_1fr] sm:px-6">
              <div className="text-sm uppercase tracking-[0.24em] text-[color:var(--text)]">{row.label}</div>
              <div className="text-sm leading-7 text-[color:var(--text-muted)]">{row.local}</div>
              <div className="text-sm leading-7 text-[color:var(--text-muted)]">{row.cloud}</div>
            </div>
          ))}
        </div>
      </Panel>
    </section>
  );
}
