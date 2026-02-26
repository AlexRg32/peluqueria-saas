# Plan: Fix 403 CORS Error

## Foundation

- [ ] **Task 1: Update documentation with CORS pattern logic** — `docs/07-infraestructura.md`
  - What: Explain how to use `https://*.vercel.app` in `CORS_ALLOWED_ORIGINS`.
  - Verify: Documentation is clear on this point.

## Core Integration

- [ ] **Task 2: Guide User through Render Dashboard update**
  - What: Provide the exact string to copy-paste into the Render Environment Variables.
  - Verify: User confirms update.

- [ ] **Task 3: (Self-Check) Verify Spring Security CORS Split**
  - What: Ensure the backend correctly handles the comma-separated list.
  - Verify: Code already does `split(",")`.
