# Fix User Deletion Foreign Key Violation
>
> Goal: Implement soft delete for users to avoid foreign key constraint violations while preserving historical data.
> Architecture: Layered architecture (Service -> Repository)

### Task 1: Update UserRepository

- [x] Add `findByEnterpriseIdAndActiveTrue` method to `UserRepository.java`.
- [x] Add `findByEnterpriseIdAndRoleAndActiveTrue` method to `UserRepository.java`.
- [x] /checkpoint

### Task 2: Update UserService - Deletion Logic

- [x] Modify `deleteUser` in `UserService.java` to set `active = false` instead of `deleteById`.
- [x] /checkpoint

### Task 3: Update Services - Query Logic

- [x] Update `getAllUsers` and `getUsersByEnterpriseId` in `UserService.java` to use the new `active = true` repository methods.
- [x] Update `getEmployeesByEnterpriseId` in `EnterpriseService.java` to use the new `active = true` repository methods.
- [x] /checkpoint

### Task 4: Verification

- [x] Verify the changes by checking if users can now be "deleted" without SQL errors.
- [x] Verify that inactive users no longer appear in the user list.
- [x] /checkpoint
