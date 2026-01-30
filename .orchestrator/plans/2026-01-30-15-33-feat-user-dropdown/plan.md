# User Dropdown Floating Button
>
> Goal: Implement a premium floating user menu in the top-right corner with settings and logout options.
> Architecture: Functional React Component with Framer Motion and Lucide Icons.

### Task 1: Install Dependencies

1. Run `npm install lucide-react framer-motion` in `peluqueria-client`.
2. [x] Verify installation in `package.json`.

### Task 2: Create UserMenu Component

1. Create `peluqueria-client/src/components/layout/UserMenu.tsx`.
2. Implement the component with `framer-motion` for the hover dropdown.
3. Use `useAuth` hook for user data and logout function.
4. [x] Verify the component renders correctly (basic UI).

### Task 3: Integrate into MainLayout

1. Open `peluqueria-client/src/components/layout/MainLayout.tsx`.
2. Import and add `<UserMenu />` inside the main layout, positioned at the top-right.
3. [x] Verify position and hover animation in the browser.

### Task 4: Functional Verification

1. Test "Cerrar Sesión" button in the menu.
2. Ensure it redirects to `/login`.
3. [x] Confirm logout works.

### Task 5: Sidebar Cleanup

1. Remove redundant logout button and personal tag from Sidebar.
2. [x] Verify Sidebar is cleaner and no unused variables remain.
