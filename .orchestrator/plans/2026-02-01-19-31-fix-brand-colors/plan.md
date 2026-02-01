# Implementation Plan: Dynamic Brand Colors

Implementing dynamic branding for enterprises using CSS variables and JWT claims.

## Phase 1: Backend Infrastructure

- [ ] **Task 1: Update AuthenticationService**
  - Modify `AuthenticationService.java` to include `primaryColor` and `secondaryColor` in the JWT extra claims for both `register` and `authenticate` methods.
  - File: `peluqueria-api/src/main/java/com/peluqueria/service/AuthenticationService.java`

## Phase 2: Frontend Infrastructure

- [ ] **Task 2: Update Auth Types**
  - Add `primaryColor` and `secondaryColor` to the `User` interface.
  - File: `peluqueria-client/src/features/auth/types/index.ts`
- [ ] **Task 3: Implement Branding Logic in AuthContext**
  - Create a utility function `applyBranding` to set CSS variables on `:root`.
  - Update `AuthContext` to call `applyBranding` whenever the `user` state changes.
  - File: `peluqueria-client/src/features/auth/context/AuthContext.tsx`

## Phase 3: UI Integration & Refactoring

- [ ] **Task 4: Refactor Components to use Brand Variables**
  - Replace hardcoded colors with Tailwind brand classes in:
    - `peluqueria-client/src/components/layout/Navigation.tsx`
    - `peluqueria-client/src/pages/Enterprises.tsx`
    - `peluqueria-client/src/pages/Services.tsx`
    - `peluqueria-client/src/pages/Users.tsx`
    - `peluqueria-client/src/pages/CalendarPage.tsx`
    - `peluqueria-client/src/features/auth/pages/LoginPage.tsx`
    - `peluqueria-client/src/features/auth/pages/RegisterPage.tsx`
- [ ] **Task 5: Immediate Branding Update**
  - Update `EnterprisePage.tsx` to call `applyBranding` immediately after saving the enterprise settings so the user sees the change without reloading.
  - File: `peluqueria-client/src/pages/Enterprises.tsx`

## Phase 4: Verification

- [ ] **Task 6: Test Branding Flow**
  - 1. Change color in settings.
  - 1. Verify UI updates immediately.
  - 1. Refresh page and verify colors persist.
  - 1. Logout and login to verify JWT-based branding.
