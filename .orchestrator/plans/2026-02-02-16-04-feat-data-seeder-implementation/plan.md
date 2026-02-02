# Plan: Bulk Data Seeder Implementation

## Phase 1: Preparation

- [x] Add `datafaker` dependency to `pom.xml`.
- [x] Run `./mvnw dependency:resolve` to ensure it settles.

## Phase 2: Implementation

- [x] Create `BulkDataSeeder.java` in `com.peluqueria.config`.
- [x] Implement service generation logic.
- [x] Implement employee generation logic.
- [x] Implement customer generation logic.
- [x] Implement appointment generation logic.

## Phase 3: Verification

- [x] Restart backend with `SEED_BULK=true`.
- [x] Check console logs for seeding progress.
- [x] Refresh frontend to see updated data (Calendar, Customers, Employees).

## Tasks

- [x] Task 1: Add dependency to `pom.xml`
- [x] Task 2: Implement `BulkDataSeeder.java`
- [x] Task 3: Test and verify
