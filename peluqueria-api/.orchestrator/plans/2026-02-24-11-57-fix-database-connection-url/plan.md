# Plan: database-connection-url-fix
>
> Goal: Fix the database connection error in Render by adding support for URI-style connection strings.

## Foundation

- [x] **Task 1: Create DatabaseConfig.java** — `src/main/java/com/peluqueria/config/DatabaseConfig.java`
  - What: Implement the parsing logic for `SPRING_DATASOURCE_URL`.
  - Verify: Check if the file is created and has no syntax errors.

## Core

- [x] **Task 2: Refactor application.properties** — `src/main/resources/application.properties`
  - What: Adjust the datasource properties to ensure they don't conflict with the new config. Specifically, ensure the custom bean is prioritized or handled correctly.
  - Verify: Run `./mvnw compile`.

## Integration & Polish

- [x] **Task 3: Local Verification** — `Local Environment`
  - What: Simulate the Render URL format locally and verify the app starts.
  - Verify: `export SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:postgres@localhost:5433/peluqueria_db && ./mvnw spring-boot:run`. Note: Port 5433 is used locally according to application.properties.
