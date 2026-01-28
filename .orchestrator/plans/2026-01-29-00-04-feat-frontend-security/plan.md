# Plan: Frontend Security Implementation

## 1. Setup & Infrastructure

- [x] **Install Dependencies**: `jwt-decode` (for token parsing), `react-hook-form`, `zod`, `@hookform/resolvers`, `clsx`, `tailwind-merge` (if not present).
- [x] **Configure Axios**: Create `src/lib/axios.ts` with interceptors for Token injection and 401 handling.

## 2. Feature: Key Logic (`src/features/auth`)

- [x] **Scaffold Directory**: Create `api`, `components`, `context`, `hooks`, `types`, `pages`.
- [x] **Define Types**: Create `types/index.ts` with `User`, `AuthResponse`, `LoginPayload`, etc.
- [x] **Implement API**: Create `api/authApi.ts` for backend calls.
- [x] **Implement Context**: Create `context/AuthContext.tsx` handling login/logout/persistence.
- [x] **Implement Hook**: Create `hooks/useAuth.ts` exposing the context.

## 3. Feature: Components & Pages

- [x] **RequireAuth**: Create `components/RequireAuth.tsx` route guard.
- [x] **LoginForm**: Create `components/LoginForm.tsx` with Zod validation.
- [x] **RegisterForm**: Create `components/RegisterForm.tsx` with Zod validation.
- [x] **LoginPage**: Create `pages/LoginPage.tsx` wrapping the form.
- [x] **RegisterPage**: Create `pages/RegisterPage.tsx` wrapping the form.

## 4. Integration

- [x] **Update Router**: Modify `App.tsx` to define public routes and wrap protected routes with `RequireAuth`.
- [x] **Update Layout**: Modify `MainLayout` or `Sidebar` to accept a Logout action/button (or ensure it uses `useAuth` correctly).

## 5. Verification

- [ ] **Manual Test**: Register a new user -> Auto login -> Redirect to dashboard.
- [ ] **Manual Test**: Login with existing user -> Redirect to dashboard.
- [ ] **Manual Test**: Access protected route without token -> Redirect to login.
- [ ] **Manual Test**: Logout -> Clear token -> Redirect to login.
