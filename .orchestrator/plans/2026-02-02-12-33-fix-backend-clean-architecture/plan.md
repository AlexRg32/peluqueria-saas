# Implementation Plan - Backend Architecture Cleanup

## Phase 1: Preparation (DTOs & Exceptions)

- [x] Create `EnterpriseResponse` DTO.
- [x] Create `ServiceOfferingRequest` and `ServiceOfferingResponse` DTOs.
- [x] Create `CustomerResponse` (already exists, but check if updates needed).
- [x] Enhance `GlobalExceptionHandler`.

## Phase 2: Service Layer Refactor

- [x] Update `EnterpriseService`:
  - Inject `UserRepository`.
  - Implement `getEmployeesByEnterpriseId`.
  - Update methods to return `EnterpriseResponse`.
- [x] Implement `CustomerService` (move logic from Controller).
- [x] Update `ServiceOfferingService`:
  - Move image resolution logic from Controller to Service.
  - Update methods to return `ServiceOfferingResponse`.
- [x] Update `UserService` to accept and return DTOs.

## Phase 3: Controller Refactor

- [x] Refactor `EnterpriseController`:
  - Use `@RequiredArgsConstructor`.
  - Use `EnterpriseService` only.
  - Use DTOs for request/response.
- [x] Refactor `CustomerController`:
  - Use `CustomerService`.
  - Use `@RequiredArgsConstructor`.
- [x] Refactor `ServiceOfferingController`:
  - Use `@RequiredArgsConstructor`.
  - Clean up logic (move to Service).
- [x] Refactor `UserController`:
  - Use `@RequiredArgsConstructor`.
  - Use DTOs for request/response.
- [x] Update `AppointmentController` and `AuthController` to use `@RequiredArgsConstructor`.

## Phase 4: Final Cleanup & Verification

- [x] Remove unused imports.
- [x] Ensure all controllers have ZERO business logic.
- [x] Verify API functionality.
