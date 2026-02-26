# Investigation: Fix Render Deploys (Frankfurt)

## Summary

The user has reported that two processes (services) are trying to deploy on Render but failing. Investigation shows that the two new Frankfurt services (`peluqueria-saas-prod-fra` and `peluqueria-saas-staging-fra`) have an incorrect `rootDir` configuration, causing the Docker build to fail because it cannot find the `Dockerfile`.

## Current State

- **Tech Stack**: Java/Spring Boot (Backend), Docker.
- **Relevant Code**: `peluqueria-api/Dockerfile`.
- **Services Affected**:
  - `srv-d6ff2apaae7s7391838g` (peluqueria-saas-prod-fra)
  - `srv-d6ff284r85hc73baut20` (peluqueria-saas-staging-fra)
- **Error**: `failed to solve: failed to read dockerfile: open Dockerfile: no such file or directory`.

## Requirements

### Functional

- [ ] Update `rootDir` to `peluqueria-api` for both Frankfurt services.
- [ ] Trigger a new deployment for both services to verify the fix.

### Non-Functional

- Reliability: Ensure the deployment process works as expected for the new region.

## Scope

### In Scope

- Updating Render service configuration via MCP tools.
- Triggering and monitoring deployments.

### Out of Scope

- Modifying the application code unless the build fails for other reasons after fixing the path.

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Build fails for other reasons | Delayed deployment | Check logs again and address any application-level issues. |

## Recommendation

Update the `rootDir` parameter to `peluqueria-api` for both services. This matches the configuration used in the previously working Oregon services.
