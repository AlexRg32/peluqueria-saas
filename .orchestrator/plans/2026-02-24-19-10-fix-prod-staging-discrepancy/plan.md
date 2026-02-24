# Plan: robust-database-connection-v2

## Foundation

- [ ] **Task 1: Update DatabaseConfig with Parameter Support** — `peluqueria-api/src/main/java/com/peluqueria/config/DatabaseConfig.java`
  - What: Include `uri.getQuery()` in the reconstructed URL.
  - Verify: Compilation.

## Core

- [ ] **Task 2: Add Enhanced Logging** — `peluqueria-api/src/main/java/com/peluqueria/config/DatabaseConfig.java`
  - What: Log the final URL with masked credentials.
  - Verify: Code review.

## Integration & Polish

- [ ] **Task 3: Local Build**
  - What: `./mvnw clean compile`
  - Verify: Build SUCCESS.
