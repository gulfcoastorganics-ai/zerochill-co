# Developer Onboarding

## Project Structure

- [app/page.tsx](./app/page.tsx): homepage and primary conversion flow
- [components/InquiryForm.tsx](./components/InquiryForm.tsx): client-side contact form
- [lib/launchLinks.ts](./lib/launchLinks.ts): centralized Payhip and fallback link config
- [app/globals.css](./app/globals.css): global palette, motion, and card/button styling
- [app/preorder/page.tsx](./app/preorder/page.tsx): preorder handoff page
- [app/success/page.tsx](./app/success/page.tsx): success page after checkout

## Routing Model

- `/` is the GulfCoast Labs homepage
- `/preorder` handles preorder handoff
- `/success` handles checkout completion

The homepage includes the `#launch-access` fallback section for missing launch links.

## Styling System

- Dark matte base
- Ice-blue accents
- Infrastructure-grid background treatment
- Card and button motion in `app/globals.css`
- Utility-first component styling in the page and form

## Homepage Breakdown

1. Hero
   - headline, supporting copy, and two CTAs
2. Systems
   - five service cards
3. Lightweight Hardware
   - delivery differentiation
4. Work With GulfCoast Labs
   - offers and pricing
5. Credibility
   - proof points and flagship project
6. Inquiry / Contact
   - validated frontend-only lead form

## InquiryForm Behavior

- Uses local React state
- Validates required fields and email format
- Shows inline error messages
- Logs valid submissions to the console
- Resets after a successful submit

## Hardcoded Content

Currently hardcoded in [app/page.tsx](./app/page.tsx):

- hero copy
- system card content
- hardware principles
- offers/pricing
- credibility bullets

## Safe Extension Points

- Add a backend or email handler for the inquiry form
- Add case studies or testimonials
- Add screenshots or video clips
- Add analytics
- Add CRM or pipeline integration
- Align `/preorder` and `/success` branding with the homepage if desired

## Recommended Next PRs

1. Wire inquiry submissions to email or CRM.
2. Add one or two case studies with screenshots.
3. Add analytics and lead tracking.
4. Move homepage content into a config file if updates become frequent.
5. Rebrand the legacy launch pages if they need to match the GulfCoast Labs tone.

