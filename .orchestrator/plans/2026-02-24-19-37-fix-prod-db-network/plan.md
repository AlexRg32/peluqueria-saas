# Plan: Fix Production DB Network Unreachable
>
> Goal: Resolve `Network is unreachable` error when connecting from Render (prod) to Supabase PostgreSQL
> Architecture: Dockerfile JVM flag + DatabaseConfig cleanup

## Foundation

- [x] **Task 1: Add IPv4 preference to Dockerfile** — `peluqueria-api/Dockerfile`
  - What: Add `-Djava.net.preferIPv4Stack=true` to the `java -jar` entrypoint
  - Verify: Dockerfile builds successfully

## Core

- [x] **Task 2: Clean query params in DatabaseConfig** — `DatabaseConfig.java`
  - What: When credentials are extracted from userInfo, remove `user=` and `password=` from the query string to avoid duplication
  - Verify: `mvn compile` passes
