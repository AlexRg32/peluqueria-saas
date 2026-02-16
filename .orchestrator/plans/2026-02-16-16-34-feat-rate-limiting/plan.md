# Plan: Rate Limiting Implementation

## Tasks

- [x] Task 1: Add Bucket4j dependency to `pom.xml`
- [x] Task 2: Create `RateLimitFilter.java` with IP-based token bucket
- [x] Task 3: Register the filter in `SecurityConfig.java`
- [x] Task 4: Add `RateLimitException` and HTTP 429 handler to `GlobalExceptionHandler`
