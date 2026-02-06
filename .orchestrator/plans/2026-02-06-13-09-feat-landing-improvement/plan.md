# Implementation Plan: Landing Page Uplift

Improve the aesthetics and content of the landing page to create a premium, "wow" experience for users and professionals.

## User Review Required

> [!IMPORTANT]
> This plan involves visual changes to the landing page. We will use `framer-motion` for animations and high-quality images.

## Proposed Changes

### `peluqueria-client`

#### [x] 1. Setup Marketplace Components

- Create directory `src/components/marketplace`.
- Implement `SectionHeading.tsx`: A reusable heading component for consistent section styling.

#### [x] 2. Create UI Components for Marketplace

- Implement `EnterpriseCard.tsx`: Improved card for displaying barbershops with better shadows and hover effects.
- Implement `ProfessionalCTA.tsx`: A refined section for business owners to register.

#### [x] 3. Create Narrative Sections

- Implement `HowItWorks.tsx`: A section explaining the booking process in 3 steps.
- Implement `Features.tsx`: A grid showing the benefits of using the platform.

#### [x] 4. Redesign Hero Section

- Implement `Hero.tsx`: A new hero section with animated entry, glassmorphic search bar, and high-impact background.

#### [x] 5. Refactor HomePage

- Update `src/pages/marketplace/HomePage.tsx` to use the new modular components.
- Wrap sections in `framer-motion` containers for scroll animations.

#### [x] 6. Polish Layout

- Update `src/components/layout/MarketplaceLayout.tsx` to improve the Navbar (better glass effect on scroll) and Footer (more detailed).

## Verification Plan

### Automated Tests

- Run `npm run lint` in `peluqueria-client` to ensure code quality.

### Manual Verification

- Verify the landing page on mobile and desktop.
- Check that all animations are smooth and not distracting.
- Ensure the search bar remains functional.
- Validate that "Featured Barberías" still load correctly from the API.
