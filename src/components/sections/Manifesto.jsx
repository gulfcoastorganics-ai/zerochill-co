import Panel from '../ui/Panel';
import { manifestoPoints } from '../../data/site';

export default function Manifesto() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.38em] text-[color:var(--text-dim)]">Manifest</p>
          <h2 className="mt-3 max-w-xl text-3xl font-black uppercase tracking-[-0.04em] text-[color:var(--text)] sm:text-5xl">
            Hardened systems for sovereign operators.
          </h2>
        </div>
        <Panel className="p-6 sm:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            {manifestoPoints.map((point, index) => (
              <div key={point} className="border border-[color:var(--line-soft)] bg-black/20 p-5">
                <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--accent-strong)]">
                  0{index + 1}
                </div>
                <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">{point}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </section>
  );
}
