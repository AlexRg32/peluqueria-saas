# Investigation: Marketplace Foundation & Routing Refactor

**Goal**: Establish the architectural foundation for the "Marketplace" (Public Booking) side of the application within the existing repository, ensuring a clean separation from the "Admin" side.

## 1. Architectural Strategy: The "Monolith" Approach

As agreed, we will keep both the Public Marketplace and the Admin SaaS in the same React application to maximize code reuse and development speed.

### Routing Structure Changes

Currently, the app assumes `Root (/)` = `Admin Dashboard` (protected).
We need to shift to:

* **Public Zone** (No Login Required)
  * `/` -> **Marketplace Home** (Search, Featured Barbershops).
  * `/search` -> **Results Page** (Filters, Map).
  * `/b/:slug` -> **Barbershop Microsite** (The "Profile" of a specific salon).
  * `/b/:slug/book` -> **Booking Wizard**.

* **Admin Zone** (Require Auth: Admin/SuperAdmin)
  * `/admin/dashboard` -> **Old Dashboard**.
  * `/admin/citas` -> **Calendar**.
  * `/admin/...` -> **All other management routes**.

* **Auth Zone** (Shared/Public)
  * `/login` -> Login (redirects based on role? Or separate `/admin/login` vs `/user/login`? For now, unified login is fine).
  * `/register` -> Business Registration.

## 2. Technical Execution Plan

### Step 1: Routing Migration

* Modify `App.tsx`.
* Wrap existing admin routes under a path prefix `/admin`.
* Update `MainLayout` (The Admin Layout) to ensure sidebar links point to `/admin/...`.
* *Risk*: This will break existing bookmarks or flows if not caught. We must check `Sidebar.tsx` and all `Navigate` components.

### Step 2: Marketplace Layouts

* Create `components/layout/MarketplaceLayout.tsx`.
  * Needs a public Header (Logo + "Soy Profesional" link + Login).
  * Needs a public Footer.
* Create `components/layout/MicrositeLayout.tsx`.
  * Specific header for the Barbershop (Brand Colors, Logo).

### Step 3: Home Page (MVP)

* Create `pages/marketplace/HomePage.tsx`.
* Simple Hero section + List of "Featured Enterprises" (fetched from API).

## 3. API Requirements

* **Endpoint**: `GET /api/public/enterprises` (List for marketplace).
* **Endpoint**: `GET /api/public/enterprises/{slug}` (Details for microsite).
* *Security*: These must be open (permit-all) in Spring Security.

## 4. Immediate Action Items

1. **Refactor Client Routes**: Move Admin pages to `/admin` prefix.
2. **Verify Admin Links**: Fix sidebar navigation.
3. **Create Placeholder Home**: A simple landing page at `/`.

---
*Created by Antigravity*
