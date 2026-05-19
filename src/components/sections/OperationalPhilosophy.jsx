import SectionHeader from '../ui/SectionHeader';
import Panel from '../ui/Panel';
import { operationalPhilosophy } from '../../data/site';

export default function OperationalPhilosophy() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <SectionHeader
        eyebrow="Operational philosophy"
        title="Control, restraint, resilience."
        copy="The platform is framed around ownership, sovereignty, privacy, and low-dependency infrastructure."
      />

      <Panel className="shadow-telemetry mt-8 p-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {operationalPhilosophy.map((item) => (
            <div key={item.title} className="border border-[color:var(--line-soft)] bg-black/25 p-5">
              <div className="text-xs uppercase tracking-[0.32em] text-[color:var(--accent-strong)]">
                {item.title}
              </div>
              <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">{item.detail}</p>
            </div>
          ))}
        </div>
      </Panel>
    </section>
  );
}
