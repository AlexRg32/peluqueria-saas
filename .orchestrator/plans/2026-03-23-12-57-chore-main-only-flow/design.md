# Design: Main-Only Delivery

## Architecture Overview
El repositorio pasa a soportar un unico flujo de integracion:

- ramas de trabajo creadas desde `main`
- `/forge` y manuales internos asumen `main` como base
- `/ship` hace squash merge hacia `main`
- no existe `/promote`
- la documentacion de infraestructura describe solo produccion activa

## File Structure
```text
AGENTS.md
.agent/MANUAL.md
.agent/workflows/forge.md
.agent/workflows/ship.md
.agent/workflows/pr.md
.agent/workflows/promote.md   # eliminado
.agent/contexts/project-domain.md
DEPLOYMENT.md
docs/01-vision-general.md
docs/07-infraestructura.md
render.yaml
```

## Testing Strategy
- Verificar por `rg` que no queden referencias operativas a `staging`
- Revisar `render.yaml` para confirmar que solo queda `main`
- Comprobar el estado de la rama `staging` antes de borrarla
