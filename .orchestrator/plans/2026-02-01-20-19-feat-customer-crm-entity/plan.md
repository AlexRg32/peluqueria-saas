# Implementation Plan: Customer CRM Entity

Transitioning from "Walk-in Strings" to a proper "Customer CRM" relationship.

## Phase 1: Backend Infrastructure

- [x] **Create Entity**: Create `com.peluqueria.model.Customer`.
- [x] **Create Repository**: Create `com.peluqueria.repository.CustomerRepository`.
- [x] **Refactor Appointment**:
  - [x] Update `Appointment.java`: Remove `user`, `customerName`, `customerPhone`.
  - [x] Add `Customer customer` field.
- [x] **Update Repository**: Ensure `AppointmentRepository` handles the new relationship if needed.

## Phase 2: Logic Layer (The Heart)

- [x] **AppointmentService Refactor**:
  - [x] Implement `getOrCreateCustomer` logic.
  - [x] Update `create()` method.
  - [x] Update `mapToResponse()` to use `a.getCustomer()`.

## Phase 3: Database Synchronization

- [x] **SQL Fix**: Execute manual `ALTER TABLE` to drop old columns and add the new `customer_id` column if Hibernate fails to auto-migrate.

## Phase 4: Frontend Updates

- [x] **Types**: Update interfaces if necessary (though the UI might not change much).
- [x] **Verification**: Ensure appointments still show the correct names on the calendar.
