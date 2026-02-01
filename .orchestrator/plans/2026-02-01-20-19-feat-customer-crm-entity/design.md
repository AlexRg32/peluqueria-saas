# Design Document: Customer CRM Entity

## 1. Schema Design

### Entity: `Customer`

- `Long id` (PK)
- `String name`
- `String phone`
- `String email` (Optional)
- `Integer visitsCount` (Default 0)
- `String internalNotes`
- `Enterprise enterprise` (FK, ManyToOne)
- `User user` (FK, ManyToOne, Nullable) - Links to global account.

### Entity: `Appointment` (Updated)

- Remove `customerName`, `customerPhone`.
- Remove `User user`.
- **Add**: `Customer customer` (FK, ManyToOne, Not Null).

---

## 2. Business Logic: The "Flow"

### Appointment Creation Logic (`AppointmentService`)

1. **Registered Flow (`userId` provided)**:
   - Find global `User`.
   - Search for a `Customer` in this `Enterprise` linked to this `userId`.
   - **Found?** Use that Customer.
   - **Not Found?** Create new `Customer` record for this Enterprise, link to `User`, copy Name/Phone.
2. **Walk-in Flow (`customerName`/`phone` provided)**:
   - Search for a `Customer` in this `Enterprise` with this `phone`.
   - **Found?** Update Name (if different) and use.
   - **Not Found?** Create new `Customer` record for this Enterprise (Guest mode).

### Data Mapping

The `AppointmentResponse` will now pull the name/phone from the `Customer` object.

---

## 3. API Changes

- POST `/api/appointments`: Request stays mostly same, but backend logic changes.
- GET `/api/appointments`: Response returns `customerName` from the associated `Customer`.
- NEW (Future): GET `/api/customers` for the CRM list.
