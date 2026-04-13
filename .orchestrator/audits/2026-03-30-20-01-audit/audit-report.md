# Comprehensive Codebase Audit Report

## Executive Summary

Saloria already has a credible base: multi-tenant backend protection is much better than in a typical early SaaS, backend tests are healthy (`50` passing), the frontend builds cleanly, and the core domains exist end to end: business profile, services, staff, customers, schedule, public booking, and checkout.

What blocks it from feeling like a serious salon system today is not "lack of screens", but lack of operational hardening in the core agenda and cash flows. Right now the product is close to a strong MVP/demo for a real salon, but not yet something I would call robust enough for daily front-desk use without friction or manual workaround.

## Prioritized Action Items

### Critical

- Prevent double-booking at the data layer, not only in Java service code.
  - Source: `AppointmentService.create` + `AppointmentRepository`
  - Recommendation: introduce transactional slot locking or a database exclusion/overlap strategy before scaling online booking.

- Complete the appointment lifecycle.
  - Source: `AppointmentController`, `AppointmentService`, `AppointmentDetailsModal`
  - Recommendation: add explicit actions and states for confirm, cancel, no-show, and reschedule before adding more secondary features.

### High

- Stop logging users out on `403`.
  - Source: `saloria-client/src/lib/axios.ts`
  - Recommendation: reserve logout for `401` and surface authorization errors in-place.

- Bring frontend status handling in line with backend/domain status values.
  - Source: `appointmentService.ts`, `AppointmentHistoryPage.tsx`, `ClientAccountPage.tsx`
  - Recommendation: make status handling explicit and shared, then test all states.

- Redesign billing as an operational module, not just a revenue summary.
  - Source: `AppointmentService.getBillingSummary`, current checkout flow
  - Recommendation: model service completion, payment registration, and reporting as separate but linked concepts.

### Moderate

- Fix the brittle frontend test and clean motion warnings.
  - Source: `DateTimePicker.test.ts`, portal component tests
  - Recommendation: remove date-sensitive assumptions and stop leaking motion props to DOM nodes.

- Reduce frontend bundle size.
  - Source: `npm run build` output
  - Recommendation: split public, auth, and admin routes into separate chunks.

- Reconcile documentation with implementation.
  - Source: docs vs appointment/payment flows
  - Recommendation: either update docs immediately or finish the missing lifecycle features in the next cycle.

## What Already Exists

- Strong starting point for tenant isolation:
  - `SecurityService`, `@PreAuthorize`, filtered repository usage, and explicit enterprise checks are good foundations.

- Useful readiness model for public profiles:
  - `EnterpriseService.buildReadiness` is a strong product pattern and should be extended to operational readiness next.

- Real public booking foundation:
  - `PublicBookingModal`, public working hours, service catalog, and client account/history already create a usable B2C spine.

- Healthy backend verification baseline:
  - Backend tests cover security, validation, migrations, and core services well enough to support the next hardening phase.

## Product Verdict

### Can it be used by a salon today?

Yes, in a controlled pilot with an owner who accepts some manual handling.

No, not yet as a "programa serio de verdad" for a salon depending on it every day at reception.

### Why not yet?

Because the system still lacks three things that real operators notice immediately:

1. Reliable agenda integrity under concurrent booking.
2. Full operational lifecycle for appointments.
3. Cash/payment behavior that matches front-desk reality.

## Recommended Next Roadmap

### Phase 1: Make the Core Operational

Goal: turn the current product into a dependable salon operating system for daily use.

- Add appointment state machine:
  - `PENDING -> CONFIRMED -> COMPLETED`
  - `PENDING/CONFIRMED -> CANCELED`
  - `PENDING/CONFIRMED -> NO_SHOW`
  - reschedule as a first-class flow with auditability

- Add double-booking protection with concurrency safety.

- Separate service status from payment status:
  - service performed
  - payment collected
  - payment method
  - receipt / reference

- Fix auth UX:
  - do not logout on authorization failures
  - show role-appropriate errors

### Phase 2: Make the Desk Work Faster

- Daily agenda operations:
  - quick confirm
  - quick cancel
  - quick mark no-show
  - quick rebook from history

- Customer CRM uplift:
  - tags
  - allergies/preferences
  - last visit / next visit cues
  - better search and filtering

- Staff operations:
  - employee schedule exceptions
  - vacations / absences
  - employee-specific service assignment

### Phase 3: Make It Commercially Strong

- Guest booking or lightweight lead capture
- reminders and confirmations by WhatsApp/email
- deposits/prepayments
- stronger receipts/invoices
- observability, backups, and incident alerts

## Suggested Immediate Build Sequence

1. Harden booking concurrency and appointment states.
2. Refactor the admin appointment details flow around the new state machine.
3. Align frontend status rendering and tests.
4. Redesign billing/cash closing around real operations.
5. Only then invest in notifications, deposits, and conversion improvements.

## Validation Snapshot

- `./mvnw test`: pass (`50` tests)
- `npm run lint`: pass
- `npm run build`: pass, but bundle-size warning on main chunk
- `npm test`: fail
  - `src/components/ui/DateTimePicker.test.ts > omits slots that would finish after closing time`

## Final Recommendation

The best next move is not another new page. It is a "core operations hardening" cycle focused on `appointments`, `payments`, and `operator UX`.

If we do that next, the project moves from "good SaaS demo with real foundations" to "software a salon can actually trust on a busy day."
