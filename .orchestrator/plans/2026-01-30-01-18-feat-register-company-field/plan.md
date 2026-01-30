# Plan: Move Enterprise Field from Login to Registration

Move the enterprise association to the registration phase.

## Phase 1: Revert Login Changes

- [x] **Revert `AuthRequest.java`**: Remove `enterprise` field.
  - Path: `peluqueria-api/src/main/java/com/peluqueria/dto/AuthRequest.java`
- [x] **Revert `AuthenticationService.java`**: Remove enterprise validation from `authenticate`.
  - Path: `peluqueria-api/src/main/java/com/peluqueria/service/AuthenticationService.java`
- [x] **Revert `types/index.ts`**: Remove `enterprise` from `LoginPayload`.
  - Path: `peluqueria-client/src/features/auth/types/index.ts`
- [x] **Revert `LoginForm.tsx`**: Remove "Empresa" field and validation.
  - Path: `peluqueria-client/src/features/auth/components/LoginForm.tsx`

## Phase 2: Add Enterprise to Registration

- [x] **Update `EnterpriseRepository.java`**: Add `Optional<Enterprise> findByName(String name)`.
  - Path: `peluqueria-api/src/main/java/com/peluqueria/repository/EnterpriseRepository.java`
- [x] **Modify `RegisterRequest.java`**: Add `enterpriseName` field.
  - Path: `peluqueria-api/src/main/java/com/peluqueria/dto/RegisterRequest.java`
- [x] **Update `AuthenticationService.java`**:
  - Inject `EnterpriseRepository`.
  - In `register` method, find/create the enterprise.
  - Associate the user with the enterprise.
  - Path: `peluqueria-api/src/main/java/com/peluqueria/service/AuthenticationService.java`
- [x] **Update `types/index.ts`**: Add `enterpriseName` to `RegisterPayload`.
  - Path: `peluqueria-client/src/features/auth/types/index.ts`
- [x] **Modify `RegisterForm.tsx`**:
  - Add `enterpriseName` to `registerSchema`.
  - Add "Empresa" input field.
  - Ensure it is sent in the `registerUser` call.
  - Path: `peluqueria-client/src/features/auth/components/RegisterForm.tsx`

## Phase 3: Verification

- [x] **Build Backend**: Run `./mvnw compile`.
- [x] **Build Frontend**: Run `npm run build`.
