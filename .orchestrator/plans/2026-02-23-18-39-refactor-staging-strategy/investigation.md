# Investigation: Staging Strategy implementation

## Summary

The project is moving to a two-environment strategy: `staging` and `production`. `staging` will be the default branch for new features and bug fixes. Production deployments will only happen from the `main` branch. This requires updating the `forge` and `ship` workflows, as well as the infrastructure documentation.

## Current State

- **Tech Stack**: Spring Boot (Backend), React (Frontend), PostgreSQL (Supabase for Prod, Render for Staging).
- **Relevant Code**: `.agent/workflows/forge.md`, `.agent/workflows/ship.md`, `docs/07-infraestructura.md`.
- **Architecture**: Layered Monolith with separate frontend/backend deployments.

## Requirements

### Functional

- [x] Update `forge` workflow to branch off `staging`.
- [x] Update `ship` workflow to merge into `staging`.
- [x] Update `docs/07-infraestructura.md` with environment details.
- [ ] (Optional) Add a workflow for promoting `staging` to `main` (Production release).

### Non-Functional

- Maintain consistency across all automation tools.
- Ensure documentation matches reality.

## Scope

### In Scope

- Workflow updates (`forge`, `ship`).
- Infrastructure documentation (`docs/07-infraestructura.md`).
- Vision documentation (`docs/01-vision-general.md`).

### Out of Scope

- Actually creating the `staging` branch (user says they already have it, but I should verify).
- Setting up Render/Vercel pipelines (user already has them).

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Branch `staging` missing | Build failure | Verify existence of `staging` branch. |
| Confusion between DBs | Data loss in Prod | Clear documentation and environment variables. |

## Recommendation

Update all workflows to point to `staging`. Create a new documentation section for "Environment Promotion" explaining how to move changes from `staging` to `main`.
