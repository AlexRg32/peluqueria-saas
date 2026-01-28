# Investigation Report - Login Necessity

## Current State Analysis

### Backend (`peluqueria-api`)

- **Dependencies**: `spring-boot-starter-security` is **MISSING**.
- **Auth**: No authentication or authorization mechanism detected.
- **Controllers**: `UserController` exists, but likely unprotected.

### Frontend (`peluqueria-client`)

- **Routes**: `/empresas`, `/servicios`, `/usuarios`. All public.
- **Auth**: No `Login.tsx`, no `AuthContext`, no Guard (Protected Route).

## Recommendation

**YES**, we should implement Login, but it's not just a UI form. We need a "Vertical Slice" of security:

1. **Backend**: Add Spring Security + JWT support.
2. **Database**: Define `User` entity with `password` (BCrypt) and `roles`.
3. **Frontend**: Create Login Page + JWT handling (storage/interceptor).

## Proposed Roadmap

1. **Infrastructure**: Add Security Dependencies.
2. **Backend Core**: Implement `AuthController` (Login/Register).
3. **Frontend Core**: Implement `LoginPage` and connecting logic.
