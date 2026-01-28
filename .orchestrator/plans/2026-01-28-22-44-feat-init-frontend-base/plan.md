# Plan - Initialize Frontend Base

## Goal

Set up the core layout and routing for the client application using Tailwind CSS.

## Tasks

### Task 1: Dependencies & Setup

1. Install `react-router-dom` in `peluqueria-client`.
2. Install `tailwindcss`, `postcss`, `autoprefixer` via `npm install -D tailwindcss postcss autoprefixer`.
3. Initialize tailwind config: `npx tailwindcss init -p`.
4. Configure `tailwind.config.js` to scan `src/**/*.{js,ts,jsx,tsx}`.
5. Add Tailwind directives to `src/index.css` (or `App.css`).

### Task 2: Layout Components (Tailwind)

1. Create `src/components/layout/Sidebar.tsx` using Tailwind classes (e.g., `w-64 bg-slate-800`).
2. Create `src/components/layout/MainLayout.tsx` using Flexbox/Grid via Tailwind.
3. Remove `Layout.css`.

### Task 3: feature Pages

1. Create `src/pages/Enterprises.tsx` (Empty).
2. Create `src/pages/Services.tsx` (Empty).
3. Create `src/pages/Users.tsx` (Empty).
4. Add basic `<h1>` with Tailwind classes (e.g., `text-2xl font-bold`) to each.

### Task 4: Routing Configuration

1. Modify `src/main.tsx` or `src/App.tsx` to implement `BrowserRouter`.
2. Define Routes for the 3 sections.
