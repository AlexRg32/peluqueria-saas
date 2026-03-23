# Investigation: database-connection-url-fix

## Summary

The application fails to start in the staging environment on Render because the provided `SPRING_DATASOURCE_URL` includes credentials in a URI format (`jdbc:postgresql://user:password@host/database`) that is not supported by the PostgreSQL JDBC driver. The driver attempts to parse the credentials as part of the host/port, resulting in an "invalid port number" error and subsequent application failure.

## Current State

- **Tech Stack**: Spring Boot 3.3.0, Java 21, Flyway, PostgreSQL.
- **Relevant Code**:
  - `src/main/resources/application.properties`: Configures the datasource using environment variables.
  - Render Environment: Sets `SPRING_DATASOURCE_URL` with credentials embedded in the URL.
- **Architecture**: Layered Spring Boot application.

## Requirements

### Functional

- [x] Application must connect to the PostgreSQL database in the staging environment.
- [x] Application must still work locally with standard connection strings.
- [x] Application must handle connection strings that include credentials in the URL format.

### Non-Functional

- Performance: No significant impact on startup time.
- Security: Credentials should be handled securely and not logged unnecessarily (already handled by mask/logs).

## Scope

### In Scope

- Addition of a `DatabaseConfig` class or modification of `application.properties` to handle the URL format.
- Validation of the parsing logic.

### Out of Scope

- Modifying the Render infrastructure directly.
- Changing the database schema.

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Incorrect regex parsing | App won't start in some environments | Use Java's `URI` class for robust parsing where possible. |
| Interference with auto-config | Duplicate beans or config errors | Use `@Primary` or condition on the presence of the complex URL. |

## Recommendation

Implement a `DatabaseConfig` class that uses a `@Bean` for `DataSource`. This bean will check the `SPRING_DATASOURCE_URL` environment variable. If it matches the format with embedded credentials, it will parse it (possibly using `URI`) and return a correctly configured `DataSource`. If it's a standard URL, it will let Spring Boot's default mechanisms take over or provides a fallback.
Actually, the most robust way is to use a `CommandLineRunner` or a `BeanPostProcessor`, but a simple `@Bean` with `@Primary` is often the most direct fix for this specific "Render/Heroku" issue in Spring Boot.
Alternatively, we can use `spring.datasource.url`, `spring.datasource.username`, and `spring.datasource.password` and tell the user to split them, but since we want to fix it in code, we will make the code wait for it.
