# Plan: JPA Global Auditing
>
> Goal: We are implementing JPA Global Auditing to automatically track "Who modified what" and "When it was modified" for all major entities in the system.
> Architecture: Introduces a Base Entity class to automatically track creation and modification timestamps and auditing users.

## Foundation

- [x] **Task 1: Create AuditableEntity** — `src/main/java/com/peluqueria/model/AuditableEntity.java`
  - What: Create `@MappedSuperclass` with four properties (`createdAt`, `updatedAt`, `createdBy`, `updatedBy`) using `@CreatedDate`, `@LastModifiedDate`, `@CreatedBy`, `@LastModifiedBy`.
  - Verify: File exists and compiles without syntax errors.

- [x] **Task 2: Create JpaAuditingConfig** — `src/main/java/com/peluqueria/config/JpaAuditingConfig.java`
  - What: Add configuration class with `@EnableJpaAuditing` and define `AuditorAware<String>` bean fetching the username from `SecurityContextHolder`. Fallback to `"SYSTEM"` if unauthenticated.
  - Verify: Configuration is scanned correctly (spring context boots).

## Core

- [x] **Task 3: Apply AuditableEntity to Entities** — `AppUser`, `Enterprise`, `Appointment`, `Customer`, `ServiceOffering`, `WorkingHours` in `src/main/java/com/peluqueria/model/`
  - What: Make these classes `extend AuditableEntity`. Make sure to import it nicely. Ensure no field names conflict.
  - Verify: The project builds successfully with these inheritance changes.

## Integration & Polish

- [x] **Task 4: Add DB Migration Script** — `src/main/resources/db/migration/V2__add_audit_columns.sql`
  - What: Add `created_at` (TIMESTAMP), `updated_at` (TIMESTAMP), `created_by` (VARCHAR), and `updated_by` (VARCHAR) to tables `app_users`, `enterprises`, `appointments`, `customers`, `service_offerings`, `working_hours`. Use `TIMESTAMP WITHOUT TIME ZONE` equivalent.
  - Verify: Run `mvn test` to ensure Flyway validates schema completely.
