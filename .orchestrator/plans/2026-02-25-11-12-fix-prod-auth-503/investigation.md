# Investigation: Fix Production 503 on Login

## Summary
The user is experiencing a 503 Service Unavailable error during the preflight (OPTIONS) request to `https://peluqueria-saas.onrender.com/auth/login`. This prevents login in the production environment. Analysis reveals that the service `peluqueria-saas` is currently suspended on Render, while a newer service `peluqueria-saas-prod` is live.

## Current State
- **Tech Stack**: Spring Boot (Java 17) Backend, React/Vite Frontend.
- **Relevant Code**:
    - `peluqueria-api/src/main/java/com/peluqueria/config/SecurityConfig.java`: Handles CORS configuration.
    - `peluqueria-client/.env.production`: Configures the API base URL.
- **Architecture**: Monorepo with containerized services deployed on Render and Vercel.

## Requirements
### Functional
- [ ] Restore login functionality in production.
- [ ] Ensure the frontend is calling the correct, live production API.

### Non-Functional
- [ ] Security: Proper CORS configuration to only allow authorized origins.

## Scope
### In Scope
- Investigation of Render services status.
- Verification of CORS configuration in the backend.
- Recommendations for environment variable updates.

### Out of Scope
- Backend logic changes (unless CORS is misconfigured).
- Frontend UI changes.

## Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Wrong URL in Vercel | Users hit a dead/suspended service | Update Vercel env vars to point to `peluqueria-saas-prod`. |
| CORS Misconfiguration | Request blocked by browser | Ensure `CORS_ALLOWED_ORIGINS` in Render matches the Vercel URL. |
| DB Connectivity | Login still fails after CORS fix | Verify `peluqueria-saas-prod` can reach the Supabase DB. |

## Recommendation
1. The frontend (Vercel) likely has `VITE_API_BASE_URL` set to `https://peluqueria-saas.onrender.com`, which is a **suspended** service on Render. This service must either be unsuspended or the frontend must be updated to use `https://peluqueria-saas-prod.onrender.com`.
2. On the Render service `peluqueria-saas-prod`, verify that `CORS_ALLOWED_ORIGINS` includes the URL of the Vercel production app.
3. Verify that the user `dios@dios.com` exists in the production database (Supabase).
