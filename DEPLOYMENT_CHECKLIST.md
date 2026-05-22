# Deployment Checklist

Use this checklist before promoting ZeroChill Co. to Vercel production.

## Build And Runtime

- [ ] `npm run lint`
- [ ] `npx tsc --noEmit`
- [ ] `npm run build`
- [ ] `npm test`
- [ ] Confirm `/`, `/preorder`, `/success`, and `/api/inquiry` respond in production

## Vercel Settings

- [ ] Import the repository into Vercel as a Next.js project
- [ ] Keep the default framework detection unless an override is required
- [ ] Use the default Node runtime for `app/api/inquiry/route.ts`
- [ ] Verify the project is not forcing any custom rewrites or headers that would interfere with App Router routes

## Required Environment Variables

- [ ] `NEXT_PUBLIC_PAYHIP_SOVEREIGN_ZERO_URL`
- [ ] `NEXT_PUBLIC_PAYHIP_MATRIX_ACCESS_URL`

## Optional Environment Variables

- [ ] `PAYHIP_SOVEREIGN_ZERO_URL`
- [ ] `PAYHIP_MATRIX_ACCESS_URL`
- [ ] `RESEND_API_KEY`
- [ ] `ZEROCHILL_INTAKE_FROM_EMAIL`
- [ ] `ZEROCHILL_INTAKE_TO_EMAIL`

## Launch Checks

- [ ] Payhip success redirect is set to `/success`
- [ ] Homepage fallback links resolve to `/#launch-access` when checkout links are missing
- [ ] Intake submissions return a structured JSON response
- [ ] Intake email delivery falls back to local logging when Resend is not configured

## Final Verification

- [ ] Open the homepage in production
- [ ] Open the preorder route in production
- [ ] Submit a test intake record
- [ ] Confirm a success response from `/api/inquiry`
- [ ] Confirm the inbox or local logs receive the intake event
