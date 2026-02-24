# Investigation: CORS Credentials Error

## Summary

The application is failing in production (Render) with an `IllegalArgumentException` because the CORS configuration has `allowCredentials(true)` but `allowedOrigins` contains `*`. Spring Security/Spring Web prevents this combination for security reasons (it's not allowed by the W3C spec for Access-Control-Allow-Origin).

## Current State

- **Tech Stack**: Spring Boot 3.3.0, Java 21, Spring Security 6.3.0.
- **Relevant Code**: `SecurityConfig.java` (lines 60-70).
- **Architecture**: Layered architecture with Spring Security filter chain.

## Requirements

### Functional

- [x] Allow authenticated requests from the frontend.
- [x] Maintain `allowCredentials(true)` if the frontend needs to send cookies or Authorization headers.

### Non-Functional

- [x] Security: Comply with CORS specifications.

## Scope

### In Scope

- Modifying `SecurityConfig.java` to use `allowedOriginPatterns` instead of `allowedOrigins`, or refining how origins are handled.

### Out of Scope

- Changing the frontend configuration.
- Changing infrastructure settings on Render (though recommended as a fallback).

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Frontend blocked | High | Verify allowed patterns match the frontend URL |
| Security vulnerability | Medium | Use specific patterns instead of `*` where possible |

## Recommendation

Update `SecurityConfig.java` to use `setAllowedOriginPatterns` instead of `setAllowedOrigins`. This method supports the `*` pattern even when `allowCredentials` is `true`, by dynamically matching the request origin.
