# Implementation Plan: Employee Management

## Phase 1: Backend Infrastructure

- [ ] Modify `User.java` to add `phone` and `active` fields.
- [ ] Create `UserDTO.java` (if not exists) or update `UserResponse.java` to include new fields.
- [ ] Update `UserService.java` to include methods for:
  - Get all users by enterprise ID.
  - Create user with password encryption and enterprise association.
  - Update user.
  - Delete user (soft delete).
- [ ] Update `UserController.java` with CRUD endpoints for enterprise users.
- [ ] Run backend tests.

## Phase 2: Frontend Infrastructure

- [ ] Create `employeeService.ts` to handle API communication.
- [ ] Define `User` and `UserRequest` types in `types.ts`.

## Phase 3: UI Components

- [ ] Update `Users.tsx` (Rename if needed, but the original request says "usuarios" section, user prefers "Empleados" in the UI).
- [ ] Implement `EmployeeTable.tsx` component.
- [ ] Implement `EmployeeModal.tsx` component.
- [ ] Add sidebar navigation link for "Empleados" (if not already there).

## Phase 4: Integration & Polish

- [ ] Connect `Users.tsx` to `employeeService`.
- [ ] Implement loading states and error handling.
- [ ] Add success notifications for CRUD operations.
- [ ] Final visual check for premium aesthetics.
