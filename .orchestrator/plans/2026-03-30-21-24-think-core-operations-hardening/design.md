# Design: Core Operations Hardening

## Architecture Overview

La solución debe consolidar `Appointment` como entidad transaccional de primer nivel, con transiciones controladas y validaciones centralizadas en backend.

```text
Frontend Admin/Client
        |
        v
AppointmentController
        |
        v
AppointmentService
   | state rules
   | slot integrity
   | tenant checks
   v
AppointmentRepository + DB guarantees
```

## State Model

```text
PENDING -----> CONFIRMED -----> COMPLETED
   |               |                |
   |               |                +--> PAID? true/false kept separate
   |               |
   +-------------> CANCELED
   |
   +-------------> NO_SHOW
```

### State Notes

- `PENDING`: cita creada, pendiente de validación/atención.
- `CONFIRMED`: cita aceptada/ratificada por negocio o ya considerada firme.
- `COMPLETED`: servicio realizado.
- `CANCELED`: cita anulada antes de realizarse.
- `NO_SHOW`: cliente no acudió.

## Data Model

### Existing Entity to Extend

| Entity | Key Fields | Relationships |
|--------|-----------|---------------|
| `Appointment` | `date`, `status`, `paid`, `paymentMethod`, `paidAt`, `enterprise`, `employee`, `customer`, `service` | central transaction for salon operations |

### Suggested Additions

| Entity | Key Fields | Relationships |
|--------|-----------|---------------|
| `Appointment` | `updatedAt` already exists via audit base; add optional `completedAt`, `canceledAt`, `cancellationReason`, `notes` if needed | enrich lifecycle without creating extra table yet |

## API Contracts

| Method | Path | Body | Response | Auth |
|--------|------|------|----------|------|
| `POST` | `/api/appointments` | existing create payload | `AppointmentResponse` | admin/client |
| `PATCH` | `/api/appointments/{id}/status` | `{ status, reason? }` | `AppointmentResponse` | admin/superadmin, maybe employee with ownership rules |
| `PATCH` | `/api/appointments/{id}/reschedule` | `{ date, employeeId? }` | `AppointmentResponse` | admin/superadmin |
| `POST` | `/api/appointments/{id}/checkout` | `{ paymentMethod }` | `AppointmentResponse` | admin/superadmin |

## Data Integrity Strategy

```text
Create/Reschedule Request
        |
        v
Validate tenant + employee + service + schedule
        |
        v
Acquire slot protection
  - transactional lock and/or DB overlap guard
        |
        v
Re-check conflicting active appointments
        |
        v
Persist
```

### Conflict Rule

Only appointments in active operational states should block slot reuse:

- Blockers: `PENDING`, `CONFIRMED`
- Non-blockers: `CANCELED`, `NO_SHOW`, probably `COMPLETED`

## Component Design

### Component Tree

```text
CalendarPage
  └─ AppointmentDetailsModal
       ├─ status actions
       ├─ reschedule action
       └─ CheckoutModal

AppointmentHistoryPage
  └─ state badges and labels

ClientAccountPage
  └─ next appointment summary + state rendering
```

### State Management

- **Local state**: modal open/close, current selected appointment, optimistic action state.
- **Server state**: appointments list per enterprise, per employee, per client.

## File Structure

```text
saloria-api/
  controller/AppointmentController.java
  service/AppointmentService.java
  repository/AppointmentRepository.java
  dto/...
  model/AppointmentStatus.java
  test/java/com/saloria/service/AppointmentServiceTest.java
  test/java/com/saloria/controller/...

saloria-client/
  services/appointmentService.ts
  components/appointments/AppointmentDetailsModal.tsx
  components/appointments/CheckoutModal.tsx
  pages/CalendarPage.tsx
  pages/AppointmentHistoryPage.tsx
  pages/ClientAccountPage.tsx
  tests related to status rendering and actions
```

## Dependencies

- **Suggested new packages**: none by default.
- **Existing packages to use**: current React/Vitest/JUnit stack is enough.

## Testing Strategy

- **Unit**:
  - valid state transitions
  - invalid transitions
  - slot overlap under active states only
  - reschedule validation
- **Integration**:
  - status endpoint authorization by role/tenant
  - checkout keeps accounting fields coherent
- **Frontend**:
  - render all status badges correctly
  - appointment detail actions by role/state
  - no logout on `403`
