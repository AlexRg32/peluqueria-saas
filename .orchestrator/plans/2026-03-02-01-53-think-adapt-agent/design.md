# Design: Adapt Agent to Peluqueria SaaS

## Architecture Overview

The `.agent` framework fits seamlessly into the existing multi-tenant architecture of Peluqueria SaaS. By establishing context in `project-domain.md`, the AI agents (@backend, @frontend, @architect) will inherently understand that every task must preserve tenant data isolation ("Empresa" concept) and the established layered architecture (DTOs -> Controllers -> Services -> Repositories).

## Data Model (Context mapping)

| Entity | Key Fields | Relationships |
|--------|------------|---------------|
| Empresa | id, nombre | 1:N with Usuario, Servicio, Cita |
| Usuario | id, rol (ADMIN, EMPLEADO, CLIENTE), empresa_id | N:1 with Empresa, 1:N with Cita (as Empleado or Cliente) |
| Servicio | id, nombre, duracion, empresa_id | N:1 with Empresa, 1:N with Cita |
| Cita | id, fecha, usuario_id (cliente), empleado_id, servicio_id | N:1 with all |

## File Structure

```text
.agent/
├── MANUAL.md
├── agents/
│   ├── architect.md
│   ├── backend.md
│   ├── doc-planner.md
│   └── frontend.md
├── contexts/
│   ├── development.md
│   ├── project-domain.md  <-- Modified to contain Saas Rules
│   ├── research.md
│   └── review.md
├── hooks/
│   ├── post-tool.md
│   └── pre-tool.md
├── rules/
│   ├── global.md          <-- Validated for Spring Boot + React
│   └── secure-delivery.md
├── skills/
│   └── [Multiple Agent Skills]
└── workflows/
    ├── audit.md
    ├── forge.md
    ├── pr.md
    ├── ship.md
    └── think.md
```

## Testing Strategy

- **Unit**: Verify `project-domain.md` context when subagents create Java/React components.
- **Integration**: Subagents must test endpoints considering the context of `Empresa` authentication (JWT).
