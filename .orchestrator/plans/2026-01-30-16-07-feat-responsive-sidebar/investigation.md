# Investigation Phase - Responsive Sidebar

## Task Overview

Make the sidebar responsive. On small screens, hide it and show a hamburger icon to expand it.

## Current Implementation

- `Sidebar.tsx`: Uses Tailwind classes for styling (`w-64`, `bg-slate-900`, etc.). It's a static aside element.
- `MainLayout.tsx`: Uses `flex` to layout `Sidebar` and `main`.

## Requirements

- Responsive design (Mobile first or Breakpoints).
- Hamburger icon for mobile toggling.
- Smooth animations (using `framer-motion`).
- "Friendly" and premium UI.

## Tools & Libraries

- `lucide-react`: For icons (Menu, X).
- `framer-motion`: For sidebar transitions.
- `Tailwind CSS`: For responsive layouts.

## Challenges

- Ensuring the `UserMenu` doesn't overlap or break when the sidebar is toggled.
- Managing state between `MainLayout` and `Sidebar` (or keeping it in `MainLayout`).
