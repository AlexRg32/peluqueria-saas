# Implementation Plan: Billing & POS Module

Goal: Implement a billing system to manage transactions and view revenue history.
Architecture: Layered (Spring Boot) + Component-based (React).

### Phase 1: Backend (Spring Boot)

#### Task 1: Update AppointmentRepository

- [x] Add query to fetch completed appointments within a date range for an enterprise.
- [x] Add query to get revenue summary (Today, This Week).

#### Task 2: Update AppointmentService

- [x] Implement `findTransactions` method.
- [x] Implement `getBillingSummary` method.

#### Task 3: Update AppointmentController

- [x] Add GET `/api/appointments/transactions` with query params `startDate`, `endDate`.
- [x] Add GET `/api/appointments/billing-summary` for dash cards.

### Phase 2: Frontend (React)

#### Task 4: Update Frontend Services

- [x] Update `appointmentService.ts` with new billing methods.

#### Task 5: Create Billing Components (Modular)

- [x] Create `src/components/billing/BillingStats.tsx` (Summary cards).
- [x] Create `src/components/billing/BillingFilters.tsx` (Date & Method selectors).
- [x] Create `src/components/billing/TransactionTable.tsx` (The main data grid).
- [x] Create `src/components/billing/ReceiptModal.tsx` (The printable ticket view).

#### Task 6: Implement Billing Page

- [x] Create `src/pages/Billing.tsx` and assemble components.
- [x] Integrate with `AuthContext` to get `enterpriseId`.

#### Task 7: Routing & Navigation

- [x] Add route to `App.tsx`.
- [x] Add "Facturación" link to `Sidebar.tsx`.
- [x] Verify accessibility for `ADMIN` role.

### Phase 3: Verification & Polish

- [x] Verify data accuracy between dashboard and billing.
- [x] Polish UI aesthetics (transitions, hover effects).
- [x] Check mobile responsiveness.
