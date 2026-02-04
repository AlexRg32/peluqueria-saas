# Design: Calendar Redesign 2.0

## Visual Concept

A clean, modern scheduling interface that looks like a professional POS (Point of Sale) system.

## Color Palette

- Each employee will be assigned a specific CSS variable or hex color.
- Citas (Events) will have a subtle gradient background of the employee's color.
- Paid status will be indicated by a checkmark icon or a green border.

## Component Structure

1. **CalendarHeader**: Simplified navigation, view switcher (Day/Week/Month).
2. **MainCalendar**: The FullCalendar instance.
3. **EventTooltip**: Custom popover with appointment details (Status, Price, Customer Phone).

## FullCalendar Customizations

- `slotDuration`: "00:15:00" or "00:30:00" for vertical granularity.
- `nowIndicator`: True.
- `allDaySlot`: False.
- `eventMinHeight`: 30px to ensure text is always readable.
- `eventClassNames`: Dynamic classes based on employee ID.

## Interaction Flow

- Click empty slot -> Open `CreateAppointmentModal` with pre-filled date/time.
- Click event -> Open `AppointmentDetailsModal`.
- Multi-event at same time -> Side-by-side display (FullCalendar default).
