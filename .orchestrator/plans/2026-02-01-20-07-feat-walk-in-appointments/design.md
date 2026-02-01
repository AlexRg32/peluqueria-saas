# Design Document: Walk-in Appointments Implementation

## 1. UI/UX Design

### CreateAppointmentModal.tsx

The modal will be split into two "tabs" or a toggle switch:

1. **"Usuario Registrado"**: (Current flow) Search for an existing user.
2. **"Cliente sin Registro"**: Fields for:
   - **Nombre completo** (Input text) - *Required*
   - **Teléfono** (Input tel) - *Required*
   - **Servicio** (Select, existing)
   - **Barbero** (Select, existing)
   - **Fecha/Hora** (Existing picker)

### Aesthetic Note

The "Guest" form will use the same premium styling:

- Subtle borders.
- Soft shadows.
- Micro-transitions when switching between "Registered" and "Guest".

---

## 2. API Design

### POST `/api/appointments`

Updated Request DTO:

```json
{
  "enterpriseId": 1,
  "employeeId": 2,
  "serviceId": 5,
  "date": "2026-02-01T14:30:00",
  "userId": null, 
  "customerName": "Pepe Viyuela",
  "customerPhone": "+34 600000000"
}
```

### GET `/api/appointments`

The response will now include `customerName` and `customerPhone`.

---

## 3. Database Schema Migration (JPA)

### Table: `appointments`

- Change `user_id` column to allow `NULL`.
- Add column `customer_name` (VARCHAR 255).
- Add column `customer_phone` (VARCHAR 20).

---

## 4. Component Structure

- `GuestAppointmentForm.tsx`: Extracted sub-component to handle the guest-specific fields and validation logic.
- `AppointmentTypeToggle.tsx`: A segmented control to switch between modes.

---

## 5. Implementation Plan (High Level)

1. **Backend**:
   - Update `Appointment` Entity.
   - Update DTOs (`Request` & `Response`).
   - Update `AppointmentService` to handle `null` user + name/phone.
2. **Frontend**:
   - Update `appointmentService.ts` types.
   - Update `CreateAppointmentModal.tsx` UI and state.
   - Update `CalendarPage.tsx` to display the guest name in the event title.
