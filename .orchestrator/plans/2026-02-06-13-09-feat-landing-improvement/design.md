# Design: Landing Page Uplift

## Architecture

We will decompose the `HomePage.tsx` into several smaller, focused components located in `src/components/marketplace/`.

### New Components

1. **`Hero.tsx`**:
    - Animated background or high-res image with overlay.
    - Centered heading with animated textreveal.
    - Glassmorphic search bar.
2. **`SectionHeading.tsx`**:
    - Reusable component for section titles and subtitles with consistent styling.
3. **`EnterpriseCard.tsx`**:
    - Enhanced card design with better image handling, rating display, and interactive hover states.
4. **`HowItWorks.tsx`**:
    - Horizontal or vertical steps (Search -> Choose -> Book).
    - Uses icons from `lucide-react`.
5. **`Features.tsx`**:
    - Grid of benefits for users (Instant, Reliable, Quality).
6. **`ProfessionalCTA.tsx`**:
    - Dedicated component for the "Soy Profesional" section with improved visual weight.

## Visual Design

- **Animations**: Use `framer-motion` for:
  - Fade-in-up on scroll for all sections.
  - Scale effects on cards.
  - Transitions Between pages.
- **Glassmorphism**: Apply `backdrop-blur-md` and semi-transparent backgrounds to the search bar and card footers.
- **Typography**: Emphasize headings with `tracking-tight` and `font-extrabold`. Use `text-brand-primary` for key accents.
- **Floating Elements**: Subtle floating animations for some icons to add "life" to the page.

## Implementation Details

- **Animations**: `initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}`.
- **Grid**: Use responsive Tailwind grids (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
- **Images**: Use curated images from Unsplash via `generate_image` or existing high-quality URLs.

## Task Breakdown

1. Create `src/components/marketplace` directory.
2. Implement `SectionHeading.tsx` and `EnterpriseCard.tsx`.
3. Implement `Hero.tsx` with search logic.
4. Implement `HowItWorks.tsx` and `Features.tsx`.
5. Refactor `HomePage.tsx` to use these components.
6. Polish `MarketplaceLayout.tsx` (Navbar/Footer).
