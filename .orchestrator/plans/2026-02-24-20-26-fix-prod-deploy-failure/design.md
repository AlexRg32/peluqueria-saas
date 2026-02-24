# Design: Production Deployment Fix

## Architecture Overview

The fix involves switching from the direct Supabase connection (which is IPv6-only and causing DNS resolution issues in Render) to the **Supabase Transaction Pooler**. The pooler supports IPv4 and is the recommended connection method for serverless and cloud environments.

## Connection String Design

The new connection string for Production should follow this standard:

- **Format**: `postgresql://[USER]:[PASSWORD]@[POOLER_HOST]:[PORT]/[DATABASE]?[PARAMS]`
- **User**: `postgres.xwnumlcqnrwhgpbrldhf` (Note the prefix `postgres.` followed by the project ref)
- **Host**: `aws-0-eu-central-1.pooler.supabase.com`
- **Port**: `5432` (Pooler uses 5432 for Transaction mode or 6543 for Session mode; 5432 is generally better for Spring Boot with Hikari)
- **Parameters**: `sslmode=require&prepareThreshold=0` (The latter is critical for pooler compatibility)

## Code Improvements (Robustness)

We will add a log warning in `DatabaseConfig.java` if a direct Supabase host (`db.*.supabase.co`) is detected, recommending the pooler instead. This will help the user diagnose the issue if it happens again.

We will also ensure that if the URL is specified in URI style but WITHOUT credentials (which seems to be the case in some logs), the code doesn't fail to parse it.

## File Structure

No new files. Modification to:

- `peluqueria-api/src/main/java/com/peluqueria/config/DatabaseConfig.java`

## Dependencies

No new dependencies.

## Testing Strategy

- **Verification**: The primary verification will be the successful deployment and "Live" status in Render.
- **Logs Check**: Verify that "Final DataSource URL" reflects the new pooler host and the application successfully executes migrations.
