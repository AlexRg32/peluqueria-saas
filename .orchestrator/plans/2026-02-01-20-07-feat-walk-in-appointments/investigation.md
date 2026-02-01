# Investigation Report: Walk-in Appointments (Name & Phone)

## 1. Problem Statement

The current system requires every `Appointment` to be linked to a registered `User`. This is impractical for "walk-ins" (people who walk into the shop or call) who don't have an account. The admin needs to be able to quickly book these people using just their **Name** and **Phone Number**.

## 2. Current Architecture Analysis

### Backend Models

- **`Appointment.java`**:

  ```java
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;
  ```

  *Constraint*: `user_id` is mandatory.
- **DTOs**: `CreateAppointmentRequest` likely expects a `userId`.

### Frontend Components

- **`CreateAppointmentModal.tsx`**: Currently likely uses a user selector or assumes a logged-in user context.
- **`appointmentService.ts`**: Handles the API calls for appointment creation.

---

## 3. Proposed Solution

### A. Database & Model Changes

We have two options:

1. **Option 1: Nullable User + Fields**: Make `user_id` nullable in `Appointment` and add `customerName` and `customerPhone` columns.
2. **Option 2: Customer Entity**: Create a `Customer` entity that can be linked to a `User` or exist independently.

*Recommendation*: **Option 1** is faster and cleaner for this specific requirement, as it avoids complex mapping for simple "Walk-ins". We can always "promote" a record to a full User later.

**New fields for `Appointment`**:

- `customerName` (String)
- `customerPhone` (String)
- `user` (ManyToOne, change to `nullable = true`)

### B. Backend Logic

- Update `CreateAppointmentRequest` to include `customerName` and `customerPhone`.
- Update `AppointmentService.create()`:
  - If `userId` is provided, link the user.
  - If NOT, ensure `customerName` and `customerPhone` are present.
- Update `AppointmentResponse` to return these fields so the frontend can display them on the calendar.

### C. Frontend Changes

- **Modal Update**: Add a toggle or "Guest Mode" in the `CreateAppointmentModal`.
- **Form Validation**: If "Guest" is selected, Name and Phone become required.
- **Calendar Display**: The event title should use the `customerName` if `user` is null.

---

## 4. Risks & Considerations

- **Data Integrity**: We should ensure `customerPhone` follows a standard format for future "Client List" features.
- **Privacy**: Admins should be aware they are storing customer data.
- **Search**: Future "Client List" will need to query both `Users` and these "Walk-in" fields.

## 5. Next Steps

1. **Design Phase**: Define the UI for the new Modal and the database migration strategy.
2. **Implementation**: Modify the JPA entity, DTOs, and the React form.
