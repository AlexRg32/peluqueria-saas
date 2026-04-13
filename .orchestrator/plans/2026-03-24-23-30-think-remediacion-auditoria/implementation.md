# Implementation Log: Remediacion De Auditoria
> Started: 2026-03-24T23:33:00+01:00
> Scope: Wave A-C (Tasks 1-22)
---

## 2026-03-24

- Hardened bootstrap and config:
  - Replaced hardcoded super-admin seeding with explicit opt-in bootstrap env vars.
  - Removed implicit datasource credentials from `application.properties`.
  - Documented mandatory `JWT_SECRET` and bootstrap behavior in `README.md`, `DEPLOYMENT.md`, and `docker-compose.yml`.

- Secured backend write contracts:
  - Added validated DTOs for user, enterprise, service-offering, auth, register, and appointment requests.
  - Updated controllers to use `@Valid` and DTO-based payloads instead of raw JPA entities.
  - Blocked inactive users via `User.isEnabled()`.
  - Prevented non-super-admin actors from assigning `SUPER_ADMIN`.
  - Added tenant ownership checks for appointment employee/service/customer/user references.
  - Hardened the global exception contract and access-denied response shape.

- Aligned frontend with new contracts:
  - Updated user creation/update payloads to send `enterpriseId` instead of nested entities.
  - Updated multipart service creation to send a JSON `service` part plus optional image upload.
  - Fixed Vite ESM lint issue by replacing `__dirname` usage.
  - Ran `npm audit fix`, producing a clean audit result.

- Added focused regression coverage:
  - `AppointmentServiceTest`
  - `UserServiceTest`
  - `UserTest`
  - `GlobalExceptionHandlerTest`
  - `AuthControllerValidationTest`
  - `ServiceOfferingControllerTest`

- Verification:
  - `saloria-api`: `./mvnw test` ✅
  - `saloria-client`: `npm run lint` ✅
  - `saloria-client`: `npm test` ✅
  - `saloria-client`: `npm run build` ✅
  - `saloria-client`: `npm audit --omit=dev` ✅

- Remaining outside Wave A:
  - Soft delete / archive semantics
  - DB indexes and operational hardening
  - Marketplace/search/profile/product completion
  - Final docs reconciliation beyond security/bootstrap changes

## 2026-03-25

- Implemented user archival instead of destructive deletion:
  - Added `archived` state to `User` and made disabled/archive status effective at the Spring Security layer.
  - Replaced destructive user deletion with archive semantics so historical appointments and customer links remain intact.
  - Updated admin UI copy to reflect archival behavior instead of permanent deletion.

- Hardened archived-user filtering across reads and auth:
  - Added repository methods that exclude archived users for active admin flows.
  - Updated authentication, JWT validation, enterprise access checks, and appointment portal-user lookups to reject archived/inactive users consistently.
  - Ensured stale tokens tied to archived users no longer authenticate successfully.

- Added operational hardening and data-path indexing:
  - Created `V3__user_archival_and_indexes.sql` to add the archival column and indexes for appointments, customers, service offerings, working hours, and active user lookups.
  - Unified CORS configuration in `SecurityConfig` and removed controller-level hardcoded `@CrossOrigin`.
  - Disabled Swagger/OpenAPI by default unless explicitly enabled through env config.
  - Turned `show-sql` off by default and tightened rate limiting by trusting `X-Forwarded-For` only from configured proxies and cleaning up stale buckets.

- Added focused regression coverage:
  - `UserServiceTest`
  - `UserTest`
  - `JwtUtilTest`
  - `RateLimitFilterTest`
  - `FlywayMigrationSmokeTest`

- Verification:
  - `saloria-api`: `./mvnw test` ✅
  - `saloria-client`: `npm run lint` ✅
  - `saloria-client`: `npm test` ✅
  - `saloria-client`: `npm run build` ✅
  - `saloria-client`: `npm audit --omit=dev` ✅

- Remaining outside Wave B:
  - Marketplace/search/profile/product completion
  - Real public booking flow and marketplace read API
  - Final docs reconciliation and ship checklist for Wave C-D

## 2026-03-25

- Implemented public marketplace reads end-to-end:
  - Added backend public directory and public working-hours endpoints.
  - Added a public summary DTO and enterprise aggregation logic so the client marketplace now reads real enterprises and active services from the backend instead of static mocks.
  - Updated authentication token claims to include `name` for richer client-facing account UI.

- Shipped the public search and profile experiences:
  - Replaced the search placeholder with a functional directory page backed by the live public API.
  - Connected the home hero and “Ver todas” actions to the real search flow.
  - Replaced the client profile placeholder with a minimal but functional account page showing identity, role, and quick links into bookings/history.

- Wired public booking and real business hours:
  - Added public enterprise-hours loading to the barbershop profile page.
  - Replaced hardcoded hours with live working-hour data.
  - Added a dedicated client booking modal and opened appointment creation for authenticated client users only when booking for their own account.

- Added focused regression coverage:
  - `PublicControllerTest`
  - `SecurityServiceTest`
  - `MarketplaceService.test.ts`
  - `SearchPage.test.tsx`
  - `ProfilePlaceholder.test.tsx`
  - `BarbershopProfilePage.test.tsx`

- Verification:
  - `saloria-api`: `./mvnw test` ✅
  - `saloria-client`: `npm run lint` ✅
  - `saloria-client`: `npm test` ✅
  - `saloria-client`: `npm run build` ✅

- Remaining outside Wave C:
  - Docs reconciliation and final reality-check pass
  - Final ship checklist / validation matrix

## 2026-03-25

- Reconciled product and architecture docs with shipped reality:
  - Updated `README.md` to reflect the live B2C capabilities, current role model, Java 21 / React 19 stack, and the remaining roadmap after Waves A-C.
  - Corrected `docs/01-vision-general.md`, `docs/02-guia-usuario.md`, `docs/03-arquitectura-tecnica.md`, `docs/04-backend.md`, `docs/05-frontend.md`, `docs/06-base-de-datos.md`, and `docs/10-api-contract.md` to match the real security model, tenancy enforcement, DTO contracts, archive semantics, and public booking behavior.
  - Removed stale references to OAuth2 resource server, React Query, Java 17, React 18, `JwtService`, guest booking, and outdated role names.

- Closed the final verification matrix:
  - Re-ran backend and frontend validation intended for ship readiness.
  - Updated the remediation plan checklist to mark Tasks 23 and 24 as completed.

- Verification:
  - `saloria-api`: `./mvnw test` ✅
  - `saloria-client`: `npm test` ✅
  - `saloria-client`: `npm run lint` ✅
  - `saloria-client`: `npm run build` ✅
  - `saloria-client`: `npm audit --omit=dev` ✅

- Remaining non-blocking warnings:
  - Vitest still logs React warnings about `whileInView` on mocked `framer-motion` components in some client-portal tests.
  - `vite build` still warns about a large production chunk (`index-DzSs-Lon.js` > 500 kB after minification).
