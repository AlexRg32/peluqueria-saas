# Plan: Customer CRM Implementation

## Phase 1: Backend Development

### Step 1.1: Create DTOs

- [ ] Create `com.peluqueria.dto.AppointmentSummaryDTO`.
- [ ] Create `com.peluqueria.dto.CustomerDetailResponse`.
- [ ] Create `com.peluqueria.dto.UpdateCustomerRequest`.

### Step 1.2: Update Repositories

- [ ] Add `findByCustomerIdOrderByDateDesc` to `AppointmentRepository`.

### Step 1.3: Enhance Service

- [ ] Add `getCustomerDetails(Long id)` to `CustomerService`.
- [ ] Add `updateCustomer(Long id, UpdateCustomerRequest request)` to `CustomerService`.

### Step 1.4: Update Controller

- [ ] Add `GET /api/customers/{id}` to `CustomerController`.
- [ ] Add `PATCH /api/customers/{id}` to `CustomerController`.

## Phase 2: Frontend Development

### Step 2.1: Update Frontend Service

- [ ] Add `getCustomerDetails` and `updateCustomer` to `src/services/customerService.ts`.

### Step 2.2: Create UI Components

- [ ] Create `src/components/customers/CustomerList.tsx`.
- [ ] Create `src/components/customers/AppointmentTimeline.tsx`.
- [ ] Create `src/components/customers/CustomerProfile.tsx`.

### Step 2.3: Integrate Main Page

- [ ] Create `src/pages/Customers.tsx`.
- [ ] Add `Customers` route to `src/App.tsx` or wherever routing is handled.

### Step 2.4: Navigation

- [ ] Add "Clientes" to `src/components/layout/Sidebar.tsx`.

## Phase 3: Final Polish & Verification

- [ ] Test customer search.
- [ ] Verify appointment history displays correctly.
- [ ] Ensure notes are saved.
- [ ] Verify responsiveness.
