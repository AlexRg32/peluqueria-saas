# Design: Remediacion De Auditoria

## Architecture Overview

La remediacion debe encajar en la arquitectura actual, no pelearse con ella. La idea es reforzar las costuras ya existentes:

- **Controllers** vuelven a ser adaptadores HTTP y dejan de aceptar entidades JPA crudas.
- **Services** concentran las reglas de negocio de tenant isolation, allowed roles y soft delete.
- **Repositories** incorporan filtros e indices para los accesos reales.
- **Frontend** mantiene la estructura actual pero deja de depender de mocks y placeholders en los flujos publicos mas importantes.

### Remediation Wave Map

```text
Wave 1: Security Hardening
Auth bootstrap -> role escalation -> tenant isolation -> dependency CVEs

Wave 2: Contract Hardening
DTOs -> @Valid -> typed exceptions -> inactive user enforcement

Wave 3: Data & Ops Hardening
soft delete -> repository filters -> DB indexes -> config cleanup

Wave 4: Product Completion
marketplace API -> search -> booking CTA -> profile page
```

### Request Flow After Hardening

```text
HTTP Request
  -> Controller (@Valid DTO only)
    -> Service
      -> Security/domain checks
        -> Repository
          -> DB
    -> Typed response DTO
  -> GlobalExceptionHandler (safe message + correct status)
```

## Data Model

| Entity | Key Fields | Relationships |
|--------|-----------|---------------|
| `User` | `role`, `enterprise_id`, `active` | belongs to `Enterprise` |
| `Appointment` | `enterprise_id`, `employee_id`, `customer_id`, `service_id`, `status`, `paid` | belongs to one enterprise and references internal resources |
| `ServiceOffering` | `enterprise_id`, `deleted` | belongs to `Enterprise` |
| `Customer` | `enterprise_id`, `user_id` | belongs to `Enterprise` and optionally to a portal `User` |
| `WorkingHour` | `enterprise_id`, `user_id`, `day` | belongs to enterprise or employee |

### Data Changes To Introduce

- Enforce active user semantics in auth path.
- Introduce **logical archive/delete semantics** for users and any dependent queries instead of destructive deletes.
- Add DB indexes for:
  - `appointments(enterprise_id, date)`
  - `appointments(employee_id, date)`
  - `appointments(customer_id, date)`
  - `service_offerings(enterprise_id, deleted)`
  - `customers(enterprise_id, phone)`
  - `working_hours(enterprise_id, user_id, day)`

## API Contracts

### Priority Contract Changes

| Method | Path | Body | Response | Auth |
|--------|------|------|----------|------|
| `POST` | `/api/users` | `CreateUserRequest` | `UserResponse` | `ADMIN/SUPER_ADMIN`, with explicit role guard |
| `PUT` | `/api/users/{id}` | `UpdateUserRequest` | `UserResponse` | same |
| `POST` | `/api/enterprises` | `CreateEnterpriseRequest` | `EnterpriseResponse` | restricted |
| `PUT` | `/api/enterprises/{id}` | `UpdateEnterpriseRequest` | `EnterpriseResponse` | restricted |
| `POST` | `/api/services` | `CreateServiceOfferingRequest` + image | `ServiceOfferingResponse` | restricted |
| `POST` | `/api/appointments` | validated `CreateAppointmentRequest` | `AppointmentResponse` | restricted + strict tenant checks |

### Error Contract

Todas las respuestas de error de endpoints de escritura deben converger hacia un shape consistente:

```text
{
  "message": "Mensaje entendible",
  "code": "OPTIONAL_MACHINE_CODE",
  "fieldErrors": {
    "...": "..."
  }
}
```

## Component Design

### Public B2C Flow To Complete

```text
Home / Marketplace
  -> Search
    -> Business Profile
      -> Select service
        -> Select employee or "any"
          -> Select slot
            -> Confirm booking
```

### Current Reuse Strategy

- Reuse `ClientPortalLayout`, auth context and existing pages.
- Reuse `BarbershopProfilePage` as base for the public booking entry.
- Replace `MarketplaceService` mock layer with a thin real API service.
- Keep `ReceiptModal` for UI receipts; isolate risky `jsPDF` usage in its own dependency bump block.

## File Structure

```text
saloria-api/
  src/main/java/com/saloria/
    controller/
      AuthController.java
      UserController.java
      EnterpriseController.java
      ServiceOfferingController.java
      AppointmentController.java
    dto/
      CreateUserRequest.java
      UpdateUserRequest.java
      CreateEnterpriseRequest.java
      UpdateEnterpriseRequest.java
      CreateServiceOfferingRequest.java
    service/
      AuthenticationService.java
      UserService.java
      EnterpriseService.java
      ServiceOfferingService.java
      AppointmentService.java
    exception/
      GlobalExceptionHandler.java
      ...
    model/
      User.java
      ...
    repository/
      UserRepository.java
      AppointmentRepository.java
      ...
    resources/db/migration/
      V3__...
      V4__...

saloria-client/
  src/
    services/
      MarketplaceService.ts
      appointmentService.ts
      enterpriseService.ts
    pages/
      SearchPage.tsx
      ProfilePlaceholder.tsx
      BarbershopProfilePage.tsx
    features/client-portal/
      ...
```

## Dependencies

- **Use existing packages**:
  - Spring Validation stack already available transitively through Spring Boot web stack
  - Flyway already present for schema changes
  - Vitest/RTL already present for frontend verification
- **Suggested updates only**:
  - bump `axios`
  - bump `jspdf`
  - refresh transitive deps flagged by `npm audit`

No nueva libreria es necesaria para esta primera remediacion. El objetivo es **minimal diff**.

## Testing Strategy

### Unit

- `AuthenticationService`:
  - no crea superadmin implicito
  - rechaza usuarios inactivos
- `UserService`:
  - no permite escalar a `SUPER_ADMIN` desde paths admin normales
- `AppointmentService`:
  - rechaza recursos cruzados entre empresas
  - mantiene control de conflictos horarios

### Integration

- Controller tests para:
  - `POST /api/users`
  - `PUT /api/users/{id}`
  - `POST /api/appointments`
  - auth/login con usuario inactivo
- Flyway migration tests si se añaden columnas/indices de borrado logico

### Frontend

- `npm test`
- `npm run lint`
- `npm run build`
- smoke sobre:
  - login/logout
  - admin usuarios
  - calendario crear cita
  - portal cliente marketplace/search/profile

## Failure Modes

| Flow | Realistic Failure | Coverage Needed |
|------|-------------------|-----------------|
| Login | usuario inactivo sigue entrando | unit + integration |
| Create user | admin intenta crear superadmin | integration |
| Create appointment | servicio de otra empresa se cuela | unit + integration |
| Delete/archive user | UI deja de mostrar usuarios archivados | integration + frontend |
| Public marketplace | API real vacia o falla | frontend error state |

## NOT in Scope

- Migrar auth a cookies HttpOnly en esta fase
- Rehacer toda la capa frontend a TanStack Query
- Añadir pagos online, notificaciones o app movil
- Replantear tenancy a nivel de schema por tenant
