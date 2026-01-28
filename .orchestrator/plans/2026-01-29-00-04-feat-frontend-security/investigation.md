# Investigation: Frontend Security Implementation

## 1. Objective

Implement a secure, robust, and user-friendly authentication system in the React frontend that integrates with the existing JWT-based Spring Boot backend.

## 2. Context Analysis

- **Backend**: Spring Boot 3.3.0 + Spring Security + JWT. Endpoints: `/auth/login`, `/auth/register`. Protected endpoints require `Authorization: Bearer <token>`.
- **Frontend**: React 19 + Vite + TypeScript + Tailwind CSS.
- **Current State**: Frontend has basic pages (Enterprises, Services, Users) but no authentication logic. Routing is declarative via `react-router-dom` v7.

## 3. Architecture & Design

### 3.1. Authentication Context (`AuthProvider`)

- **State**: `user` (minimal info), `token`, `isAuthenticated`, `isLoading`.
- **Methods**: `login(email, password)`, `register(data)`, `logout()`.
- **Persistence**: `localStorage` for the token (simple and effective for this stage, though HttpOnly cookies are safer for XSS, localStorage is acceptable for MVP with proper safeguards).
- **Initialization**: On app load, check for token in localStorage. If present, validate/decode (optional) or trust until 401.

### 3.2. Protected Routes (`RequireAuth` Component)

- A wrapper component that checks `isAuthenticated`.
- If false, redirects to `/login` preserving the `from` location state.
- If true, renders the children (Outlet).

### 3.3. API Client (`axios` instance)

- Create a centralized `api` instance.
- **Request Interceptor**: Automatically attach `Authorization: Bearer <token>` if token exists.
- **Response Interceptor**: Handle `401 Unauthorized` globally by logging the user out and redirecting to login.

### 3.4. Pages & UI

- **Login Page**:
  - Fields: Email, Password.
  - Actions: Submit, Link to Register.
  - Feedback: Error messages (wrong credentials), loading state.
  - Design: Premium aesthetic (Dark/Gold theme).
- **Register Page**:
  - Fields: Name, Email, Password, Confirm Password? (Backend only asks for name, email, password).
  - Actions: Submit, Link to Login.
- **Layout Adjustments**: Sidebar/Navbar should only show functionality available to the user. Logout button.

## 4. Implementation Plan Structure

1. **Foundation**: Setup `axios` instance and types.
2. **Context**: Build `AuthContext` and `AuthProvider`.
3. **Components**: Build `LoginForm` and `RegisterForm`.
4. **Pages**: Create `/login` and `/register` pages.
5. **Routing**: Configure `RequireAuth` and update `App.tsx` router.
6. **Integration**: Connect forms to `AuthContext`.
7. **UX**: Add Logout button in the layout.

## 6. Security Considerations

- **XSS**: Avoid rendering raw HTML.
- **CSRF**: Not a primary concern with localStorage + Bearer tokens (but XSS is).
- **Token Expiry**: Handle 401 gracefully.

## 7. Next Steps

Proceed to the **Design** phase to detail the component structure and API integration.
