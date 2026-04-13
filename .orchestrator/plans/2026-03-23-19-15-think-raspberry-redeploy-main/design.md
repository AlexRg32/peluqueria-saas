# Design: Clarificacion del flujo de deploy Raspberry

## Architecture Overview
El flujo activo separa claramente dos rutas:

- **Vercel** observa el repositorio y despliega el frontend.
- **Raspberry Pi** ejecuta el backend como contenedor Docker construido localmente desde el codigo que exista en el host.

El enlace que falta para tener CI/CD real en la Raspberry es uno de estos:

1. GitHub Action que haga SSH al host y ejecute pull + rebuild.
2. Webhook/daemon en la Raspberry que observe cambios y relance Compose.
3. Pull manual operativo en cada release.

## Deployment Model
| Piece | Current behavior | Trigger |
|------|------------------|---------|
| Frontend Vercel | Auto deploy probable | Push a `main` |
| Backend Raspberry | Rebuild local con Docker Compose | Ejecucion manual o automatizacion externa |
| Render legacy | Auto deploy definido en `render.yaml` | Push a `main` si Render estuviera activo |

## Reusable Existing Pieces
- `deploy/raspberry/docker-compose.prod.yml` ya contiene el build correcto del backend.
- `deploy/raspberry/scripts/healthcheck.sh` sirve para validar el despliegue tras el redeploy.
- `docs/07-infraestructura.md` y `DEPLOYMENT.md` ya documentan el modelo `main-only`, aunque necesitan alinearse con la realidad operativa de la Raspberry.

## Gaps
- No existe trigger versionado entre GitHub y Raspberry.
- No existe script versionado de update operacional (`pull`, `build`, `restart`, `healthcheck`).
- La documentacion mezcla una expectativa de "auto" deploy con una operativa manual para la Raspberry.

## Testing Strategy
- Verificacion documental: comprobar ausencia de `.github/workflows`.
- Verificacion operativa futura: tras automatizar, confirmar con logs del runner/host y con `./scripts/healthcheck.sh`.
