# Linear Style QA

## What Was Changed

- The site now uses a dark matte shell with a fixed left sidebar on desktop.
- Content is centered in a narrower reading column instead of spanning the page like a campaign landing page.
- A right rail provides optional status and context without competing with the main canvas.
- Navigation is grouped by workspace function: Overview, Products, Mission Control, Docs, Preorder, and Review.
- Product navigation includes Lite, Core, Blacksite, and DevKit.
- Overview, product, docs, preorder, mission control, and review pages were rewritten to feel like app screens.
- The preorder form was simplified into a cleaner intake flow.
- Crimson is now a signal color only.

## What Not To Copy

- Do not copy Linear branding, the logo, or any exact copy.
- Do not mirror Linear spacing ratios or proprietary component treatment exactly.
- Do not introduce bright gradient hero effects or noisy cyberpunk overlays.
- Do not turn the shell back into a marketing page with oversized hero sections and decorative cards.

## QA Checklist

- Desktop layout keeps the left sidebar visible and the main content centered.
- Mobile layout collapses without hiding the important routes.
- Public navigation does not expose `/funding-summary`.
- Preorder still submits through the existing API path.
- Email notification behavior still works.
- Funding summary print styling still works.
- The visual system stays restrained: thin borders, muted text, quiet active states.
