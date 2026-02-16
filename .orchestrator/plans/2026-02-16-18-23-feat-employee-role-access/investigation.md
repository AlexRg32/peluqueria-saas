# Investigation: Employee Role Access Control

## Context

The application has 4 roles: `SUPER_ADMIN`, `ADMIN`, `EMPLEADO`, `CLIENTE`. Currently, the `EMPLEADO` role has inconsistent access — the sidebar shows links to pages the employee can't actually navigate to (Servicios, Clientes), and the Dashboard exposes sensitive financial data (revenue, billing charts) that employees shouldn't see.

## Current State Analysis

### Frontend Routing (App.tsx)

- `/admin/dashboard` → Accessible to `ADMIN`, `SUPER_ADMIN`, `EMPLEADO` ✅
- `/admin/servicios` → Protected for `ADMIN`, `SUPER_ADMIN` only ❌ (sidebar shows it to EMPLEADO)
- `/admin/citas` → Protected for `ADMIN`, `SUPER_ADMIN` only ❌
- `/admin/clientes` → Protected for `ADMIN`, `SUPER_ADMIN` only ❌ (sidebar shows it to EMPLEADO)
- `/admin/facturacion` → Protected for `ADMIN`, `SUPER_ADMIN` only ❌
- `/admin/usuarios` → Protected for `ADMIN` only ❌
- `/admin/empresas` → Accessible to `ADMIN`, `SUPER_ADMIN`, `EMPLEADO` ✅

### Sidebar (Sidebar.tsx)

Shows these items to EMPLEADO:

- Inicio → `/portal`
- Dashboard → `/admin/dashboard`
- Servicios → `/admin/servicios` (BROKEN - route is restricted)
- Clientes → `/admin/clientes` (BROKEN - route is restricted)
- Info del Negocio → `/admin/empresas`

### Backend Controllers

- `UserController` → All endpoints @PreAuthorize ADMIN/SUPER_ADMIN ✅
- `ServiceOfferingController` → GET is open, POST/DELETE are ADMIN/SUPER_ADMIN ✅
- `AppointmentController` → NO @PreAuthorize (any authenticated user) ⚠️
- `CustomerController` → NO @PreAuthorize (any authenticated user) ⚠️
- `DashboardController` → NO @PreAuthorize (any authenticated user) ⚠️
- `EnterpriseController` → NO @PreAuthorize (any authenticated user) ⚠️
- `WorkingHourController` → NO @PreAuthorize (any authenticated user) ⚠️

### Dashboard Page

Shows ALL data indiscriminately:

- Total Revenue (€)
- Revenue Chart (historic billing)
- Total Appointments
- Pending Appointments
- Customer Count
- Popular Services
- Employee Performance

## What an Employee SHOULD See

An employee at a barbershop needs:

1. **Their own agenda** — view their assigned appointments for the day/week
2. **Services catalog** — read-only, to know what they can offer and pricing
3. **Client information** — read-only, basic contact details for their appointments
4. **Business info** — read-only, business hours, location, etc.

An employee should NOT see:

1. ❌ Revenue / financial data
2. ❌ Billing / invoicing
3. ❌ User/staff management
4. ❌ Business-wide statistics
5. ❌ Ability to create/edit/delete services
6. ❌ Ability to modify business settings

## Changes Required

### Frontend

1. **Dashboard** — Create an employee-specific dashboard showing only their appointments for today and upcoming ones. No financial data.
2. **Routes (App.tsx)** — Allow EMPLEADO access to: Agenda (citas), Servicios (read-only), Clientes (read-only).
3. **Sidebar** — Adjust menu items for EMPLEADO: Dashboard (employee version), Mi Agenda, Servicios (read-only), Clientes (read-only). Remove "Info del Negocio".
4. **Servicios page** — Hide create/edit/delete buttons when role is EMPLEADO.
5. **Clientes page** — Consider read-only or limited write for EMPLEADO.
6. **CalendarPage** — Filter to show only the employee's own appointments.

### Backend  

7. **DashboardController** — Add employee-specific endpoint or filter financial data for non-ADMIN roles.
2. **AppointmentController** — Add @PreAuthorize where needed. Allow EMPLEADO to view their own appointments.
3. **EnterpriseController** — Restrict write operations to ADMIN/SUPER_ADMIN.

## Files to Modify

### Frontend

- `peluqueria-client/src/App.tsx`
- `peluqueria-client/src/components/layout/Sidebar.tsx`
- `peluqueria-client/src/pages/Dashboard.tsx`
- `peluqueria-client/src/pages/Services.tsx`
- `peluqueria-client/src/pages/CalendarPage.tsx`
- `peluqueria-client/src/pages/Customers.tsx`

### Backend

- `peluqueria-api/src/main/java/com/peluqueria/controller/DashboardController.java`
- `peluqueria-api/src/main/java/com/peluqueria/service/DashboardService.java` (if exists)
- `peluqueria-api/src/main/java/com/peluqueria/controller/EnterpriseController.java`
