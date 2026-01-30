# Plan: Display Enterprise Name in Sidebar

The goal is to include the enterprise name in the JWT token on the backend and display it in the sidebar on the frontend.

## Phase 1: Backend Updates

- [x] **Update `AuthenticationService.java`**: Include `enterpriseName` in the JWT claims during registration and authentication.
  - Path: `peluqueria-api/src/main/java/com/peluqueria/service/AuthenticationService.java`
- [x] **Ensure `JwtUtil.java` stays as is** or supports extra claims (it already does).

## Phase 2: Frontend Updates

- [x] **Update `User` interface**: Add `enterpriseName` field.
  - Path: `peluqueria-client/src/features/auth/types/index.ts`
- [x] **Update `Sidebar.tsx`**:
  - Display the `user.enterpriseName` in the sidebar header or in the session info section.
  - Apply a "pretty" design (gold/premium theme).
  - Path: `peluqueria-client/src/components/layout/Sidebar.tsx`

## Phase 3: Verification

- [x] **Build Backend**: Ensure no compile errors.
- [x] **Build Frontend**: Ensure no lint/TS errors.
