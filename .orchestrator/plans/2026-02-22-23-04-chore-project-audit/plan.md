# Plan: Project Audit & Architectural Refactor
>
> Goal: Fix testing environment, standardize frontend architecture, and implement automated multi-tenancy.

## Foundation & Fixes

- [ ] **Task 1: Fix Backend Test Environment** — `peluqueria-api/pom.xml`
  - What: Update Mockito and ByteBuddy versions or suggest Java 17 environment fix.
  - Verify: `./mvnw clean test` passes for at least one existing test.

- [ ] **Task 2: Finish Swagger Task 6** — `peluqueria-api`
  - What: Ensure all Swagger-annotated controllers compile and their tests pass.
  - Verify: Swagger UI is accessible and shows all 9 controllers.

## Core Refactors

- [ ] **Task 3: Automated Multi-Tenancy Foundation** — `peluqueria-api`
  - What: Implement `TenantContext`, `TenantFilter`, and `@FilterDef` in `BaseEntity`.
  - Verify: Create a test that proves data leak is prevented without manual `where` clause.

- [ ] **Task 4: Frontend Feature Migration: Appointments** — `peluqueria-client`
  - What: Move `CalendarPage.tsx` and related logic to `src/features/appointments`.
  - Verify: App still runs and calendar works as expected.

- [ ] **Task 5: Frontend Feature Migration: Enterprises** — `peluqueria-client`
  - What: Move `Enterprises.tsx` to `src/features/enterprises`.
  - Verify: Admin can still manage enterprises.

## Integration & Polish

- [ ] **Task 6: DTO Mapping with MapStruct** — `peluqueria-api/pom.xml`
  - What: Add MapStruct dependency and create first mapper for `Appointment`.
  - Verify: Replace manual mapping in `AppointmentService` with mapper.

- [ ] **Task 7: Global Refactor Summary** — `docs/`
  - What: Update `03-arquitectura-tecnica.md` and `05-frontend.md` to reflect new patterns.
  - Verify: Docs match reality.
