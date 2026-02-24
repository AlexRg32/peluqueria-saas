# Investigation: Fix CORS Preflight 503

## Summary

The frontend deployed on `https://peluqueria-saas-three.vercel.app` is failing to login with a 503 error during the CORS preflight request (`OPTIONS /auth/login`). The error shows that the frontend is trying to reach `https://peluqueria-saas.onrender.com`. However, based on the Render deployments, `peluqueria-saas` is currently **suspended**. The real production backend running on Render is `peluqueria-saas-prod` (available at `https://peluqueria-saas-prod.onrender.com`). The 503 error happens because the suspended Render service cannot process requests or return proper CORS headers.

## Current State

- **Relevant Code**: `peluqueria-client/src/lib/axios.ts` fetching `import.meta.env.VITE_API_BASE_URL`
- **Render Backend**: The old `peluqueria-saas` backend is Suspended. The new backend is `peluqueria-saas-prod`.
- **Backend CORS config**: `application.properties` specifies `app.cors.allowed-origins=${CORS_ALLOWED_ORIGINS:http://localhost:5173}` which is handled by `SecurityConfig.java`.

## Requirements

### Functional

- [x] The frontend must send its requests to the active active backend `peluqueria-saas-prod.onrender.com`.
- [x] The backend `peluqueria-saas-prod` must allow CORS requests from `https://peluqueria-saas-three.vercel.app`.

### Non-Functional

- Smooth deployment in Vercel.

## Scope

### In Scope

- Fixing the Frontend API base URL.
- Fixing Backend CORS headers in Render.

## Recommendation

We will set the `.env.production` file for Vercel, and update the environment variable in Render for the active service `peluqueria-saas-prod`. We will also ask the user to clear/update the Environment Variables inside the Vercel Dashboard if Vercel overrides the `.env.production` file.
