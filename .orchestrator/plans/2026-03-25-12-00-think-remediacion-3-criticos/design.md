# Design: Remediacion 3 Criticos

## Architecture Overview

La solucion debe reforzar la arquitectura actual sin reescribirla:

- **Controllers** siguen siendo finos, pero dejan de confiar en payloads batch "honestos".
- **Services** se convierten en la segunda barrera real de tenancy.
- **Repositories** dejan de ofrecer lookups peligrosos por `id` desnudo en operaciones sensibles.
- **Auth register** deja de ser una puerta de "join by name" y pasa a ser estrictamente "create business + admin inicial".

### Security Model After Fix

```text
Public register
  -> AuthController
    -> AuthenticationService
      -> reject existing enterpriseName
      -> create new enterprise only
      -> create admin for that new enterprise

Service detail/delete
  -> ServiceOfferingController (actor scoped by enterpriseId)
    -> ServiceOfferingService
      -> repository.findByIdAndEnterpriseId...

Working hours batch
  -> WorkingHourController
    -> validate every DTO enterpriseId against actor
    -> WorkingHourService
      -> load existing hour by id
      -> verify existing.enterprise.id == dto.enterpriseId
      -> verify referenced user belongs to same enterprise
```

## Data Model

| Entity | Key Fields | Relationships |
|--------|-----------|---------------|
| `Enterprise` | `id`, `name`, `slug` | parent tenant |
| `User` | `id`, `role`, `enterprise_id` | belongs to tenant |
| `ServiceOffering` | `id`, `enterprise_id`, `deleted` | belongs to tenant |
| `WorkingHour` | `id`, `enterprise_id`, `user_id` | belongs to tenant, optional employee |

### Data Changes

- **No schema change is strictly required** para cerrar los 3 criticos.
- Si mas adelante se quiere un modelo robusto de ownership/invitaciones, ahi si tendria sentido introducir:
  - `owner_id` real en `Enterprise`
  - tabla de invitaciones / claim tokens

## API Contracts

| Method | Path | Body | Response | Auth |
|--------|------|------|----------|------|
| `POST` | `/auth/register` | `RegisterRequest` | `AuthResponse` o `409` | Public |
| `GET` | `/api/services/{enterpriseId}/{id}` | none | `ServiceOfferingResponse` o `404/403` | `ADMIN/SUPER_ADMIN` + tenant scope |
| `DELETE` | `/api/services/{enterpriseId}/{id}` | none | `200` o `404/403` | `ADMIN/SUPER_ADMIN` + tenant scope |
| `PUT` | `/api/working-hours/batch` | `List<WorkingHourDTO>` | `List<WorkingHourDTO>` o `403/400` | `ADMIN/SUPER_ADMIN` + tenant scope |

### Contract Notes

- `POST /auth/register`
  - comportamiento nuevo: si `enterpriseName` ya existe, responder conflicto con mensaje explicito
  - no se debe reutilizar una empresa existente desde el endpoint publico

- `GET/DELETE /api/services/{enterpriseId}/{id}`
  - siguen con la misma ruta para no tocar frontend
  - internamente deben usar repositorio scopeado

- `PUT /api/working-hours/batch`
  - debe rechazar payloads con enterpriseIds mezclados o con IDs existentes que no pertenecen al tenant del actor

## Component Design

### Backend Touch Points

```text
saloria-api/src/main/java/com/saloria/
├── controller/
│   ├── AuthController.java
│   ├── ServiceOfferingController.java
│   └── WorkingHourController.java
├── service/
│   ├── AuthenticationService.java
│   ├── ServiceOfferingService.java
│   └── WorkingHourService.java
├── repository/
│   ├── EnterpriseRepository.java
│   ├── ServiceOfferingRepository.java
│   ├── WorkingHourRepository.java
│   └── UserRepository.java
└── test/
    ├── service/
    └── controller/
```

### Frontend Impact

- El frontend no necesita cambio estructural para los endpoints de servicios u horarios.
- El flujo de registro profesional solo necesita manejar correctamente un `409` si el nombre ya existe.
- Con el formulario actual, el catch ya renderiza `err.response?.data?.message`, asi que el impacto UI es minimo.

## File Structure

```text
saloria-api/
  src/main/java/com/saloria/
    service/
      AuthenticationService.java
      ServiceOfferingService.java
      WorkingHourService.java
    controller/
      ServiceOfferingController.java
      WorkingHourController.java
    repository/
      ServiceOfferingRepository.java
      WorkingHourRepository.java
      UserRepository.java
    exception/
      GlobalExceptionHandler.java
  src/test/java/com/saloria/
    service/
      AuthenticationServiceTest.java
      ServiceOfferingServiceTest.java
      WorkingHourServiceTest.java
    controller/
      WorkingHourControllerTest.java
      ServiceOfferingControllerTest.java

saloria-client/
  src/features/auth/components/pro/ProRegisterForm.tsx
```

## Dependencies

- **Suggested new packages**: none
- **Existing packages to use**:
  - Spring Security method authorization
  - JUnit 5 + Mockito
  - Vitest/RTL already present if hiciera falta tocar mensaje en frontend

## Testing Strategy

- **Unit**
  - registro profesional rechaza nombre de empresa existente
  - detalle/borrado de servicio no opera fuera del tenant
  - batch de horarios rechaza IDs existentes de otro tenant
  - batch de horarios rechaza usuarios referenciados fuera del tenant

- **Integration**
  - controller test para `PUT /api/working-hours/batch` con payload mixto
  - controller test para `GET` y `DELETE` de servicios con tenant/id coherentes e incoherentes
  - validacion de status code y mensaje para `POST /auth/register` en conflicto

- **Regression**
  - happy path de registro profesional nuevo sigue devolviendo token
  - happy path de servicio propio sigue funcionando
  - happy path de horarios propios sigue funcionando

## Design Decision

La decision correcta para este think es **hacer hotfix seguro sin meter invitaciones todavia**:

- ahora: bloquear join-by-name
- despues, en otra tarea: modelar invitaciones/ownership de forma explicita

Eso reduce riesgo, baja el diff y permite sacar un parche rapido sin inventar medio sistema nuevo.
