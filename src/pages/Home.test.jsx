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
  it('renders the ZeroChill MVP cover', () => {
    renderHome();

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/zerochill\s*design system/i);
    expect(screen.getByRole('heading', { name: /build\.\s*scale\.\s*stay zerochill\./i })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('links to the main routes', () => {
    renderHome();

    expect(screen.getAllByRole('link', { name: /preorder zerochill/i })[0]).toHaveAttribute(
      'href',
      '/preorder',
    );
    expect(screen.getAllByRole('link', { name: /open products/i })[0]).toHaveAttribute('href', '/products');
    expect(screen.getAllByRole('link', { name: /open review/i })[0]).toHaveAttribute('href', '/review');
  });

  it('renders the MVP feature panels and branding cues', () => {
    renderHome();

    expect(screen.getAllByText(/^foundations$/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/^components$/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/^patterns$/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/zerochill design system/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/^live$/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/zerochill\.co/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/est\. 2025/i)[0]).toBeInTheDocument();
  });

  it('does not expose private funding or moon references', () => {
    const { container } = renderHome();

    expect(container.querySelector('a[href="/funding-summary"]')).toBeNull();
    expect(screen.queryByText(/moon/i)).toBeNull();
    expect(screen.queryByText(/moonlit/i)).toBeNull();
    expect(screen.queryByText(/moonlike/i)).toBeNull();
  });
});
