# Design: Cash Flow and Checkout (POS)

## Backend Design

### 1. Data Model Changes

#### `PaymentMethod` Enum

```java
package com.peluqueria.model;

public enum PaymentMethod {
    CASH, CARD
}
```

#### `Appointment` Entity (`com.peluqueria.model.Appointment`)

- Add `private boolean paid = false;`
- Add `private PaymentMethod paymentMethod;`
- Add `private LocalDateTime paidAt;`

#### `AppointmentResponse` DTO (`com.peluqueria.dto.AppointmentResponse`)

- Add `private boolean paid;`
- Add `private String paymentMethod;`
- Add `private LocalDateTime paidAt;`

### 2. API Contract

#### Checkout Appointment

- **URL**: `POST /api/appointments/{id}/checkout`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
    "paymentMethod": "CASH" | "CARD"
  }
  ```

- **Response**: `200 OK` with updated `AppointmentResponse`.

### 3. Repository Updates

Update `AppointmentRepository` queries:

- `sumRevenueByEnterpriseId`: Sum `price` where `paid = true`.
- `findRevenueByDate`: Sum `price` where `paid = true`.

---

## Frontend Design

### 1. Component Structure

#### `AppointmentDetailsModal`

A modal that opens when clicking an appointment on the calendar.

- **Props**: `appointmentId`, `isOpen`, `onClose`.
- **States**: `appointment` data, `isCheckoutModalOpen`.
- **Features**:
  - Display all appointment info.
  - If `paid === false`, show "Cobrar" button.
  - If `paid === true`, show "Pagado con [Method] el [Date]" and "Imprimir Ticket".

#### `CheckoutModal`

A confirmation modal for the payment.

- **Props**: `appointment`, `isOpen`, `onClose`, `onConfirm`.
- **States**: `paymentMethod` (defaulting to CASH).
- **Features**:
  - Show amount to pay.
  - Toggle buttons for CASH/CARD.
  - "Confirmar Pago" button.

#### `ReceiptView`

A printable component.

- **Props**: `appointment`, `enterprise`.
- **Style**: Minimalist, thermal printer style (80mm width simulation if possible, or just standard clean PDF layout).

### 2. State Management

- Use `appointmentService` to fetch/update data.
- Trigger `loadAppointments` in `CalendarPage` after checkout to refresh styles.

### 3. Visual Indicators

- In `CalendarPage`, paid appointments should have a distinct visual cue (e.g., a checkmark icon or a different border/opacity).

---

## Implementation Plan Outline

1. **Backend Foundations**: Add Enum and update `Appointment` entity + DTO.
2. **Backend Logic**: Implement `checkout` method in `AppointmentService` and `AppointmentController`.
3. **Frontend Service**: Update `appointmentService.ts`.
4. **Frontend UI**:
    - Create `CheckoutModal`.
    - Create `AppointmentDetailsModal`.
    - Integrate into `CalendarPage`.
    - Implement `ReceiptView` and printing logic.
5. **Dashboard Update**: Ensure revenue reflects `paid` status.
