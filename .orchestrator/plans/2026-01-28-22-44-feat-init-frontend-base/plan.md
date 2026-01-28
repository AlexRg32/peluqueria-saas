# Plan - Initialize Frontend Base

## Goal

Set up the core layout and routing for the client application using Tailwind CSS.

## Tasks

### Task 1: Dependencies & Setup

- [x] 1. Install `react-router-dom` in `peluqueria-client`.
- [x] 2. Install `tailwindcss`, `postcss`, `autoprefixer` via `npm install -D tailwindcss postcss autoprefixer`.
- [x] 3. Initialize tailwind config: `npx tailwindcss init -p`.
- [x] 4. Configure `tailwind.config.js` to scan `src/**/*.{js,ts,jsx,tsx}`.
- [x] 5. Add Tailwind directives to `src/index.css` (or `App.css`).

### Task 2: Layout Components (Tailwind)

- [x] 1. Create `src/components/layout/Sidebar.tsx` using Tailwind classes (e.g., `w-64 bg-slate-800`).
- [x] 2. Create `src/components/layout/MainLayout.tsx` using Flexbox/Grid via Tailwind.
- [x] 3. Remove `Layout.css`.

### Task 3: feature Pages

- [x] 1. Create `src/pages/Enterprises.tsx` (Empty).
- [x] 2. Create `src/pages/Services.tsx` (Empty).
- [x] 3. Create `src/pages/Users.tsx` (Empty).
- [x] 4. Add basic `<h1>` with Tailwind classes (e.g., `text-2xl font-bold`) to each.

### Task 4: Routing Configuration

- [x] 1. Modify `src/main.tsx` or `src/App.tsx` to implement `BrowserRouter`.
- [x] 2. Define Routes for the 3 sections.
