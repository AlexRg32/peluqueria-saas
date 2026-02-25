# Design: Correcting Production API Endpoint and CORS

## Architecture Overview

The current architecture involves a Vercel-hosted frontend and a Render-hosted backend. The frontend is currently attempting to reach a suspended service (`peluqueria-saas`), which is causing the 503 error. The design is to shift the frontend to the live production service (`peluqueria-saas-prod`) and ensure CORS permissions are correctly set.

## Data Model

No changes to the data model are required.

## API Contracts

The API contracts remain the same. The only change is the base URL.

## Component Design

No frontend component changes are required.

## File Structure

No new files are required. The fix involves configuration updates.

## Dependencies

No new dependencies.

## Testing Strategy

- **Manual Verification**:
    1. Verify that `peluqueria-saas-prod` responds to health checks.
    2. Verify that `peluqueria-saas-prod` accepts CORS preflight requests from the Vercel production origin.
    3. Verify login with `dios@dios.com` on the production URL.

## Proposed Action Plan

1. **Verify Live Service**: Confirm `peluqueria-saas-prod` is operational.
2. **Check CORS Variable**: Use Render logs or API (if possible) to check `CORS_ALLOWED_ORIGINS` for `peluqueria-saas-prod`.
3. **Database Check**: Check Supabase for the `dios@dios.com` user to ensure credentials match.
4. **Vercel Recommendation**: Provide the user with the exact environment variable to update on Vercel.
