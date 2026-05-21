import { Link } from 'react-router-dom';
import { footerSignals } from '../../data/site';
import Panel from '../ui/Panel';

export default function CinematicFooter() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[rgba(7,8,10,0.56)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Panel className="shadow-telemetry overflow-hidden">
          <div className="border-b border-[color:var(--line-soft)] px-4 py-4 sm:px-6">
            <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
              Deployment footer
            </div>
            <div className="mt-2 text-sm uppercase tracking-[0.2em] text-[color:var(--accent-strong)]">
              system uptime aesthetic // terminal signatures // node references
            </div>
          </div>

          <div className="grid gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="text-sm uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
                ZeroChill Co
              </div>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[color:var(--text-muted)]">
                Sovereign compute infrastructure for operators that want local control, readable
                systems, and a deployment posture that feels engineered rather than marketed.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {footerSignals.map((signal) => (
                  <div key={signal.label} className="zc-surface-low p-3">
                    <div className="text-[0.68rem] uppercase tracking-[0.28em] text-[color:var(--text-dim)]">
                      {signal.label}
                    </div>
                    <div className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--text)]">
                      {signal.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-2 text-sm uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
              <Link to="/manifest" className="zc-nav-link w-fit hover:text-[color:var(--text)]">
                Manifest
              </Link>
              <Link to="/docs" className="zc-nav-link w-fit hover:text-[color:var(--text)]">
                Docs
              </Link>
              <Link to="/preorder" className="zc-nav-link w-fit hover:text-[color:var(--text)]">
                Preorder
              </Link>
              <a href="#top" className="zc-nav-link w-fit hover:text-[color:var(--text)]">
                Back to top
              </a>
            <div className="mt-3 border-t border-[color:var(--line-soft)] pt-4 font-mono text-xs leading-7 text-[color:var(--accent-strong)]">
                &gt; zerochill.co / edge-primary / local runtime
                <br />
                &gt; signature locked / no cloud dependency
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </footer>
  );
}
