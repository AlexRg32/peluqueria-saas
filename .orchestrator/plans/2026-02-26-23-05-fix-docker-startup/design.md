# Design: Fix Docker Startup

## Architecture Overview

The current monolithic React frontend needs specific Nginx fallback rules to work properly, and the Spring Boot backend must receive correctly prefixed environment variables via Docker Compose.

## Component Design (if frontend)

- Reconfigure `docker-compose.yml` backend to pass Spring properties rather than arbitrary `DB_HOST` settings.
- Enable CORS across origin ports (3000 to 8080).
- Extend `peluqueria-client/Dockerfile` to receive Vite Build Args.
- Bundle an `nginx.conf` containing the directive `try_files $uri $uri/ /index.html;` into the frontend build to allow for smooth Single Page Application execution.
