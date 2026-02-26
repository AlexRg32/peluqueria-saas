# Design: Render 403 CORS Fix

## Architecture Overview

The issue is a strict CORS policy in the backend that doesn't recognize the Vercel Preview/Staging Origins. We will update the documentation and provide the user with the exact configuration pattern needed to support multiple Vercel URLs.

## Configuration Changes

| Component | Setting | Recommended Value |
|-----------|---------|-------------------|
| Backend (Staging) | `CORS_ALLOWED_ORIGINS` | `https://*.vercel.app,http://localhost:5173` |
| Backend (Production) | `CORS_ALLOWED_ORIGINS` | `https://peluqueria-saas.vercel.app` (or specific domain) |

## Testing Strategy

- Once updated in Render dashboard, the 403 should turn into a 200 (OK) for the OPTIONS request.
