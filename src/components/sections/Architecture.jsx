import Panel from '../ui/Panel';
import { architectureRows } from '../../data/site';

export default function Architecture() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.38em] text-[color:var(--text-dim)]">Architecture</p>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em] text-[color:var(--text)] sm:text-5xl">
            Low surface area.
            <span className="block text-[color:var(--accent)]">High discipline.</span>
          </h2>
        </div>
        <Panel className="p-6 sm:p-8">
          <div className="grid gap-4">
            {architectureRows.map((row, index) => (
              <div
                key={row}
                className="flex items-start gap-4 border border-[color:var(--line-soft)] bg-white/[0.03] p-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[color:var(--accent)] text-xs font-semibold text-[color:var(--accent)]">
                  {index + 1}
                </div>
                <p className="text-sm leading-7 text-[color:var(--text-muted)]">{row}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </section>
  );
}
