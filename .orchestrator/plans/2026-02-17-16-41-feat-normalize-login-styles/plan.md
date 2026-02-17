# Normalize Login Styles
>
> Goal: Harmonize the visual identity of Client and Pro login experiences while keeping them separate and themed.
> Architecture: Shared layout patterns and standardized Tailwind utility sets.

### Task 1: [x] ClientLoginForm.tsx — Refine Styles

1. Create `src/features/auth/components/client/ClientLoginForm.test.tsx` (failing test for styling classes).
2. Update `ClientLoginForm.tsx` to use standardized rounding (`rounded-3xl` for card, `rounded-2xl` for inputs/button) and hover effects.
3. Run tests: `cd peluqueria-client && npm test ClientLoginForm.test.tsx`.
4. Verify: tests pass ✅.
5. `git commit` + `/checkpoint`.

### Task 2: [x] ProLoginForm.tsx — Align with Client Styles

1. Create `src/features/auth/components/pro/ProLoginForm.test.tsx` (failing test for styling classes).
2. Update `ProLoginForm.tsx` to use `rounded-3xl` for card, `rounded-2xl` for inputs/button, and matching padding/effects. Apply dark theme variants (`bg-[#1e293b]/80`).
3. Run tests: `cd peluqueria-client && npm test ProLoginForm.test.tsx`.
4. Verify: tests pass ✅.
5. `git commit` + `/checkpoint`.

### Task 3: [x] ClientLoginPage.tsx — Final Polish

1. Create `src/features/auth/pages/client/ClientLoginPage.test.tsx`.
2. Ensure layout matches the grid specifications in design.md.
3. Run tests: `cd peluqueria-client && npm test ClientLoginPage.test.tsx`.
4. Verify: tests pass ✅.
5. `git commit` + `/checkpoint`.

### Task 4: [x] ProLoginPage.tsx — Implement Split Layout

1. Create `src/features/auth/pages/pro/ProLoginPage.test.tsx`.
2. Rewrite `ProLoginPage.tsx` to use the split layout grid, adding marketing text for professionals on the left side.
3. Run tests: `cd peluqueria-client && npm test ProLoginPage.test.tsx`.
4. Verify: tests pass ✅.
5. `git commit` + `/checkpoint`.
