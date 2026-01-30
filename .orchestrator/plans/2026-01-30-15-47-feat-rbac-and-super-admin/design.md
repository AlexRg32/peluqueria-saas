# Design Phase: RBAC and Super Admin

## 1. Role Definitions

```java
public enum Role {
  SUPER_ADMIN, // Platform owner
  ADMIN,       // Salon owner
  EMPLEADO,    // Barber/Staff
  CLIENTE      // Final customer
}
```

## 2. Shared Layout Strategy (MainLayout)

The `MainLayout` will remain the shell, but the `Sidebar` will filter items dynamically.

### Navigation Contract (Frontend)

```typescript
interface NavItem {
  name: string;
  path: string;
  roles: Role[];
  icon?: string;
}

const MENU_CONFIG: NavItem[] = [
  // Super Admin Only
  { name: 'Empresas Global', path: '/superadmin/enterprises', roles: ['SUPER_ADMIN'] },
  { name: 'Suscripciones', path: '/superadmin/billing', roles: ['SUPER_ADMIN'] },
  
  // Mixed / Enterprise context
  { name: 'Dashboard', path: '/dashboard', roles: ['ADMIN', 'EMPLEADO'] },
  { name: 'Servicios', path: '/servicios', roles: ['ADMIN'] },
  { name: 'Usuarios/Equipo', path: '/usuarios', roles: ['ADMIN'] },
  { name: 'Mis Citas', path: '/appointments', roles: ['EMPLEADO'] },
];
```

## 3. Route Protection

We will implement a `ProtectedRoute` component in React:

```tsx
<Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
  <Route path="/servicios" element={<ServicesPage />} />
</Route>
```

## 4. Backend Security Contract

- **Method Security**: Enable `@PreAuthorize` in a `MethodSecurityConfig`.
- **Base Controller Classes**:
  - `SuperAdminController`: All methods require `hasRole('SUPER_ADMIN')`.
  - `EnterpriseController`: All methods require `hasAnyRole('ADMIN', 'EMPLEADO')`.
- **JWT Claims**: Ensure the `role` is included in the JWT payload (already should be there, but will verify).

## 5. UI/UX Differentiation

- **Colors**: SuperAdmin panel might use a different accent color (e.g., Purple/Indigo) to differentiate from the Salon Gold/Burgundy.
- **Header**: Show "Platform Administration" text for SUPER_ADMIN.
