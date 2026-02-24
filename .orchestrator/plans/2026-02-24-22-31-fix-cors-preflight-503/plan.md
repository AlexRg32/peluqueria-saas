# Plan: Fix CORS Preflight 503
>
> Goal: Fix the 503 error due to suspended API and bad CORS configuration.
> Architecture: Env-based Vercel config & Render Service Updates.

## Core

- [x] **Task 1: Add frontend target env** — `[peluqueria-client/.env.production]`
  - What: Creates explicit file with `VITE_API_BASE_URL` pointing to `peluqueria-saas-prod.onrender.com`.
  - Verify: File exists in directory.
- [x] **Task 2: Fix Render API Environment Settings** — `[peluqueria-saas-prod]`
  - What: Set `CORS_ALLOWED_ORIGINS` to `https://peluqueria-saas-three.vercel.app,http://localhost:5173`
  - Verify: API endpoint responds with the correct header structure.
