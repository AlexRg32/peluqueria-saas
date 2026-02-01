# Investigation Phase: Employee Management

## Objectives

- Implement an intuitive section for managing employees (users with role EMPLEADO/ADMIN).
- Determine if we should extend `User` or create a new `Employee` entity.
- Design the UI and API endpoints.

## Current State Analysis

- **Backend Model**: `User.java` contains `id`, `name`, `email`, `password`, `role`, and `enterprise`.
- **Roles**: `SUPER_ADMIN`, `ADMIN`, `EMPLEADO`, `CLIENTE`.
- **Controller**: `UserController.java` has `/api/users/{enterpriseId}`.
- **Frontend**: `Users.tsx` is a placeholder.

## Decision: Model Structure

The current structure in `Appointment.java` uses `User` for both client and employee.
Changing this to inheritance or a separate `Employee` entity would require refactoring many parts of the system.
**Recommendation**: Continue using `User` entity. Add necessary metadata to the `User` class (like `phone`, `active`, etc.) and filter by role in the UI.

## API Requirements

- `GET /api/users/enterprise/{enterpriseId}`: List all users (employees and admins) belonging to an enterprise.
- `POST /api/users`: Create a new user (employee).
- `PUT /api/users/{id}`: Update user details.
- `DELETE /api/users/{id}`: Soft delete or de-activate user.

## Frontend Requirements

- Page: `Users.tsx` (labeled as "Gestión de Empleados" in UI).
- Table/Grid view of employees.
- Status indicator (Active/Inactive).
- Creation/Edit Modal.
- Roles selection (ADMIN, EMPLEADO).
