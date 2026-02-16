# Investigation: Worker Login Redirects to Client Landing Page

## Bug Report

When logging in with "Juan Cortes" (seeded as EMPLEADO), the user is redirected to the client landing page (`/`) instead of the admin dashboard (`/admin/dashboard`).

## Root Cause Analysis

### Problem 1: `RoleRedirect` missing EMPLEADO role

In `App.tsx`, the `RoleRedirect` component only checked for `ADMIN` and `SUPER_ADMIN`:

```tsx
if (user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') { ... }
```

`EMPLEADO` fell through to the else branch → `/portal` → `/` (client landing).

### Problem 2: Root route `/` shows client page to all users

The root route `/` renders `ClientPortalPage` unconditionally, regardless of the user's role. A logged-in worker visiting `/` would see the client landing page.

## Fix Applied

1. Added `EMPLEADO` to `RoleRedirect` condition.
2. Created `SmartHome` component to redirect professional users from `/` to `/admin/dashboard`.

## Files Changed

- `peluqueria-client/src/App.tsx`
