# Investigation: Billing & POS Module

The objective is to implement a comprehensive billing and point-of-sale (POS) module for the Peluquería SaaS. Currently, we only have basic appointment management and a summary dashboard. This new module will allow business owners to manage transactions, filter revenue history, and generate simple receipts.

## Current State Analysis

### Backend (`peluqueria-api`)

- **Entities**: `Appointment` already has `paid`, `paymentMethod`, `price`, and `paidAt`.
- **Repository**: `AppointmentRepository` has methods to sum revenue and get historical data, but lacks specific filtering for billing lists (e.g., by date range or payment status).
- **Service**: `AppointmentService` has a `checkout` method that marks appointments as paid.
- **Controller**: `AppointmentController` handles creation, listing (all for enterprise), and checkout.

### Frontend (`peluqueria-client`)

- **Routes**: No route for billing.
- **Pages**: `Dashboard` shows total revenue and simple charts.
- **Infrastructure**: `appointmentService.ts` exists but only handles basic list/create/checkout.
- **Styling**: Using Tailwind CSS with a "brand" color scheme (emerald/gold/slate).

## Required Changes

### Phase 1: Backend Enhancements

1. **Repository**: Add `findByEnterpriseIdAndStatusAndDateBetween` or similar to allow filtered transaction history.
2. **DTOs**: Ensure `AppointmentResponse` contains all necessary fields for a receipt (it already seems quite complete).
3. **Controller/Service**: Add an endpoint/method to fetch "Transactions" which are essentially `COMPLETED` or `PAID` appointments with refined filtering.

### Phase 2: Frontend Implementation

1. **Service**: Update `appointmentService.ts` or create `billingService.ts` to fetch filtered transaction data.
2. **Components**:
    - `TransactionTable`: A list of paid appointments with sorting/filtering.
    - `BillingFilters`: Date range and payment method filters.
    - `ReceiptView`: A printable/PDF view of a transaction.
3. **Pages**:
    - `BillingPage.tsx`: The main hub for financial data.
4. **Navigation**: Update `Sidebar.tsx` and `App.tsx` to include the "Facturación" link.

## Technical Goals

- **UX**: Premium look-and-feel matching the existing dashboard.
- **Scalability**: Prepare for future features like exporting to Excel/CSV.
- **Safety**: Robust error handling for financial data.

## Next Steps

- Search for a PDF library dependency if we want to generate PDF files directly.
- Design the `BillingPage` layout (Summary cards + Main table).
