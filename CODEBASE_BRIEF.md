# ZeroChill Codebase Brief

ZeroChill Co. is a production Next.js 16 site for sovereign AI infrastructure positioning, preorder commerce, and operator intake. The codebase is built to keep launch commerce, intake validation, and the visual system tightly controlled and production-safe.

## 1. Project Purpose

- Present ZeroChill as a hardened, operator-focused AI infrastructure brand.
- Support two commercial flows:
  - Payhip preorder/launch access routing.
  - Intake submissions through `/api/inquiry` with Resend delivery when configured.
- Preserve a tactical glass UI system with dark surfaces, red accents, and wallpaper-driven hero pages.

## 2. App Structure

- `app/` contains the Next.js App Router routes and route handlers.
- `components/` contains shared UI pieces such as the inquiry form.
- `lib/` contains shared runtime logic for launch links and intake processing.
- `scripts/` contains verification scripts used against production.
- `tests/` contains Vitest and React Testing Library coverage.
- `app/globals.css` defines the site-wide visual system, glass utilities, and CTA styles.

## 3. Main Routes

### `/`

- Main marketing homepage.
- Introduces the ZeroChill positioning, launch targets, and the intake section.
- Renders `InquiryForm` in the contact section.

### `/preorder`

- Preorder and launch-queue page for Sovereign Zero.
- Uses `lib/launchLinks.ts` to resolve the Payhip checkout destination.
- Falls back to `/#launch-access` if the Payhip env vars are missing.

### `/success`

- Post-checkout confirmation page.
- Confirms preorder/access completion and points users back to the main site or preorder page.

### `/api/inquiry`

- POST-only intake endpoint with `OPTIONS` support.
- Validates request payloads with Zod.
- Applies rate limiting and honeypot rejection.
- Delivers email through Resend when env vars are present.
- Falls back to logging mode when email delivery cannot be completed.

## 4. Key Component

### `components/InquiryForm.tsx`

- Client-side form for inquiry submission.
- Handles:
  - local validation
  - loading state
  - duplicate submit protection
  - success, error, and fallback status messaging
- Sends JSON to `/api/inquiry`.
- Preserves the glass CTA styling and mobile-safe button sizing.

## 5. Key Libraries and Modules

### `lib/launchLinks.ts`

- Resolves Payhip URLs for:
  - `Sovereign Zero`
  - `Matrix Access`
- Supports:
  - server-side vars
  - public vars
  - safe normalization of URLs
  - fallback to `/#launch-access`

### `lib/inquiryIntake.ts`

- Owns intake schema validation, formatting, and helper logic.
- Responsibilities:
  - Zod schema for inquiry payloads
  - field error mapping
  - rate limiting
  - safe sender selection for Resend
  - log payload formatting
  - Resend sender fallback rules

## 6. Environment Variables

### Payhip vars

- `PAYHIP_SOVEREIGN_ZERO_URL`
- `PAYHIP_MATRIX_ACCESS_URL`
- `NEXT_PUBLIC_PAYHIP_SOVEREIGN_ZERO_URL`
- `NEXT_PUBLIC_PAYHIP_MATRIX_ACCESS_URL`

Resolution order is server var first, then public var, then local fallback to `/#launch-access`.

### Resend vars

- `RESEND_API_KEY`
- `ZEROCHILL_INTAKE_TO_EMAIL`
- `ZEROCHILL_INTAKE_FROM_EMAIL`

### Legacy `PREORDER_*` aliases

- `PREORDER_FROM_EMAIL`
- `PREORDER_NOTIFY_TO`

Legacy aliases remain supported for backwards compatibility. The intake helpers prefer the newer ZeroChill intake names when available.

## 7. Validation Scripts

### `npm run check:production`

- Verifies the deployed production site responds correctly.
- Checks:
  - `GET /`
  - `GET /preorder`
  - `GET /success`
  - `OPTIONS /api/inquiry`

### `npm run check:intake`

- Posts a controlled payload to `/api/inquiry`.
- Reports:
  - HTTP status
  - `ok`
  - `delivered`
  - `deliveryMode`
  - `deliveryAttempted`
- Falls back once to a schema-compatible payload if the live deployment is still on an older intake schema.

## 8. Testing Setup

- Test runner: `Vitest`
- DOM/runtime environment: `jsdom`
- UI assertions: `@testing-library/react`
- Matchers: `@testing-library/jest-dom`

Primary coverage includes:

- `tests/inquiry-form.test.tsx`
- `tests/inquiry-route.test.ts`
- route and launch-link behavior coverage elsewhere in `tests/`

## 9. Deployment Flow

- GitHub `main` is the source of truth for production changes.
- Vercel hosts production and preview deployments.
- The repository should be treated as production-first.
- After deploys, re-run the production and intake checks against the live site.

## 10. What Not to Touch Unless Necessary

- Payhip behavior and launch-link fallback rules.
- Intake API environment handling.
- Resend fallback logic and sender safety checks.
- Wallpaper assets and the broader visual system.
- Route structure.

## Practical Notes

- `app/globals.css` is the center of the shared visual language.
- Intake is designed to succeed even when mail delivery is unavailable, by falling back to log mode.
- Do not commit secrets or edit `.env.local` for documentation work.
- Keep changes narrow when modifying commerce or intake paths, since those are live and operational.
