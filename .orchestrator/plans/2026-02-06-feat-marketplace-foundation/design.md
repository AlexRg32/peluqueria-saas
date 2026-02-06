# Design: Marketplace Foundation

**Goal**: Define the component structure and API contracts for the public-facing Marketplace.

## 1. Domain Model: Public Enterprise

The backend must expose a "safe" version of the Enterprise for public viewing.

```typescript
// frontend/src/types/Marketplace.ts

// The public "Microsite" data
export interface PublicEnterpriseProfile {
    id: string; // UUID
    slug: string; // "barberia-paco"
    name: string;
    description: string;
    address: string;
    city: string;
    rating: number; // 4.8
    reviewCount: number; // 120
    coverImage: string; // URL
    logo: string; // URL
    brandingColors: {
        primary: string;
        secondary: string;
    };
    contactPhone: string;
    businessHours: BusinessHour[]; // The existing type
}

// Brief summary for the search results
export interface EnterpriseSummary {
    id: string;
    slug: string;
    name: string;
    city: string;
    rating: number;
    thumbnail: string;
}
```

## 2. Component Design

### 2.1. Layouts

**`MarketplaceLayout`**

* **Role**: Top-level wrapper for `/`, `/search`, `/register`.
* **Structure**:
  * `NavbarProps`: Transparent on Hero, solid on scroll.
  * `Footer`: "For Businesses" link, Terms, etc.

**`MicrositeLayout`**

* **Role**: Wrapper for `/b/:slug`.
* **Behavior**:
  * Injects CSS variables for `var(--primary-color)` based on the fetched enterprise.
  * This ensures "Barbería A" looks red and "Barbería B" looks blue.

### 2.2. Pages

**`HomePage`**

* **Hero Section**: H1 "Encuentra tu estilo", Search Input (City/Service).
* **Featured Section**: Grid of `EnterpriseCard`.

**`EnterpriseCard`**

* Image, Name, Rating, City, "Book" button.

### 2.3. Routing & State

We will use the existing `react-router-dom`. The `App.tsx` refactor is the critical piece.

**Admin Route Migration**:
The `Sidebar.tsx` navigation items currently point to `/dashboard`. They must be updated to `/admin/dashboard`.

## 3. Implementation Steps

1. **Safety First**: Ensure `MainLayout` and `Sidebar` are updated to use `/admin` paths BEFORE changing `App.tsx` routes.
2. **Route Transition**: Update `App.tsx` to nest Admin routes under `/admin`.
3. **New Public Components**:
    * `src/components/layout/MarketplaceLayout.tsx`
    * `src/pages/marketplace/HomePage.tsx`
    * `src/types/Marketplace.ts`

## 4. API Mocking

Since the backend API for public enterprises doesn't exist yet, we will create a `MarketplaceService` with mock data to unblock frontend work.

```typescript
// src/services/MarketplaceService.ts
export const getFeaturedEnterprises = async (): Promise<EnterpriseSummary[]> => {
    // Return mock list
}
```
