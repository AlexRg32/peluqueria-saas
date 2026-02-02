# Design: Soft Delete for Users

## Architecture Overview

We will implement a soft delete mechanism for users. Instead of removing the record from the database, we will set the `active` flag to `false`. This ensures that references in the `appointments` and `customers` tables remain valid.

## Implementation Details

### 1. Service Layer (`UserService.java`)

Modify the `deleteUser` method to:

- Find the user by ID.
- Set `active = false`.
- Save the user.

### 2. Repository Layer (`UserRepository.java`)

Update the search methods to respect the `active` status if necessary.

- `findByEnterpriseId`: Should probably only return active users for the general list.
- `findByEnterpriseIdAndRole`: Should only return active users (e.g., in the appointment modal).

### 3. Entity Layer (`User.java`)

The `User` entity already has an `active` field with a default value of `true`. No changes needed.

### 4. Controller Layer (`UserController.java`)

No changes needed.

## Schema/Contract Changes

No changes to the API contract. The `DELETE /api/users/{id}` endpoint will now perform a soft delete.

## Modularity & Components (Frontend)

While the error was reported from the backend log, we should check if the frontend needs to handle any new state (e.g., showing a message that the user was "deactivated").
Currently, the frontend likely just removes the user from the list upon a successful 200 OK from the DELETE endpoint. Since the API will still return 200 OK after soft delete, the frontend list will update correctly as long as the fetch query also filters for active users.
