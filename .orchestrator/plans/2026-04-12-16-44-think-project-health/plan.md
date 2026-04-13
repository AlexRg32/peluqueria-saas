# Plan: Project Health

> WARNING: Este plan es teorico. No se han modificado archivos de codigo del proyecto.

> Goal: recuperar visibilidad y salud operativa antes de seguir desarrollando
> Architecture: frontend Vercel + backend Raspberry/Cloudflare + Supabase

## Foundation

- [ ] **Task 1: Sanear worktree local** — `.gitignore`, raiz del repo`
  - What: decidir si `.orchestrator/`, `.DS_Store` y uploads locales deben versionarse o ignorarse.
  - Verify: `git status --short` deja solo cambios intencionales.

- [ ] **Task 2: Verificar runner self-hosted** — `deploy-raspberry.yml`, host Raspberry`
  - What: confirmar que el runner de la Raspberry sigue online, con red estable y sin bloqueo de CPU/memoria.
  - Verify: nuevo workflow `Deploy Raspberry API` arranca y completa el job `deploy`.

## Core

- [ ] **Task 3: Trazar fallo del backend publico** — `deploy/raspberry/scripts/redeploy.sh`, `deploy/raspberry/scripts/healthcheck.sh`
  - What: comprobar si el fallo esta en la app, en Docker Compose, en el tunnel o en el healthcheck publico.
  - Verify: `curl https://api.alexrg.es/api/public/enterprises` devuelve `200`.

- [ ] **Task 4: Reducir fragilidad del redeploy** — workflow y scripts de Raspberry
  - What: endurecer el redeploy para que no dependa solo del hostname publico si el servicio local ya esta vivo.
  - Verify: el workflow tolera incidencias transitorias del tunnel y deja logs claros.

## Integration & Polish

- [ ] **Task 5: Consolidar documentacion operativa** — `docs/07-infraestructura.md`, `DEPLOYMENT.md`, `README.md`
  - What: dejar una unica ruta oficial de produccion y marcar Render como legacy sin ambiguedad.
  - Verify: cualquier lector entiende en 1 minuto que frontend y backend productivos estan realmente activos y como se redeployan.

- [ ] **Task 6: Atacar deuda del frontend no bloqueante** — config Vite / rutas pesadas
  - What: partir el bundle principal y revisar los warnings de `whileInView` en tests.
  - Verify: `npm run build` mantiene verde y reduce el warning de chunk grande.
