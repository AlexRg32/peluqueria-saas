# Plan: Swagger OpenAPI Documentation
>
> Goal: Install SpringDoc OpenAPI 3 in the Spring Boot backend and document all existing API contracts.
> Architecture: Use `springdoc-openapi-starter-webmvc-ui`, add OpenAPIConfig for global metadata and JWT Auth, update SecurityConfig, and decorate 9 controllers with `@Tag` and `@Operation`.

## Foundation

- [x] **Task 1: Add SpringDoc Dependency** — `peluqueria-api/pom.xml`
  - What: Add `springdoc-openapi-starter-webmvc-ui` version 2.5.0 to dependencies.
  - Verify: `./mvnw dependency:tree` or `./mvnw compile` works without errors.

- [x] **Task 2: Configure OpenAPI Bean & Security Context** — `peluqueria-api/src/main/java/com/peluqueria/config/OpenAPIConfig.java` and `SecurityConfig.java`
  - What: Create `OpenAPIConfig` to return an `OpenAPI` bean defining the API info and the `SecurityScheme` (`bearerAuth` format `JWT`). Update `SecurityConfig.java` to `permitAll` for `"/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html"`.
  - Verify: App starts, and we can access `/swagger-ui/index.html` locally without 401 Unauthorized errors (manual check or context load check).

## Core

- [x] **Task 3: Document Public and Auth Endpoints** — `AuthController.java`, `PublicController.java`
  - What: Add `@Tag`, `@Operation` to controllers.
  - Verify: Code compiles.

- [x] **Task 4: Document User & Enterprise Endpoints** — `UserController.java`, `EnterpriseController.java`, `DashboardController.java`
  - What: Add `@Tag`, `@Operation`, and `@SecurityRequirement(name = "bearerAuth")`.
  - Verify: Code compiles.

- [x] **Task 5: Document Services, Appointments, Customers & Work Hours** — `ServiceOfferingController.java`, `AppointmentController.java`, `WorkingHourController.java`, `CustomerController.java`
  - What: Add `@Tag`, `@Operation`, and `@SecurityRequirement(name = "bearerAuth")`.
  - Verify: Code compiles.

## Integration & Polish

- [ ] **Task 6: Final Test Run** — `peluqueria-api`
  - What: Run `./mvnw clean test` to ensure we didn't break any application context or tests.
  - Verify: Tests pass successfully.
