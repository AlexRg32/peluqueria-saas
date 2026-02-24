# Investigation: Production Deployment Failure - UnknownHostException

## Summary

The production application (`peluqueria-saas-prod`) is failing to deploy on Render due to a `java.net.UnknownHostException` when attempting to connect to the Supabase database. This is caused by Render's inability to resolve the direct Supabase connection hostname (`db.[ref].supabase.co`), likely because it only provides IPv6 records and Render's outbound network (especially on the Free tier) has limited or no IPv6 support.

## Current State

- **Tech Stack**: Spring Boot (Java 21), PostgreSQL (Supabase), Render (Web Service).
- **Relevant Code**: `DatabaseConfig.java` handles connection URL parsing.
- **Architecture**: Dockerized Spring Boot app connecting to a remote Supabase instance.
- **Error**: `Caused by: java.net.UnknownHostException: db.xwnumlcqnrwhgpbrldhf.supabase.co`
- **Staging**: Working correctly (using an internal Render PostgreSQL database).
- **Alternative Prod App**: A second app (`peluqueria-saas`) was able to connect using the Supabase Transaction Pooler host (`aws-1-eu-central-1.pooler.supabase.com`).

## Requirements

### Functional

- [ ] Restore database connectivity for the production application.
- [ ] Ensure the application starts successfully and executes Flyway migrations.

### Non-Functional

- **Reliability**: Use the Supabase Transaction Pooler which supports IPv4 and is more robust for cloud deployments.
- **Configuration**: Preserving SSL and other necessary parameters (e.g., `prepareThreshold=0` for pooler compatibility).

## Scope

### In Scope

- Switching the production database URL to the Supabase Transaction Pooler host.
- Verifying the `DatabaseConfig.java` parsing logic handles the pooler URL format correctly.

### Out of Scope

- Migrating data (already handled by Supabase).
- Fixing potential JPA bean initialization issues (will be addressed if they persist after connectivity is restored).

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Pooler host choice | Connection Refused | Verify if the project requires a specific pooler host (usually `aws-0-...` or `aws-1-...` work). |
| Session vs Transaction Mode | Prepared Statement Errors | Use `prepareThreshold=0` in the JDBC URL. |

## Recommendation

Update the `SPRING_DATASOURCE_URL` environment variable for the production service in Render to use the Transaction Pooler host. The suggested format is:
`postgresql://postgres.xwnumlcqnrwhgpbrldhf:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres?sslmode=require&prepareThreshold=0`
Note: The username MUST be `postgres.xwnumlcqnrwhgpbrldhf` when using the pooler.
