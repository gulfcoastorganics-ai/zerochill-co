import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { navItems } from '../../data/site';

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'zc-nav-link transition-colors hover:text-[color:var(--text)] focus-visible:text-[color:var(--text)]',
          isActive
            ? 'text-[color:var(--text)]'
            : 'text-[color:var(--text-dim)]',
        ].join(' ')
      }
    >
      {children}
    </NavLink>
  );
}

export default function SiteShell() {
  const location = useLocation();

  return (
    <div id="top" className="crt-shell min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_18%),radial-gradient(circle_at_top,rgba(177,18,38,0.18),transparent_36%),linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_100%,100%_100%,100%_28px,28px_100%] opacity-80" />
      <div className="pointer-events-none fixed inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(241,75,95,0.9),transparent)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:4px_4px]" />

      <header className="sticky top-0 z-40 border-b border-[color:var(--line)] bg-[rgba(5,5,5,0.88)] backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center border border-[color:var(--line)] bg-white/5 text-sm font-bold tracking-[0.3em] text-[color:var(--accent)]">
              ZC
            </span>
            <div className="leading-none">
              <div className="text-[0.72rem] uppercase tracking-[0.38em] text-[color:var(--text-dim)]">
                ZeroChill Co
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.24em] text-[color:var(--text-faint)]">
                Local-first AI infrastructure
              </div>
            </div>
          </NavLink>

          <nav className="hidden flex-wrap items-center gap-5 text-sm uppercase tracking-[0.22em] md:flex">
            {navItems.map((item) => (
              <NavItem key={item.to} to={item.to}>
                {item.label}
              </NavItem>
            ))}
          </nav>

          <NavLink
            to="/preorder"
            className="zc-button-primary border border-[color:var(--accent)] bg-[color:var(--accent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-black"
          >
            Secure Slot
          </NavLink>
        </div>
      </header>

      <main className="relative z-10 pb-24 md:pb-0">
        <div key={location.pathname} className="zc-page">
          <Outlet />
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[color:var(--line)] bg-[rgba(5,5,5,0.95)] px-4 py-3 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3">
          <NavLink
            to="/products"
            className="zc-button-secondary flex items-center justify-center border border-[color:var(--line)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-muted)]"
          >
            Compare tiers
          </NavLink>
          <NavLink
            to="/preorder"
            className="zc-button-primary flex items-center justify-center border border-[color:var(--accent)] bg-[color:var(--accent)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-black"
          >
            Preorder now
          </NavLink>
        </div>
      </div>
    </div>
  );
}
