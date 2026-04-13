# Plan: Raspberry API Autostart

> WARNING: This plan is strictly theoretical. No source code files have been modified.

> Goal: Confirmar si la API de la Raspberry requiere arranque manual tras un apagado.
> Architecture: Docker en host Debian + Docker Compose con politicas de restart.

## Foundation

- [ ] **Task 1: Verificar Docker en boot** — `host Raspberry`
  - What: Ejecutar `sudo systemctl is-enabled docker && sudo systemctl is-active docker`.
  - Verify: Debe devolver `enabled` y `active`.

## Core

- [ ] **Task 2: Confirmar contenedores persistidos** — `deploy/raspberry/docker-compose.prod.yml`
  - What: Revisar que los servicios relevantes usan `restart: unless-stopped`.
  - Verify: `docker inspect saloria_api --format '{{ .HostConfig.RestartPolicy.Name }}'` devuelve `unless-stopped`.

- [ ] **Task 3: Confirmar primer despliegue** — `deploy/raspberry/scripts/redeploy.sh`
  - What: Asegurarse de que al menos una vez se ha ejecutado `./deploy/raspberry/scripts/redeploy.sh`.
  - Verify: `docker ps -a` muestra `saloria_api` y, segun perfil, `saloria_cloudflared` o `saloria_caddy`.

## Integration & Polish

- [ ] **Task 4: Probar recuperacion tras reboot** — `host Raspberry`
  - What: Reiniciar la Raspberry y validar la salud de la API.
  - Verify: `./deploy/raspberry/scripts/healthcheck.sh https://api.tudominio.com` responde OK despues del arranque.
