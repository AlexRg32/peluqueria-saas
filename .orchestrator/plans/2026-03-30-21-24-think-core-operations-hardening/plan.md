# Plan: Core Operations Hardening

> WARNING: This plan is strictly theoretical. No source code files have been modified.

> Goal: convertir agenda y cobro en un núcleo operativo fiable para peluquería real.
> Architecture: state machine explícito + integridad de slot + UI operativa mínima.

## Foundation

- [ ] **Task 1: Formalizar estados operativos** — `AppointmentStatus`, DTOs, frontend status mapping`
  - What: alinear estados backend/frontend y definir cuáles bloquean agenda y cuáles no.
  - Verify: backend y frontend reconocen `PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELED`, `NO_SHOW` sin degradar a etiquetas erróneas.

- [ ] **Task 2: Diseñar transición de estado segura** — `AppointmentService`, `AppointmentController`
  - What: introducir una API de cambio de estado con reglas válidas por transición.
  - Verify: tests de servicio/controlador cubren transiciones válidas e inválidas.

- [ ] **Task 3: Blindar integridad de huecos** — `AppointmentService`, `AppointmentRepository`, migración SQL si aplica`
  - What: pasar de validación en memoria a protección transaccional/BD frente a doble booking.
  - Verify: test de concurrencia o al menos test de integración que demuestre rechazo estable del segundo solape.

## Core

- [ ] **Task 4: Añadir reprogramación operativa** — `AppointmentController`, `AppointmentService`, `CalendarPage` flow`
  - What: permitir mover cita con las mismas validaciones de disponibilidad y tenancy.
  - Verify: una cita reprogramada conserva identidad e historial y no invade slots ocupados.

- [ ] **Task 5: Separar completar servicio y cobrar** — `AppointmentService`, `AppointmentDetailsModal`, `CheckoutModal`
  - What: evitar que “cobrar” sea la única forma de cerrar una cita; permitir completar y cobrar como acciones relacionadas pero no idénticas.
  - Verify: una cita puede quedar completada sin pago, y el cobro posterior actualiza solo los campos financieros esperados.

- [ ] **Task 6: Mejorar el detalle de cita para recepción/admin** — `AppointmentDetailsModal.tsx`
  - What: añadir acciones visibles según estado: confirmar, cancelar, no-show, completar, cobrar, reprogramar.
  - Verify: botones y acciones cambian correctamente según el estado y rol.

## Integration & Polish

- [ ] **Task 7: Corregir logout por `403`** — `saloria-client/src/lib/axios.ts`
  - What: disparar expiración de sesión solo en `401`; manejar `403` como error funcional.
  - Verify: una petición prohibida no destruye la sesión del usuario.

- [ ] **Task 8: Actualizar portal cliente y cuenta** — `AppointmentHistoryPage.tsx`, `ClientAccountPage.tsx`
  - What: renderizar estados correctamente y preparar hueco para futuras acciones de cliente.
  - Verify: `CONFIRMED` no aparece como cancelada y los listados clasifican correctamente próximas/pasadas.

- [ ] **Task 9: Endurecer tests frontend de disponibilidad** — `DateTimePicker.test.ts`, tests de appointments`
  - What: quitar dependencias temporales frágiles y cubrir los nuevos flujos de estado.
  - Verify: `npm test` queda en verde de forma determinista.

- [ ] **Task 10: Documentación operativa mínima** — `docs/02-guia-usuario.md`, `docs/10-api-contract.md`
  - What: reconciliar lo que el sistema promete con lo que realmente soporta tras la fase 1.
  - Verify: docs y API contract reflejan exactamente los estados y acciones disponibles.
