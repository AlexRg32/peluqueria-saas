# Plan: Adapt Agent to Peluqueria SaaS

> WARNING: This plan is strictly theoretical. No source code files have been modified.

> Goal: Adapt the `.agent` configuration folder for the new "Peluqueria SaaS" project.
> Architecture: The `.agent` framework fits seamlessly into the existing multi-tenant architecture of Peluqueria SaaS. By establishing context in `project-domain.md`, the AI agents (@backend, @frontend, @architect) will inherently understand that every task must preserve tenant data isolation ("Empresa" concept) and the established layered architecture (DTOs -> Controllers -> Services -> Repositories).

## Foundation

- [x] **Task 1: Inject `.agent` folder** — `.agent/`
  - What: Copy the global `.agent` template folder from the user's desktop into `peluqueria-saas`.
  - Verify: folder exists in project root.

- [x] **Task 2: Define Project Concept** — `.agent/contexts/project-domain.md`
  - What: Document the core entities (`Empresa`, `Usuario`, `Cita`, `Servicio`) and strict Multi-tenant rules.
  - Verify: Information reflects `docs/01-vision-general.md`.

## Integration & Polish

- [x] **Task 3: Verify Global Rules** — `.agent/rules/global.md`
  - What: Confirm that the existing tech-stack rules map correctly to the standard `peluqueria-saas` backend and frontend (Java + Spring Boot + React + Tailwind).
  - Verify: Rules list Spring Boot + React + Layered Architecture correctly without conflicting with Peluqueria's requirements.
