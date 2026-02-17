# Investigation: Client Marketplace Landing Redesign

## Context

The current client landing page (`ClientPortal.tsx`) is a basic portal with a hero, quick categories, appointment cards, and a mock "Recommended" sidebar. It doesn't feel like a real marketplace app (Booksy, Airbnb style). The user wants a complete overhaul into a functional, polished marketplace experience.

## Current Architecture

### Pages & Layout

- **`ClientPortal.tsx`** — Main client-facing page at `/`, 178 lines. Has hero, categories, appointments section, recommended sidebar (all mock).
- **`ClientPortalLayout.tsx`** — Layout wrapper with top navbar, mobile hamburger menu, bottom nav (auth only), footer. 219 lines.
- **Routes**: `/` (home), `/search` (placeholder), `/b/:slug` (placeholder), `/citas` (placeholder, auth-required).

### Existing Marketplace Components (`components/marketplace/`)

These are **marketing landing page** components, NOT marketplace functionality:

- `Hero.tsx` — Full-screen dark hero with search bar (not used in ClientPortal)
- `CategorySection.tsx` + `CategoryCard.tsx` — Category grid with images
- `EnterpriseCard.tsx` — Salon card with image, rating, location, status badge
- `Features.tsx` — 6 feature cards (marketing)
- `StatsBar.tsx` — Stats counter section (marketing)
- `ProfessionalCTA.tsx` — CTA for professionals to register
- `StyleGallery.tsx` — Sliding image gallery (marketing)
- `Testimonials.tsx` — Customer testimonials (marketing)
- `SectionHeading.tsx` — Section heading utility
- `HowItWorks.tsx` — How it works steps (marketing)

### Client Portal Components (`features/client-portal/components/`)

- `PortalHero.tsx` — Hero with search and personalized greeting
- `AppointmentMiniCard.tsx` — Appointment card with date, time, status

### Services

- `MarketplaceService.ts` — Mock data with 4 enterprises (getFeaturedEnterprises)
- `appointmentService.ts` — Real API calls (getMine, getAll, etc.)
- `enterpriseService.ts` — Real API calls (getById, update, getEmployees)

### Backend

- `EnterpriseController.java` — `/api/enterprises` (findAll, findById, etc.) — public GET endpoint available.

### Types

- `EnterpriseSummary` — id, slug, name, city, rating, thumbnail
- `PublicEnterpriseProfile` — Full profile with hours, branding, etc.

### Design System

- Brand colors: gold primary (#c5a059), secondary (#ecd3a5), dark accent (slate-800)
- Tailwind CSS with custom theme tokens
- Framer Motion for animations
- Lucide icons

## Key Findings

1. **Marketing vs Marketplace**: The existing `components/marketplace/` folder contains marketing/landing page components that will be replaced entirely. The `EnterpriseCard.tsx` is the only truly reusable component.
2. **Mock-first, API-ready**: `MarketplaceService.ts` is mock-only. Need to expand mocks significantly (more salons, more data) while keeping the service abstraction layer ready for real API integration.
3. **AppointmentMiniCard** is reusable for the new design with minor styling updates.
4. **Bottom navigation** only shows for authenticated users. Needs to be visible always (with different tabs per auth state).
5. **No `/favoritos` or `/perfil` routes** exist yet.

## Impact Analysis

### Files to DELETE (old marketing components)

- `components/marketplace/Hero.tsx`
- `components/marketplace/Features.tsx`
- `components/marketplace/StatsBar.tsx`
- `components/marketplace/ProfessionalCTA.tsx`
- `components/marketplace/StyleGallery.tsx`
- `components/marketplace/Testimonials.tsx`
- `components/marketplace/HowItWorks.tsx`
- `components/marketplace/SectionHeading.tsx`
- `components/marketplace/CategorySection.tsx`
- `components/marketplace/CategoryCard.tsx`

### Files to KEEP & MODIFY

- `components/marketplace/EnterpriseCard.tsx` — Refactor into new design
- `features/client-portal/components/PortalHero.tsx` — Replace with marketplace hero
- `features/client-portal/components/AppointmentMiniCard.tsx` — Restyle

### Files to CREATE

- New marketplace home page components
- Updated bottom navigation (always visible on mobile)
- Placeholder pages (profile, favorites)
- Enhanced MarketplaceService with richer mocks

### Files to MODIFY

- `App.tsx` — New routes
- `ClientPortalLayout.tsx` — Bottom nav overhaul, layout changes
- `ClientPortal.tsx` — Complete rewrite
- `MarketplaceService.ts` — Richer mock data
