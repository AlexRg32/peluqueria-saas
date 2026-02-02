# Investigation: Hard Delete with Cascading for Users

## Problem Description

The user wants to perform a hard delete of users instead of a soft delete.
This should include:

1. Deleting associated appointments (cascading).
2. A confirmation modal in the frontend warning about the deletion of appointments.

## Root Cause Analysis

Current implementation (Soft Delete):

- Sets `active = false`.
- Records remain in the database.
- FK constraints are satisfied because records still exist.

Requested implementation (Hard Delete):

- Must delete associated `Appointment` records first to avoid `DataIntegrityViolationException`.
- Must handle potential references in the `customers` table.

## Affected Components

### Backend

1. **AppointmentRepository**: Needs a method to delete by employee ID.
2. **CustomerRepository**: Might need a method to handle users linked to customers.
3. **UserService**:
    - Change `deleteUser` back to performing a hard delete.
    - Add logic to delete associated data before deleting the user.
    - Use `@Transactional` to ensure atomicity.

### Frontend

1. **UsersPage.tsx**: Replace `window.confirm` with a custom `DeleteConfirmationModal`.
2. **DeleteConfirmationModal**:
    - Warning message: "¡Atención! Al eliminar este usuario se eliminarán también todas sus citas asociadas. Esta acción no se puede deshacer."
    - Confirmation buttons.

## Technical Plan

### 1. Backend Deletion Logic

- In `UserService.deleteUser(Long id)`:
  - Check if the user exists.
  - Delete all appointments where `employee_id = id`.
  - Find if any `Customer` is linked to this user. If so:
    - Option A: Delete the `Customer` and its appointments.
    - Option B: Nullify the `user_id` in `Customer`.
    - *Decision*: Since the user said "se eliminen tambien sus citas", if they are a customer (CLIENTE role), we should probably delete their customer profile and appointments too.
  - Finally, `userRepository.deleteById(id)`.

### 2. Frontend Modal

- Create a reusable `ConfirmModal` or specific `DeleteUserModal`.
- Integrate it into `UsersPage.tsx`.

## Risks

- Data loss is permanent.
- If multiple enterprises share a user (not current architecture, but good to keep in mind), deleting the user deletes them globally. (Currently, users belong to one enterprise).
