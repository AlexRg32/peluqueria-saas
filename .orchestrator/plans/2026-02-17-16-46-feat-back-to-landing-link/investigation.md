# Investigation: Back to Landing Link

## Objective

Add a consistent way to return to the landing page from both Client and Pro login pages.

## Proposed Solution

Add an absolute positioned navigation link in the top-left corner of the authentication pages.

### Navigation Destination

- The link should point to `/` (Landing Page).

### Component Placement

- `ClientLoginPage.tsx`: Top-left corner, styled for light theme.
- `ProLoginPage.tsx`: Top-left corner, styled for dark theme.

### Visual Identity

- Use `ArrowLeft` icon from `lucide-react`.
- Typography: Semibold/Bold text, readable size.
- Interactive: Hover effect (opacity change or background tint).
- Positioning: `top-8 left-8` or `top-6 left-6` depending on viewport size.

## Technical Details

- Use `Link` from `react-router-dom`.
- Use `ArrowLeft` from `lucide-react`.
- Tailwind classes for positioning: `absolute top-8 left-8 z-50`.
