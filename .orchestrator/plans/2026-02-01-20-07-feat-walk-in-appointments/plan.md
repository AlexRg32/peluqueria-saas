# Implementation Plan: Walk-in Appointments

Executing the roadmap to allow admins to create appointments for unregistered customers via Name and Phone.

## Phase 1: Backend Infrastructure (API)

- [x] **Modify Entity**: Update `com.peluqueria.model.Appointment` to make `User` nullable and add `customerName`, `customerPhone`.
- [x] **Update DTOs**:
  - [x] Update `CreateAppointmentRequest` with `customerName` and `customerPhone`.
  - [x] Update `AppointmentResponse` to include these fields.
- [x] **Update Service**: Modify `AppointmentService` to:
  - [x] Logic to set `enterprise`, `employee`, `service`.
  - [x] Conditional logic: if `userId` is present, fetch and set `User`. If not, set `customerName` and `customerPhone`.
- [x] **Validation**: Ensure `customerName` and `customerPhone` aren't both null if `userId` is null.

## Phase 2: Frontend Data Layer

- [x] **Service Update**: Update `src/services/appointmentService.ts` types and interface.
- [x] **Mapping**: Update `CalendarPage.tsx` to handle the new fields in the event mapping.

## Phase 3: UI Implementation

- [x] **Modal Enhancement**:
  - [x] Add a "Tipo de Cliente" toggle in `CreateAppointmentModal.tsx`.
  - [x] Add conditional rendering for Name and Phone inputs.
- [x] **Validation**: Add frontend validation for the new fields.
- [x] **Styling**: Ensure new fields match the premium aesthetic.

## Phase 4: Verification

- [x] Test creating a "Registered User" appointment.
- [x] Test creating a "Walk-in" (Guest) appointment.
- [x] Verify both appear correctly on the Calendar.
