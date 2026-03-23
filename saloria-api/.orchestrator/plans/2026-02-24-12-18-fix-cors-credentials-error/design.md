# Design: Fix CORS Credentials Conflict

## Architecture Overview

The fix involves updating the `CorsConfigurationSource` bean in `SecurityConfig.java`. Instead of using `setAllowedOrigins`, we will use `setAllowedOriginPatterns`.

## Data Model

N/A

## API Contracts

N/A (CORS is a browser-level protocol, doesn't change business API contracts).

## File Structure

- `src/main/java/com/peluqueria/config/SecurityConfig.java`: Modify `corsConfigurationSource` method.

## Testing Strategy

- Unit: Local startup check (already passing locally, but should be verified).
- Integration: Deploy to staging and verify that preflight (OPTIONS) requests succeed and don't throw `IllegalArgumentException`.
- Verification: Browser console should not show CORS errors when connecting from the frontend.
