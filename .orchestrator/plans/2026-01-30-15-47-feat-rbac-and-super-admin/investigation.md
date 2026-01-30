# Investigation Phase: RBAC and Super Admin implementation

## Request Analysis

The goal is to implement a robust Role-Based Access Control (RBAC) system that distinguishes between:

1. **Super Admin**: Platform-wide access (SaaS owner). View all enterprises, subscriptions, platform stats.
2. **Admin**: Enterprise-specific administrator. Manage their own salon (services, employees, appointments).
3. **Empleado**: Enterprise-specific staff. Manage their own appointments.

## Current State Analysis

### Backend (Spring Boot)

- `Role.java`: Currently has `ADMIN`, `EMPLEADO`, `CLIENTE`.
- `User.java`: Has a `Role` and an optional `Enterprise`.
- `SecurityConfig.java`: Basic authentication is set up, but no granular role-base authorization (`@PreAuthorize`) is active yet.
- `AuthenticationService.java`: Needs to handle the default role or specific role assignment during registration (if applicable).

### Frontend (React)

- `App.tsx`: Basic protected routes using `RequireAuth`.
- `Sidebar.tsx`: Hardcoded logic for "ADMIN" vs others for one label, but not fully dynamic.
- `RequireAuth.tsx`: Likely only checks if the user is authenticated, not their specific role.

## Proposed Technical Changes

### Backend Changes

1. **Model**: Update `Role.java` to include `SUPER_ADMIN`.
2. **Security**:
   - Enable `@EnableMethodSecurity`.
   - Update `SecurityConfig` to define public vs protected endpoints more clearly.
   - Refactor `JwtAuthenticationFilter` or `UserDetailsService` to ensure roles are correctly mapped to `GrantedAuthority`.
3. **Endpoints**:
   - Create a `/api/v1/superadmin/**` prefix for platform-wide management.
   - Ensure enterprise-level endpoints check that `user.enterprise_id == resource.enterprise_id` OR `user.role == SUPER_ADMIN`.

### Frontend Changes

1. **Context**: Ensure `AuthContext` provides the `role` and `enterpriseId`.
2. **Components**:
   - Create a `HasRole` helper component or hook.
   - Update `Sidebar.tsx` to handle dynamic menu items based on a configuration object.
3. **Routing**:
   - Implement a `ProtectedRoute` component that takes an array of `allowedRoles`.
   - Setup a separate layout/base path for SuperAdmin (`/superadmin`).

## Risk Assessment

- **Security Bypass**: If a SUPER_ADMIN doesn't have an `enterprise_id`, some code might crash if it expects one. Need to handle null `enterprise` for SUPER_ADMIN.
- **Data Leaks**: Admins must never be able to see data from other enterprises.
- **UX**: Switching between "SuperAdmin view" and "Enterprise view" should be seamless if the SuperAdmin wants to "proxy" into a salon.

## Conclusion

The implementation is feasible. The most critical part is the backend authorization logic and the frontend route protection.
