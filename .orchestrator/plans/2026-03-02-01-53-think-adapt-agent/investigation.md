# Investigation: Adapt Agent to Peluqueria SaaS

## Summary

The goal is to adapt the `.agent` configuration folder for the new "Peluqueria SaaS" project. The user had previous agent configurations (e.g., from an E-Commerce or Autoescuela project) and requested to contextualize the AI agents' logic for this specific B2B2C beauty salon management system.

## Current State

- **Tech Stack**: Java 17, Spring Boot 3, PostgreSQL 15, React 18 (Vite), Tailwind CSS.
- **Relevant Code**: `.agent` directory, primarily `contexts/project-domain.md` and `rules/global.md`. The project's source of truth is the `docs/` directory.
- **Architecture**: Monolithic backend with Layered Architecture (`Controller -> Service -> Repository`) and Multi-Tenant database schema. Frontend uses React + Tailwind.

## Requirements

### Functional

- [x] Inject `.agent` folder into the `peluqueria-saas` project.
- [x] Update `contexts/project-domain.md` with the core entities (Empresa, Usuario, Servicio, Cita).
- [x] Define multi-tenancy business rules and scheduling constraints for the AI agents.
- [x] Verify that `rules/global.md` and `MANUAL.md` match the Spring Boot + React stack.

### Non-Functional

- Maintain standard `.agent` behaviors and workflows (`/forge`, `/think`, `/ship`).

## Scope

### In Scope

- Copying the `.agent` folder from the user's base agent template.
- Modifying `contexts/project-domain.md` to establish the SaaS domain.
- Validating the tech stack definitions in the rules.

### Out of Scope

- Modifying any application source code (`peluqueria-api/` or `peluqueria-client/`).

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Agents generate generic code | High | Strongly define the multi-tenant architecture and entities in `project-domain.md`. |
| Tech stack mismatch | Medium | Review `global.md` to ensure it enforces DTO usage and Spring Boot layered architecture. |

## Recommendation

The `.agent` setup fits perfectly. The `project-domain.md` has been rewritten using the information from `docs/01-vision-general.md` and `docs/02-guia-usuario.md` to ensure all subsequent AI generations correctly implement features with Multi-Tenant constraints and role-based access.
