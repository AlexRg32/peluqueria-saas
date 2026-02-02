# Investigation: User Deletion Foreign Key Violation

## Problem Description

The user reported a `DataIntegrityViolationException` when trying to delete a user.
Specifically: `ERROR: update or delete on table "users" violates foreign key constraint "fk11meukil4sxene75mt05cb6uv" on table "appointments"`.
This means there are appointments associated with the user (as an employee) that prevent the user from being deleted.

## Root Cause Analysis

1. **Entity Relationships**:
    - `Appointment` has a `ManyToOne` relationship with `User` (field `employee`), which is `nullable = false`.
    - `Customer` has a `ManyToOne` relationship with `User` (field `user`), which is `nullable = true`.
2. **Deletion Implementation**:
    - `UserService.deleteUser(id)` calls `userRepository.deleteById(id)`.
    - `userRepository.deleteById(id)` tries to perform a hard delete (`DELETE FROM users WHERE id = ?`).
3. **Constraint Violation**:
    - PostgreSQL prevents the deletion because it would leave `appointments` with a non-existent `employee_id`.

## Potential Solutions

1. **Soft Delete (Recommended)**:
    - Update `UserService.deleteUser` to set `user.active = false` instead of deleting the record.
    - This preserves historical data in `appointments`.
    - Update repositories to filter out inactive users in common queries.
2. **Cascade Delete**:
    - Add `@OnDelete(action = OnDeleteAction.CASCADE)` to the relationship in `Appointment`.
    - *Risk*: This would delete all appointments associated with the user, which is likely undesirable for a business.
3. **Set Null**:
    - Change `employee_id` to be nullable and set `@OnDelete(action = OnDeleteAction.SET_NULL)`.
    - *Risk*: Appointments would lose their assigned employee information.
4. **Application Side Validation**:
    - Before deleting, check if the user has any appointments. If so, return a user-friendly error message.

## Recommendation

Implement **Soft Delete** using the existing `active` field in the `User` entity. This is the most robust approach for a SaaS application where historical data is important.

## Affected Files

- `UserService.java`: Change `deleteUser` implementation.
- `UserRepository.java`: Add queries to filter by `active` status.
- `UserController.java`: No changes needed (it calls the service).
