# Design: Fix Production DB Network Unreachable

## Architecture Overview
>
> The fix is contained entirely in the backend's `DatabaseConfig.java` and the `Dockerfile`. No schema, API, or frontend changes needed.

## Changes

### 1. Dockerfile — Force IPv4 Stack

Add `-Djava.net.preferIPv4Stack=true` to the JVM startup command. This forces Java to use IPv4 when connecting to external services, solving the `Network is unreachable` error when the Supabase hostname resolves to IPv6.

### 2. DatabaseConfig.java — Clean URL Construction

When credentials are extracted from the URI's `userInfo` section, strip any `user=` and `password=` query parameters from the reconstructed JDBC URL to avoid sending credentials both ways.

## File Structure

```
peluqueria-api/
├── Dockerfile                          # MODIFIED — add preferIPv4Stack
└── src/main/java/com/peluqueria/config/
    └── DatabaseConfig.java             # MODIFIED — clean query params
```

## Testing Strategy

- Build: `mvn compile` must pass
- Deploy: Trigger production deploy on Render and verify Spring Boot starts successfully
