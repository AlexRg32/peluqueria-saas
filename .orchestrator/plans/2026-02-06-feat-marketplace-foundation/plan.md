# Plan: Marketplace Foundation

**Goal**: Implement the core architecture for the Public Marketplace and separate it from the Admin SaaS.

## 1. Safety & Route Refactor Prep [Step 1]

- [x] **Admin Route Update**: In `Sidebar.tsx`, update all `NavLink` paths to include the `/admin` prefix (e.g., `/dashboard` -> `/admin/dashboard`).
- [x] **Navigation Check**: Ensure `MainLayout` or other shared components with links are updated to respect the new `/admin` structure.
- [x] **Auth Navigation**: Check `RequireAuth` and `LoginPage` redirections. Ensure login redirects to `/admin/dashboard` for admins.

## 2. Route Migration [Step 2]

- [x] **Router Refactor**: Modify `App.tsx`:
  - Create a root `<Route element={<MarketplaceLayout />}>` for public paths (`/`, `/search`).
  - Move all existing admin routes under a parent path `/admin`.
  - Ensure `LoginPage` and `RegisterPage` remain accessible at the root level (or decide if they move, for now keep at `/login`).

## 3. Marketplace Components [Step 3]

- [x] **Types**: Create `src/types/Marketplace.ts` with `PublicEnterpriseProfile` and `EnterpriseSummary` interfaces.
- [x] **Service**: Create `src/services/MarketplaceService.ts` with a mock function `getFeaturedEnterprises()` returning fake data.
- [x] **Layout**: Create `src/components/layout/MarketplaceLayout.tsx` (Navbar + Outlet + Footer).
- [x] **Home Page**: Create `src/pages/marketplace/HomePage.tsx` with a Hero section and a list of mocked enterprises.

## 4. Verification [Step 4]

- [x] **Admin Test**: Log in as admin, verify `/admin/dashboard` and sidebar links work.
- [x] **Public Test**: Access `/` (Home), verify Marketplace layout loads without auth.
