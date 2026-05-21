import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { workspaceNavSections, workspaceStatus } from '../../data/site';

function ShellLink({ to, children, className = '' }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'zc-nav-link block rounded-xl border px-3.5 py-2.5 text-[0.92rem] leading-6 transition-colors',
          isActive
            ? 'border-[color:var(--line)] bg-white/[0.045] text-[color:var(--text)]'
            : 'border-transparent text-[color:var(--text-dim)] hover:border-[color:var(--line-soft)] hover:bg-white/[0.025] hover:text-[color:var(--text)]',
          className,
        ].join(' ')
      }
    >
      {children}
    </NavLink>
  );
}

function SidebarSection({ title, items }) {
  return (
    <section className="space-y-2">
      <div className="px-3 text-[0.66rem] tracking-[0.14em] text-[color:var(--text-faint)]">
        {title}
      </div>
      <div className="space-y-1">
        {items.map((item) => (
          <ShellLink key={item.to} to={item.to}>
            {item.label}
          </ShellLink>
        ))}
      </div>
    </section>
  );
}

export default function SiteShell() {
  const location = useLocation();

  return (
    <div id="top" className="crt-shell min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),transparent_18%),radial-gradient(circle_at_80%_0%,rgba(179,58,68,0.08),transparent_26%)]" />

      <div className="relative z-10 min-h-screen lg:grid lg:grid-cols-[19rem_minmax(0,1fr)_19rem]">
        <aside className="hidden border-r border-[color:var(--line)] bg-[rgba(9,10,12,0.94)] lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
          <div className="border-b border-[color:var(--line-soft)] px-5 py-6">
            <NavLink to="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--line)] bg-white/[0.04] text-[0.8rem] font-semibold tracking-[0.18em] text-[color:var(--text)]">
                ZC
              </span>
              <div>
                <div className="text-[0.72rem] font-medium tracking-[-0.01em] text-[color:var(--text)]">
                  ZeroChill Co
                </div>
                <div className="mt-1 text-[0.65rem] tracking-[0.08em] text-[color:var(--text-faint)]">
                  Infrastructure workspace
                </div>
              </div>
            </NavLink>
          </div>

          <div className="workspace-grid flex-1 space-y-7 overflow-y-auto px-4 py-6">
            {workspaceNavSections.map((section) => (
              <SidebarSection key={section.title} title={section.title} items={section.items} />
            ))}
          </div>

          <div className="border-t border-[color:var(--line-soft)] p-4">
          <ShellLink to="/preorder" className="border-[color:var(--accent)] bg-[color:var(--accent)] !text-black hover:bg-[color:var(--accent-soft)]">
              Preorder access
            </ShellLink>
          </div>
        </aside>

        <main className="min-w-0">
          <div className="border-b border-[color:var(--line)] bg-[rgba(8,9,11,0.88)] px-4 py-4 backdrop-blur-xl lg:hidden">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
              <NavLink to="/" className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[color:var(--line)] bg-white/[0.04] text-[0.76rem] font-semibold tracking-[0.18em]">
                  ZC
                </span>
                <div className="leading-tight">
                  <div className="text-[0.7rem] font-medium tracking-[-0.01em] text-[color:var(--text)]">
                    ZeroChill Co
                  </div>
                  <div className="text-[0.64rem] tracking-[0.08em] text-[color:var(--text-faint)]">
                    Workspace shell
                  </div>
                </div>
              </NavLink>
              <ShellLink to="/preorder" className="border-[color:var(--accent)] bg-[color:var(--accent)] px-3 py-2 text-[0.66rem] tracking-[0.14em] !text-black">
                Preorder
              </ShellLink>
            </div>

            <div className="mt-4 overflow-x-auto">
              <div className="flex min-w-max gap-2">
                {workspaceNavSections.flatMap((section) => section.items).map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      [
                        'whitespace-nowrap rounded-full border px-3 py-2 text-[0.64rem] tracking-[0.12em]',
                        isActive
                          ? 'border-[color:var(--line)] bg-white/[0.05] text-[color:var(--text)]'
                          : 'border-[color:var(--line-soft)] bg-white/[0.015] text-[color:var(--text-dim)]',
                      ].join(' ')
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
            <div className="space-y-5 lg:flex lg:items-end lg:justify-between lg:gap-8">
              <div className="max-w-3xl">
                <p className="text-[0.66rem] tracking-[0.12em] text-[color:var(--text-faint)]">
                  /{location.pathname === '/' ? 'overview' : location.pathname.slice(1)}
                </p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">
                  ZeroChill now presents as a compact operating workspace with a darker shell, tighter rhythm, and quieter visual language.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {workspaceStatus.map((signal) => (
                  <span key={signal.label} className="status-pill">
                    {signal.label} {signal.value}
                  </span>
                ))}
              </div>
            </div>

            <div key={location.pathname} className="zc-page mt-8">
              <Outlet />
            </div>
          </div>
        </main>

        <aside className="hidden border-l border-[color:var(--line)] bg-[rgba(9,10,12,0.88)] lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
          <div className="space-y-5 overflow-y-auto px-4 py-5">
            <div className="zc-panel p-5">
              <div className="text-[0.66rem] tracking-[0.12em] text-[color:var(--text-faint)]">
                Right rail
              </div>
              <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                Optional context for routing, status, and preorder access. It stays quiet and secondary to the main canvas.
              </p>
            </div>

            <div className="zc-panel p-5">
              <div className="text-[0.66rem] tracking-[0.12em] text-[color:var(--text-faint)]">
                System notes
              </div>
              <ul className="mt-3 space-y-3 text-sm leading-7 text-[color:var(--text-muted)]">
                <li>Routes remain intact.</li>
                <li>Sensitive continuation materials stay off the public surface.</li>
                <li>Preorder and payment flows are preserved.</li>
              </ul>
            </div>

            <div className="zc-panel p-5">
              <div className="text-[0.66rem] tracking-[0.12em] text-[color:var(--text-faint)]">
                Primary action
              </div>
              <ShellLink
                to="/preorder"
                className="mt-3 border-[color:var(--accent)] bg-[color:var(--accent)] !text-black hover:bg-[color:var(--accent-soft)]"
              >
                Open preorder
              </ShellLink>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
