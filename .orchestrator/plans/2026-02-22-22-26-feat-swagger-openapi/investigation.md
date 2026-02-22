# Investigation: Swagger OpenAPI Documentation

## Summary
>
> The goal is to install SpringDoc OpenAPI 3 in the Spring Boot backend and document all existing API contracts. This will automatically generate a Swagger UI dashboard where developers can view, understand, and interactively test all endpoints of the `peluqueria-api` application without needing external tools like Postman.

## Current State

- **Tech Stack**: Java 17, Spring Boot 3.3.0, Spring Security, Spring Web.
- **Relevant Code**:
  - `pom.xml`: Needs the `springdoc-openapi-starter-webmvc-ui` dependency.
  - `SecurityConfig.java`: Needs updates to permit access to Swagger UI endpoints.
  - Controllers: 9 existing REST controllers (`AuthController`, `AppointmentController`, `EnterpriseController`, etc.) that need explicit API documentation using OpenAPI annotations.
- **Architecture**: Layered architecture with JWT authentication.

## Requirements

### Functional

- [ ] Add SpringDoc OpenAPI 3 dependency for Spring Boot 3.
- [ ] Configure global OpenAPI properties (Title, Version, Description, JWT Security Scheme).
- [ ] Whitelist Swagger UI paths in Spring Security.
- [ ] Add `@Tag` and `@Operation` annotations to all endpoints to clearly define their purpose and expected inputs/outputs.

### Non-Functional

- **Security**: Provide an easy way for users to inject a JWT Bearer token directly through the Swagger UI. The UI itself should be publicly accessible, but the actual requests to secured endpoints will still require the token.

## Scope

### In Scope

- Installation of SpringDoc OpenAPI 3.
- Configuring the JWT Authorization button in Swagger UI.
- Annotating all 9 current controllers and their endpoints.
- Updating Spring Security configuration.

### Out of Scope

- Creating new API endpoints.
- Refactoring existing API request/response structures.

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Blocked by Spring Security | High | Ensure paths `/v3/api-docs/**`, `/swagger-ui/**`, y `/swagger-ui.html` are explicitly added to `requestMatchers().permitAll()` in `SecurityConfig.java`. |
| Lack of JWT support in UI | Medium | Users won't be able to test authenticated endpoints. Mitigate by defining a `SecurityScheme` in the global OpenAPI config. |

## Recommendation
>
> We should add the `springdoc-openapi-starter-webmvc-ui` dependency first. Then, update `SecurityConfig.java` to expose the endpoints. Next, create a global `OpenAPIConfig.java` to setup the metadata and JWT component. Finally, systematically go through every Controller class and apply `@Tag` and `@Operation` annotations for robust documentation.
