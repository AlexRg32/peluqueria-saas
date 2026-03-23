# Plan: Deployment Alignment

> WARNING: This plan is strictly theoretical. No source code files have been modified.

> Goal: cerrar la deriva entre produccion real, staging real y la configuracion/documentacion versionada.
> Architecture: frontend Vercel, backend prod en Raspberry via Cloudflare, Supabase como DB activa, staging aislado y controlado por rama.

## Foundation

- [ ] **Task 1: Congelar mapa real de entornos** — `docs/07-infraestructura.md`, `DEPLOYMENT.md`, `README.md`
  - What: dejar explicitamente que produccion backend hoy vive en `api.alexrg.es`, que Render prod esta suspendido y que Render staging sigue vivo.
  - Verify: todas las URLs documentadas responden segun lo descrito.

- [ ] **Task 2: Decidir rol definitivo de Render** — `render.yaml`, dashboard Render
  - What: escoger entre mantener Render solo para staging o retirarlo tambien de staging.
  - Verify: `render.yaml` y la realidad del dashboard coinciden en nombres, repo, rootDir y ramas.

- [ ] **Task 3: Normalizar estrategia Vercel** — dashboard Vercel, docs de despliegue
  - What: asegurar que produccion publica sale de `main` y staging sale de `staging`, sin proyectos/aliases ambiguos.
  - Verify: el deployment `production` de Vercel muestra `githubCommitRef=main` y el preview/staging muestra `staging`.

## Core

- [ ] **Task 4: Cerrar el rebrand de paths del monorepo** — `render.yaml`, Dockerfiles, docs, configuracion de plataforma
  - What: publicar de forma controlada el paso de `peluqueria-*` a `saloria-*` para que repo remoto y entornos hablen el mismo idioma.
  - Verify: `main` y `staging` remotos contienen `saloria-api` y `saloria-client`, y los despliegues siguen funcionando.

- [ ] **Task 5: Revisar runbook de rollback** — `deploy/raspberry/README.md`, `DEPLOYMENT.md`
  - What: actualizar rollback para que refleje el backend productivo real y no asuma que Render prod esta disponible.
  - Verify: el procedimiento de rollback permite volver a un backend vivo de forma coherente.

- [ ] **Task 6: Validar secretos y CORS post-migracion** — variables externas de Vercel, Render y Raspberry
  - What: comprobar que `CORS_ALLOWED_ORIGINS`, `APP_API_BASE_URL`, `JWT_SECRET` y storage siguen alineados con dominio y frontend reales.
  - Verify: login y llamadas autenticadas funcionan desde frontend prod y staging sin errores CORS.

## Integration & Polish

- [ ] **Task 7: Consolidar naming externo** — Vercel, Render, Supabase, Cloudflare, docs
  - What: renombrar o documentar claramente los recursos legacy que seguiran existiendo temporalmente.
  - Verify: no quedan referencias ambiguas entre `saloria` y `peluqueria-saas` en runbooks de operacion.

- [ ] **Task 8: Añadir chequeo operativo recurrente** — runbook o automatizacion
  - What: definir una rutina corta para verificar frontend prod, API prod, staging y DB antes y despues de promociones.
  - Verify: existe una checklist unica y repetible para cada despliegue.
