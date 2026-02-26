# Plan: Fix Docker Startup

## Foundation

- [x] **Task 1: Setup Nginx** — `peluqueria-client/nginx.conf`
  - What: Creates an `nginx.conf` with a `try_files` rule.
  - Verify: Ensure the file exists.

## Core

- [x] **Task 2: Fix Frontend Build Process** — `peluqueria-client/Dockerfile`
  - What: Use `COPY` to move `nginx.conf` into `/etc/nginx/conf.d/default.conf`. Also expose `ARG VITE_API_BASE_URL`.
  - Verify: Read Dockerfile and ensure commands are valid.
- [x] **Task 3: Fix Docker Compose** — `docker-compose.yml`
  - What: Set `SPRING_DATASOURCE_URL`, `CORS_ALLOWED_ORIGINS` to `app`. Pass `VITE_API_BASE_URL` to `client` container build definition.
  - Verify: Content verification.

## Integration & Polish

- [x] **Task 4: Update Documentation** — `docs/07-infraestructura.md`
  - What: Mention the requirements for passing ENV vars in `docker-compose.yml` with their specifics.
  - Verify: File exists and modified successfully.
