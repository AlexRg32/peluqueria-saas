# Investigation: Raspberry API Autostart

## Summary
Analisis read-only para determinar si la API desplegada en Raspberry Pi requiere arranque manual tras un apagado completo del host.

## Current State
- **Tech Stack**: Monorepo con backend Spring Boot, frontend React/Vite y despliegue productivo del backend en Raspberry con Docker Compose.
- **Relevant Code**: `deploy/raspberry/docker-compose.prod.yml`, `deploy/raspberry/scripts/bootstrap-host.sh`, `deploy/raspberry/scripts/redeploy.sh`, `.github/workflows/deploy-raspberry.yml`, `deploy/raspberry/README.md`, `docs/07-infraestructura.md`.
- **Architecture**: La Raspberry ejecuta la API como contenedor Docker, normalmente junto con `cloudflared` o `caddy`, y el despliegue se rehace con `redeploy.sh`.

## Requirements
### Functional
- [x] Determinar si la API se reinicia sola tras volver la corriente.
- [x] Identificar de que componente depende ese autorearranque.

### Non-Functional
- Disponibilidad: el backend debe recuperarse tras reinicio del host sin intervencion manual idealmente.
- Operacion: el procedimiento debe ser simple de verificar por SSH.

## Scope
### In Scope
- Politica de reinicio de contenedores.
- Mecanismo de despliegue inicial.
- Dependencia del servicio Docker al arrancar el host.

### Out of Scope
- Cambios en configuracion del host.
- Migraciones de base de datos.
- Ajustes del frontend en Vercel.

## Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Docker no arranca automaticamente al boot | La API no vuelve tras un corte | Verificar `systemctl is-enabled docker && systemctl is-active docker` |
| Nunca se ha ejecutado `redeploy.sh` con exito | No existen contenedores persistidos para reiniciar | Hacer un despliegue inicial manual una vez |
| El contenedor fue parado manualmente con estado persistido de stopped | `unless-stopped` puede no relanzarlo | Relanzar con `redeploy.sh` o `docker compose up -d` |

## Recommendation
Con la configuracion actual, la API esta pensada para volver automaticamente tras reiniciar la Raspberry porque los servicios usan `restart: unless-stopped`. La unica condicion externa es que Docker tambien arranque al iniciar el sistema, algo no explicitado en el repo pero normalmente esperado tras instalar Docker en Debian.
