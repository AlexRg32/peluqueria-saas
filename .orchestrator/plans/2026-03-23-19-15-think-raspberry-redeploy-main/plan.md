# Plan: Raspberry redeploy from main

> WARNING: This plan is strictly theoretical. No source code files have been modified.

> Goal: asegurar que el backend Spring en Raspberry quede alineado con `main` en cada cambio.
> Architecture: frontend auto-deploy en Vercel + backend self-hosted en Raspberry con Docker Compose.

## Foundation

- [ ] **Task 1: Auditar el host Raspberry** — `host operativo`
  - What: comprobar si ya existe un `cron`, `systemd service`, webhook listener o script manual fuera del repo que haga `git pull` y `docker compose up -d --build`.
  - Verify: encontrar el servicio o confirmar su ausencia con evidencia del host.

- [ ] **Task 2: Alinear la documentacion** — `docs/07-infraestructura.md`, `DEPLOYMENT.md`
  - What: aclarar que hoy el backend Raspberry no tiene auto-redeploy versionado, salvo automatizacion externa no incluida en el repo.
  - Verify: lectura de docs sin contradicciones entre "main-only" y "auto deploy".

## Core

- [ ] **Task 3: Crear script operativo de redeploy** — `deploy/raspberry/scripts/redeploy.sh`
  - What: encapsular `git pull`, `docker compose --env-file .env.prod -f docker-compose.prod.yml --profile cloudflare up -d --build` y un healthcheck.
  - Verify: ejecutar el script en Raspberry y observar contenedores renovados y healthcheck OK.

- [ ] **Task 4: Elegir trigger de automatizacion** — `GitHub Actions` o `systemd/cron/webhook`
  - What: decidir si el push a `main` debe disparar el redeploy desde GitHub por SSH o desde la Raspberry observando el repo.
  - Verify: documentar la decision y realizar una prueba con un commit de test.

## Integration & Polish

- [ ] **Task 5: Implementar CI/CD minimo para Raspberry** — `.github/workflows/deploy-raspberry.yml` o configuracion host
  - What: montar el trigger elegido con secretos seguros y logs trazables.
  - Verify: hacer push a `main` y comprobar que la Raspberry ejecuta redeploy sin intervencion manual.

- [ ] **Task 6: Añadir rollback operativo** — `deploy/raspberry/README.md`
  - What: documentar como volver a la version anterior o reconstruir desde un commit concreto si el deploy falla.
  - Verify: disponer de pasos reproducibles y probados en staging o ventana controlada.
