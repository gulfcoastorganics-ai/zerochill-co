import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Footer from '../components/layout/Footer';
import SectionHeader from '../components/ui/SectionHeader';
import TerminalCard from '../components/ui/TerminalCard';
import PreorderForm from '../components/forms/PreorderForm';
import { productTiers } from '../data/site';

export default function Preorder() {
  return (
    <>
      <Seo
        title="Preorder"
        description="Store preorder interest locally and choose a ZeroChill Co product tier for the first production wave."
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeader
          eyebrow="Access"
          title="Preorder"
          copy="No backend yet. Interest is staged locally in the browser so the first wave can be shaped without a cloud dependency."
        />

        <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
          <a href="#preorder-form" className="zc-nav-link">Form</a>
          <a href="#preorder-tiers" className="zc-nav-link">Tier map</a>
          <Link to="/products" className="zc-nav-link text-[color:var(--accent-strong)]">
            Compare products
          </Link>
        </div>
      </section>

      <section id="preorder-form" className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-24 scroll-mt-28">
        <PreorderForm />
      </section>

      <section id="preorder-tiers" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20 scroll-mt-28">
        <SectionHeader
          eyebrow="Tier map"
          title="Choose the right level of exposure."
          copy="The preorder form aligns to the product tiers below so the interest signal is specific from the start."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {productTiers.map((tier) => (
            <TerminalCard key={tier.name} label={tier.badge} title={tier.name} body={tier.description}>
              <div className="mt-5 border-t border-[color:var(--line-soft)] pt-4 font-mono text-xs uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
                {tier.features.join(' // ')}
              </div>
            </TerminalCard>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
