# Design: Unified Login Experience

## Architecture

We will maintain the two separate login modules (`client` and `pro`) but align their visual identity through standardized Tailwind utility sets.

## Visual Specifications

### 1. Shared Layout (Split View)

Both login pages will adopt the following structure:

- **Container**: `min-h-screen flex items-center justify-center bg-[color] px-4`
- **Grid**: `max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center relative z-10`
- **Left Panel (Hidden on mobile)**: Branding text, value propositions.
- **Right Panel**: Centered form container.

### 2. Form Architecture

Both `ClientLoginForm` and `ProLoginForm` will use:

- **Geometry**: `rounded-3xl`, `p-8`, `max-w-md`, `w-full`.
- **Effects**: `backdrop-blur-xl`, `shadow-[0_20px_50px_rgba(0,0,0,0.1)]`.
- **Inputs**:
  - `rounded-2xl`, `py-4`, `px-5`.
  - Focus state: `focus:ring-4 focus:ring-brand-primary/10`.
- **Submit Button**:
  - `rounded-2xl`, `py-4`, `font-bold`.
  - Hover: `hover:scale-[1.02]`.
  - Active: `active:scale-[0.98]`.

### 3. Theme Variants

#### A. Client (The "Luminous" Theme)

- **Page Background**: `bg-[#f8fafc]` (Brand Surface).
- **Decorative Elements**: Brand primary blurs (`/10` and `/5` opacity).
- **Form Card**: `bg-white/80`, `border-white/50`.
- **Text Color**: `text-slate-900`.

#### B. Pro (The "Nocturnal" Theme)

- **Page Background**: `bg-[#0f172a]` (Brand BG).
- **Decorative Elements**: Brand primary blurs with slightly higher contrast.
- **Form Card**: `bg-[#1e293b]/80` (Brand Accent), `border-slate-700/50`.
- **Text Color**: `text-white` for headers, `text-slate-300` for labels.

## Component Strategy

- **ClientLoginPage.tsx**: Update to ensure spacing and typography matches the pro counterpart.
- **ProLoginPage.tsx**: Rewrite to implement the split layout with professional marketing text.
- **ClientLoginForm.tsx**: Refine rounding and transitions.
- **ProLoginForm.tsx**: Refine rounding, background, and button effects to match the client version.
