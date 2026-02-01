# Investigation Report: Customer CRM Entity Implementation

## 1. Context

The current "Walk-in" implementation stores customer data as plain strings in the `Appointment` table. This prevents tracking customer history, notes, or loyalty across multiple visits to a specific shop. Additionally, global `User` accounts need a way to be "locally" represented within a shop's context.

## 2. Structural Requirements

- **Global User**: Exists in the `users` table. Can book in many shops.
- **Local Customer**: A record in the `customers` table that belongs to ONE `Enterprise`.
- **The Link**: `Customer` can optionally point to a `User`.

## 3. Impacted Areas

- **Backend**:
  - New `Customer` entity and repository.
  - Update `Appointment` to point to `Customer` (mandatory).
  - Update `AppointmentService` to manage the lifecycle of `Customer` during appointment creation.
- **Frontend**:
  - Update `appointmentService.ts` to reflect the new structure.
  - Update `CreateAppointmentModal` - although the UI remains similar, the backend logic changes significantly (it will now ensure a `Customer` exists).
  - Preparation for a future "Customer List" (CRM) page.

## 4. Migration Strategy

Existing appointments with `customerName`/`customerPhone` (from the previous walk-in implementation) should ideally be migrated to the new `Customer` table, or we start fresh if the database is in early dev. Given the user's request, we will prioritize the new structure and adjust the logic to handle the transition.
