# Plan: Stabilization
>
> Goal: Fix Lombok warnings, backend test failures, and frontend test timeouts.
> Architecture: Layered Monolith Maintenance.

## Foundation

- [x] **Task 1: Fix Lombok Warning** — `peluqueria-api/src/main/java/com/peluqueria/model/ServiceOffering.java`
  - What: Add `@Builder.Default` to the `deleted` field.
  - Verify: Run `./mvnw compile` and check for the "ignoring initializing expression" warning.

- [x] **Task 2: Fix Backend Test Configuration** — `peluqueria-api/pom.xml`
  - What: Ensure Mockito can mock classes in current Java environment.
  - Verify: Run `./mvnw test` and confirm `EnterpriseServiceTest` (and others) pass.

## Core

- [x] **Task 3: Fix Frontend Test Timeout** — `peluqueria-client/src/pages/AppointmentHistoryPage.test.tsx`
  - What: Refactor test to ensure the loading state transitions correctly to the data state.
  - Verify: Run `npm run test` and check that `AppointmentHistoryPage.test.tsx` passes.

## Integration & Polish

- [x] **Task 4: Final Verification** — Project Roots
: Run full builds of both projects.
  - Verify: Both build successfully without errors.
