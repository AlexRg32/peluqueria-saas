# Design: Custom DateTime Picker with Working Hours

## 1. UI/UX Design

### DateTimePicker Component

- **Header**: Month/Year selector with prev/next buttons.
- **Calendar Grid**: Standard 7-column layout for days. Today marked with a highlight.
- **Time Slot Section**:
  - Appears only after a date is selected.
  - Grid of buttons (e.g., 09:00, 09:30, 10:00...).
  - Disabled slots: Past times (if today) or outside working hours.
- **Aesthetics**:
  - Use `framer-motion` for transitions between date selection and time selection.
  - Premium slate/brand-primary color palette.
  - Subtle shadows and rounded corners (3xl).

## 2. Technical Specs

### State Management

- `selectedDate`: `Date | null`
- `selectedTime`: `string | null` (e.g., "14:30")
- `workingHours`: `WorkingHour[]` (fetched from API)

### Slot Generation Logic

1. Identify the day of the week for `selectedDate` (e.g., "MONDAY").
2. Find the `WorkingHour` entry for that day.
3. If `dayOff` is true or no entry: No slots available.
4. If `dayOff` is false:
    - Split `startTime` and `endTime` (e.g., "09:00", "20:00").
    - Generate intervals based on the selected service's duration or a fixed interval (e.g., 15/30 mins).
    - Compare each slot against currently taken appointments (frontend validation is secondary but nice for UX).

### Integration

- **File**: `peluqueria-client/src/components/ui/DateTimePicker.tsx`
- **Props**:
  - `value`: `string` (ISO datetime)
  - `onChange`: `(isoString: string) => void`
  - `enterpriseId`: `number`
  - `employeeId`: `number` (optional, to filter by person if needed)

## 3. Implementation Plan

1. Create `DateTimePicker` as a standalone UI component.
2. Fetch `enterpriseHours` in `CreateAppointmentModal`.
3. Replace the native `<input type="datetime-local" />` with `<DateTimePicker />`.
4. Ensure the `date` string sent to the backend remains compatible (ISO format).
