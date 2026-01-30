# Investigation: User Dropdown Button

## Request Analysis

- **Goal**: Implement a floating user button in the top-right corner.
- **Features**:
  - Hover dropdown.
  - Options: Settings/Configuration (placeholder for now), Logout.
- **Style**: Premium, floating, top-right.

## Technical Analysis

- **Framework**: React + Tailwind CSS (v4).
- **Layout**: The app uses `MainLayout.tsx` which houses a `Sidebar` and the main `Outlet`.
- **Auth**: `useAuth` hook provides `user` and `logout()`.
- **Current State**: `Sidebar.tsx` has user info and logout at the bottom. This should probably be simplified if the new button is added, or kept as redundant info. The user said "floating button... top-right", which typically means it stays on top of the content or in a sticky header.

## Frontend Details

- **Location**: `peluqueria-client/src/components/layout/UserDropdown.tsx` (new component).
- **Integration**: Insert into `MainLayout.tsx` or create a new `Header` component.
- **Icons**: Need for icons (Settings, Logout, User). I will recommend installing `lucide-react`.

## Questions/Risks

- Should the sidebar user section be removed? *Decision: Keep it for now, but focus the interaction on the new dropdown.*
- Mobile responsiveness: The floating button needs to work well on mobile.

## Implementation Plan Sketch

1. Install `lucide-react` (optional but recommended for premium look).
2. Create `UserDropdown.tsx`.
3. Integrate `UserDropdown.tsx` into `MainLayout.tsx`.
4. Style it with Tailwind for hover effects and animations (Framer Motion would be even better for "premium").
