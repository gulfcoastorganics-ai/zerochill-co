import SectionHeader from '../ui/SectionHeader';
import TerminalCard from '../ui/TerminalCard';
import { hardwareConcepts } from '../../data/site';

export default function HardwareConceptPanels() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <SectionHeader
        eyebrow="Tactical hardware concepts"
        title="Built like deployed equipment."
        copy="These are concept panels, but they carry believable deployment language, local inference framing, and hardware-style behavior."
      />

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {hardwareConcepts.map((item) => (
          <TerminalCard key={item.name} label={item.badge} title={item.name} body={item.summary}>
            <div className="mt-5 grid gap-3 border-t border-[color:var(--line-soft)] pt-4 sm:grid-cols-2">
              {item.specs.slice(0, 4).map((spec) => (
                <div key={spec} className="border border-[color:var(--line-soft)] bg-black/25 p-3">
                  <div className="text-[0.65rem] uppercase tracking-[0.26em] text-[color:var(--text-dim)]">
                    Spec
                  </div>
                  <div className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">{spec}</div>
                </div>
              ))}
            </div>
            <ul className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4">
              {item.specs.slice(4).map((spec) => (
                <li key={spec} className="flex gap-3 text-sm leading-7 text-[color:var(--text-muted)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[color:var(--accent)] shadow-[0_0_14px_var(--accent)]" />
                  {spec}
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-[color:var(--line-soft)] pt-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--accent-strong)]">
              Local inference // edge deployment // industrial enclosure
            </div>
          </TerminalCard>
        ))}
      </div>
    </section>
  );
}
