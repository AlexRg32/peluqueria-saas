# Design: staging-branch-review

## Architecture Overview
> Simplificar de un modelo `feature -> staging -> main` a un modelo `feature -> main` con validacion previa apoyada en previews y checks, evitando una rama de integracion intermedia que ahora mismo esta parcialmente desalineada.

## Operational Design
| Area | Current | Suggested |
|------|---------|-----------|
| Rama estable | `main` | `main` |
| Rama de preproduccion | `staging` | Eliminar si no hay QA manual real |
| Validacion previa | Merge a `staging` + deploy dedicado | Preview deploys por branch + chequeos + merge a `main` |
| Automatizacion local | `/ship` a `staging`, `/promote` a `main` | `/pr` o `/ship` adaptado a `main` |

## Dependencies
- Reconfigurar `render.yaml` y servicios asociados si se elimina `staging`.
- Actualizar `.agent/MANUAL.md`, `.agent/workflows/*.md`, `AGENTS.md` y `docs/07-infraestructura.md`.
- Revisar rama por defecto del remoto (`origin/HEAD` apunta a `origin/staging`).

## Testing Strategy
- Verificar que previews de frontend y backend cubren la validacion que antes caia en `staging`.
- Verificar que `main` despliega correctamente tras retirar la rama intermedia.
- Verificar que el flujo de agentes no intenta crear ramas desde `staging`.
