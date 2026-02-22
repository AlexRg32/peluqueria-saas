# Investigation: JPA Global Auditing

## Summary
>
> We are implementing JPA Global Auditing to automatically track "Who modified what" and "When it was modified" for all major entities in the system. This provides a transparent and reliable audit trail, improving accountability, security, and traceability without polluting the business logic.

## Current State

- **Tech Stack**: Java 17, Spring Boot 3, Spring Data JPA, Flyway.
- **Relevant Code**:
  - `src/main/resources/db/migration` (Need to add SQL migration for new schema changes: `created_at`, `updated_at`, `created_by`, `updated_by`).
  - `com.peluqueria.model.*` (All existing entities like `AppUser`, `Enterprise`, `Appointment`, etc., need to inherit audit properties).
  - `com.peluqueria.config.*` (Need new `JpaAuditingConfig` for `@EnableJpaAuditing` and `AuditorAware` bean).
- **Architecture**: Layered architecture. The database schema is strictly validated (`ddl-auto=validate`) and manually versioned via Flyway.

## Requirements

### Functional

- [x] Auto-populate `created_at` and `updated_at` on entity insert/update.
- [x] Auto-populate `created_by` and `updated_by` based on the authenticated user from Spring Security context.
- [x] Apply this across core entities (AppUser, Enterprise, Appointment, ServiceOffering, Customer, WorkingHours).

### Non-Functional

- Performance: Must use Spring Data JPA `@EntityListeners` for low-overhead auditing.
- Security: User identifier for `created_by`/`updated_by` should reliably fallback or handle unauthenticated inserts (e.g., during registration).

## Scope

### In Scope

- Creating an `@MappedSuperclass` `AuditableEntity`.
- Implementing `AuditorAware` to extract current user.
- Updating existing entities to extend `AuditableEntity`.
- Creating `V2__add_audit_columns.sql` to backfill existing tables with audit columns.

### Out of Scope

- Creating history/versioning tables (like Envers). We only need "who created" and "who last updated".

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Unauthenticated actions throw errors | High | Ensure `AuditorAware` checks for null contexts and anonymous users, returning "SYSTEM" or "anonymousUser" if no logged-in user exists. |
| DB connection/Flyway failure | Medium | Add the new columns with `NULL` allowed initially, or provide default values if `NOT NULL` is strictly required. |

## Recommendation
>
> 1. Create `AuditableEntity` with `@CreatedDate`, `@LastModifiedDate`, `@CreatedBy`, `@LastModifiedBy`.
> 2. Create `JpaAuditingConfig` with `AuditorAware` reading `SecurityContextHolder.getContext().getAuthentication().getName()`.
> 3. Update all entities in `model/` package to extend `AuditableEntity`.
> 4. Add a Flyway migration `V2__add_audit_columns.sql` to alter the database schema.
