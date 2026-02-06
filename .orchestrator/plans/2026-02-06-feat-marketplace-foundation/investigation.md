# Investigation: Marketplace Foundation

**Goal**: Architect the routing and layout changes required to support a Public Marketplace within the existing React application, alongside the SaaS Admin Panel.

## 1. Architectural Strategy

We are transforming the application from a "Admin-Only Dashboard" to a "Hybrid Platform":

* **Public Marketplace** (`/`, `/search`, `/b/:slug`): Accessible to everyone.
* **Admin Panel** (`/admin/*`): Accessible only to business owners (protected).

### 2. Routing Refactor (`App.tsx`)

The current assumption that `Root (/)` redirects to `Dashboard` must change.

**New Route Schema:**

```tsx
<Routes>
  {/* --- PUBLIC MARKETPLACE --- */}
  {/* Uses MarketplaceLayout (Navbar, Search, Footer) */}
  <Route element={<MarketplaceLayout />}>
    <Route path="/" element={<HomePage />} />
    <Route path="/search" element={<SearchPage />} />
    <Route path="/b/:slug" element={<BarbershopProfilePage />} />
  </Route>

  {/* --- AUTH --- */}
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />

  {/* --- ADMIN PANEL (SAAS) --- */}
  {/* Uses MainLayout (Sidebar, Topbar) */}
  <Route path="/admin" element={<RequireAuth />}>
    <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="citas" element={<CalendarPage />} />
        <Route path="servicios" element={<ServicesPage />} />
        {/* ... all other admin routes ... */}
    </Route>
  </Route>
</Routes>
```

### 3. Component Updates

* **`Sidebar.tsx`**: Must update all internal `Link` components to prefix `/admin`.
* **`MainLayout`**: Ensure breadcrumbs or internal navigation respect the `/admin` prefix.
* **`MarketplaceLayout`**: Create this new component.
  * **Header**: Logo (links to `/`), "Are you a professional?" (links to `/register`), Login (links to `/login`).

### 4. Backend Requirements (Preliminary)

* `PublicEnterpriseController`:
  * `GET /api/public/enterprises`: List for search/home.
  * `GET /api/public/enterprises/:slug`: Detail for profile.

## 5. Execution Plan

1. **Refactor Client Routes**:
    * Update `App.tsx` first to verify the separation works.
    * Fix `Sidebar` links.
2. **Create Placeholder Pages**:
    * `Marketplace/HomePage` (Simple "Find your barber" H1).
    * `Marketplace/Layout`.
3. **Verify Admin Access**: Ensure existing admin flows still work under `/admin`.
