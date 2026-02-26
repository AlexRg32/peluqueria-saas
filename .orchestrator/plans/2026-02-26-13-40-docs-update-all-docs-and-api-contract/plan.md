# Plan: Documentation and API Contract Update
>
> Goal: The user wants a complete review of the project to update the existing documentation according to its current state, additionally adding an `api-contract.md` file.
> Architecture: Documentation updates

## Foundation

- [x] **Task 1: Generate API Contract Document** — `docs/10-api-contract.md`
  - What: Document all endpoints (Auth, Appointments, Customers, Dashboard, Enterprise, Public, Services, Users, WorkingHours) in detail.
  - Verify: Check that `docs/10-api-contract.md` contains all the sections and endpoints mapped in the investigation phase.

## Core

- [x] **Task 2: Update Index and Backend Docs** — `docs/00-index.md`, `docs/04-backend.md`
  - What: Link the new contract file correctly in the main index, and refactor `04-backend.md` to reference the contract directly rather than repeating endpoints inline.
  - Verify: Files are updated and links are valid.

## Integration & Polish

- [x] **Task 3: Refine Infrastructure and DB Docs** — `docs/06-base-de-datos.md`, `docs/07-infraestructura.md`
  - What: Minor updates to ensure all entities are correctly listed and environment variables are exactly what the backend uses right now.
  - Verify: Validate that variables like `PORT`, `CORS_ALLOWED_ORIGINS` etc., match the spring boot standard.
