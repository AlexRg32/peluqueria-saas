# Design: Frontend Security Implementation

## 1. Directory Structure

We will follow the `frontend-dev-guidelines` feature-based architecture.

```
src/
  features/
    auth/
      api/
        authApi.ts       # Axios calls for login/register
      components/
        LoginForm.tsx    # Form with Zod validation
        RegisterForm.tsx # Form with Zod validation
        RequireAuth.tsx  # Route guard
      context/
        AuthContext.tsx  # React Context for global auth state
      hooks/
        useAuth.ts       # Hook to consume context
      types/
        index.ts         # User, AuthResponse, etc.
      pages/
        LoginPage.tsx    # Page wrapper for login
        RegisterPage.tsx # Page wrapper for register
      index.ts           # Public exports
  lib/
    axios.ts             # Global axios instance with interceptors
```

## 2. Type Definitions (`src/features/auth/types/index.ts`)

```typescript
export interface User {
  sub: string; // Email (from JWT subject)
  // Add other fields if encoded in token or fetched separately
}

export interface AuthResponse {
  token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
```

## 3. Libraries & Tools

- **State Management**: React Context (simpler than Redux/Zustand for just Auth).
- **Data Fetching**: `axios` for direct calls in AuthContext (to avoid circular dependency with TanStack Query if we want to secure it, although `useMutation` is fine too. Let's strictly use `axios` inside the Context or Service to keeping it imperative and simple for the "Global" state).
- **Validation**: `zod` + `react-hook-form`.
- **Routing**: `react-router-dom` v7 (`Navigate`, `Outlet`, `useLocation`).

## 4. API Layer (`src/lib/axios.ts`)

- **Instance**: Create `apiClient` with `baseURL: 'http://localhost:8080'`.
- **Request Interceptor**: Check `localStorage.getItem('token')`. If exists, add `Authorization: Bearer <token>`.
- **Response Interceptor**: On `401`, remove token and redirec to `/login`.

## 5. Auth Context (`src/features/auth/context/AuthContext.tsx`)

- **State**:
  - `isAuthenticated`: boolean
  - `token`: string | null
  - `user`: User | null (decoded from token)
  - `login(data: LoginPayload): Promise<void>`
  - `register(data: RegisterPayload): Promise<void>`
  - `logout(): void`
- **Logic**:
  - `login` calls `authApi.login`, saves token, updates state.
  - `register` calls `authApi.register`, saves token (auto-login), updates state.
  - `logout` removes token, updates state.

## 6. Components

### 6.1 `LoginForm` / `RegisterForm`

- **Design**: Card centered on screen.
- **Fields**: controlled by `react-hook-form`.
- **Styling**: `tailwind` classes. Premium dark/gold aesthetic.
- **Validation**:
  - Email: Valid format.
  - Password: Min 6 chars.

### 6.2 `RequireAuth`

- **Props**: `children?: React.ReactNode` (or use Outlet).
- **Logic**:

  ```tsx
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;
  return <Outlet />;
  ```

## 7. Routing (`App.tsx`)

- Public Routes: `/login`, `/register`.
- Protected Routes (Wrapped in `RequireAuth`): `/`, `/empresas`, `/servicios`, `/usuarios`.
- Sidebar should show "Logout" action.
