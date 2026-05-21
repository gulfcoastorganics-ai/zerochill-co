import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Footer from '../components/layout/Footer';
import Panel from '../components/ui/Panel';

export default function PaymentCancelled() {
  return (
    <>
      <Seo title="Payment Cancelled" description="ZeroChill payment checkout was cancelled before completion." />

      <section className="grid gap-5">
        <Panel className="p-6 sm:p-8">
          <div className="max-w-3xl">
            <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
              Payment status
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--text)] sm:text-5xl">
              Checkout cancelled.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-[color:var(--text-muted)]">
              No payment was collected. You can return to the funding summary or schedule a review to adjust scope before continuing.
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
          </div>
        </Panel>
      </section>

      <Footer />
    </>
  );
}
