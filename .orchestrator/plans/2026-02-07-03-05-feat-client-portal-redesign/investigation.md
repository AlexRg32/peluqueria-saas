# Investigation: Client Portal Redesign

## Request Analysis

The user wants to redesign the experience after a client (`USER` role) logs in. Instead of a generic or business-oriented dashboard, they want a portal focused on finding hair salons and managing personal appointments.

## Current State Analysis

- **Routing**: In `App.tsx`, the `/admin/dashboard` route is currently "common", meaning both `ADMIN/SUPER_ADMIN` and `USER` can access it.
- **Dashboard**: The `Dashboard.tsx` component is exclusively designed for business metrics (Total Revenue, Team Performance, etc.), which makes no sense for a client.
- **Login Flow**: `ClientLoginPage.tsx` currently redirects clients to `/`.
- **Marketplace**: There is a `MarketplaceLayout` and `HomePage` at `/`, but it seems static or broad.

## Potential Issues

1. **Access Control**: Clients can access `/admin/dashboard` and see business stats (or a "No stats" view if the API filters it, but the UI is still business-oriented).
2. **Missing Client Center**: There is no dedicated view for a logged-in client to see their specific bookings, favorites, and a personalized search experience.
3. **UX Fragmentation**: The transition from login to a "search-first" experience isn't prominent enough if they just land on the generic home page.

## Proposed Solution

1. **New Feature**: Create a `ClientPortal` component (probably in `features/client-portal`).
2. **Route Separation**:
   - `ADMIN/SUPER_ADMIN` -> `/admin/dashboard` (Business Stats).
   - `USER` -> `/portal` or `/admin/portal` (Client Portal).
3. **Client Portal Content**:
   - **Hero/Search**: Large search bar to find salons.
   - **My Next Appointments**: Quick view of upcoming bookings.
   - **Favorite/Recent Salons**: Quick access to known places.
4. **Layout Updates**: Ensure the sidebar/navigation for a `USER` role reflects "My Bookings", "Search", "Settings" instead of "Services", "Billing", etc.

## Conclusion

The redesign requires creating a new "Client Home" experience and tightening the role-based routing to ensure clients never see the Pro dashboard.
