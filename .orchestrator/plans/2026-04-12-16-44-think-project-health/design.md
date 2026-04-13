# Design: Project Health Response

## Architecture Overview
El diagnostico confirma una arquitectura de despliegue partida:
- **Frontend**: Vercel, estable y desplegando desde `main`
- **Backend**: Raspberry Pi, dependiente de runner self-hosted + GHCR + Cloudflare Tunnel
- **Storage/DB**: Supabase / filesystem o Supabase Storage segun entorno

El punto debil actual no es el codigo del repo, sino la cadena operativa del backend:
`GitHub Actions -> runner self-hosted -> redeploy.sh -> docker compose -> healthcheck publico`

## Operational Failure Map
| Segmento | Estado actual | Evidencia |
|--------|---------------|-----------|
| Git local vs remoto | Sano | `origin/main...HEAD = 0 0` |
| Calidad local frontend | Sana con deuda | tests/build/lint OK, warning por chunk grande |
| Calidad local backend | Sana con warnings | tests OK |
| Deploy frontend | Sano | ultimo deployment Vercel `READY`, `saloria.vercel.app` responde `200` |
| Deploy backend | Roto o inaccesible | API publica devuelve `530`, workflow pierde comunicacion con runner |

## Failure Hypotheses
1. El runner de GitHub Actions en la Raspberry no esta estable o deja de comunicarse durante el redeploy.
2. El contenedor o el host pueden arrancar, pero Cloudflare Tunnel no resuelve correctamente el origen, produciendo `1033`.
3. El healthcheck publico en `redeploy.sh` depende de una URL externa; si el tunnel o DNS fallan, el deploy puede marcarse mal incluso con la app arrancada localmente.

## Suggested File Focus
```text
deploy/raspberry/scripts/redeploy.sh
deploy/raspberry/scripts/healthcheck.sh
.github/workflows/deploy-raspberry.yml
deploy/raspberry/docker-compose.prod.yml
docs/07-infraestructura.md
.gitignore
```

## Testing Strategy
- **Infra verification**:
  - comprobar runner online
  - comprobar `docker ps` y logs en Raspberry
  - probar `curl localhost:8080/api/public/enterprises` desde la Raspberry
  - probar tunnel / hostname publico
- **Repo hygiene**:
  - decidir que va a git y que debe ignorarse
- **Frontend performance**:
  - medir y partir bundle principal antes de seguir cargando nuevas features
