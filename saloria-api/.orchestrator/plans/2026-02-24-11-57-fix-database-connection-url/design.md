# Design: database-connection-url-fix

## Architecture Overview

The fix involves adding a configuration class that intercepts the datasource configuration and ensures it's compatible with the PostgreSQL JDBC driver.

## Data Model

Not applicable.

## API Contracts

Not applicable.

## Component Design

### `DatabaseConfig` (New Class)

- **Responsibility**: Detect if the provided JDBC URL is in "URI-style" (with credentials) and parse it.
- **Logic**:
    1. Retrieve `SPRING_DATASOURCE_URL` from environment.
    2. Check if it matches `jdbc:postgresql://.*@.*/.*`.
    3. If yes:
        - Strip `jdbc:` prefix.
        - Parse as `URI`.
        - Extract user, password, host, port, path.
        - Build a clean JDBC URL: `jdbc:postgresql://host:port/database`.
        - Use `DataSourceBuilder` to create the bean with the extracted credentials.
    4. If no:
        - Return `null` or let Spring Boot use defaults. Actually, it's better to explicitly configure it to avoid confusion.

## File Structure

Modified files:

- `peluqueria-api/src/main/resources/application.properties` (Clean up comments)

New files:

- `peluqueria-api/src/main/java/com/peluqueria/config/DatabaseConfig.java`

## Dependencies

- `org.springframework.boot:spring-boot-starter-jdbc` (Existing)
- `com.zaxxer:HikariCP` (Existing)

## Testing Strategy

- **Unit**: Create a test case that simulates the Render connection string and verifies the parsing logic.
- **Manual**: Verify build and startup locally with a simulated env var.
