# Plan: Fix Render 503 and CORS Errors

## Foundation

- [ ] **Task 1: Update Frontend Production Config** — `/Users/alex32/Desktop/peluqueria-saas/peluqueria-client/.env.production`
  - What: Change `VITE_API_BASE_URL` to `https://peluqueria-saas-prod-fra.onrender.com`.
  - Verify: File contains new URL.

- [ ] **Task 2: Update Local Staging Config** — `/Users/alex32/Desktop/peluqueria-saas/peluqueria-client/.env`
  - What: Change `VITE_API_BASE_URL` to `https://peluqueria-saas-staging-fra.onrender.com` (to match Frankfurt).
  - Verify: File contains new URL.

## Core Integration

- [ ] **Task 3: Instructions for Render/Vercel Updates**
  - What: Provide the user with the exact values to be updated in Vercel and Render dashboards.
  - Verify: Response contains clear instructions.

## Documentation

- [ ] **Task 4: Update 07-infraestructura.md**
  - What: Reflect the move to Frankfurt and the correct URLs.
  - Verify: Document updated.
