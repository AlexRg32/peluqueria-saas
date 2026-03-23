# Plan: Fix CORS Credentials Conflict

> Goal: Resolve IllegalArgumentException caused by allowCredentials(true) and allowedOrigins("*") conflict in SecurityConfig.java.
> Architecture: Spring Security Filter Chain

## Foundation

- [x] **Task 1: Update SecurityConfig.java** — `src/main/java/com/peluqueria/config/SecurityConfig.java`
  - What: Replace `setAllowedOrigins` with `setAllowedOriginPatterns`.
  - Verify: Project compiles successfully.

## Integration & Polish

- [x] **Task 2: Verify Build** — `peluqueria-api`
  - What: Run `./mvnw clean compile` to ensure no regressions.
  - Verify: Build status is SUCCESS.
