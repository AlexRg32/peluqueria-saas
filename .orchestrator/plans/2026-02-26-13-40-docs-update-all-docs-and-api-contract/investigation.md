# Investigation: Documentation and API Contract Update

## Summary
>
> The user wants a complete review of the project to update the existing documentation according to its current state, additionally adding an `api-contract.md` file that specifies all the well-documented endpoints.

## Current State

- **Tech Stack**: Java 17, Spring Boot 3, Maven, PostgreSQL 15, React 18, Vite, TypeScript, Tailwind CSS, Docker.
- **Relevant Code**: `docs/` folder, `peluqueria-api/src/.../controller` (for API contracts).
- **Architecture**: Layered Monolith (Backend) + Feature-based SPA (Frontend).

## Requirements

### Functional

- [x] Analyze all controllers and endpoints.
- [x] Create an API contract file (`docs/10-api-contract.md`).
- [x] Review and update all files in `docs/` based on backend implementation if discrepancies are found (e.g., new endpoints, features, infrastructure updates).

### Non-Functional

- Documentation readability and format consistency.

## Scope

### In Scope

- Creating `docs/10-api-contract.md`.
- Updating all existing `docs/*.md` files based on the latest codebase state.

### Out of Scope

- Code changes in Backend or Frontend.

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Missing undocumented endpoints | Medium | Used regex to scan all mappings in controllers explicitly. |

## Recommendation
>
> Proceed to Design phase to draft the structure of `10-api-contract.md` and outline the necessary modifications for the current `docs/` files.
