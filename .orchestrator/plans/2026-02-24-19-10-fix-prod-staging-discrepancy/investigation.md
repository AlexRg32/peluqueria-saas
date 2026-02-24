# Investigation: database-connection-params-fix

## Summary

The application fails to connect to the Supabase database in Production because the current `DatabaseConfig.java` logic strips essential query parameters (like `sslmode=require`) and doesn't handle different URI schemes robustly. The logs confirm that the URI parsing is triggered, but Hikari pool fails to start, leading to `UnsatisfiedDependencyException`.

## Current State

- **Logs**: `Detected URI-style JDBC URL...` followed by `HikariPool-1 - Starting...` (retrying).
- **Relevant Code**: `DatabaseConfig.java` uses `URI` class but only reconstructs the URL with `host`, `port`, and `path`, ignoring `query`.
- **Infrastructure**: Supabase requires SSL and potentially other parameters in the connection string.

## Requirements

### Functional

- [ ] Connect to Supabase DB in Production.
- [ ] Preserve all query parameters from the original `SPRING_DATASOURCE_URL`.
- [ ] Support `postgres://`, `postgresql://`, and `jdbc:postgresql://` prefixes.

### Non-Functional

- Observability: Log the final connection URL (masked) to aid troubleshooting.

## Root Cause

The `uri.getPath()` call in `DatabaseConfig.java` extracts only the database name part of the URL, losing everything after the `?`. In Supabase, this often includes SSL settings that are mandatory for the connection to succeed from Render.

## Scope

- Refactoring `DatabaseConfig.java` to include query parameters and improve prefix handling.
