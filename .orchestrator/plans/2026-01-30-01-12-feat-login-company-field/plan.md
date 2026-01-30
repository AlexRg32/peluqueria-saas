# Plan: Add Enterprise Field to Login

The goal is to include an "empresa" (enterprise/company) field in the login form and validate it on the backend.

## Phase 1: Backend Updates

- [x] **Modify `AuthRequest.java`**: Add `enterprise` field.
  - Path: `peluqueria-api/src/main/java/com/peluqueria/dto/AuthRequest.java`
- [x] **Update `AuthenticationService.java`**:
  - In `authenticate` method, fetch the user.
  - Verify if the user belongs to an enterprise.
  - Compare the provided `enterprise` name with `user.getEnterprise().getName()`.
  - Throw an exception if they don't match.
  - Path: `peluqueria-api/src/main/java/com/peluqueria/service/AuthenticationService.java`

## Phase 2: Frontend Updates

- [x] **Update `LoginPayload` type**: Add `enterprise` field.
  - Path: `peluqueria-client/src/features/auth/types/index.ts`
- [x] **Update `LoginForm.tsx`**:
  - Add `enterprise` to `loginSchema`.
  - Add a new input field for "Empresa".
  - Update styling to match the existing dark/gold theme.
  - Path: `peluqueria-client/src/features/auth/components/LoginForm.tsx`

## Phase 3: Verification

- [x] **Build Backend**: Run `./mvnw compile` to ensure no syntax errors.
- [x] **Build Frontend**: Ensure no TS errors.
