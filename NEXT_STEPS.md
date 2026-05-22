# Next Steps

## Immediate

- Decide where inquiry submissions should go:
  - email
  - CRM
  - API route
  - mailto fallback
- Confirm whether the launch queue needs additional operational detail or remains intentionally lean.
- Replace placeholder Payhip URLs with production values if they are not already live.

## High-Value Additions

- Add one or two case studies
- Add screenshots or short video clips of real systems
- Add analytics
- Add CRM capture for inquiry submissions
- Add a clear follow-up pipeline for new leads

## Content Refinement

- Move homepage arrays into a config file if content starts changing often
- Add a testimonials or results section if client proof becomes available
- Tighten pricing copy if offer ranges change
- Add richer product screenshots if there are actual systems to show

## Technical Follow-Ups

- Wire `InquiryForm` to a backend endpoint
- Add basic spam protection if the form becomes public-facing at scale
- Consider a dedicated content source if pages become more numerous
- Keep the build lean and avoid heavy dependencies unless a clear need appears

## Operational Follow-Up

- Re-run:
  - `npm run build`
  - `npm run lint`
  - `npx tsc --noEmit`
- Verify mobile layout before any launch or campaign push
