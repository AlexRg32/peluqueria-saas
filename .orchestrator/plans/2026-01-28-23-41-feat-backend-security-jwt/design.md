# Design - Backend Security (JWT)

## Architecture

- **Stateless Authentication**: Using JWT (JSON Web Tokens).
- **Standards**: OAuth2 Resource Server concepts, but simplified with custom JWT Filter for agility.
- **Password**: BCrypt hashing.

## Components to Create

### 1. Dependencies (`pom.xml`)

- `spring-boot-starter-security`
- `jjwt-api`, `jjwt-impl`, `jjwt-jackson` (for token generation/parsing).

### 2. Domain Models

- `User` entity (ensure it implements `UserDetails` or use a wrapper).
- `Role` enum or entity (ADMIN, OWNER, EMPLOYEE).

### 3. Security Config

- `SecurityConfig.java`:
  - `FilterChain`: Disable CSRF (stateless), enable CORS.
  - Public endpoints: `/auth/**`.
  - Protected endpoints: `/**`.

### 4. Auth Logic

- `JwtUtil`: Generate Token (sign with secret), Validate Token, Extract Username.
- `AuthController`:
  - `POST /auth/login`: Accepts `{username, password}` -> Returns `{token}`.
  - `POST /auth/register`: (Optional for now, maybe manual seed).

### 5. Filter

- `JwtRequestFilter`: Intercepts requests, checks `Authorization: Bearer <token>`, sets SecurityContext.
