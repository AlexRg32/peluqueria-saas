# Implementation Plan - Admin Appointment Management

## Backend Implementation

- [x] **Task 1: Update Appointment Entity**
  - File: `peluqueria-api/.../model/Appointment.java`
  - Action: Add `@ManyToOne User employee;`
  - Note: Ensure proper imports and Getter/Setter (Lombok @Data handles it, but verify).

- [x] **Task 2: Update DTOs**
  - File: `peluqueria-api/.../dto/AppointmentRequest.java` (Create if missing or update)
    - Add `employeeId`.
  - File: `peluqueria-api/.../dto/AppointmentResponse.java` (Create if missing or update)
    - Add `employeeName`.

- [x] **Task 3: Implement Employee Lookup**
  - File: `peluqueria-api/.../controller/EnterpriseController.java` (or User)
  - Action: Add `GET /api/enterprises/{id}/employees` returning Users with `ROLE_EMPLEADO`.

- [x] **Task 4: Update Appointment Service & Controller**
  - File: `peluqueria-api/.../service/AppointmentService.java`
    - Logic: Fetch Employee `User`, validate role, save to Appointment.
  - File: `peluqueria-api/.../controller/AppointmentController.java`
    - Logic: Handle `employeeId` in request.
    - Logic: Add filtering by `enterpriseId` in GET.

## Frontend Implementation

- [x] **Task 5: Install Calendar Dependencies**
  - Command: `npm install react-big-calendar date-fns @types/react-big-calendar`
  - Directory: `peluqueria-client`

- [x] **Task 6: Update Services**
  - File: `peluqueria-client/src/services/appointmentService.ts`
    - Add `createAppointment`, `getAppointments`.
    - Update `Appointment` interface.
  - File: `peluqueria-client/src/services/userService.ts`
    - Add `getEmployees(enterpriseId)`.
    - Add `getCustomers(enterpriseId)`.

- [x] **Task 7: Create Appointment Modal Component**
  - File: `peluqueria-client/src/components/appointments/CreateAppointmentModal.tsx`
  - Details: Form with React Hook Form. Field for Employee, Customer, Service, Date.

- [x] **Task 8: Implement Calendar Page**
  - File: `peluqueria-client/src/pages/CalendarPage.tsx`
  - Details: Use `react-big-calendar`.
  - Style: Custom styling for events.
  - Integration: Fetch appointments and employees on mount.

- [x] **Task 9: Add Route**
  - File: `peluqueria-client/src/App.tsx` (or Router config)
  - Action: Add `/calendar` route protected for Admins.

- [x] **Task 10: Manual Verification**
  - Action: Create an appointment via UI and verify it appears on calendar.
