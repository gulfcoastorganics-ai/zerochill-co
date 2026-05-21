import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Footer from '../components/layout/Footer';
import Panel from '../components/ui/Panel';

export default function PaymentSuccess() {
  return (
    <>
      <Seo
        title="Payment Success"
        description="ZeroChill payment checkout completed in test mode."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Panel className="shadow-telemetry p-6">
          <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
            Payment status
          </div>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-[-0.04em] text-[color:var(--text)] sm:text-6xl">
            Payment received in test mode.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[color:var(--text-muted)]">
            This confirms the checkout route worked in Stripe test infrastructure. No live money collection is enabled.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/funding-summary"
              className="zc-button-secondary border border-[color:var(--line)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--text)]"
            >
              Private summary
            </Link>
            <Link
              to="/review"
              className="zc-button-primary border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-black"
            >
              Schedule review
            </Link>
          </div>
        </Panel>
      </section>

      <Footer />
    </>
  );
}
