# Investigation: Project Health

## Summary
Diagnostico read-only del estado actual de Saloria para identificar pendientes locales, fallos visibles, y el estado real de los despliegues soportados antes de empezar nuevas tareas.

## Current State
- **Tech Stack**: monorepo con `saloria-api` (Spring Boot 3 / Java 21 / Maven) y `saloria-client` (React 19 / Vite / Vitest / ESLint).
- **Relevant Code**: `README.md`, `DEPLOYMENT.md`, `docs/03-arquitectura-tecnica.md`, `docs/07-infraestructura.md`, `.github/workflows/deploy-raspberry.yml`, `deploy/raspberry/scripts/redeploy.sh`, `deploy/raspberry/scripts/healthcheck.sh`, `render.yaml`, `saloria-client/.env.production`.
- **Architecture**: frontend en Vercel; backend productivo documentado en Raspberry Pi + Cloudflare Tunnel; base de datos en Supabase; Render queda como ruta legacy alternativa.

## Requirements
### Functional
- [x] Ver si hay cambios locales pendientes de subir.
- [x] Ver si los builds y tests base del repo fallan.
- [x] Verificar el estado de despliegue del frontend productivo.
- [x] Verificar el estado del flujo de despliegue del backend productivo.
- [x] Identificar los riesgos operativos mas inmediatos.

### Non-Functional
- Seguridad: no exponer secretos ni valores sensibles de `.env`.
- Operaciones: distinguir entre fallos de codigo, fallos de infra y deuda no bloqueante.

## Scope
### In Scope
- Estado de Git local frente a `origin/main`
- Worktree sucio y artefactos pendientes
- Tests/build/lint locales
- Estado de Vercel y del workflow de GitHub Actions para Raspberry
- Reachability de URLs publicas documentadas

### Out of Scope
- Cambios de codigo
- Reparacion de despliegues
- Acceso manual a la Raspberry o a Supabase
- Validacion de Render legacy, porque no hay workspace seleccionado

## Findings
- `main` y `origin/main` estan alineados (`0 ahead / 0 behind`).
- El worktree local no esta limpio: `.DS_Store`, `.agent/workflows/promote.md`, multiples planes/auditorias en `.orchestrator/`, y `saloria-api/uploads/1181b23d-5f86-4379-9cd1-16933964881e.jpg`.
- Frontend local:
  - `npm test` -> OK (`27` archivos, `64` tests OK, `1` skipped)
  - `npm run build` -> OK, pero con bundle principal grande (`~1.77 MB`, gzip `~535 KB`)
  - `npm run lint` -> OK
- Backend local:
  - `./mvnw test` -> OK (`57` tests OK)
  - Se observan warnings no bloqueantes de Spring/Hibernate/Flyway durante tests.
- Produccion frontend:
  - Proyecto Vercel `saloria` encontrado
  - Ultimo deployment de produccion: `READY`
  - `https://saloria.vercel.app` responde `200`
- Produccion backend:
  - `https://api.alexrg.es/api/public/enterprises` responde `530`
  - Cuerpo devuelto: `error code: 1033`
  - El ultimo workflow relevante `Deploy Raspberry API` tuvo fallo real en `deploy`
  - Anotacion de GitHub: `The self-hosted runner lost communication with the server`
  - El run mas reciente construyo y publico la imagen ARM64 correctamente, pero el paso `Redeploy API on Raspberry` acabo `cancelled`
- Configuracion operativa actual:
  - `saloria-client/.env.production` apunta a `https://api.alexrg.es`
  - El bundle remoto del frontend tambien referencia `https://api.alexrg.es`
  - Si la API esta caida, el frontend desplegado queda parcialmente roto en cualquier flujo que necesite datos en vivo

## Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| API publica caida detras de Cloudflare | Alto | Revisar Raspberry, Cloudflare Tunnel y salud del runner self-hosted antes de nuevas features |
| Runner self-hosted inestable o desconectado | Alto | Revalidar servicio del runner y conectividad de red en la Raspberry |
| Worktree local lleno de artefactos no ignorados | Medio | Limpiar o ignorar `.orchestrator/`, `.DS_Store` y uploads no versionables |
| Bundle frontend demasiado grande | Medio | Revisar code splitting y `manualChunks` |
| Documentacion menciona Render legacy mientras la ruta real es Raspberry | Medio | Consolidar una fuente unica de verdad operativa |

## Recommendation
La prioridad no deberia ser una nueva feature todavia. Primero conviene recuperar la salud operativa del backend productivo: verificar la Raspberry, el runner self-hosted, el tunnel de Cloudflare y el script de redeploy. En paralelo, dejar limpio el worktree y decidir que artefactos de `.orchestrator/` deben versionarse o ignorarse para evitar ruido constante.
