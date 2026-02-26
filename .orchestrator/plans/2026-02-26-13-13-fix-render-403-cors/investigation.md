# Investigation: Render 403 Forbidden (Preflight)

## Summary

The user is now seeing 403 Forbidden errors on Preflight (OPTIONS) requests to `https://peluqueria-saas-staging-fra.onrender.com/auth/register`. Since no logs appear in Render, the request is likely being rejected by the `CorsFilter` in Spring Security before it reaches the logging or business logic.

## Current State

- **Error**: `Preflight response is not successful. Status code: 403`.
- **Backend**: Spring Boot in Frankfurt (Staging).
- **Frontend**: Vercel (Staging/Preview).
- **CORS Config**: `SecurityConfig.java` uses `CORS_ALLOWED_ORIGINS` environment variable.

## Findings

1. **Silent Rejection**: The 403 status is characteristic of the `CorsFilter` rejecting an unauthorized Origin without proceeding to the filter chain.
2. **Missing Origins**: The user likely updated `VITE_API_BASE_URL` (where requests go) but hasn't updated `CORS_ALLOWED_ORIGINS` (where requests come from) to include the **Preview URL** of Vercel.
3. **Filter Order**: `CorsFilter` is correctly positioned before auth filters, but it is strict.

## Requirements

### Functional

- [ ] Add the Vercel Preview URL to `CORS_ALLOWED_ORIGINS` in the Render Staging service.
- [ ] Add the Vercel Production URL to `CORS_ALLOWED_ORIGINS` in the Render Production service.

### Non-Functional

- Flexibility: Use a pattern like `https://*.vercel.app` if allowed and desired to support all previews automatically.

## recommendation

1. The user must check the **exact** URL they are using to access the app in Vercel.
2. Update the `CORS_ALLOWED_ORIGINS` variable in Render (for both services) to include that URL.
3. For convenience, use `https://peluqueria-saas.vercel.app,https://peluqueria-saas-*.vercel.app` (if supported by patterns) or list them explicitly.
