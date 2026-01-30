# Plan: Implement SaaS Roles and Admin Logic

Transition the application to a multi-tenant SaaS structure where the registering user becomes the `ADMIN` of their enterprise.

## Phase 1: Backend Updates

- [x] **Update `AuthenticationService.java`**:
  - Change default role from `EMPLEADO` to `ADMIN` in the `register` method.
  - Include `role` in the JWT claims for both `register` and `authenticate`.
  - Path: `peluqueria-api/src/main/java/com/peluqueria/service/AuthenticationService.java`

## Phase 2: Frontend Updates

- [x] **Update `User` interface**: Add `role: string` field.
  - Path: `peluqueria-client/src/features/auth/types/index.ts`
- [x] **Update `Sidebar.tsx`**:
  - Adapt the "Empresas" navigation item to say "Mi Peluquería" for `ADMIN` users.
  - Display the user's role in the session info section.
  - Path: `peluqueria-client/src/components/layout/Sidebar.tsx`

## Phase 3: Verification

- [x] **Build Backend**: Ensure compilation is successful.
- [x] **Build Frontend**: Ensure no Type errors.
