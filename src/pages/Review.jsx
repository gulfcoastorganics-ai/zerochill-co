import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Footer from '../components/layout/Footer';
import Panel from '../components/ui/Panel';
import TerminalCard from '../components/ui/TerminalCard';
import { reviewSignals } from '../data/site';

const reviewItems = [
  'Homepage now reads as an overview dashboard instead of a launch banner.',
  'Product pages are indexed like a small app, not a promotional carousel.',
  'The preorder flow keeps the existing API and email notification behavior.',
  'The private funding route remains hidden from public navigation.',
];

export default function Review() {
  return (
    <>
      <Seo
        title="Client Review"
        description="Review surface for ZeroChill Co with a discreet path to the private continuation summary."
      />

      <section className="grid gap-5">
        <Panel className="p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                Review summary
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--text)] sm:text-5xl">
                A cleaner build with a private continuation path.
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-[color:var(--text-muted)]">
                The site is live and routed. This review page reflects the new workspace layout while preserving the private funding continuation route behind the scenes.
              </p>
            </div>
            <div className="space-y-3">
              {reviewSignals.map((signal) => (
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

        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <TerminalCard
            label="What changed"
            title="Layout discipline"
            body="The visual language is quieter: dark matte shell, centered content, and minimal borders."
          >
            <ul className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4 text-sm leading-7 text-[color:var(--text-muted)]">
              {reviewItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent-soft)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </TerminalCard>

          <Panel className="p-6">
            <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
              Private path
            </div>
            <p className="mt-4 text-sm leading-8 text-[color:var(--text-muted)]">
              The continuation summary remains hidden from public navigation. It is still reachable through the review workflow and preserved as a private route.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/funding-summary"
                className="zc-button-secondary border border-[color:var(--line)] px-4 py-3 text-xs uppercase tracking-[0.22em] text-[color:var(--text-muted)]"
              >
                Private funding summary
              </Link>
              <Link
                to="/preorder"
                className="zc-button-primary border border-[color:var(--accent)] bg-[color:var(--accent)] px-4 py-3 text-xs uppercase tracking-[0.22em] text-black"
              >
                Preorder
              </Link>
            </div>
          </Panel>
        </div>
      </section>

      <Footer />
    </>
  );
}
