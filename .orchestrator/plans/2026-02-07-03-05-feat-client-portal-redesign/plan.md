# Plan: Client Portal Redesign

## Phase 1: Routing & Redirects

- [x] Update `App.tsx`:
  - Restrict `/admin/dashboard` to `ADMIN` and `SUPER_ADMIN`.
  - Add `/admin/portal` as a common or `USER` restricted route.
  - Update legacy redirects if necessary.
- [x] Update `ClientLoginPage.tsx`:
  - Change `USER` redirect from `/` to `/admin/portal`.
- [x] Update `MainLayout.tsx`:
  - Filter sidebar menu items based on user role (Hide business sections for `USER`).

## Phase 2: Core Components

- [x] Create `src/pages/ClientPortal.tsx` skeleton.
- [x] Create `src/features/client-portal/components/PortalHero.tsx`:
  - Greeting text.
  - Large, styled Search Bar.
- [x] Create `src/features/client-portal/components/AppointmentMiniCard.tsx`:
  - Design for upcoming booking summary.

## Phase 3: Integration & Data

- [x] Update `src/services/appointmentService.ts`:
  - Ensure there is a method to fetch appointments for the logged-in client.
- [x] Implement data fetching in `ClientPortal.tsx`.
- [x] Add entry animations with `framer-motion`.

## Phase 4: Polish & Layout

- [x] Ensure `MainLayout` feels right for a client (Icons for "Mis Citas", "Explorar").
- [x] Final visual check on mobile responsiveness.
