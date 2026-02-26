# Design: Security IDOR Protection

## Architecture Overview

The IDOR vulnerability occurs because the backend routing trusts `enterpriseId` path variables or specific entity `id` path variables without asserting that the currently authenticated user owns them.
To solve this cleanly, we introduce a `SecurityService` (bean named `securityService`) that will be evaluated directly by Spring Security's expression engine via `@PreAuthorize`. This keeps business logic out of security evaluations and controllers completely clean of explicit `SecurityContextHolder` parsing.

## Component Design

### SecurityService (com.peluqueria.security.SecurityService)

A new Spring `@Service` that provides boolean checking methods:

- `hasEnterpriseAccess(Authentication auth, Long enterpriseId)`
- `canManageUser(Authentication auth, Long userId)`
- `canManageCustomer(Authentication auth, Long customerId)`
- `canManageAppointment(Authentication auth, Long appointmentId)`
- `canManageServiceOffering(Authentication auth, Long serviceId)`

This service will inject the necessary repositories to look up the parent enterprise of the entity.

### Annotations on Controllers

In all non-public controllers, we will update the existing `@PreAuthorize` tags to include the tenancy check.

For example, currently we have:
`@PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")`

We will change it to:
`@PreAuthorize("(hasRole('ADMIN') or hasRole('SUPER_ADMIN')) and @securityService.hasEnterpriseAccess(authentication, #enterpriseId)")`
Or for an entity-specific operation:
`@PreAuthorize("(hasRole('ADMIN') or hasRole('SUPER_ADMIN')) and @securityService.canManageUser(authentication, #id)")`

Exceptions:

- `EnterpriseController` (Super Admin mostly creates enterprises, so access must be restricted appropriately).
- `AuthController` and `PublicController` don't need these checks.

## File Structure

- `peluqueria-api/src/main/java/com/peluqueria/security/SecurityService.java` (NEW)
- `peluqueria-api/src/main/java/com/peluqueria/controller/UserController.java` (MODIFIED)
- `peluqueria-api/src/main/java/com/peluqueria/controller/DashboardController.java` (MODIFIED)
- `peluqueria-api/src/main/java/com/peluqueria/controller/ServiceOfferingController.java` (MODIFIED)
- `peluqueria-api/src/main/java/com/peluqueria/controller/WorkingHourController.java` (MODIFIED)
- `peluqueria-api/src/main/java/com/peluqueria/controller/AppointmentController.java` (MODIFIED)
- `peluqueria-api/src/main/java/com/peluqueria/controller/CustomerController.java` (MODIFIED)
- `peluqueria-api/src/main/java/com/peluqueria/controller/EnterpriseController.java` (MODIFIED)

## Dependencies

- Standard Spring Security `@PreAuthorize` functionality.

## Testing Strategy

- Once implemented, running local backend tests (`mvn test`) will verify that normal operations are unaffected for users within the same enterprise, but test failures would indicate a syntax issue with the SPEL (Spring Expression Language) expressions.
- We will rely on existing unit and integration tests to verify the baseline functionality.
