# Investigation: App Showcase Documentation

## Summary
The goal is to analyze the project, populate it with comprehensive seed data, and create a high-quality documentation file in `docs/` containing screenshots and descriptions of all application screens and functionalities. This will serve as a showcase for stakeholders.

## Current State
- **Tech Stack**: Java/Spring Boot (Backend), React/TypeScript (Frontend).
- **Seeders**: `DataSeeder` (initial data) and `BulkDataSeeder` (additional volume). `BulkDataSeeder` is currently inactive.
- **Frontend**: Multi-role application with Client Portal and Admin Dashboard.

## Requirements
### Functional
- [ ] Activate and execute `BulkDataSeeder` to populate the database.
- [ ] Run the application locally (Backend + Frontend).
- [ ] Automated/Manual screenshots of all key routes.
- [ ] Create a detailed document in `docs/app-showcase.md` with screenshots and feature descriptions.

### Non-Functional
- **Quality**: Documentation should be premium and clear.
- **Automation**: Use browser tools for taking screenshots and navigating.

## Scope
### In Scope
- Activation of seeders.
- Screenshot capture of: Dashboard, Calendar, Customers, Services, Users, Billing, Marketplace, Search, and Profile pages.
- Creation of `docs/11-app-showcase.md`.

### Out of Scope
- Fixes to application logic (unless they block screenshots).
- Testing on production environments.

## Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Seeder errors | Data incomplete | Manual data insertion or seeder debugging. |
| Screenshot resolution | Unprofessional docs | Use high resolution for browser capture. |

## Recommendation
1. Enable `BulkDataSeeder`.
2. Run seeder with `-Dseed.portfolio=true -Dseed.bulk=true`.
3. Start backend and frontend.
4. Navigate and snapshot each page.
5. Compile into markdown with descriptive text.
