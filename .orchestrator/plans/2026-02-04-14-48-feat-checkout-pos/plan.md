# Plan: Cash Flow and Checkout (POS) 💰
>
> Goal: Enable marking appointments as paid with a specific payment method and generating receipts.
> Architecture: Layered (Controller -> Service -> Repository) with React component-based UI.

## Phase 1: Backend Implementation

### Task 1: Create PaymentMethod Enum [x]

1. Create `com.peluqueria.model.PaymentMethod` with `CASH`, `CARD`.
2. Verify compilation.
3. Commit + `/checkpoint`.

### Task 2: Update Appointment Entity [x]

1. Add `paid` (boolean), `paymentMethod` (PaymentMethod), and `paidAt` (LocalDateTime) to `Appointment.java`.
2. Run tests/verify JPA mapping.
3. Commit + `/checkpoint`.

### Task 3: Update AppointmentResponse DTO [x]

1. Add corresponding fields to `AppointmentResponse.java`.
2. Update `AppointmentService` mapping logic (if manual) or ensure Lombok works.
3. Commit + `/checkpoint`.

### Task 4: Update AppointmentRepository Queries [x]

1. Modify `sumRevenueByEnterpriseId` and `findRevenueByDate` to filter by `paid = true`.
2. Verify revenue metrics in a mocked dashboard call.
3. Commit + `/checkpoint`.

### Task 5: Implement Checkout Logic in AppointmentService [x]

1. Add `checkout(Long id, PaymentMethod method)` method.
2. Ensure it sets `paid = true`, `paidAt = LocalDateTime.now()`, `paymentMethod`, and `status = COMPLETED`.
3. Commit + `/checkpoint`.

### Task 6: Implement Checkout Controller Endpoint [x]

1. Add `POST /api/appointments/{id}/checkout` in `AppointmentController.java`.
2. Verify with a simple `curl` or Postman.
3. Commit + `/checkpoint`.

## Phase 2: Frontend Implementation

### Task 7: Update appointmentService.ts [x]

1. Add `checkout` method to call the new backend endpoint.
2. Add `getAppointmentDetails` method to fetch appointment details by ID.
3. Commit + `/checkpoint`.

### Task 8: Create CheckoutModal Component [x]

1. Create `CheckoutModal.tsx` using MUI components (consistent with project style).
2. Add toggle buttons for Cash/Card and a submit button.
3. Commit + `/checkpoint`.

### Task 9: Create AppointmentDetailsModal Component [x]

1. Create `AppointmentDetailsModal.tsx` to show appointment info.
2. Integrate "Checkout" button which opens `CheckoutModal`.
3. Add "Print Receipt" button (hidden if not paid).
4. Commit + `/checkpoint`.

### Task 10: Create ReceiptView and Printing Logic [x]

1. Create a clean `ReceiptTemplate.tsx` for printing.
2. Implement a helper to trigger print dialog for this component.
3. Commit + `/checkpoint`.

### Task 11: Integrate into CalendarPage [x]

1. Add `onSelectEvent` handler to `Calendar` in `CalendarPage.tsx`.
2. Open `AppointmentDetailsModal` on event click.
3. Verify the full flow: Click -> View -> Checkout -> Refresh.
4. Commit + `/checkpoint`.

### Task 12: Visual Polish [x]

1. Add a "Paid" badge or icon to events in the calendar if `paid === true`.
2. Commit + `/checkpoint`.
