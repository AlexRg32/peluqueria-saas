# Investigation Phase

## 1. Request Analysis

The user wants an appointment management system for Admins.
Key features:

- Manual creation of appointments.
- Calendar view (Clear, Friendly, Intuitive).
- Display: Employee name, Service, Duration.

## 2. Current State Analysis

### Backend (`peluqueria-api`)

- **Appointment Model**:
  - Exists but associates only a Customer (`user`) and Service.
  - **Missing**: Association with an Employee (`User` with role `EMPLEADO`).
  - `user` field cannot be null, implying appointments must be linked to a registered customer.
- **Roles**: `EMPLEADO` role exists.
- **ServiceOffering**: Has `duration` (Integer).

### Frontend (`peluqueria-client`)

- **Tech**: React + Vite + Tailwind.
- **Missing**: No calendar library installed.
- **UI**: Needs a premium "Calendar" page in the dashboard.

## 3. Architecture & Design Decisions

### A. Backend

1. **Modify `Appointment` Entity**:
    - Add `private User employee;` (@ManyToOne).
    - Ensure it maps to `users` table but logically represents the provider.
2. **DTOs**:
    - Update `AppointmentRequest` (or CreateDTO) to include `employeeId`.
    - Update `AppointmentResponse` (DTO) to include `employeeName`.
3. **API Endpoints**:
    - `POST /api/appointments`: Allow Admin to create for others.
    - `GET /api/appointments`: Filter by Enterprise (already likely exists or needed).

### B. Frontend

1. **Dependencies**:
    - Install `react-big-calendar` (standard, customizable).
    - Install `date-fns` (for localizer).
2. **Components**:
    - `CalendarView`: Wrapper for `BigCalendar`.
    - `AppointmentModal`: For creating/editing appointments.
        - **Inputs**: Customer (Select), Employee (Select), Service (Select), Date/Time.
3. **Design**:
    - Premium look: Custom events with "Glassmorphism" or vibrant colors based on Service/Employee.
    - Tooltips or clear text for details.

## 4. Risks

- **Timezone handling**: Ensure Backend (LocalDateTime) and Frontend align.
- **Validation**: Ensure Employee has `EMPLEADO` role.
- **Concurrent Bookings**: Basic check preventing double booking an employee.

## 5. Next Steps

- Proceed to **Design Phase** to define the exact API Contract and UI Layout.
