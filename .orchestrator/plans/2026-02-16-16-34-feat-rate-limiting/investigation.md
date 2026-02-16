# Investigation: Rate Limiting for Auth Endpoints

## Problem Statement

The `/auth/login` and `/auth/register` endpoints have **zero protection** against brute-force and DoS attacks. A malicious actor can spam these endpoints thousands of times per second, which can:

1. **Brute-force passwords** — try every combination until finding valid credentials
2. **Denial of Service** — overwhelm the backend with authentication requests (each one hits the DB + bcrypt)
3. **Resource exhaustion** — bcrypt password hashing is intentionally CPU-expensive; flooding it will crash the server

## Current Architecture

### Files Analyzed

| File | Purpose |
|---|---|
| `AuthController.java` | Exposes `/auth/login` and `/auth/register` — **no rate limiting** |
| `SecurityConfig.java` | Spring Security config — `/auth/**` is `permitAll()`, no filters for rate limiting |
| `AuthenticationService.java` | Uses `AuthenticationManager.authenticate()` which invokes bcrypt — **CPU-expensive per call** |
| `GlobalExceptionHandler.java` | Handles exceptions — no rate-limit aware responses (HTTP 429) |
| `JwtAuthenticationFilter.java` | JWT filter — runs on authenticated routes only, irrelevant for `/auth/**` |

### Key Vulnerability

```
POST /auth/login  →  SecurityConfig.permitAll()  →  AuthController  →  AuthenticationService.authenticate()
                     ↑ NO FILTER                                        ↑ bcrypt.compare() = CPU intensive
```

Every single request goes through the full authentication pipeline with no throttling.

## Proposed Solution: Bucket4j Rate Limiting Filter

### Why Bucket4j?

- **No external dependencies** (no Redis needed) — uses in-memory `ConcurrentHashMap`
- **Token bucket algorithm** — industry standard, smooth rate limiting
- **Spring Boot integration** — works as a standard `Filter`
- **Zero infrastructure** — perfect for current deployment (no Redis required)

### Design

1. **`RateLimitFilter`** — A servlet filter registered before Spring Security, keyed by client IP
2. **Configuration** — Limit `/auth/**` endpoints to **5 requests per minute** per IP
3. **Response** — Return HTTP `429 Too Many Requests` with `Retry-After` header when limit exceeded
4. **General API** — Also apply a softer limit (e.g., 60 req/min) to all API endpoints

### Files to Create/Modify

| File | Action |
|---|---|
| `pom.xml` | Add `bucket4j-core` dependency |
| `RateLimitFilter.java` | NEW — Filter implementing rate limiting |
| `SecurityConfig.java` | Register rate limit filter before security chain |
| `GlobalExceptionHandler.java` | Add `429` response handler (optional, filter handles it) |
