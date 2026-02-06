# Design: Billing & POS Module

## Architectural Overview

The billing module will be an extension of the appointment system, focusing on the financial status of completed services. We will implement a "Transactions" view that pulls data from the `appointments` table but presents it with a financial focus.

## Data Contracts

### 1. Backend: Repository Query

We need a query to fetch transactions with filters.

```java
// AppointmentRepository.java
@Query("SELECT a FROM Appointment a WHERE a.enterprise.id = :enterpriseId AND a.status = 'COMPLETED' AND a.date BETWEEN :start AND :end ORDER BY a.date DESC")
List<Appointment> findTransactions(Long enterpriseId, LocalDateTime start, LocalDateTime end);
```

### 2. Frontend: API Hook

Update `appointmentService.ts` to include:

- `getTransactions(enterpriseId: number, startDate?: string, endDate?: string)`

## UI/UX Design

### 1. Layout: `BillingPage.tsx`

- **Header**: Title "Facturación y Caja" with a button to export.
- **Summary Cards**:
  - **Hoy**: Ingresos del día actual.
  - **Pendiente de Cobro**: Citas completadas pero no marcadas como pagadas (si aplica).
  - **Método Preferido**: El método de pago más usado esta semana.
- **Filters Row**:
  - Picker de rango de fechas (Hoy, Esta Semana, Este Mes, Personalizado).
  - Selector de Método de Pago.
- **Transactions Table**:
  - Columns: Fecha, Cliente, Servicio, Empleado, Importe, Método, Acciones (Ver Recibo).

### 2. Component: `ReceiptModal.tsx`

A clean, minimal modal showing:

- Enterprise Details (Name).
- Appointment Info (Customer, Date, Service, Employee).
- Financial Totals (Subtotal, Tax - static for now, Total).
- A "Print" button.

### 3. Navigation

- Sidebar: Add "Facturación" icon (CreditCard or Receipt).
- Role Access: Limited to `ADMIN` and `SUPER_ADMIN`.

## Component Structure

```text
src/pages/Billing.tsx
src/components/billing/
  ├── TransactionTable.tsx
  ├── BillingStats.tsx
  ├── BillingFilters.tsx
  └── ReceiptModal.tsx
```

## Security & Validation

- Ensure `enterpriseId` is always enforced from the authenticated user context.
- Validate date ranges to prevent massive data dumps (limit to 1 year max per request).
