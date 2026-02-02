# Investigation Report - Backend Architecture Audit

## Status Quo

The backend follows a Spring Boot structure, but several clean architecture principles are being violated across multiple controllers.

## Identified Issues

### 1. Violation of Layered Architecture

- **EnterpriseController**: Directly injects `UserRepository` and performs manual DTO mapping for employees.
- **CustomerController**: Directly injects `CustomerRepository` and performs manual DTO mapping.

### 2. Entity Exposure (DTO Pattern)

- **EnterpriseController**: Returns `Enterprise` entities directly.
- **ServiceOfferingController**: Returns `ServiceOffering` entities.
- **UserController**: Accepts `User` entities in request bodies (`createUser`, `updateUser`).

### 3. Business Logic in Controllers

- **EnterpriseController**: Manual stream mapping for `getEmployees`.
- **ServiceOfferingController**: Logic for resolving image URLs (`http://localhost:8080/uploads/`) and JSON parsing.

### 4. Dependency Injection

- Most controllers (`EnterpriseController`, `ServiceOfferingController`, `UserController`, `AppointmentController`) use field injection (`@Autowired`) instead of the mandatory constructor-based injection.

### 5. Error Handling

- Controllers use manual `try-catch` blocks returning `ResponseEntity.badRequest()`. This should be centralized in a `GlobalExceptionHandler`.

## Affected Files

- `/peluqueria-api/src/main/java/com/peluqueria/controller/EnterpriseController.java`
- `/peluqueria-api/src/main/java/com/peluqueria/controller/CustomerController.java`
- `/peluqueria-api/src/main/java/com/peluqueria/controller/ServiceOfferingController.java`
- `/peluqueria-api/src/main/java/com/peluqueria/controller/UserController.java`
- `/peluqueria-api/src/main/java/com/peluqueria/controller/AppointmentController.java` (needs constructor injection update)
- `/peluqueria-api/src/main/java/com/peluqueria/controller/AuthController.java` (looks okay but check constructor injection)

## Recommendation

Perform a systematic refactor of all controllers to:

1. Use constructor-based injection (`@RequiredArgsConstructor`).
2. Move all repository access to Service layer.
3. Move all mapping logic to Service layer or Dedicated Mappers.
4. Ensure all API signatures use DTOs only.
5. Centralize error handling.
