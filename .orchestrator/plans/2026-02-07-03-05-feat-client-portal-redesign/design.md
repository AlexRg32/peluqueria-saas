# Design: Client Portal Redesign

## Architecture Overview

The Client Portal will be a personalized landing page for authenticated customers (`USER` role). It will prioritize immediate search and upcoming appointment visibility.

## Component Specification

### 1. `ClientPortalPage` (`/pages/ClientPortal.tsx`)

The main entry point for logged-in clients.

- **Layout**: Uses `MainLayout` but with a simplified sidebar or a top-navigation (depending on roles).
- **Sections**:
  - `PortalHero`: Greetings + Search Bar.
  - `AppointmentsSection`: Horizontal scroll or grid of upcoming bookings.
  - `DiscoverySection`: Featured salons nearby.

### 2. `ClientSearchBar`

A premium, large search input located in the hero section.

- **Features**: Category quick-filters (Haircut, Beard, Coloring).

### 3. `AppointmentMiniCard`

A compact card for the portal view.

- **Data**: Salon Name, Date, Time, Status.
- **Actions**: "View Details", "Get Directions".

## Data & Services

- **Service**: `src/services/appointmentService.ts`
  - Method: `getUserAppointments()` - Fetches current user's appointments.
- **State Management**: Use React Query (TanStack Query) if available, otherwise standard `useEffect` with local state.

## Routing Logic Updates

- **`App.tsx`**:
  - Change `/admin/dashboard` to be restricted to `ADMIN, SUPER_ADMIN`.
  - Add `/admin/portal` or simply `/admin` (with dynamic redirect) for `USER`.
- **`MainLayout`**:
  - Dynamic Sidebar: If role is `USER`, show "Inicio", "Mis Citas", "Explorar".

## Visual Language

- **Colors**: Use the `brand-primary` (#c5a059) but with softer backgrounds for a "spa/lifestyle" feeling.
- **Typography**: Large, bold headings for personalization ("Hola, Alex 👋").
- **Animations**: Subtle `y` offset animations using Framer Motion on page load.
