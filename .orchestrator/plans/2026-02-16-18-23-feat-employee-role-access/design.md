# Design: Employee Role Access Control

## Overview

Restrict what `EMPLEADO` can see and do. Key principle: **employees see their work, not business finances**.

## What an Employee Should See

1. **Employee Dashboard** — Their appointments for today + upcoming. Number of services done. No money, no revenue.
2. **Mi Agenda (Calendar)** — Their own appointments only (filtered by employeeId). Can view details, but no checkout/cobrar.
3. **Servicios** — Read-only catalog. No create/delete buttons. Can see names, descriptions, duration. Hide prices.
4. **Clientes** — Read-only directory. Can see names/phone of customers who have appointments with them.

## What an Employee Should NOT See

- ❌ Revenue, income, billing, prices, money amounts
- ❌ Billing page
- ❌ User/staff management
- ❌ Business settings / enterprise config
- ❌ Checkout / Cobrar buttons on appointments
- ❌ Payment status, payment methods

## Changes

### 1. Backend: Add `userId` to JWT claims

**File**: `AuthenticationService.java`

- Add `extraClaims.put("userId", user.getId())` in both `register()` and `authenticate()`
- This allows the frontend to know the employee's user ID

### 2. Backend: Add endpoint for employee appointments

**File**: `AppointmentController.java`

- Add `GET /api/appointments/employee/{employeeId}` endpoint
- Returns appointments filtered by employee

**File**: `AppointmentRepository.java`

- Add: `List<Appointment> findByEmployeeIdOrderByDateDesc(Long employeeId)`

**File**: `AppointmentService.java`

- Add: `findByEmployeeId(Long employeeId)` method

### 3. Backend: Protect sensitive endpoints

**File**: `DashboardController.java`

- Add `@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")` to getStats

**File**: `AppointmentController.java`

- Add `@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")` to checkout, transactions, billing-summary

**File**: `EnterpriseController.java`

- Add `@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")` to create, update

### 4. Frontend: Add `userId` to User type

**File**: `features/auth/types/index.ts`

- Add `userId?: number;` to the User interface

### 5. Frontend: Add employee appointment service

**File**: `services/appointmentService.ts`

- Add `getByEmployee(employeeId: number)` method

### 6. Frontend: Create Employee Dashboard

**File**: `pages/Dashboard.tsx`

- Detect role. If EMPLEADO → render EmployeeDashboard component
- If ADMIN/SUPER_ADMIN → render current admin dashboard

**New File**: `components/dashboard/EmployeeDashboard.tsx`

- Shows: welcome message, today's appointments list, upcoming appointments count
- No financial data whatsoever

### 7. Frontend: Update Routes (App.tsx)

- Move `citas` out of ADMIN-only block → allow EMPLEADO access
- Move `servicios` out of ADMIN-only block → allow EMPLEADO access
- Move `clientes` out of ADMIN-only block → allow EMPLEADO access
- Keep `facturacion`, `usuarios` in ADMIN-only block
- Remove `empresas` from EMPLEADO access

### 8. Frontend: Update Sidebar

**File**: `components/layout/Sidebar.tsx`

- Remove `Inicio (/portal)` for EMPLEADO
- Keep: Dashboard, Mi Agenda (rename citas), Servicios, Clientes for EMPLEADO
- Remove: "Info del Negocio" for EMPLEADO
- Agenda role should include EMPLEADO

### 9. Frontend: Update CalendarPage for employee filtering

**File**: `pages/CalendarPage.tsx`

- If role is EMPLEADO: load only their appointments via `/api/appointments/employee/{userId}`
- Hide "Nueva Cita" button for EMPLEADO
- Keep read-only view

### 10. Frontend: Update AppointmentDetailsModal

**File**: `components/appointments/AppointmentDetailsModal.tsx`

- Accept `isAdmin` prop
- If not admin: hide price, hide checkout/cobrar button, hide payment info

### 11. Frontend: Update Services page

**File**: `pages/Services.tsx`

- This already works: `isAdmin` check hides create button
- **ServiceCard**: Hide price for non-admin users

### 12. Frontend: Update Customers page

No changes needed - already read-only. The route protection will grant access.
