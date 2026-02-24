# Plan: Production Deployment Fix
>
> Goal: Fix the production deployment failure caused by UnknownHostException.

## Foundation

- [x] Add diagnostic logs to `DatabaseConfig.java` to detect direct Supabase hosts and recommend the pooler.
- [x] Push code changes to `main`.
- [x] Update Render environment variables for `srv-d6e7sqctgctc73fecrrg` to use the Transaction Pooler.
- [x] Monitor deployment and identify "Tenant or user not found" error.
- [x] **Update Database Connection URL**: Switch to the Supabase Transaction Pooler host (`aws-1-eu-central-1.pooler.supabase.com`) to resolve IPv6 issues.
- [x] **Implement Diagnostic Logging**: Add warnings for direct Supabase host usage.
- [x] **Fix Flyway Validation**: Correct checksum mismatch in `flyway_schema_history`.
- [x] **Verify Production Deployment**: Confirmed application started successfully and responds to requests.

### Results

- Application is LIVE at `https://peluqueria-saas-prod.onrender.com`.
- Database connectivity is STABLE via the Supabase Pooler.
- Flyway migrations are SYNCHRONIZED.

## Cleanup

- [ ] **Task 3: Close Investigation**
  - What: Mark all phases as done in status tracker.
  - Verify: Status tracker updated.
