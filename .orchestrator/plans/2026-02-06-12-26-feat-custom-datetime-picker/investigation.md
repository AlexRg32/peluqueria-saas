# Investigation: Custom DateTime Picker with Opening Hours

## 1. Request Analysis

The user wants to:

- Replace native browser date pickers with custom ones.
- Restrict available hours to the barber shop's opening hours.

## 2. Current State

- **Backend**:
  - `WorkingHour` entity stores enterprise/user opening hours per day of the week.
  - `workingHourService.getEnterpriseHours(enterpriseId)` returns these hours.
- **Frontend**:
  - `CreateAppointmentModal.tsx` currently uses `<input type="datetime-local" />`.
  - No filtering of hours is performed on the frontend.

## 3. Data Requirements

- Fetch `WorkingHour[]` for the enterprise when the modal opens.
- Map the selected date (day of week) to the corresponding `WorkingHour` entry.
- Generate time slots (every 30 mins or 15 mins) within the `startTime` and `endTime` range if `dayOff` is false.

## 4. Component Design

- **New Component**: `DateTimePicker.tsx` or incorporate it into the modal.
- **Visuals**:
  - Date selection: A calendar view or a simplified horizontal scroll.
  - Time selection: A grid of buttons representing available slots.
- **Logic**:
  - When a date is picked, filter time slots based on `WorkingHour`.
  - (Optional) Future enhancement: filter slots already taken by appointments (though the backend already validates this).

## 5. Artifacts to Modify

- `peluqueria-client/src/components/appointments/CreateAppointmentModal.tsx`:
  - Fetch working hours.
  - Replace native input with custom picker.
- `peluqueria-client/src/components/ui/DateTimePicker.tsx` (to be created for reuse).
