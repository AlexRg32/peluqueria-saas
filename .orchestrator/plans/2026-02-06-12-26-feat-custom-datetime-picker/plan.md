# Plan: Custom DateTime Picker with Opening Hours

## UI Components

- [x] **Create Component**: `peluqueria-client/src/components/ui/DateTimePicker.tsx`. <!-- id: 0 -->
  - Implement month calendar.
  - Implement time slot generator using opening hours.
  - Add animations with `framer-motion`.

## Integration

- [x] **Fetch Data**: Update `CreateAppointmentModal` to fetch enterprise working hours. <!-- id: 1 -->
- [x] **Replace Input**: In `CreateAppointmentModal`, swap the native date input for the new `DateTimePicker`. <!-- id: 2 -->

## Verification

- [x] **Manual Test**: Open modal, verify only opening hours are selectable. <!-- id: 3 -->
- [x] **Manual Test**: Verify selecting a different day updates the available hours. <!-- id: 4 -->
