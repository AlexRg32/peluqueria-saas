# Investigation: Dynamic Brand Colors

## Current State

- The `Enterprise` model in the backend correctly stores `primaryColor` and `secondaryColor`.
- The `EnterprisePage` in the frontend allows editing these colors and saves them to the backend.
- Many components in the frontend use hardcoded hex values (e.g., `#c5a059`) instead of CSS variables.
- There is no mechanism to apply the enterprise's custom colors globally.
- The JWT token used for authentication does not contain the brand colors, so they are not immediately available upon login without an extra API call or wait.

## Findings

1. **Backend**: `AuthenticationService.java` generates JWTs but only includes `enterpriseName`, `enterpriseId`, and `role`. It should also include `primaryColor` and `secondaryColor`.
2. **Frontend**: `index.css` defines Tailwind 4 theme variables like `--color-brand-primary`, but these are static defaults.
3. **Frontend**: The app lacks a global effect to sync the enterprise colors with CSS variables.

## Proposed Solution

1. **Backend**: Update `AuthenticationService` to include brand colors in the JWT.
2. **Frontend**: Update `AuthContext` types to include colors.
3. **Frontend**: Create a `useBranding` hook or update `AuthContext` to apply colors to the `:root` element.
4. **Frontend**: Refactor components to use Tailwind theme classes (e.g., `bg-brand-primary`) instead of hardcoded hex values.
5. **Frontend**: Ensure `EnterprisePage` updates the global CSS variables immediately after a successful save.
