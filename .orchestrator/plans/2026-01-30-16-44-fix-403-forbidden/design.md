# Design Document: Fix 403 Forbidden

## 1. Backend

### User Model Update

Class: `com.peluqueria.model.User`

**Current**:

```java
return List.of(new SimpleGrantedAuthority(role.name()));
```

**New**:

```java
return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
```

This change ensures that when `JwtAuthenticationFilter` loads the user and passes `userDetails.getAuthorities()` to the context, Spring Security sees `ROLE_ADMIN`.

Consequently, `@PreAuthorize("hasAnyRole('ADMIN')")` which checks for `ROLE_ADMIN` will Pass.

## 2. Alternatives Considered

- **Changing Annotation**: `hasAuthority('ADMIN')` would work but is less standard if we used `http.authorizeRequests().antMatchers(...).hasRole(...)` elsewhere. Sticking to `ROLE_` convention is safer for future Spring Security features.

## 3. Impact

- Existing checks using `hasRole` will start working.
- Checks using `hasAuthority` (if any) might break if they didn't expect the prefix. (Current codebase has no such checks, we only added `hasAnyRole` recently).
