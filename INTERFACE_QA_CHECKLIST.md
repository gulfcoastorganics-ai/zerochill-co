# Interface QA Checklist

## Visual

- Confirm the public homepage reads as a premium product launch, not a card-heavy dashboard.
- Confirm liquid glass surfaces are consistent across hero, product pages, Mission Control, and footer.
- Confirm borders are subtle and repeated surfaces use shared material classes.
- Confirm no public route exposes `/funding-summary`.

## Layout

- Confirm homepage spacing feels editorial and not stacked or crowded.
- Confirm product pages keep a clear section order: promise, operator, environment, capability bands, workflow.
- Confirm Mission Control and Admin remain calm, executive-grade surfaces.
- Confirm the preorder form remains trustworthy and readable.

## Accessibility

- Confirm focus-visible states are obvious on nav, buttons, inputs, and links.
- Confirm mobile layouts avoid horizontal overflow.
- Confirm reduced-motion still suppresses reveal and hover motion.
- Confirm text remains readable over glass surfaces.

## Print

- Confirm `/funding-summary` print styling still produces a clean PDF-friendly view.

## Build

- Run `npm run build` before deploy.
