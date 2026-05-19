import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-black/40">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <div className="text-sm uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
            ZeroChill Co
          </div>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[color:var(--text-muted)]">
            Sovereign compute infrastructure for operators that refuse cloud dependency,
            surveillance defaults, and inflated abstraction.
          </p>
        </div>

        <div className="grid gap-2 text-sm uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
          <Link to="/manifest" className="hover:text-[color:var(--text)]">
            Manifest
          </Link>
          <Link to="/docs" className="hover:text-[color:var(--text)]">
            Docs
          </Link>
          <Link to="/preorder" className="hover:text-[color:var(--text)]">
            Preorder
          </Link>
        </div>
      </div>
    </footer>
  );
}
