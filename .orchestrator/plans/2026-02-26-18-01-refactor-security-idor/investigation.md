# Investigation: Security IDOR

## Summary
>
> Implement comprehensive IDOR (Insecure Direct Object Reference) protection across all authenticated backend services. Currently, controllers trust the `enterpriseId` or resource `id` provided in the path or body without validating if the authenticated user has access to that specific enterprise or resource. This represents a critical data leak and manipulation vulnerability.

## Current State

- **Tech Stack**: Spring Boot (Java 21), Spring Security, PostgreSQL.
- **Relevant Code**:
  - All Controllers: `UserController`, `DashboardController`, `ServiceOfferingController`, `WorkingHourController`, `AppointmentController`, `CustomerController`, `EnterpriseController`.
  - Service Layer: Respective services missing ownership validation.
- **Architecture**: Layered monolith. Role-based access control (`ROLE_ADMIN`, `ROLE_SUPER_ADMIN`) is present via `@PreAuthorize`, but tenancy/ownership checks are missing.

## Requirements

### Functional

- [ ] Create a `SecurityService` (Spring Bean) to validate if the current authenticated user has access to a given `enterpriseId`.
- [ ] Apply `@PreAuthorize("@securityService.hasEnterpriseAccess(authentication, #enterpriseId)")` or similar to all controller endpoints that take `enterpriseId`.
- [ ] For endpoints that take a specific entity `id` (e.g. `PUT /api/users/{id}`), create specific validation methods (e.g. `canManageUser(#id)`) or enforce validation down at the Service layer.

### Non-Functional

- Performance: Validation should be efficient. If we can validate using the JWT/SecurityContext context directly vs DB queries, that's preferred.
- Security: Must prevent cross-tenant data access globally. `ROLE_SUPER_ADMIN` should bypass these checks.

## Scope

### In Scope

- All REST Controllers under `/api/*` (except `/api/public` which is intended to be public).
- Security configuration to register the bean or enable method security if needed (already enabled).

### Out of Scope

- Modifying frontend routing (we will keep sending `enterpriseId` in the URL, but the backend will accurately validate it instead of blindly trusting it).

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Blocking valid users | High | Ensure `SecurityService` correctly matches `user.getEnterprise().getId()` with the `enterpriseId` variable. Super Admins bypass. |
| Missing an endpoint | Medium | Create a checklist of all controllers mapped against the `10-api-contract.md` to ensure complete coverage. |

## Recommendation
>
> I recommend creating a custom `@Service("securityService")` bean that can be invoked directly from `@PreAuthorize` annotations in the controllers. This keeps the controllers clean and explicitly declares the ownership requirements at the route level. For certain complex resources (like `Appointment` or `Customer`), if `@PreAuthorize` is too complex, we will inject the validation check at the very top of the Service method layer.
