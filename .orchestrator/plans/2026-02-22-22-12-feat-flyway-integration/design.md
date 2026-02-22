# Design: Flyway Integration

## Architecture Overview
>
> Flyway will act as the source of truth for database DDL changes, taking over the responsibility from Hibernate. Hibernate will now only be used to validate the schema upon startup. This protects production data from accidental Hibernate auto-update behaviors.

## Data Model

*No structural changes to existing Entities. We just snapshot the current schema into a static SQL file.*

## API Contracts

*No changes.*

## File Structure

```text
peluqueria-api/
├── pom.xml
└── src/main/resources/
    ├── application.properties
    └── db/migration/
        └── V1__init.sql (New initial baseline schema)
```

## Dependencies

- New packages:
  - `org.flywaydb:flyway-core`: Standard Flyway engine.
  - `org.flywaydb:flyway-database-postgresql`: Required starting with Flyway 9/Spring Boot 3 for PostgreSQL support.

## Testing Strategy

- Unit: N/A
- Integration: Spring Boot context starts successfully against an empty database. Flyway will execute `V1__init.sql`. Then Hibernate (`spring.jpa.hibernate.ddl-auto=validate`) will verify that the database structure perfectly matches the Java `@Entity` representations. If the app boots without crashing, the test passes.
