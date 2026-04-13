# 1. Guidelines & Product-Readiness Findings

## High

- `saloria-client/src/lib/axios.ts:58-65`
  - The global interceptor logs the user out on both `401` and `403`.
  - In practice, a legitimate authorization denial becomes a forced logout, which is not acceptable for employee/admin daily operations.

- `saloria-client/src/components/appointments/AppointmentDetailsModal.tsx:24-33`
  - The appointment detail view only supports `checkout`.
  - There is no UI path for confirm, cancel, mark no-show, or reopen an appointment, despite the product docs describing state management for appointments.

- `saloria-client/src/pages/AppointmentHistoryPage.tsx:119-126`
  - The client portal treats any non-`PENDING` and non-`COMPLETED` status as "Cancelado".
  - If `CONFIRMED` is introduced or returned by seed/ops data, the UI will mislabel it as cancelled.

## Moderate

- `saloria-client/src/components/ui/DateTimePicker.test.ts:17-29`
  - The frontend suite currently has a time-sensitive failing test.
  - This weakens confidence in release quality and makes CI brittle depending on the execution date.

- `saloria-client/src/services/appointmentService.ts:3-8`
  - The frontend enum omits `CONFIRMED`, while the backend/database/docs still model that state.
  - This is a contract drift between layers.

- `docs/10-api-contract.md:233-238` vs `saloria-api/src/main/java/com/saloria/model/PaymentMethod.java:3-4`
  - The API contract says checkout accepts `TRANSFER`, but the backend only supports `CASH` and `CARD`.
  - The docs are ahead of the implementation.

## Minor

- Frontend test output emits React warnings about `whileInView` reaching DOM elements.
  - The suite still runs, but these warnings hide real regressions and suggest component wrappers are leaking motion props.

- `saloria-client` production build succeeds, but Vite reports a main chunk of roughly `1.76 MB` minified.
  - This is not an immediate blocker, but it is too large for a consumer-facing booking flow.
