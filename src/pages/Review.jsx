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
        description="Client-facing review surface for ZeroChill Co with a discreet path to the private continuation summary."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <Panel className="shadow-telemetry p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
                Review summary
              </div>
              <h1 className="mt-4 text-4xl font-black uppercase tracking-[-0.04em] text-[color:var(--text)] sm:text-6xl">
                Review the build, then open the private summary.
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[color:var(--text-muted)]">
                The site is live and operational. The next step is to review the private continuation summary for domain, database, verification, assets, and ongoing development.
              </p>
            </div>
            <Link
              to="/funding-summary"
              className="text-xs uppercase tracking-[0.24em] text-[color:var(--text-dim)] underline decoration-[color:var(--accent-strong)] decoration-1 underline-offset-4"
            >
              Private funding summary
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
                If the build should continue, the private summary contains the phase options and next approval steps.
              </p>
            </div>
            <Link
              to="/funding-summary"
              className="text-xs uppercase tracking-[0.24em] text-[color:var(--text-dim)] underline decoration-[color:var(--accent-strong)] decoration-1 underline-offset-4"
            >
              View private summary
            </Link>
          </div>
        </Panel>
      </section>

      <Footer />
    </>
  );
}
