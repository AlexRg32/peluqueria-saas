# Plan: Calendar Redesign with FullCalendar

## Phase 1: Preparation

1. [x] Uninstall `react-big-calendar`.
2. [x] Install FullCalendar dependencies:
   - `npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/interaction`
3. [x] `git commit -m "chore: install fullcalendar and remove old calendar"`

## Phase 2: Implementation

1. [x] Create a utility for employee colors (stable colors based on name or ID).
2. [x] Update `CalendarPage.tsx`:
   - [x] Import FullCalendar components and CSS.
   - [x] Configure basic views (timeGridWeek, timeGridDay).
   - [x] Map backend appointments to FullCalendar event format.
   - [x] Implement `eventContent` for custom rendering.
   - [x] Handle `select` (new appointment) and `eventClick` (details).
3. [ ] Add `allDay: false` explicitly to all events to avoid them appearing in the top bar.

## Phase 3: Polish

1. [ ] Style the events to be modern (rounded corners, subtle shadows).
2. [ ] Test overlap visibility (create two appointments at the same time).
3. [ ] Ensure mobile responsiveness.

## Phase 4: Finalization

1. [ ] `git commit -m "feat: implement professional calendar with FullCalendar"`
2. [ ] Verify everything works and cleanup any unused code.
