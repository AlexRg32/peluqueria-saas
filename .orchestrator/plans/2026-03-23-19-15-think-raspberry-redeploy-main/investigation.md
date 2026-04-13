# Investigation: Raspberry redeploy from main

## Summary
Analisis de si el backend Spring Boot desplegado en la Raspberry Pi se reconstruye automaticamente al hacer push a `main`. La conclusion es que, con la configuracion versionada hoy en el repo, **no existe un mecanismo automatico que conecte el push a `main` con un rebuild/redeploy en la Raspberry**.

## Current State
- **Tech Stack**: monorepo con `saloria-api` (Spring Boot + Maven), `saloria-client` (React/Vite), Docker Compose y despliegue productivo mixto Vercel + Raspberry.
- **Relevant Code**:
  - `deploy/raspberry/docker-compose.prod.yml`
  - `deploy/raspberry/README.md`
  - `docs/07-infraestructura.md`
  - `DEPLOYMENT.md`
  - `render.yaml`
- **Architecture**: frontend en Vercel, backend en Raspberry Pi con Docker Compose y Cloudflare Tunnel, base de datos en Supabase.

## Requirements
### Functional
- [x] Determinar si un push a `main` dispara rebuild del backend en Raspberry.
- [x] Identificar si existe CI/CD versionado para ese redeploy.
- [x] Diferenciar el comportamiento del frontend en Vercel y del backend en Raspberry.

### Non-Functional
- Performance: evitar downtime innecesario al redeployar la API.
- Security: no introducir pulls remotos inseguros ni exponer secretos en el repo.

## Scope
### In Scope
- Configuracion versionada de despliegue.
- Documentacion operativa del host Raspberry.
- IaC existente (`render.yaml`) y ausencia/presencia de workflows.

### Out of Scope
- Estado real del host si tiene cron/systemd/manual scripts no versionados.
- Cambios de implementacion o automatizacion.

## Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Suponer auto-deploy por usar `main` | Se piensa que produccion esta actualizada cuando no lo esta | Verificar automatizacion versionada y proceso operativo real |
| Mezclar comportamiento de Vercel con Raspberry | Falsa sensacion de CI/CD completo | Separar claramente frontend auto-deploy de backend self-hosted |
| Tener automatizacion fuera del repo | El repo no refleja el flujo real | Auditar la Raspberry: cron, systemd, webhooks, scripts de pull |

## Evidence
- `deploy/raspberry/README.md` indica arranque manual con `docker compose --env-file .env.prod -f docker-compose.prod.yml --profile cloudflare up -d --build`.
- `deploy/raspberry/docker-compose.prod.yml` define `build` local desde `../../saloria-api`, lo que implica que la imagen se reconstruye **cuando alguien ejecuta compose con build en la Raspberry**.
- `docs/07-infraestructura.md` dice que "la producción despliega automáticamente desde `main`", pero en el mismo documento aclara que **no hay workflows versionados en `.github/workflows`**.
- En el repo no existe `.github/workflows/` ni configuracion de Watchtower, cron, systemd o webhook para la Raspberry.
- `render.yaml` con `autoDeploy: true` aplica al camino alternativo de Render, no al host Raspberry.

## Recommendation
La lectura mas fiel del repo es esta:

1. **Frontend**: si esta conectado a Vercel, si puede redeployarse automaticamente desde `main`.
2. **Backend en Raspberry**: **no se redeploya solo** por hacer push a `main`, salvo que hayas montado fuera de este repo algun mecanismo adicional en la propia Raspberry o en GitHub.
3. El comando actual de produccion en Raspberry requiere una accion explicita tipo `git pull` + `docker compose ... up -d --build` o equivalente automatizado.
