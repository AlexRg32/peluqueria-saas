# Plan: Security IDOR

> Goal: Implement comprehensive IDOR protection across all authenticated backend services.
> Architecture: Global SecurityService Spring Bean used via method security (@PreAuthorize).

## Foundation

- [x] **Task 1: Build SecurityService** — `SecurityService.java`
  - What: Create `SecurityService` in `com.peluqueria.security`. Inject Repositories. Add methods: `hasEnterpriseAccess`, `canManageUser`, `canManageCustomer`, `canManageAppointment`, `canManageServiceOffering`.
  - Verify: File compiles successfully and all repositories can be autowired.

## Core

- [x] **Task 2: Secure User & Dashboard Controllers** — `UserController.java`, `DashboardController.java`
  - What: Update `@PreAuthorize` on both classes to use `@securityService.hasEnterpriseAccess` and `@securityService.canManageUser` as appropriate.
  - Verify: Run `./mvnw compile` to ensure no syntax errors in annotations.

- [x] **Task 3: Secure ServiceOffering & WorkingHour Controllers** — `ServiceOfferingController.java`, `WorkingHourController.java`
  - What: Update `@PreAuthorize` tags to validate `enterpriseId` and individual `serviceId` access.
  - Verify: Compile successfully.

- [x] **Task 4: Secure Appointment & Customer Controllers** — `AppointmentController.java`, `CustomerController.java`
  - What: Update `@PreAuthorize` to validate `enterpriseId`, `customerId`, and `appointmentId`.
  - Verify: Compile successfully.

## Integration & Polish

- [x] **Task 5: Secure EnterpriseController** — `EnterpriseController.java`
  - What: Make sure `EnterpriseController` only allows Super Admin to list all or create, and Admins can only view/update their own enterprise (`@PreAuthorize("@securityService.hasEnterpriseAccess(authentication, #id)")`).
  - Verify: Run `./mvnw clean test` to confirm the entire project builds and tests pass (verifying the SPEL expressions parse correctly).
