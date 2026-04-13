# 3. Architecture & Operational Findings

## Critical

- `saloria-api/src/main/java/com/saloria/controller/AppointmentController.java:27-78`
- `saloria-api/src/main/java/com/saloria/service/AppointmentService.java:158-168`
- `saloria-client/src/components/appointments/AppointmentDetailsModal.tsx:194-211`
  - The appointment lifecycle is under-modeled for a real salon.
  - The system can create an appointment and can convert it directly to paid/completed, but it lacks explicit flows for:
    - confirmation
    - cancellation
    - no-show
    - rescheduling
    - operational notes tied to the appointment
  - This means reception and day-to-day agenda management are not yet production-grade.

## High

- `saloria-api/src/main/java/com/saloria/service/AppointmentService.java:177-191`
- `saloria-api/src/main/java/com/saloria/repository/AppointmentRepository.java:35-39`
  - Billing is modeled as a thin aggregate over completed/paid appointments.
  - There is no cash-closing concept, no corrections/refunds, no payment audit trail, and no accounting separation between "service done" and "money reconciled".

- `saloria-client/src/features/client-portal/components/PublicBookingModal.tsx:131-149`
  - The B2C booking flow is functional, but it is still a narrow path:
    - requires authenticated `CLIENTE`
    - no guest lead capture
    - no confirmation step
    - no cancellation/reschedule path
  - For a real salon, this will limit adoption and generate manual support.

## Moderate

- `docs/02-guia-usuario.md:21-28` vs current implementation
  - Product documentation promises stateful appointment operations that do not fully exist in code yet.
  - This is not just a docs issue; it means roadmap and operator expectations are ahead of the actual product.

- `saloria-client` build output
  - The SPA is currently shipped as a large monolithic bundle.
  - Public marketplace, auth, admin dashboard, billing, and calendar are good candidates for route-level code splitting.
