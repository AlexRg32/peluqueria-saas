# Investigation: Flyway Integration

## Summary
>
> Integrate Flyway into the Spring Boot backend to manage database migrations, changing the highly risky `spring.jpa.hibernate.ddl-auto=update` to `validate`. This ensures structural integrity of the database schema for the SaaS application, moving away from automatic unversioned updates.

## Current State

- **Tech Stack**: Java 17, Spring Boot 3, PostgreSQL, Maven.
- **Relevant Code**: `peluqueria-api/pom.xml`, `peluqueria-api/src/main/resources/application.properties`, and a new directory `peluqueria-api/src/main/resources/db/migration`.
- **Architecture**: Layered Monolith with JPA Entities acting as the data source of truth.

## Requirements

### Functional

- [x] Add `flyway-core` and `flyway-database-postgresql` (if needed for Spring Boot 3/Flyway 9+) dependency in `pom.xml`.
- [x] Configure Flyway in `application.properties`.
- [x] Set `spring.jpa.hibernate.ddl-auto=validate`.
- [x] Create a baseline migration SQL script (`V1__init.sql`) capturing the current structure of the PostgreSQL schema.

### Non-Functional

- Reliability: Schema changes must be tracked and versioned.
- Safety: Existing data and database instances must be compatible with the baseline.

## Scope

### In Scope

- Setup of Flyway on the backend.
- Creation of the first migration script.
- Property configuration updates.

### Out of Scope

- Migrating actual data (only schema is in scope for `V1`).
- Integrating with CI/CD immediately (this is just the code-level setup).

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Baseline script is incorrect or incomplete | High | Generate the DDL directly from the current JPA entities or an existing PG dump to guarantee an exact match with what Hibernate expects for `validate`. |

## Recommendation
>
> 1. Add dependencies. 2. Start a clean DB, let Hibernate `update` generate the exact schema, extract that schema as `V1__init.sql`, 3. Switch property to `validate` and turn on Flyway so it takes ownership.
