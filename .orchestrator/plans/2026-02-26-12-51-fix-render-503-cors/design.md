# Design: Render 503 and CORS Fix

## Architecture Overview

The frontend (deployed on Vercel) needs to be repointed to the new Frankfurt-based API. The previous URL in Oregon is suspended and returning 503. Additionally, the new backend in Frankfurt must be configured with correct CORS headers and application properties.

## Configuration Changes

| Component | Setting | New Value |
|-----------|---------|-----------|
| Frontend (`.env.production`) | `VITE_API_BASE_URL` | `https://peluqueria-saas-prod-fra.onrender.com` |
| Frontend (Vercel Prod) | `VITE_API_BASE_URL` | `https://peluqueria-saas-prod-fra.onrender.com` |
| Backend (Render Prod Env) | `CORS_ALLOWED_ORIGINS` | `https://[your-vercel-production-domain].vercel.app` |
| Backend (Render Prod Env) | `APP_API_BASE_URL` | `https://peluqueria-saas-prod-fra.onrender.com` |

## File Structure

Modified local files for future correct builds:

- `peluqueria-client/.env.production`
- `peluqueria-client/.env` (re-verify local dev pointing vs staging)

## Testing Strategy

- Unit: Local build verification.
- Integration: Trigger a manual build on Vercel with the new Env Var and verify connection with `curl` or browser console log.
