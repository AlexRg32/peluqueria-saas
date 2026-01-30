# Implementation Plan - Responsive Sidebar

## Goal

Implement a responsive sidebar that hides on small screens and can be toggled via a hamburger menu button.

## Proposed Changes

### 1. `MainLayout.tsx`

- Introduce `useState` for `isSidebarOpen`.
- Add a mobile header/button with a `Menu` icon from `lucide-react` to toggle the sidebar.
- Wrap `Sidebar` in a way that it can be controlled by `isSidebarOpen` on mobile.
- Add an overlay (backdrop) when the sidebar is open on mobile.

### 2. `Sidebar.tsx`

- Accept `isOpen` and `onClose` as props (if needed, or handle inside if it's cleaner).
- Add an `X` (close) button inside the sidebar for mobile view.
- Use `framer-motion` for the sliding animation.
- Adjust Tailwind classes for responsive behavior:
  - `hidden lg:flex` for desktop.
  - `fixed inset-y-0 left-0 z-50` for mobile when open.

## Step-by-Step implementation

1. [x] Install/Verify dependencies (`lucide-react`, `framer-motion` - already there).
2. [x] Modify `MainLayout.tsx`:
   - Add state for sidebar toggle.
   - Add the hamburger menu button (visible only on mobile).
   - Add an overlay backdrop for mobile.
3. [x] Modify `Sidebar.tsx`:
   - Update component to handle responsive states.
   - Add `framer-motion` for transitions.
   - Add close button (visible only on mobile).
4. [x] Refine styling for a "premium" feel:
   - Soft shadows.
   - Smooth transitions.
   - Blur on overlay.

## Verification Plan

- [ ] Test on desktop (sidebar should be always visible).
- [ ] Test on mobile/tablet (sidebar should be hidden by default).
- [ ] Test toggling on mobile (open/close).
- [ ] Verify navigation works when clicking links (should close sidebar on mobile after click).
