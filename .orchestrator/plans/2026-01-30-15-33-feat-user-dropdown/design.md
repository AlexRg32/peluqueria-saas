# Design: User Dropdown Component

## Component Architecture

- **Component**: `UserMenu`
- **Location**: `src/components/layout/UserMenu.tsx`
- **Dependencies**:
  - `lucide-react` (for icons: User, Settings, LogOut, ChevronDown)
  - `framer-motion` (for smooth dropdown animation)

## UI/UX Design

- **Trigger**: A rounded avatar button (or initials) in the top-right.
- **Placement**: `absolute top-6 right-8` within `MainLayout.tsx`.
- **Dropdown Menu**:
  - Appears on hover or click (user said "hover dropdown").
  - Background: `bg-white/80 backdrop-blur-md` (Glassmorphism).
  - Shadow: `shadow-xl shadow-slate-200/50`.
  - Border: `1px border-slate-200/50`.
  - Items:
    - Header with user name/email.
    - Divider.
    - `Configuración` (Settings icon).
    - `Cerrar Sesión` (LogOut icon, red hover).

## State Management

- Uses `useAuth` hook from `@/features/auth/hooks/useAuth`.
- Minimal local state `isOpen` if using click trigger, but user requested hover. For "premium" feel, I'll use `framer-motion`'s `whileHover` or a simple state-controlled tooltip-like dropdown.

## Refinements

- The dropdown should have a slight offset and scale animation.
- Ensure it doesn't get cut off by parent containers.

## Tasks for Implementation

1. Install dependencies: `npm install lucide-react framer-motion`.
2. Implement `UserMenu` component.
3. Update `MainLayout` to include `UserMenu`.
