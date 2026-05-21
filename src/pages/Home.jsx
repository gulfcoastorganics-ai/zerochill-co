import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

const panels = [
  {
    title: 'Foundations',
    copy: 'Design tokens, color, typography, and global settings.',
  },
  {
    title: 'Components',
    copy: 'Reusable, accessible, and production-ready UI.',
  },
  {
    title: 'Patterns',
    copy: 'Layout patterns and UI flows for real world products.',
  },
];

function HotspotLink({ to, label, className = '', children }) {
  return (
    <Link
      to={to}
      aria-label={label}
      className={`home-hotspot absolute inline-flex items-center justify-center rounded-full border border-transparent text-transparent outline-none transition focus-visible:border-[#9dffd0] focus-visible:bg-black/20 focus-visible:text-white ${className}`}
    >
      {children}
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        title="ZeroChill Design System"
        description="ZeroChill Design System: premium components, patterns, and styles for a premium digital experience."
      />

      <section className="home-reference-scene relative min-h-[100svh] overflow-hidden bg-[#030205] text-[color:var(--text)]">
        <img
          src="/reference/mvp.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,4,5,0.12),rgba(3,4,5,0.08)_40%,rgba(3,4,5,0.16)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1500px] items-stretch px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
          <main className="relative flex min-h-[100svh] w-full items-stretch" aria-label="ZeroChill MVP landing page">
            <div className="sr-only">
              <p>ZEROCHILL</p>
              <h1>ZeroChill Design System</h1>
              <p>Components, patterns, and styles for a premium digital experience.</p>
              <p>Design system 2.3k 48.9k users</p>
              <ul>
                {panels.map((panel) => (
                  <li key={panel.title}>
                    <strong>{panel.title}</strong> {panel.copy}
                  </li>
                ))}
              </ul>
              <p>Live zerochill.co Est. 2025</p>
              <h2>Build. Scale. Stay ZeroChill.</h2>
              <p>UI components and design tokens for the ZeroChill ecosystem.</p>
              <p>ZEROCHILL.CO</p>
            </div>

            <HotspotLink
              to="/preorder"
              label="Preorder ZeroChill"
              className="left-[12.5%] top-[81.2%] h-[5.8%] w-[15.3%] min-h-12 min-w-44"
            />
            <HotspotLink
              to="/products"
              label="Open products"
              className="left-[28.9%] top-[81.2%] h-[5.8%] w-[3.9%] min-h-12 min-w-12"
            />
            <HotspotLink
              to="/review"
              label="Open review"
              className="left-[33.9%] top-[81.2%] h-[5.8%] w-[3.9%] min-h-12 min-w-12"
            />
          </main>
        </div>
      </section>
    </>
  );
}
