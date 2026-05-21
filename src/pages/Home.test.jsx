import { render, screen } from '@testing-library/react';
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
  it('renders the homepage with one main headline', () => {
    renderHome();

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toHaveTextContent(/zerochill\s*design system/i);
    expect(screen.getByRole('heading', { name: /build\.\s*scale\.\s*stay zerochill\./i })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('links to the important public routes', () => {
    renderHome();

    expect(screen.getAllByRole('link', { name: /preorder/i })[0]).toHaveAttribute('href', '/preorder');
    expect(screen.getAllByRole('link', { name: /open products/i })[0]).toHaveAttribute('href', '/products');
    expect(screen.getAllByRole('link', { name: /open review/i })[0]).toHaveAttribute('href', '/review');
  });

  it('does not expose the private funding summary route or moon wording', () => {
    const { container } = renderHome();

    expect(container.querySelector('a[href="/funding-summary"]')).toBeNull();
    expect(screen.queryByText(/moon/i)).toBeNull();
    expect(screen.queryByText(/moonlit/i)).toBeNull();
    expect(screen.queryByText(/moonlike/i)).toBeNull();
  });

  it('keeps the cover readable and branded', () => {
    renderHome();

    expect(
      screen.getAllByText(/components, patterns, and styles for a premium digital experience\./i)[0],
    ).toBeInTheDocument();
    expect(screen.getAllByText(/^live$/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/zerochill\.co/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/est\. 2025/i).length).toBeGreaterThan(0);
  });
});
