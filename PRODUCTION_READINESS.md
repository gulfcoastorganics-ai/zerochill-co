# Production Readiness

ZeroChill Co. is currently configured for a simple Vercel deployment path:

- App Router pages are static-friendly
- Launch links resolve through a centralized helper
- The intake form submits to a single API route
- Email delivery is optional and degrades safely to local logging
- Tests cover the homepage, preorder and success pages, the form, the launch-link helper, and the intake route

## Deployment Profile

- Platform: Vercel
- Framework: Next.js App Router
- Runtime model: default Node runtime for the intake route
- External delivery: optional Resend email delivery

## Known Production Considerations

- In-memory rate limiting is best-effort and resets per server instance
- If Resend env vars are missing, the intake route logs locally and still returns success
- Payhip URLs are centralized in `lib/launchLinks.ts` and fall back cleanly to `/#launch-access`
- The project does not use a database or auth layer for intake handling

## Recommended Owner Actions

- Set the documented environment variables in Vercel
- Verify the Payhip success redirect
- Submit a live intake from production once deployed
- Review the Vercel function logs after the first submission
