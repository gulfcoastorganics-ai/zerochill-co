# API Notes

## Current Endpoint

- `POST /api/preorder`
- `GET /api/preorder-export?token=...`

## Purpose

- Accept preorder interest submissions without requiring a database.
- Validate basic form fields.
- Return structured JSON success or error responses.
- Provide a token-gated export placeholder for admin review workflows.

## Current Behavior

- Validates:
  - name
  - email
  - intended use
  - preferred product tier
- Rejects malformed submissions with `400`
- Applies a lightweight per-IP request limit
- Returns a sanitized submission payload on success
- Accepts preorder submissions, but does not yet persist them to a database or email provider.
- Serverless memory is not persistent, so function state must not be treated as storage.
- The export endpoint requires `ADMIN_EXPORT_TOKEN` and a matching `?token=` query parameter.
- The export endpoint returns JSON in a placeholder format until durable storage is added.

## Frontend Fallback

- The preorder form submits to the API first.
- If the request fails because the backend is unavailable, the form falls back to localStorage.
- Validation errors are shown to the user and are not silently stored as successful submissions.

## Future Expansion Path

- Email notifications
  - Send preorder submissions to an internal inbox or operations alias.
- Resend integration
  - Deliver lightweight transactional notifications without adding heavy infrastructure.
- Database layer
  - Persist submissions in a managed store once the pipeline is approved.
- CRM / export layer
  - Export leads into a sales workflow, sheet, or CRM system.

## Deployment Notes

- The API route is compatible with Vercel Functions.
- No additional backend framework is required.
- Keep the function stateless and maintain the local fallback for resilience.
- Add `ADMIN_EXPORT_TOKEN` in the Vercel environment settings before using the export route.
