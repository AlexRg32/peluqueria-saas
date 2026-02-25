# Plan: Resolve Production Login 503

> Goal: Restore production login by pointing to the correct live API and ensuring CORS configuration.
> Architecture: Vercel (Frontend) -> Render (Backend: peluqueria-saas-prod).

## Foundation

- [ ] **Task 1: Verify Backend Health** — `[srv-d6e7sqctgctc73fecrrg]`
  - What: Check the status and logs of `peluqueria-saas-prod` to ensure it is healthy and ready to receive traffic.
  - Verify: Service status is "live" and logs show no persistent errors.

## Core

- [ ] **Task 2: Verify Database User** — `[Supabase]`
  - What: Check if the user `dios@dios.com` exists in the production database.
  - Verify: Query `app_users` table in production.
- [ ] **Task 3: Check CORS Config** — `[Render Settings]`
  - What: Since I can't see env vars directly, I will assume the 503 is the primary issue and provide instructions for the user to check `CORS_ALLOWED_ORIGINS` on Render.
  - Verify: User confirms the setting.

## Integration & Polish

- [ ] **Task 4: Final Recommendation** — `[Communication]`
  - What: Provide the user with the exact Vercel dashboard update required: change `VITE_API_BASE_URL` to `https://peluqueria-saas-prod.onrender.com`.
  - Verify: User acknowledges and applies the change.
