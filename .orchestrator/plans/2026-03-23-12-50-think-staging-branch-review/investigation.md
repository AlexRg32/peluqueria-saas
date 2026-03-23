# Investigation: staging-branch-review

## Summary
> Analisis read-only para decidir si la rama `staging` sigue aportando valor operativo o si conviene eliminarla y simplificar el flujo a `feature -> main`.

## Current State
- **Tech Stack**: Monorepo con backend Spring Boot (`saloria-api`), frontend React/Vite (`saloria-client`), despliegue en Render y Vercel.
- **Relevant Code**: `render.yaml`, `.agent/MANUAL.md`, `.agent/workflows/forge.md`, `.agent/workflows/ship.md`, `.agent/workflows/promote.md`, `AGENTS.md`, `docs/07-infraestructura.md`.
- **Architecture**: Flujo de integracion basado en dos ramas (`staging` y `main`) con promocion manual entre ambas.

## Requirements
### Functional
- [x] Determinar si `staging` protege realmente produccion.
- [x] Detectar acoplamientos reales del repo con `staging`.
- [x] Evaluar el estado actual de divergencia entre `main` y `staging`.

### Non-Functional
- Operacion: Reducir friccion en ramas, merges y despliegues.
- Riesgo: No romper despliegues automáticos ni validacion previa a produccion.

## Scope
### In Scope
- Configuracion Git y flujo de ramas.
- Infraestructura versionada en el repo.
- Documentacion y automatizaciones `.agent`.

### Out of Scope
- Cambios en GitHub, Vercel o Render.
- Reescritura de workflows o migracion de pipelines.

## Evidence
- `render.yaml` define dos servicios Render distintos: `main` para produccion y `staging` para preproduccion.
- `docs/07-infraestructura.md` describe `staging` como entorno real activo en Vercel/Render.
- `.agent` usa `staging` como rama base de trabajo, destino de `/ship` y origen de `/promote`.
- El repositorio local muestra `staging` en `6764a8f` y `main` en `6d65859`; `git rev-list --left-right --count main...staging` devuelve `5 0`, es decir, `staging` no contiene trabajo funcional que no este ya en `main`.
- En remoto, `git rev-list --left-right --count origin/main...origin/staging` devuelve `0 2`; la diferencia visible es minima (`README.md`) y un merge commit, no una validacion de preproduccion especialmente valiosa.

## Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Eliminar `staging` sin reconfigurar Render/Vercel | Alto | Migrar primero despliegues y ramas por defecto |
| Mantener `staging` sin disciplina clara | Medio | Se acumula ruido de merges y confusion entre ramas |
| Pasar a `main` sin gate alternativo | Alto | Produccion recibe cambios sin colchón de validacion |

## Recommendation
> La rama `staging` hoy parece aportar mas coste operativo que valor real dentro del repositorio, pero no conviene borrarla "en seco" porque todavia esta conectada a despliegues y a toda la automatizacion `.agent`. La mejor decision es: **si quieres simplificar, haz una retirada controlada de `staging` y sustituye su funcion por previews/feature branches + `main` como unica rama estable**. Si no vas a mantener una validacion real separada, entonces si, compensa fumarsela.
