# Plan: Flyway Integration
>
> Goal: Integrate Flyway into the Spring Boot backend to manage database migrations, changing ddl-auto to validate.
> Architecture: Layered Monolith with JPA Entities

## Foundation

- [x] **Task 1: Add Dependencies** — `peluqueria-api/pom.xml`
  - What: Add `flyway-core` and `flyway-database-postgresql` to the Maven dependencies.
  - Verify: Run `mvn dependency:resolve` to ensure it downloads without errors.

- [x] **Task 2: Generate Initial Schema** — `peluqueria-api/src/main/resources/application-schema.properties` and running a test context
  - What: Create an application profile (`schema`) with `jakarta.persistence.schema-generation.scripts.action=create` to dump the exact current DDL from `@Entity` objects into a new directory: `peluqueria-api/src/main/resources/db/migration/V1__init.sql`. Generate it by running the application tests with that active profile.
  - Verify: Check that `V1__init.sql` exists and contains `CREATE TABLE` statements for everything (e.g. `users`, `appointments`). Remove the `application-schema.properties` once generated.

## Core

- [x] **Task 3: Refine Migration Script** — `peluqueria-api/src/main/resources/db/migration/V1__init.sql`
  - What: Review the generated SQL. Remove any hibernate-specific drop sequences that might have slipped in or format it cleanly if needed. Clean up the file to ensure pure Postgres compatibility.
  - Verify: `V1__init.sql` looks like a clean baseline without DROP statements.

- [x] **Task 4: Configure Application** — `peluqueria-api/src/main/resources/application.properties`
  - What: Change `spring.jpa.hibernate.ddl-auto` from `update` to `validate`. Ensure flyway is enabled (it is by default when on the classpath).
  - Verify: The properties look correct.

## Integration & Polish

- [x] **Task 5: Test Execution** — `peluqueria-api`
  - What: Run the Spring Boot Tests (`mvn clean test`) to verify the context boots. A clean run with H2 (which the test profile uses) should apply the Flyway migrations and then validate successfully with Hibernate. (May need to ensure test profile ignores flyway if using H2 with different dialects, or configure Flyway to work with H2 test DB).
  - Verify: All tests pass without JPA or Flyway errors.
