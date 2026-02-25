# Investigation: Fixing Production Image URLs and Persistence

## Summary

The application currently saves images to the local filesystem and generates URLs hardcoded to `http://localhost:8080`. This causes several issues in production:

1. **Broken Links**: `localhost` is inaccessible from the end user's browser.
2. **Security Block (Mixed Content)**: Vercel (HTTPS) blocks loading resources from `http://localhost:8080` (HTTP).
3. **Data Loss**: Render's filesystem is ephemeral; images are deleted on every deployment or restart.

## Current State

- **Tech Stack**: Spring Boot (Backend), React (Frontend).
- **Relevant Code**:
  - `ServiceOfferingController.java`: Hardcodes `http://localhost:8080/uploads/` (line 49).
  - `FileSystemStorageService.java`: Handles local file saving.
  - `WebConfig.java`: Maps `/uploads/**` to the local directory.
- **Architecture**: Monolith with local file storage.

## Requirements

### Functional

- [ ] Backend must return valid, environment-aware URLs for images.
- [ ] Images must persist across deployments/restarts in production.

### Non-Functional

- Security: URLs must use HTTPS in production.
- Reliability: Persistence must be external to the ephemeral container.

## Scope

### In Scope

- Fixing the hardcoded URL in `ServiceOfferingController`.
- Configuring environment variables for the API base URL.
- Implementation of a persistent storage solution (Supabase Storage is the best candidate given the existing stack).

### Out of Scope

- Migrating existing local images to external storage (they are lost anyway in prod).

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Persistent storage cost | Potential cost | Use Supabase's free tier (up to 1GB). |
| Configuration Complexity | Deployments might fail if ENV vars are missing | Default to local storage if external config is missing. |

## Recommendation

1. **Introduce `app.api.base-url` property** to replace the hardcoded "<http://localhost:8080>".
2. **Implement `SupabaseStorageService`** (or use Supabase Storage via REST/Library) to ensure persistence in production.
3. **Use Conditional Bean Loading**: Use `FileSystemStorageService` in local and an external storage service in production.
