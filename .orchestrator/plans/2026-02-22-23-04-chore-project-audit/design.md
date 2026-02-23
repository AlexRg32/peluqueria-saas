# Design: Architectural Improvements & Standardisation

## Architecture Overview

The goal is to move from a "Functional Monolith" to a "Clean Modular Monolith" with better security and DX.

## Proposed Patterns

### 1. Automated Multi-Tenancy (Hibernate Filters)

Instead of manually passing `enterpriseId` or checking it in every service method, we will use Hibernate Filters.

| Component | Logic |
|-----------|-------|
| `TenantContext` | ThreadLocal to store the current `EnterpriseId`. |
| `TenantFilter` | Spring Security Filter that extracts `EnterpriseId` from the JWT and sets it in `TenantContext`. |
| `@FilterDef` | Defined in a base entity or configuration. |
| `TenantAspect` | AOP to enable the filter on Hibernate sessions automatically. |

### 2. DTO Mapping Strategy (MapStruct)

Replace manual `mapToResponse` methods with MapStruct interfaces.

| Source | Target | Why? |
|--------|--------|------|
| `Appointment` | `AppointmentResponse` | Reduce boilerplate, type safety. |
| `User` | `UserResponse` | Consistent field exclusion. |

### 3. Frontend: Feature-First Migration

Move current pages from `src/pages` to their respective feature folders in `src/features`.

**Component Tree (Example)**:

```
src/
  features/
    appointments/
      components/
      hooks/
      pages/  <-- Move pages here
      services/
    enterprises/
      ...
```

### 4. Robust Testing Environment

Fix the Java 24 conflict.

- Force Maven to use Java 17 (correct `JAVA_HOME`).
- Update `pom.xml` to include `byte-buddy` and `byte-buddy-agent` with correct versions for Java 24 if we must use it.
- **Better**: Recommend the user to downgrade local environment to Java 17 to match production.

## File Structure Changes

- `com.peluqueria.security.tenant`: New package for multi-tenancy logic.
- `com.peluqueria.mapper`: New package for MapStruct mappers.
- `src/features/appointments`: New feature folder in frontend.

## Testing Strategy

- **Unit**: Mock mappers and services.
- **Integration**: Use `@SpringBootTest` with H2 (but fix the context loading first).
- **Frontend**: Vitest with MSW (Mock Service Worker) for API mocking.
