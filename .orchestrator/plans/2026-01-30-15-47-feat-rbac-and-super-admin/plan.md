# Plan: RBAC and Super Admin implementation
>
> Goal: Establish a secure, role-based navigation and access system for the SaaS platform.
> Architecture: Role-Based Access Control (RBAC) with Spring Security and React Protected Routes.

## Task 1: Backend - Update Roles [x]

1. Modify `com.peluqueria.model.Role` to add `SUPER_ADMIN`.
2. Verify usage in `User` model.
3. `/checkpoint`.

## Task 2: Backend - Security Hardening [x]

1. Create/Update `MethodSecurityConfig` or update `SecurityConfig` to enable `@EnableMethodSecurity`.
2. Add a sample `@PreAuthorize("hasRole('ADMIN')")` to `UserController`.
3. Verify backend compiles and runs.
4. `/checkpoint`.

## Task 3: Frontend - Sidebar Filtering [x]

1. Update `Sidebar.tsx` to define navigation items with a `roles` property.
2. Filter the rendered items based on the current user's role.
3. Verify only relevant links show up for a user.
4. `/checkpoint`.

## Task 4: Frontend - Route Protection [x]

1. Create `src/features/auth/components/ProtectedRoute.tsx`.
2. Implement role-checking logic (if user is logged in AND has required role).
3. `/checkpoint`.

## Task 5: Frontend - Application Routing [x]

1. Update `App.tsx` to wrap Admin-only routes with `<ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']} />`.
2. Update Empleado routes with appropriate guards.
3. Verify manual URL navigation is blocked for unauthorized users.
4. `/checkpoint`.
