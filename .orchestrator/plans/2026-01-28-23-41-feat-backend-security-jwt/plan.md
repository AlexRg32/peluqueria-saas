# Plan - Backend Security Implementation

## Goal

Implement a robust JWT-based authentication system in Spring Boot.

## Tasks

### Task 1: Dependencies

- [ ] Add `spring-boot-starter-security` and `jjwt` libs to `peluqueria-api/pom.xml`.

### Task 2: Core Security Infrastructure

- [ ] Create `com.peluqueria.security.JwtUtil` (Service for token ops).
- [ ] Create `com.peluqueria.config.SecurityConfig` (FilterChain setup).
- [ ] Create `com.peluqueria.security.JwtAuthenticationFilter`.

### Task 3: User Details Implementation

- [ ] Update `User` entity to support roles/passwords (if missing).
- [ ] Create `CustomUserDetailsService` (implements Spring's `UserDetailsService`).

### Task 4: Auth Controller

- [ ] Create `dto.AuthRequest` and `dto.AuthResponse`.
- [ ] Create `controller.AuthController` with login endpoint.
- [ ] Implement login logic (AuthenticationManager -> authenticate -> generateToken).

### Task 5: Verification

- [ ] Verify `POST /auth/login` returns a token using a seeded user.
- [ ] Verify `GET /empresas` is forbidden without token.
