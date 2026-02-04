# Investigation: Calendar Library Redesign

## Objective

Replace `react-big-calendar` with a clearer, more robust solution that handles multiple appointments at the same time and clearly identifies the assigned employee (peluquero).

## Proposed Solution: FullCalendar

FullCalendar is the standard for web calendars. The v6 version (React) is high-performance and handles overlaps by offsetting events side-by-side, which is much clearer than stacking.

### Key Features to Implement

1. **TimeGrid View**: Default to `timeGridWeek` or `timeGridDay` where the Y-axis is time.
2. **Overlap Handling**: FullCalendar automatically adjusts event widths when they overlap.
3. **Color Coding**: Each employee will have a distinct color.
4. **Custom Content**: Use `eventContent` to show Customer, Service, and Employee name clearly.
5. **Interactive**: Drag and drop support (future) and easy click-to-create.

### Library Selection

- `@fullcalendar/react`: Core React component.
- `@fullcalendar/daygrid`: Month view.
- `@fullcalendar/timegrid`: Week/Day view (essential for barbershops).
- `@fullcalendar/interaction`: For selecting slots and dragging.

## Alternative: Build Custom Grid

If FullCalendar's free version doesn't satisfy the "resource" column requirement, we can implement a custom layout where:

- Header = Employees.
- Body = 15/30 min slots.
- Events = Absolute positioned divs.

However, FullCalendar's `timeGridDay` with color coding is usually sufficient and much faster to implement with high quality.

## Decision

Use **FullCalendar** with standard views and custom styling to differentiate employees.
