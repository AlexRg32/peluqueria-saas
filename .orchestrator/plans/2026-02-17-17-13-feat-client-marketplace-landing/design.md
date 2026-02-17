# Design: Client Marketplace Landing

## Architecture Overview

The client-facing experience transforms from a basic portal into a **Booksy/Airbnb-style marketplace**. The page is structured as scrollable sections with a sticky bottom navigation on mobile.

## Component Tree

```
ClientPortalLayout (modified)
├── TopNavbar (existing, minor tweaks)
├── <Outlet /> → ClientPortal (rewritten)
│   ├── MarketplaceHero          (NEW - search bar + greeting)
│   ├── QuickCategories          (NEW - horizontal scrollable chips)
│   ├── UpcomingAppointments     (NEW - horizontal cards, auth only)
│   ├── FeaturedSalons           (NEW - grid of SalonCard)
│   ├── PopularNearYou           (NEW - horizontal scroll of SalonCard compact)
│   └── DownloadAppCTA           (NEW - simple CTA banner)
├── BottomTabBar (NEW - always visible on mobile)
└── Footer (existing, simplified)
```

## New Components

### 1. `MarketplaceHero`

**Path**: `features/client-portal/components/MarketplaceHero.tsx`  
**Purpose**: Compact hero with personalized greeting (auth) or generic tagline + search bar.

Props:

```ts
interface MarketplaceHeroProps {
  userName?: string;
  onSearch: (query: string) => void;
}
```

Design:

- Gradient background (slate-900 → brand tones), compact (not full-viewport)
- Large search input with icon
- Subtle animated background blobs
- "Hola, {name}" when authenticated, "Encuentra tu peluquería ideal" otherwise

### 2. `QuickCategories`

**Path**: `features/client-portal/components/QuickCategories.tsx`  
**Purpose**: Horizontally scrollable category pills/chips.

Props:

```ts
interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}
```

Design:

- Horizontal scroll, no wrapping
- Small circular icon + label underneath
- Active state with brand color highlight

### 3. `UpcomingAppointments`

**Path**: `features/client-portal/components/UpcomingAppointments.tsx`  
**Purpose**: Shows next 3 appointments as horizontal scroll cards. Only for authenticated users.

Props:

```ts
interface UpcomingAppointmentsProps {
  appointments: Appointment[];
  loading: boolean;
}
```

Design:

- Section heading "Tus Próximas Citas" with "Ver todas" link
- Horizontal scroll of compact appointment cards
- If no appointments: CTA to book first appointment
- If not authenticated: CTA to sign in

### 4. `AppointmentCard`

**Path**: `features/client-portal/components/AppointmentCard.tsx`  
**Purpose**: Compact appointment card for horizontal scroll.

Props:

```ts
interface AppointmentCardProps {
  serviceName: string;
  date: string;
  time: string;
  status: string;
  salonName?: string;
}
```

Design:

- Compact card (fixed width ~280px)
- Status badge (color-coded: pending=amber, confirmed=emerald, cancelled=red)
- Date and time prominent

### 5. `SalonCard`

**Path**: `features/client-portal/components/SalonCard.tsx`  
**Purpose**: Enterprise/salon card for grid and horizontal layouts. Replaces `EnterpriseCard.tsx`.

Props:

```ts
interface SalonCardProps {
  salon: EnterpriseSummary;
  variant?: 'grid' | 'compact';
  index?: number;
}
```

Design:

- `grid` variant: Vertical card with large image, name, rating stars, city, services preview
- `compact` variant: Smaller horizontal card for "Popular near you" section
- Hover lift + shadow, image zoom on hover
- Link to `/b/:slug`

### 6. `FeaturedSalons`

**Path**: `features/client-portal/components/FeaturedSalons.tsx`  
**Purpose**: Grid section showing featured/all salons.

Props:

```ts
interface FeaturedSalonsProps {
  salons: EnterpriseSummary[];
  loading: boolean;
}
```

Design:

- Section heading "Peluquerías Destacadas"
- 2-col mobile, 3-col tablet, 4-col desktop grid
- Skeleton loading states

### 7. `PopularNearYou`

**Path**: `features/client-portal/components/PopularNearYou.tsx`  
**Purpose**: Horizontal scroll with compact salon cards.

Props:

```ts
interface PopularNearYouProps {
  salons: EnterpriseSummary[];
}
```

### 8. `BottomTabBar`

**Path**: `components/layout/BottomTabBar.tsx`  
**Purpose**: Mobile bottom navigation, always visible.

```ts
// Tabs (always visible):
// - Inicio (Home icon) → /
// - Explorar (Search icon) → /search
// Auth-only tabs:
// - Mis Citas (Calendar icon) → /citas
// - Perfil (User icon) → /perfil
// Non-auth alternative:
// - Acceder (LogIn icon) → /auth/login
```

Design:

- Glassmorphism dark bar
- Active indicator with brand color
- Smooth icon transitions

### 9. Placeholder Pages

- `/perfil` → `ProfilePlaceholder.tsx` — "Próximamente" with icon
- `/search` → `SearchPlaceholder.tsx` — "Buscador próximamente" with search icon

## Data Layer

### `MarketplaceService.ts` (Enhanced)

```ts
// Expand mock data to 8-10 enterprises with richer info
interface EnterpriseSummary {
  id: string;
  slug: string;
  name: string;
  city: string;
  rating: number;
  reviewCount: number;
  thumbnail: string;
  services: string[];   // NEW: preview of services
  priceRange: string;   // NEW: "€€" indicator
  distance?: string;    // NEW: "1.2 km"
}

// API-ready function signatures
export const marketplaceService = {
  getFeatured: () => Promise<EnterpriseSummary[]>,
  getNearby: () => Promise<EnterpriseSummary[]>,
  search: (query: string) => Promise<EnterpriseSummary[]>,
};
```

## Modified Files

### `ClientPortal.tsx` — Complete Rewrite

- Orchestrator page that loads data and renders section components
- Fetches featured salons, user appointments (if auth)
- Passes data down to child components

### `ClientPortalLayout.tsx` — Modifications

- Remove old bottom nav logic
- Add `BottomTabBar` component (always visible)
- Keep top navbar mostly as-is

### `App.tsx` — New Routes

- Add `/perfil` route (auth-required, placeholder)
- Keep `/search`, `/citas`, `/b/:slug`

## Files to Delete

All files in `components/marketplace/`:

- Hero.tsx, CategoryCard.tsx, CategorySection.tsx, Features.tsx
- StatsBar.tsx, ProfessionalCTA.tsx, StyleGallery.tsx
- Testimonials.tsx, SectionHeading.tsx, HowItWorks.tsx
- EnterpriseCard.tsx (replaced by SalonCard)

Delete from `features/client-portal/components/`:

- PortalHero.tsx (replaced by MarketplaceHero)
- AppointmentMiniCard.tsx (replaced by AppointmentCard)

## UI/UX Decisions

1. **No full-viewport hero** — Compact hero keeps content accessible immediately (Booksy pattern)
2. **Horizontal scroll for appointments** — Less vertical space, more app-like feel
3. **Always-visible bottom nav** — Even non-auth users see Home/Explore/Sign In tabs
4. **Skeleton loading** — Premium feel during data fetch
5. **Distance indicators** — Mock "X km" for now, geolocation later
6. **Price range** — "€" / "€€" / "€€€" indicator on salon cards
