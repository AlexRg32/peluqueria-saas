# Investigation: Cash Flow and Checkout (POS)

## Objective

Implement a checkout process for appointments to track payments, payment methods, and generate receipts.

## Current State Analysis

- **Model**: `Appointment` has `price` and `status` (PENDING, CONFIRMED, COMPLETED, CANCELED, NO_SHOW).
- **Revenue Logic**: `AppointmentRepository` sums `price` for appointments with status `COMPLETED`.
- **UI**: `CalendarPage` shows appointments but lacks a "Checkout" flow. Clicking an appointment doesn't currently trigger any action.
- **Missing Features**:
  - No `isPaid` flag.
  - No `paymentMethod` field.
  - No receipt generation.

## Proposed Changes

### Backend (Spring Boot)

1. **New Enum**: `PaymentMethod` { CASH, CARD }.
2. **Entity Update**: `Appointment`
    - `private boolean paid = false;`
    - `private PaymentMethod paymentMethod;`
    - `private LocalDateTime paidAt;`
3. **Repository Update**: `AppointmentRepository`
    - Update `sumRevenueByEnterpriseId` and `findRevenueByDate` to filter by `paid = true` instead of `status = 'COMPLETED'`.
4. **Endpoint**: `POST /api/appointments/{id}/checkout`
    - Payload: `{ paymentMethod: "CASH" | "CARD" }`
    - Logic: Sets `paid = true`, `paymentMethod`, `paidAt`, and updates status to `COMPLETED`.

### Frontend (React)

1. **Service Update**: `appointmentService`
    - Add `checkout(appointmentId, paymentMethod)` method.
2. **UI Updates**:
    - **CalendarPage**:
        - Add `onSelectEvent` to open an `AppointmentDetailsModal`.
    - **AppointmentDetailsModal**:
        - Show details (Customer, Service, Date, Price).
        - If not paid, show "Checkout" button.
        - If paid, show payment info and "Print Receipt" button.
    - **CheckoutModal**:
        - Select payment method (Efectivo/Tarjeta).
        - Confirm amount.
    - **ReceiptComponent**:
        - Simple, clean layout for printing or saving as PDF.

## Database Schema (Implicit)

- `ALTER TABLE appointments ADD COLUMN paid BOOLEAN DEFAULT FALSE;`
- `ALTER TABLE appointments ADD COLUMN payment_method VARCHAR(20);`
- `ALTER TABLE appointments ADD COLUMN paid_at TIMESTAMP;`

## Risk Assessment

- **Existing Data**: Old "COMPLETED" appointments might need a migration to set `paid = true` if we want to keep historical revenue accurate.
- **Concurrency**: Multiple users might try to checkout the same appointment (standard JPA versioning or locking should handle this if needed).

## Next Steps

1. Proceed to **Design Phase** to define the UI/UX for the checkout flow and receipt.
2. Plan the implementation steps.
