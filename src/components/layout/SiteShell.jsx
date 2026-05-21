import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { navItems } from '../../data/site';

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'zc-nav-link rounded-full border px-3 py-2 text-xs uppercase tracking-[0.22em] transition-colors hover:text-[color:var(--text)] focus-visible:text-[color:var(--text)]',
          isActive
            ? 'border-[color:var(--line)] bg-white/[0.06] text-[color:var(--text)]'
            : 'border-transparent text-[color:var(--text-dim)] hover:border-[color:var(--line-soft)] hover:bg-white/[0.04]',
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
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_18%),radial-gradient(circle_at_top,rgba(177,18,38,0.16),transparent_34%),linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_100%,100%_100%,100%_32px,32px_100%] opacity-70" />
      <div className="pointer-events-none fixed inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(241,75,95,0.85),rgba(255,255,255,0.14),transparent)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.035] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:4px_4px]" />

      <header className="sticky top-0 z-40 border-b border-[color:var(--line)] bg-[rgba(7,8,10,0.72)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center border border-[color:var(--line)] bg-white/5 text-sm font-bold tracking-[0.24em] text-[color:var(--accent)]">
              ZC
            </span>
            <div className="leading-none">
              <div className="text-[0.68rem] uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
                ZeroChill Co
              </div>
              <div className="mt-1 text-[0.64rem] uppercase tracking-[0.22em] text-[color:var(--text-faint)]">
                Local-first AI infrastructure
              </div>
            </div>
          </NavLink>

          <nav className="hidden flex-1 flex-wrap items-center justify-center gap-2 text-sm md:flex">
            {navItems.map((item) => (
              <NavItem key={item.to} to={item.to}>
                {item.label}
              </NavItem>
            ))}
          </nav>

          <NavLink
            to="/preorder"
            className="zc-button-primary border border-[color:var(--accent)] bg-[color:var(--accent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-black"
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

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[color:var(--line)] bg-[rgba(7,8,10,0.9)] px-4 py-3 backdrop-blur-xl md:hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3">
          <NavLink
            to="/products"
            className="zc-button-secondary flex items-center justify-center border border-[color:var(--line)] px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--text-muted)]"
          >
            Products
          </NavLink>
          <NavLink
            to="/manifest"
            className="zc-button-secondary flex items-center justify-center border border-[color:var(--line)] px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--text-muted)]"
          >
            Manifest
          </NavLink>
          <NavLink
            to="/docs"
            className="zc-button-secondary flex items-center justify-center border border-[color:var(--line)] px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--text-muted)]"
          >
            Docs
          </NavLink>
          <NavLink
            to="/preorder"
            className="zc-button-primary flex items-center justify-center border border-[color:var(--accent)] bg-[color:var(--accent)] px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-black"
          >
            Preorder now
          </NavLink>
        </div>
      </div>
    </div>
  );
}
