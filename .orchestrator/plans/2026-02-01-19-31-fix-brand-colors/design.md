# Design: Dynamic Brand Colors

## Overview

Implement a system to synchronize enterprise brand colors from the database to the frontend UI dynamically using CSS variables and JWT claims.

## Architecture

### 1. Data Flow

1. **Creation/Edit**: Owner changes colors in `EnterprisePage`.
2. **Persistence**: `EnterpriseController` saves to PostgreSQL.
3. **Session**: On next login (or immediate update), the frontend receives new colors.
4. **Application**: `AuthContext` or `MainLayout` applies these colors as CSS variables.

### 2. Backend Changes

- **`AuthenticationService.java`**:
  - Update `register` and `authenticate` methods.
  - Fetch `primaryColor` and `secondaryColor` from the `Enterprise` model.
  - Add them as `extraClaims` in the JWT token.

### 3. Frontend Changes

- **Types**:
  - Update `User` interface in `src/features/auth/types/index.ts` to include `primaryColor` and `secondaryColor`.
- **Styling**:
  - Use `document.documentElement.style.setProperty` to update `--color-brand-primary`, `--color-brand-secondary`, and `--shadow-brand`.
- **Components**:
  - Global search and replace of hardcoded hex `#c5a059` with Tailwind classes using `brand-primary`.
  - Update `EnterprisePage.tsx` to call the sync function after a successful save.

### 4. Components to Refactor

- `Navigation.tsx`
- `EnterprisePage.tsx`
- `ServicesPage.tsx`
- `UsersPage.tsx`
- `CalendarPage.tsx`
- `LoginPage.tsx`
- `RegisterPage.tsx`

## Design Decisions

- **Why JWT?**: To avoid an extra API call on every page load to get branding. Colors are part of the "session" of the enterprise.
- **Why CSS Variables?**: They allow real-time UI updates without re-rendering the entire component tree or relying on complex ThemeProviders if not needed.
- **Shadows**: Dynamically generate the `shadow-brand` based on the primary color to maintain the premium look.
