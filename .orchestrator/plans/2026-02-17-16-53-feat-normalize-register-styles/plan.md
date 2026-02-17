# Normalize Register Styles
>
> Goal: Align registration pages with the new login styles and add navigation links.
> Architecture: Split layout grid with theme-specific aesthetics.

### Task 1: [x] ClientRegisterForm.tsx — Style Polish

1. Create `src/features/auth/components/client/ClientRegisterForm.test.tsx`.
2. Refine rounding and button effects.
3. Run tests: `cd peluqueria-client && npm test ClientRegisterForm.test.tsx`.
4. Verify: tests pass ✅.
5. `git commit` + `/checkpoint`.

### Task 2: [x] ProRegisterForm.tsx — Align Styling

1. Create `src/features/auth/components/pro/ProRegisterForm.test.tsx`.
2. Apply normalized dark theme styles (rounding, backdrop-blur, padding).
3. Run tests: `cd peluqueria-client && npm test ProRegisterForm.test.tsx`.
4. Verify: tests pass ✅.
5. `git commit` + `/checkpoint`.

### Task 3: [x] ClientRegisterPage.tsx — Home Link

1. Create `src/features/auth/pages/client/ClientRegisterPage.test.tsx`.
2. Add the "Volver al inicio" link.
3. Run tests: `cd peluqueria-client && npm test ClientRegisterPage.test.tsx`.
4. Verify: tests pass ✅.
5. `git commit` + `/checkpoint`.

### Task 4: [x] ProRegisterPage.tsx — Split Layout & Home Link

1. Create `src/features/auth/pages/pro/ProRegisterPage.test.tsx`.
2. Implement split layout with marketing panel and "Volver al inicio" link.
3. Run tests: `cd peluqueria-client && npm test ProRegisterPage.test.tsx`.
4. Verify: tests pass ✅.
5. `git commit` + `/checkpoint`.
