# Investigation: Landing Page Improvement

## Current State Analysis

- **Core Component**: `HomePage.tsx` in `src/pages/marketplace`.
- **Layout**: `MarketplaceLayout.tsx` provides the navbar and footer.
- **Design**: Basic Tailwind CSS, functional but lacks "WOW" factor.
- **Features**: Hero with search, featured enterprises grid, and business CTA.
- **Tech Stack**: React 18, Vite, Tailwind CSS, Lucide icons.

## Identified Improvements

1. **Aesthetics**:
    - Implement glassmorphism effects in the search bar and cards.
    - Use more vibrant gradients and polished shadows.
    - Add smooth transitions and hover effects.
2. **Content Structure**:
    - Add a "How it Works" section (Search, Choose, Book).
    - Add a "Why Choose Us" section with features (Instant booking, Verified reviews, Top professionals).
    - Improve the Featured Enterprises cards with more detail (Price range, Distance - mock for now).
3. **Interactivity**:
    - Integrate `framer-motion` for reveal animations on scroll.
    - Enhance the search bar with better focus states and icons.
4. **Professional Presence**:
    - Add a section for "Partner Brands" or "As Seen In" (mock logos).
    - Improve the "Soy Profesional" CTA with more selling points.

## Technical Considerations

- Need to install `framer-motion` for animations.
- Check for global CSS or theme variables (already saw some `brand-primary` mentions).
- Maintain responsiveness across all devices.

## Proposed Plan

1. Enhance `MarketplaceLayout` (Navbar/Footer).
2. Redesign Hero section in `HomePage`.
3. Add "How it Works" and "Features" sections.
4. Polish Featured cards.
5. Add scroll animations.
