# Implementation Plan: Fix 403 Forbidden

## 1. Backend Fix

- [x] **Update User Model**: Modify `peluqueria-api/src/main/java/com/peluqueria/model/User.java` to prepend `ROLE_` to authorities.

## 2. Verification

- [ ] **Manual Test**: Restart Backend. Login again (token might be unaffected but `UserDetailsService` load will be). Verify POST /api/services works.
