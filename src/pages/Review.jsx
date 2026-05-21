import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Footer from '../components/layout/Footer';
import AdminReviewDashboard from '../components/sections/AdminReviewDashboard';
import Panel from '../components/ui/Panel';

export default function Review() {
  return (
    <>
      <Seo
        title="Client Review"
        description="Client-facing review surface for ZeroChill Co with a direct path to funding continuation."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <Panel className="shadow-telemetry p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
                Review summary
              </div>
              <h1 className="mt-4 text-4xl font-black uppercase tracking-[-0.04em] text-[color:var(--text)] sm:text-6xl">
                Review the build, then open funding.
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[color:var(--text-muted)]">
                The site is live and operational. The next step is to decide whether ZeroChill continues into the funded Phase 2 path for domain, database, verification, assets, and ongoing development.
              </p>
            </div>
            <Link
              to="/funding"
              className="zc-button-primary border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-black"
            >
              Open funding
            </Link>
          </div>
        </Panel>
      </section>

      <AdminReviewDashboard />

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-24">
        <Panel className="shadow-telemetry p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
                Direct action
              </div>
              <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                If the build should continue, the funding proposal contains the phase options and next approval steps.
              </p>
            </div>
            <Link
              to="/funding"
              className="zc-button-secondary border border-[color:var(--line)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--text)]"
            >
              Continue to proposal
            </Link>
          </div>
        </Panel>
      </section>

      <Footer />
    </>
  );
}
