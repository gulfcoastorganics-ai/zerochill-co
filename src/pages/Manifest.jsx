import Seo from '../components/Seo';
import Footer from '../components/layout/Footer';
import Panel from '../components/ui/Panel';
import TerminalCard from '../components/ui/TerminalCard';
import { manifestPoints } from '../data/site';

const doctrineRows = [
  {
    title: 'Sovereignty',
    copy: 'Operator-owned compute is the default posture. If it is not controlled, it is not critical.',
  },
  {
    title: 'Locality',
    copy: 'The best system is the one that still works when the network is degraded or gone.',
  },
  {
    title: 'Discipline',
    copy: 'The interface should narrow attention, reduce noise, and expose only what matters.',
  },
  {
    title: 'Clarity',
    copy: 'Industrial systems earn trust by being legible under pressure, not by looking polished.',
  },
];

export default function Manifest() {
  return (
    <>
      <Seo
        title="Manifest"
        description="ZeroChill operating doctrine focused on sovereignty, locality, discipline, and clarity."
      />

      <section className="grid gap-5">
        <Panel className="p-6 sm:p-8">
          <div className="max-w-3xl">
            <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
              Doctrine
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--text)] sm:text-5xl">
              What the product will not become.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-[color:var(--text-muted)]">
              The manifest is now presented like a serious internal note: concise, direct, and aligned with the calmer workspace layout.
            </p>
          </div>
        </Panel>

        <div className="grid gap-5 lg:grid-cols-2">
          {doctrineRows.map((row) => (
            <TerminalCard key={row.title} label={row.title} body={row.copy} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <Panel className="p-6">
          <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
            Operating statements
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-4">
            {manifestPoints.map((point, index) => (
              <div key={point} className="rounded-xl border border-[color:var(--line-soft)] bg-white/[0.02] p-4">
                <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color:var(--text-dim)]">
                  0{index + 1}
                </div>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">{point}</p>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <Footer />
    </>
  );
}
