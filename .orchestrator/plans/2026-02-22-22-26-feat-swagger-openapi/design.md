# Design: Swagger OpenAPI Documentation

## Architecture Overview
>
> We will integrate `springdoc-openapi-starter-webmvc-ui` into the Spring Boot backend. This library automatically inspects the code at runtime and generates OpenAPI v3 JSON descriptors. It also serves a connected Swagger UI HTML interface based on those descriptors. We'll secure the endpoints that need it by configuring global OpenAPI Authentication components so users can easily pass their JWT token through the Swagger UI.

## Data Model

*(No database changes)*

## Component Design

*(No frontend component changes. SpringDoc handles generating the Swagger UI automatically.)*

## File Structure

```text
peluqueria-api/
├── pom.xml                                      (Add springdoc-openapi dependency)
├── src/main/java/com/peluqueria/
│   ├── config/
│   │   ├── OpenAPIConfig.java                   (New: Global Swagger metadata and JWT Auth setup)
│   │   └── WebSecurityConfig.java (or SecurityConfig)  (Update: permitAll() for Swagger endpoints)
│   └── controller/
│       ├── AppointmentController.java           (Update: Annotate with @Tag, @Operation)
│       ├── AuthController.java                  ...
│       ├── CustomerController.java              ...
│       ├── DashboardController.java             ...
│       ├── EnterpriseController.java            ...
│       ├── PublicController.java                ...
│       ├── ServiceOfferingController.java       ...
│       ├── UserController.java                  ...
│       └── WorkingHourController.java           ...
```

## Dependencies

- **New packages**: `org.springdoc:springdoc-openapi-starter-webmvc-ui:2.5.0` (Latest stable v2.x version for Spring Boot 3+).

## Testing Strategy

- Unit: N/A
- Integration: Run the Spring Boot application and successfully load `http://localhost:8080/swagger-ui.html` and `http://localhost:8080/v3/api-docs` without authentication errors. Verify we can click the "Authorize" button and put a JWT token, and subsequent test requests to secured endpoints succeed.
