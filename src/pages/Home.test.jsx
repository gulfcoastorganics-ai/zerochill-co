import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Home from './Home';

function renderHome() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Home />
    </MemoryRouter>,
  );
}

describe('Home', () => {
  it('renders the homepage with a stable heading structure', () => {
    renderHome();

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /a dark luxury homepage for ai products that need to convert\./i,
      }),
    ).toBeInTheDocument();

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThanOrEqual(4);
    expect(screen.getByRole('navigation', { name: /homepage/i })).toBeInTheDocument();
  });

  it('wires the primary hero ctas to the expected destinations', () => {
    const { container } = renderHome();

    const preorderHero = Array.from(container.querySelectorAll('a[href="/preorder"]')).find((link) =>
      /start preorder/i.test(link.textContent ?? ''),
    );
    const demoLink = container.querySelector('a[href="#product"]');

    if (!preorderHero || !demoLink) {
      throw new Error('Hero calls to action were not found');
    }

    expect(preorderHero).toHaveAttribute('href', '/preorder');
    expect(preorderHero).toHaveTextContent(/start preorder/i);
    expect(demoLink).toHaveAttribute('href', '#product');
  });

  it('renders the homepage navigation anchors against real section ids', () => {
    const { container } = renderHome();
    const nav = container.querySelector('nav[aria-label="Homepage"]');

    if (!nav) {
      throw new Error('Homepage navigation not found');
    }

    const anchors = [
      ['Product', '#product'],
      ['Features', '#features'],
      ['Pricing', '#pricing'],
      ['Reviews', '#reviews'],
    ];

    anchors.forEach(([label, href]) => {
      const link = within(nav).getAllByRole('link', { name: label })[0];
      expect(link).toHaveAttribute('href', href);

      const id = href.slice(1);
      expect(document.getElementById(id)).not.toBeNull();
    });
  });

  it('renders the product, features, pricing, and reviews sections', () => {
    renderHome();

    expect(document.getElementById('product')).not.toBeNull();
    expect(screen.getAllByRole('heading', { name: /editorial by design, product-led by intent\./i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: /strong selling points, presented as editorial rows\./i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: /product tiers with a restrained, premium presentation\./i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: /reviews, stats, and visual proof in a magazine-style block\./i })[0]).toBeInTheDocument();
  });

  it('renders the final cta with preorder, products, and review routes', () => {
    const { container } = renderHome();

    const finalHeading = Array.from(container.querySelectorAll('h2')).find((heading) =>
      /ready to move from interest to action\?/i.test(heading.textContent ?? ''),
    );

    if (!finalHeading) {
      throw new Error('Final CTA heading not found');
    }

    const finalCtaGroup = finalHeading.parentElement?.parentElement;

    if (!finalCtaGroup) {
      throw new Error('Final CTA group not found');
    }

    const finalCta = within(finalCtaGroup);
    expect(finalCta.getAllByRole('link', { name: /preorder/i })[0]).toHaveAttribute('href', '/preorder');
    expect(finalCta.getAllByRole('link', { name: /^products$/i })[0]).toHaveAttribute('href', '/products');
    expect(finalCta.getAllByRole('link', { name: /^review$/i })[0]).toHaveAttribute('href', '/review');
  });

  it('does not expose the private funding summary route on the homepage', () => {
    const { container } = renderHome();

    expect(container.querySelector('a[href="/funding-summary"]')).toBeNull();
  });
});
