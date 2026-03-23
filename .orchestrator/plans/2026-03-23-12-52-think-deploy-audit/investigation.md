# Investigation: Deployment Audit

## Summary
Analisis del estado real de despliegue de Saloria cruzando documentacion, ramas Git, Vercel, Supabase, endpoints publicos y host Raspberry. El objetivo es identificar que esta activo ahora mismo, que parte de la migracion de marca e infraestructura sigue a medias y si existe algo pendiente con impacto operativo.

## Current State
- **Tech Stack**: Monorepo con frontend Vite/React y backend Spring Boot, mas despliegues en Vercel, Render, Supabase y una Raspberry con Docker Compose + Cloudflare Tunnel.
- **Relevant Code**: `README.md`, `DEPLOYMENT.md`, `docs/07-infraestructura.md`, `render.yaml`, `deploy/raspberry/docker-compose.prod.yml`, `deploy/raspberry/.env.prod.example`, `saloria-api/src/main/resources/application.properties`, `saloria-api/src/main/java/com/saloria/config/SecurityConfig.java`, `saloria-client/.env.production`.
- **Architecture**: Produccion real frontend en Vercel y backend publico en `https://api.alexrg.es` entrando por Cloudflare Tunnel hacia la Raspberry. Render queda como soporte legacy/parcial, con staging vivo y produccion suspendida por el usuario.

## Requirements
### Functional
- [x] Identificar que frontend publico esta sirviendo ahora mismo
- [x] Identificar que backend sirve produccion y staging
- [x] Validar si la base de datos activa sigue en Supabase
- [x] Detectar desalineaciones entre repo, ramas y plataformas
- [x] Enumerar pendientes reales y no solo deuda cosmetica

### Non-Functional
- Performance: evitar cold start en produccion usando Raspberry en lugar de Render free
- Security: mantener previews protegidas, JWT y CORS coherentes con Vercel y dominio publico
- Operability: minimizar configuracion manual divergente entre Git, Vercel, Render y Raspberry

## Scope
### In Scope
- Estado publico de URLs productivas y de staging
- Estado de ramas `main`, `staging` y rama local de rebrand
- Configuracion desplegable versionada
- Estado operativo del host Raspberry y del tunnel Cloudflare

### Out of Scope
- Cambios de codigo
- Rotacion de secretos
- Reconfiguracion manual en dashboards
- Auditoria funcional completa de la aplicacion

## Findings
1. **Produccion frontend activa**: `https://saloria.vercel.app` responde `200` y su bundle contiene `https://api.alexrg.es`.
2. **Produccion backend real**: `https://api.alexrg.es` responde `401` JSON de Spring Security, lo que confirma app viva detras de Cloudflare.
3. **Raspberry operativa**: contenedores `peluqueria_api` y `peluqueria_cloudflared` llevan 17-18 horas arriba y los logs muestran trafico real.
4. **Render prod ya no es la ruta activa**: `https://peluqueria-saas-prod-fra.onrender.com` responde `503` con `x-render-routing: suspend-by-user`.
5. **Render staging sigue activo**: `https://peluqueria-saas-staging-fra.onrender.com` responde `401`, o sea, servicio vivo.
6. **Supabase activo**: el proyecto `peluqueria-saas` (`xwnumlcqnrwhgpbrldhf`) esta `ACTIVE_HEALTHY`.
7. **Migracion de marca incompleta**: la marca publica ya es Saloria, pero Vercel, Render, Supabase, Raspberry y parte del frontend desplegado siguen usando slugs legacy `peluqueria-*`.
8. **Desfase repo vs despliegue**: el arbol local esta en rebrand fuerte (`saloria-api`, `saloria-client`) con muchos cambios sin publicar, mientras `main` y `origin/staging` remotos siguen con `peluqueria-api` y `peluqueria-client`.
9. **Desfase Git/Vercel**: `main` remoto esta en `6d65859`, pero `origin/staging` va 7 commits por delante. El proyecto Vercel `saloria` tiene deployment `production` creado desde `githubCommitRef=staging`, no desde `main`.
10. **Deriva de configuracion**: el `render.yaml` local ya apunta a repo/nombres `saloria-*`, pero `main` y `origin/staging` siguen versionando `peluqueria-saas-*`.

## Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Produccion Vercel ligada a `staging` en vez de `main` | Alto: se puede publicar en produccion algo no promocionado formalmente | Reasignar rama de produccion en Vercel o unificar proyectos |
| Rebrand local no publicado y despliegue en legacy paths | Medio: confusion operativa, fallos al aplicar IaC o docs incorrectas | Cerrar migracion de nombres en una promocion controlada |
| Render prod suspendido pero aun documentado como backend de produccion en varios puntos | Medio: rollback/documentacion engañosa | Actualizar docs y runbooks para dejar claro que prod backend es Raspberry |
| Multiples proyectos Vercel y aliases cruzados | Medio: errores humanos al desplegar o leer previews | Consolidar proyecto productivo y proyecto staging |
| Infra manual divergente respecto a `render.yaml` | Medio: IaC no representa el estado real | Elegir si Render queda como staging solamente o volver a gestionarlo via blueprint |

## Recommendation
La aplicacion no parece tener una urgencia de caida ahora mismo: produccion esta viva sobre Raspberry + Cloudflare + Supabase. Lo pendiente principal no es rescatar el servicio, sino **cerrar la migracion operativa**: alinear Vercel con el flujo `staging -> main`, decidir el rol definitivo de Render y terminar el rebrand de slugs/nombres para que Git, IaC, dashboards y docs vuelvan a decir lo mismo.
