# Plan: Fix Appointment Concurrency

## Backend Implementation

- [x] **Repository Update**: Add `findByEmployeeIdAndDateBetween` to `AppointmentRepository`. <!-- id: 0 -->
- [x] **Service Update**: Implement collision detection logic in `AppointmentService.create`. <!-- id: 1 -->

## Frontend Implementation

- [x] **Error Handling**: Update `CreateAppointmentModal` to catch and display API errors. <!-- id: 2 -->

## Verification

- [x] **Manual Test**: Verify that creating an overlapping appointment fails with a clear message. <!-- id: 3 -->
