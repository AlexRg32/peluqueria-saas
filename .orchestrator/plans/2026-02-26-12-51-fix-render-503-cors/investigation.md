# Investigation: Render 503 and CORS Errors

## Summary

The user is experiencing 503 Service Unavailable errors and CORS issues in the production environment after registering an enterprise. Investigation shows that the frontend is attempting to communicate with an old Render URL (`peluqueria-saas-prod.onrender.com`) which is currently suspended.

## Current State

- **Tech Stack**: Spring Boot (Java) Backend, React (Vite) Frontend.
- **Relevant Code**: `peluqueria-client/.env.production`, `peluqueria-api` (CORS config).
- **Architecture**: Monorepo with Java Backend and React Frontend.

## Findings

1. **Wrong API URL**: The frontend is hitting `https://peluqueria-saas-prod.onrender.com`.
2. **Service Suspended**: The service `srv-d6e7sqctgctc73fecrrg` (peluqueria-saas-prod) in Oregon is suspended by the user/Render, which results in a 503 error for all requests.
3. **Active Backend**: The new production backend in Frankfurt (`srv-d6ff2apaae7s7391838g`) is active and healthy at `https://peluqueria-saas-prod-fra.onrender.com`.
4. **Hardcoded Config**: The file `peluqueria-client/.env.production` has the old URL hardcoded.

## Requirements

### Functional

- [ ] Update frontend to use the correct Frankfurt API URL.
- [ ] Ensure CORS is correctly configured in the new Frankfurt backend for the Vercel production origin.

### Non-Functional

- Security: CORS must be restricted to the specific Vercel URL, not `*`.

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Incorrect CORS | Frontend blocked | Verify Vercel URL and update `CORS_ALLOWED_ORIGINS` in Render. |
| Mixed Env Vars | Staging hitting Prod | Ensure proper separation in `.env` files. |

## Recommendation

1. Update `peluqueria-client/.env.production` with the new Frankfurt URL.
2. The user needs to update the `VITE_API_BASE_URL` environment variable in the Vercel Production deployment settings.
3. Verify and update the `CORS_ALLOWED_ORIGINS` environment variable in Render for the service `peluqueria-saas-prod-fra`.
