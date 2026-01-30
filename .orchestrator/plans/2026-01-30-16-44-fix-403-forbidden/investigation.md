# Investigation Report: 403 Forbidden Error

## 1. Problem Analysis

The user gets `403 Forbidden` on `POST /api/services`.
The endpoint is protected by `@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")`.

## 2. Root Cause Identified

**Spring Security Role Handling**:

- In `User.java` (Line 51): `return List.of(new SimpleGrantedAuthority(role.name()));`
  - Returns authorities like `"ADMIN"`, `"SUPER_ADMIN"`.
- In `ServiceOfferingController.java`: `@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")`.
  - `hasRole` / `hasAnyRole` automatically prefixes checks with `ROLE_`. It expects authorities to be `ROLE_ADMIN`, `ROLE_SUPER_ADMIN`.
  - Since `User` returns just `ADMIN`, the check `ROLE_ADMIN` != `ADMIN` fails.

## 3. Solution Options

### Option A: Change Annotation to `hasAnyAuthority`

- Use `@PreAuthorize("hasAnyAuthority('ADMIN', 'SUPER_ADMIN')")`.
- This accepts raw strings without prefix.

### Option B: Change `User.java` to append `ROLE_` (Recommended)

- Modify `getAuthorities()` to return `new SimpleGrantedAuthority("ROLE_" + role.name())`.
- This aligns with Spring Security standards.

## 4. Plan

1. **Modify `User.java`**: Update `getAuthorities` method.
2. **Verify**: Retest the endpoint.
