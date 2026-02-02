# Investigation: Statistics Dashboard

## Objective

Implement a high-impact dashboard for the admin panel that provides real-time statistics on revenue, appointments, and business performance.

## Backend Analysis (`peluqueria-api`)

### 1. Data Requirements

To provide a comprehensive dashboard, we need the following data points aggregated by `enterpriseId`:

- **Total Revenue**: Sum of `price` from `Appointment` where status is `COMPLETED` (or all if we want total potential).
- **Appointment Counts**: Total, Pending, Completed, and Canceled for current month/week.
- **Top Services**: Ranking of `ServiceOffering` by usage frequency.
- **Top Employees**: Ranking of `User` (employees) by number of appointments handled.
- **Sales Trend**: Daily or weekly revenue over the last 30 days.

### 2. Implementation Strategy

- **New Controller**: `DashboardController` with an endpoint like `GET /api/dashboard/stats/{enterpriseId}`.
- **Service Layer**: `DashboardService` to handle complex JPQL or Criteria API queries.
- **DTO**: `DashboardStatsResponse` containing all aggregated data to minimize round-trips.

## Frontend Analysis (`peluqueria-client`)

### 1. New Page

- `src/pages/Dashboard.tsx`: The main container.
- `src/App.tsx`: Update routing to point `/` to `/dashboard`.

### 2. Components

- **Stat Cards**: Visual cards with icons (Lucide-react) and growth indicators.
- **Charts**: Use a library like `recharts` or `chart.js` (we'll check if anything is already installed or use a lightweight one).
- **Recent Activity Table**: Simple list of the last 5-10 appointments.

### 3. Aesthetics

- Use `framer-motion` for entry animations (premium feel).
- Use a grid layout for responsiveness.
- Colors: Primary brand color for highlights, Slate/Gray for text and backgrounds.

## Technical Tasks

- [ ] Create `DashboardStatsResponse` DTO.
- [ ] Implement `DashboardService` with aggregation logic.
- [ ] Implement `DashboardController`.
- [ ] (Frontend) Install a charting library (if needed).
- [ ] (Frontend) Create `dashboardService.ts`.
- [ ] (Frontend) Build `Dashboard.tsx` and sub-components.

---
*Created by @architect*
