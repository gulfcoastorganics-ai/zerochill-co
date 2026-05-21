import { Link } from 'react-router-dom';
import { footerSignals } from '../../data/site';
import Panel from '../ui/Panel';

export default function CinematicFooter() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[rgba(8,9,11,0.78)]">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Panel className="p-5 sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                ZeroChill Co
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--text-muted)]">
                Local AI infrastructure, presented as a product workspace with a quieter shell and less decorative noise.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {footerSignals.map((signal) => (
                  <span key={signal.label} className="status-pill">
                    {signal.label} {signal.value}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                to="/docs"
                className="zc-button-secondary border border-[color:var(--line)] px-4 py-3 text-xs uppercase tracking-[0.22em] text-[color:var(--text-muted)]"
              >
                Docs
              </Link>
              <Link
                to="/review"
                className="zc-button-secondary border border-[color:var(--line)] px-4 py-3 text-xs uppercase tracking-[0.22em] text-[color:var(--text-muted)]"
              >
                Review
              </Link>
              <Link
                to="/preorder"
                className="zc-button-primary border border-[color:var(--accent)] bg-[color:var(--accent)] px-4 py-3 text-xs uppercase tracking-[0.22em] text-black"
              >
                Preorder
              </Link>
            </div>
          </div>
        </Panel>
      </div>
    </footer>
  );
}
