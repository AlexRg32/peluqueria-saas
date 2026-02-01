# Design Phase: Employee Management

## Backend Design

### Entity: User (Modify)

Add fields for better employee management:

- `phone`: String (Employee contact number)
- `active`: boolean (Status of employment)

### DTOs

- `UserRequest`: For creating/updating users.
- `UserResponse`: For sending user data to frontend (ensure no password is leaked).

### Security

- Only `ADMIN` or `SUPER_ADMIN` can access these endpoints.
- Ensure users can only manage employees of their own enterprise.

## Frontend Design

### Components

- `UserManagementPage`: Layout for the employees section.
- `EmployeeTable`: List of employees with columns: Photo/Initial, Name, Email, Phone, Role, Status, Actions.
- `EmployeeModal`: Form to add/edit employee details.
- `StatusBadge`: Visual indicator for roles and status.

### Aesthetics

- Glassmorphism for the modal.
- Smooth transitions.
- Material UI (v7 compatible) components.
- Color palette consistent with existing pages (Vibrant but professional).

### Workflow

1. User clicks "Añadir Empleado".
2. Modal opens with fields: Name, Email, Phone, Role, Password.
3. User fills and submits.
4. Backend creates user with specific enterprise ID.
5. Table refreshes.
