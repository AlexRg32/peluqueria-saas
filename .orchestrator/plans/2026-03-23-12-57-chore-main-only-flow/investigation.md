# Investigation: Main-Only Flow

## Summary
El repositorio y las guias internas seguian asumiendo un modelo `staging -> main`, pero la infraestructura real ya estaba parcialmente migrada y el usuario ha pedido eliminar `staging` por completo. La tarea consiste en convertir configuracion, documentacion y workflows a un modelo `main-only`, y dejar preparada la limpieza remota de la rama y recursos asociados.

## Current State
- **Tech Stack**: Monorepo Spring Boot + React/Vite con docs en `docs/` y flujos en `.agent/`.
- **Relevant Code**: `AGENTS.md`, `.agent/MANUAL.md`, `.agent/workflows/*.md`, `docs/01-vision-general.md`, `docs/07-infraestructura.md`, `DEPLOYMENT.md`, `render.yaml`.
- **Architecture**: la produccion activa ya funciona como un único camino principal, pero repo y manuales seguian documentando un staging dedicado.

## Requirements
### Functional
- [x] Eliminar `staging` de la documentacion y guias operativas versionadas
- [x] Adaptar `/forge`, `/ship` y `/pr` a un modelo `main-only`
- [x] Quitar el servicio `staging` de `render.yaml`
- [ ] Borrar la rama `staging` local y remota si no bloquea el trabajo actual

### Non-Functional
- Seguridad: no hacer pushes destructivos ciegos sobre una rama remota sin comprobar el estado actual
- Operabilidad: que repo, docs e IaC describan la misma realidad

## Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Borrar `staging` remota cuando todavia referencia trabajo no integrado | Alto | Comprobar ahead/behind antes de borrar y explicitar el resultado |
| Dejar guias internas inconsistentes | Medio | Actualizar de una pasada manuales, workflows y docs de infraestructura |
| Mantener recursos externos de staging sin API de borrado | Bajo | Dejar constancia de lo que no se puede borrar desde este turno |

## Recommendation
Primero unificar todo el repo a `main-only`. Despues, borrar la rama `staging` local/remota si Git confirma que no aporta commits que no esten en `main`. Los recursos externos sin capacidad de borrado via MCP se dejan identificados para limpieza manual posterior.
