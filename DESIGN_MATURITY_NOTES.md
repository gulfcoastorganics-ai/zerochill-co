# Design Maturity Notes

ZeroChill has moved from a launch-page aesthetic to a dark product workspace.

## What Changed

- Replaced the top-heavy marketing layout with an app-like shell.
- Added a fixed left sidebar, a centered content canvas, and a quiet right context rail on desktop.
- Collapsed the mobile experience into a compact top bar with simplified navigation.
- Reduced crimson to small signal accents instead of a dominant visual theme.
- Removed scanline, glow, and other noisy cyberpunk effects from the main experience.
- Tightened typography and spacing so product copy reads more like internal documentation.
- Reworked overview, products, docs, mission control, preorder, and review routes into calmer workspace screens.
- Refined the preorder form into a product intake surface with clearer labels and quieter status copy.

## What Stayed

- All routes remain present.
- The preorder API and email notification behavior remain intact.
- The private `/funding-summary` route still exists and is excluded from public navigation.
- Print behavior for the funding summary remains available.
- The stack stays lightweight and Vite-friendly.

## Intent

The interface should feel like serious infrastructure software: controlled, readable, and operational.
It should borrow layout discipline from Linear, but it should not copy Linear branding, text, or proprietary UI details.
