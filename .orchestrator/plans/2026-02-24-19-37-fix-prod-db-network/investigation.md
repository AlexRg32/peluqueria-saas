# Investigation: Fix Production DB Network Unreachable

## Summary
>
> The production deployment on Render fails to connect to the Supabase PostgreSQL database with `java.net.SocketException: Network is unreachable`. Staging works fine because it uses a Render-hosted PostgreSQL (same network). Production uses Supabase (external), and the `DatabaseConfig` constructs the JDBC URL with `user=` and `password=` as query parameters instead of passing them via HikariCP's dedicated `username`/`password` fields—this causes credential issues. Additionally, the port 5432 (direct connection) may be unreachable from Render due to IPv6/network restrictions; Supabase recommends using the **Session Mode pooler** on port `5432` or the **Transaction Mode pooler** on port `6543` for external connections.

## Current State

- **Tech Stack**: Spring Boot 3.3.0, Java 21, PostgreSQL (Supabase), Render hosting, Flyway, HikariCP
- **Relevant Code**: `DatabaseConfig.java` — handles JDBC URL construction
- **Architecture**: The `DatabaseConfig` bean parses `SPRING_DATASOURCE_URL` env var (which comes from Render's env settings)

## Root Cause Analysis

The log shows:

```
Final DataSource URL: jdbc:postgresql://db.xwnumlcqnrwhgpbrldhf.supabase.co:5432/postgres?user=postgres&password=****
```

**Problems identified**:

1. **Credentials in URL query params**: The URL has `?user=postgres&password=****`. These come from the env var being a full URI like `postgresql://postgres:password@host:5432/postgres`. When `DatabaseConfig` parses it, it keeps `user` and `password` in the query string AND also sets them via `DataSourceBuilder.username()/password()`. This is redundant but not the root cause.

2. **`Network is unreachable` (Root Cause)**: The Supabase hostname `db.xwnumlcqnrwhgpbrldhf.supabase.co` resolves to an IPv6 address. Render's free/starter tier may not support IPv6 outbound connections. The JDBC driver tries IPv6 first, fails with "Network is unreachable", and doesn't fall back to IPv4.

3. **Port 5432 direct connection**: Supabase recommends using the connection pooler endpoint for external apps, not the direct connection. The pooler domain is different: `aws-0-eu-west-3.pooler.supabase.com` (or similar) on port `6543`.

## Scope

### In Scope

- Fix `DatabaseConfig.java` to not duplicate credentials in the query string
- Add `socketFactory` or Java system property to prefer IPv4
- Document the correct Supabase connection string format for production

### Out of Scope

- Changing to Supabase connection pooler (requires user to update env var on Render)
- Changing hosting provider

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| IPv4 flag not solving Render→Supabase connectivity | High | User may need to switch to Supabase pooler endpoint |
| Credential handling change breaking staging | Medium | Staging uses direct JDBC URL (no URI parsing triggered) |

## Recommendation
>
> 1. Fix `DatabaseConfig` to strip `user` and `password` from query params when they've already been extracted from the URI userInfo section — avoids confusion.
> 2. Add `?sslmode=require` to production connections for Supabase security.
> 3. Force JVM to prefer IPv4 stack via application properties: `spring.jpa.properties.hibernate.connection.preferIPv4Stack=true` or better, set `-Djava.net.preferIPv4Stack=true` in the Dockerfile.
> 4. Advise user to verify the `SPRING_DATASOURCE_URL` on the Render production service points to the correct Supabase endpoint.
