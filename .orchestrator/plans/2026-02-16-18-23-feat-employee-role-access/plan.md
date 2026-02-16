# Plan: Employee Role Access Control

## Tasks

### Backend Changes

- [ ] **Task 1**: Add `userId` to JWT claims in `AuthenticationService.java`
  - In `register()`: add `extraClaims.put("userId", user.getId())`
  - In `authenticate()`: add `extraClaims.put("userId", user.getId())`

- [ ] **Task 2**: Add employee appointments endpoint
  - `AppointmentRepository.java`: add `findByEmployeeIdOrderByDateDesc(Long employeeId)`
  - `AppointmentService.java`: add `findByEmployeeId(Long employeeId)`
  - `AppointmentController.java`: add `GET /api/appointments/employee/{employeeId}`

- [ ] **Task 3**: Protect sensitive backend endpoints with `@PreAuthorize`
  - `DashboardController.java`: add `@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")` to getStats
  - `AppointmentController.java`: add `@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")` to checkout, getTransactions, getBillingSummary
  - `EnterpriseController.java`: add `@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")` to create, update

### Frontend Changes

- [ ] **Task 4**: Add `userId` to frontend User type in `features/auth/types/index.ts`

- [ ] **Task 5**: Add `getByEmployee` method to `services/appointmentService.ts`

- [ ] **Task 6**: Create `components/dashboard/EmployeeDashboard.tsx`
  - Welcome message with employee name
  - Today's appointments list (no prices)
  - Upcoming appointments count
  - No financial data

- [ ] **Task 7**: Update `pages/Dashboard.tsx` to render EmployeeDashboard for EMPLEADO role

- [ ] **Task 8**: Update routes in `App.tsx`
  - Allow EMPLEADO access to: citas, servicios, clientes
  - Keep facturacion, usuarios restricted to ADMIN/SUPER_ADMIN
  - Remove empresas from EMPLEADO

- [ ] **Task 9**: Update `components/layout/Sidebar.tsx`
  - Adjust menu items for EMPLEADO: Dashboard, Agenda, Servicios, Clientes
  - Remove "Inicio" and "Info del Negocio" for EMPLEADO
  - Add EMPLEADO to Agenda roles

- [ ] **Task 10**: Update `pages/CalendarPage.tsx` for employee filtering
  - If EMPLEADO: use getByEmployee to load only their appointments
  - Hide "Nueva Cita" button for EMPLEADO

- [ ] **Task 11**: Update `AppointmentDetailsModal.tsx`
  - Add `isAdmin` prop
  - Hide price, checkout button, and payment info for non-admin

- [ ] **Task 12**: Update `ServiceCard.tsx` to hide prices for non-admin
  - Pass and use `showPrice` or use existing `isAdmin` to hide price display
