# Plan: Statistics Dashboard Implementation

## Phase 1: Backend (API)

### 1.1 DTOs

- Create `com.peluqueria.dto.DashboardStatsDTO` and nested classes for Chart data.

### 1.2 Repository Updates

- Add custom query to `AppointmentRepository` to get revenue by date and popularity of services.

### 1.3 Service Layer

- Create `DashboardService` to aggregate:
  - Sum of price where status is COMPLETED.
  - Counts by status.
  - Grouping by service and employee.

### 1.4 Controller Layer

- Create `DashboardController` with `GET /api/dashboard/stats/{enterpriseId}`.

## Phase 2: Frontend (React)

### 2.1 Dependencies

- Install `recharts` for data visualization.
- Install `date-fns` (already present, I believe).

### 2.2 API Service

- Create `src/services/dashboardService.ts`.

### 2.3 Dashboard Page

- Create `src/pages/Dashboard.tsx`.
- Implement responsive grid.
- Integrate `framer-motion` for animations.

### 2.4 Navigation & Routing

- Update `App.tsx` to include the dashboard route.
- Set dashboard as the default route for logged-in users.
- Update `MainLayout.tsx` (sidebar) to include a Dashboard link.

## Task Checklist

- [x] Implement `DashboardStatsDTO` (Backend)
- [x] Implement `DashboardService` logic (Backend)
- [x] Implement `DashboardController` (Backend)
- [x] Install `recharts` (Frontend)
- [x] Create `dashboardService.ts` (Frontend)
- [x] Create `Dashboard.tsx` and sub-components (Frontend)
- [x] Update `App.tsx` and Sidebar (Frontend)

---
*Created by @architect*
