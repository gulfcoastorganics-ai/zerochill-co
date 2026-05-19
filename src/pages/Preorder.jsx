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
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeader
          eyebrow="Access"
          title="Preorder"
          copy="No backend yet. Interest is staged locally in the browser so the first wave can be shaped without a cloud dependency."
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-20">
        <PreorderForm />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
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
