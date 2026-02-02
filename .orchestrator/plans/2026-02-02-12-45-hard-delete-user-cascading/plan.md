# Plan: Hard Delete with Cascading for Users
>
> Goal: Implement hard delete for users with cascading deletion of appointments and a warning modal in the frontend.
> Architecture: Layered architecture (Service -> Repository) + React UI Components.

### Task 1: Backend Repositories

- [x] Add `deleteByEmployeeId(Long employeeId)` to `AppointmentRepository`.
- [x] Add `deleteByCustomerId(Long customerId)` to `AppointmentRepository`.
- [x] Add `Optional<Customer> findByUserId(Long userId)` to `CustomerRepository`.
- [x] Add `void deleteByUserId(Long userId)` to `CustomerRepository` (or handle in service).
- [x] /checkpoint

### Task 2: Backend Service Logic

- [x] Update `UserService.deleteUser` to:
  - [x] Add `@Transactional`.
  - [x] Delete appointments where user is employee.
  - [x] Delete customers (and their appointments) linked to this user.
  - [x] Delete user.
- [x] /checkpoint

### Task 3: Frontend - ConfirmModal Component

- [x] Create `src/components/ui/ConfirmModal.tsx` with a premium design.
- [x] /checkpoint

### Task 4: Frontend - Integration in UsersPage

- [x] Integrate `ConfirmModal` in `UsersPage.tsx`.
- [x] Update `handleDelete` to open the modal.
- [x] /checkpoint

### Task 5: Verification

- [x] Verify that deleting a user now removes their appointments and doesn't cause SQL errors.
- [x] Verify the modal works as expected.
- [x] /checkpoint
