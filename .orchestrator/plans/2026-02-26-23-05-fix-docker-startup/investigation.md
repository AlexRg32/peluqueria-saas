# Investigation: Fix Docker Startup

## Summary

The user reported that running `docker-compose up` resulted in an empty/default state for both the client and the API ("está todo por defecto"), whereas running the database alone (`docker-compose up db`) and lifting the services locally works fine. This points to networking and configuration issues within the Docker environment itself.

## Current State

- **Tech Stack**: Spring Boot (Backend), React/Vite (Frontend), PostgreSQL (Database), Docker.
- **Relevant Code**: `docker-compose.yml`, `peluqueria-api/src/main/resources/application.properties`, `peluqueria-client/Dockerfile`, `peluqueria-client/vite.config.js`.
- **Architecture**: Docker Compose orchestrating the three services.

## Scope

### In Scope

- Fixing database connection variables in `docker-compose.yml` for the API.
- Setting up the correct API URL for the frontend in `docker-compose.yml` and `peluqueria-client/Dockerfile`.
- Adding an `nginx.conf` to correctly route traffic to the React single page application inside Docker.

### Out of Scope

- Code refactoring, feature development.

## Recommendation

- In `docker-compose.yml`, use `SPRING_DATASOURCE_URL` instead of generic `DB_HOST` variables, since `application.properties` explicitly requires `SPRING_DATASOURCE_URL`.
- Pass `VITE_API_BASE_URL` as a build argument to the frontend so that it builds targeting port `8080`.
- Add an `nginx.conf` to the frontend and copy it in the Dockerfile to prevent Nginx from returning 404s on browser refreshes or displaying its default page instead of the app.
