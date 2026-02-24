# Design: Fix CORS Preflight 503

## Overview

We need the Vercel frontend to map to the right Render API and we need the Render API to acknowledge the Vercel frontend origin.

## File Structure modifications

- `peluqueria-client/.env.production`: Created / updated to explicitly declare `VITE_API_BASE_URL` as `https://peluqueria-saas-prod.onrender.com`.

## Render API Configurations

- Update the web service environment variable `CORS_ALLOWED_ORIGINS` for the service `srv-d6e7sqctgctc73fecrrg` (peluqueria-saas-prod) to explicitly include `https://peluqueria-saas-three.vercel.app` (as a comma-separated value next to default localhost or simply replacing it if it doesn't matter for prod). We will use `https://peluqueria-saas-three.vercel.app`.
