# Client Marketplace Landing Redesign
>
> Goal: Transform the client landing from a basic portal into a Booksy/Airbnb-style marketplace with salon discovery, appointment tracking, and mobile-first navigation.
> Architecture: Feature-based components in `features/client-portal/`, shared layout in `components/layout/`.

### Task 1: Cleanup — Delete old marketing components

1. Delete all files in `components/marketplace/` (Hero, Features, StatsBar, ProfessionalCTA, StyleGallery, Testimonials, SectionHeading, HowItWorks, CategoryCard, CategorySection, EnterpriseCard).
2. Delete old `features/client-portal/components/PortalHero.tsx` and `AppointmentMiniCard.tsx`.
3. Verify no imports reference deleted files: `grep -r "marketplace/" src/ --include="*.tsx" --include="*.ts"`.
4. Verify build: `cd peluqueria-client && npm run build`.

- [x] Done

### Task 2: Enhanced MarketplaceService — Richer mock data

1. Write test in `services/MarketplaceService.test.ts` verifying `getFeatured()` returns 8+ salons with required fields (id, slug, name, city, rating, reviewCount, thumbnail, services, priceRange).
2. Write test for `getNearby()` returning subset with distance field.
3. Update `types/Marketplace.ts` with new `EnterpriseSummary` fields (reviewCount, services, priceRange, distance).
4. Rewrite `services/MarketplaceService.ts` with 8 mock salons and service functions (getFeatured, getNearby, search).
5. Run tests: `cd peluqueria-client && npm test`.
6. Verify: tests pass ✅.

- [ ] Done

### Task 3: SalonCard component

1. Write test in `features/client-portal/components/SalonCard.test.tsx` verifying: renders salon name, rating, city, links to `/b/:slug`, handles `grid` and `compact` variants.
2. Implement `features/client-portal/components/SalonCard.tsx` with two variants (grid/compact).
3. Run tests: `cd peluqueria-client && npm test`.
4. Verify: tests pass ✅.

- [ ] Done

### Task 4: MarketplaceHero component

1. Write test in `features/client-portal/components/MarketplaceHero.test.tsx` verifying: renders search input, shows personalized greeting when userName provided, shows generic tagline otherwise.
2. Implement `features/client-portal/components/MarketplaceHero.tsx`.
3. Run tests: `cd peluqueria-client && npm test`.
4. Verify: tests pass ✅.

- [ ] Done

### Task 5: QuickCategories component

1. Write test in `features/client-portal/components/QuickCategories.test.tsx` verifying: renders all category items, each has name and icon.
2. Implement `features/client-portal/components/QuickCategories.tsx` as horizontally scrollable chips.
3. Run tests: `cd peluqueria-client && npm test`.
4. Verify: tests pass ✅.

- [ ] Done

### Task 6: AppointmentCard + UpcomingAppointments components

1. Write test in `features/client-portal/components/AppointmentCard.test.tsx` verifying: renders service name, date, time, status badge.
2. Implement `features/client-portal/components/AppointmentCard.tsx`.
3. Write test in `features/client-portal/components/UpcomingAppointments.test.tsx` verifying: renders appointment cards when data provided, shows CTA when empty, shows sign-in CTA when not authenticated.
4. Implement `features/client-portal/components/UpcomingAppointments.tsx`.
5. Run tests: `cd peluqueria-client && npm test`.
6. Verify: tests pass ✅.

- [ ] Done

### Task 7: FeaturedSalons + PopularNearYou components

1. Write test in `features/client-portal/components/FeaturedSalons.test.tsx` verifying: renders section heading, renders SalonCard for each salon, shows skeletons when loading.
2. Implement `features/client-portal/components/FeaturedSalons.tsx`.
3. Write test in `features/client-portal/components/PopularNearYou.test.tsx` verifying: renders compact SalonCards in horizontal scroll.
4. Implement `features/client-portal/components/PopularNearYou.tsx`.
5. Run tests: `cd peluqueria-client && npm test`.
6. Verify: tests pass ✅.

- [ ] Done

### Task 8: BottomTabBar component

1. Write test in `components/layout/BottomTabBar.test.tsx` verifying: renders Home and Explore tabs always, renders Citas and Perfil tabs when authenticated, renders Acceder tab when not authenticated, highlights active tab.
2. Implement `components/layout/BottomTabBar.tsx`.
3. Run tests: `cd peluqueria-client && npm test`.
4. Verify: tests pass ✅.

- [ ] Done

### Task 9: Placeholder pages

1. Write test in `pages/ProfilePlaceholder.test.tsx` verifying: renders "Próximamente" text.
2. Implement `pages/ProfilePlaceholder.tsx`.
3. Write test in `pages/SearchPage.test.tsx` verifying: renders search placeholder.
4. Implement `pages/SearchPage.tsx`.
5. Run tests: `cd peluqueria-client && npm test`.
6. Verify: tests pass ✅.

- [ ] Done

### Task 10: Rewrite ClientPortal.tsx — Assemble all sections

1. Write test in `pages/ClientPortal.test.tsx` verifying: renders MarketplaceHero, renders QuickCategories, renders FeaturedSalons section.
2. Rewrite `pages/ClientPortal.tsx` to compose all new section components.
3. Run tests: `cd peluqueria-client && npm test`.
4. Verify: tests pass ✅.

- [ ] Done

### Task 11: Update ClientPortalLayout + App.tsx — Routing & navigation

1. Write test in `components/layout/ClientPortalLayout.test.tsx` verifying: renders BottomTabBar on mobile, renders outlet content.
2. Modify `components/layout/ClientPortalLayout.tsx`: replace old bottom nav with BottomTabBar, adjust layout.
3. Update `App.tsx`: add `/perfil` route (auth-required), update `/search` route to use SearchPage.
4. Run tests: `cd peluqueria-client && npm test`.
5. Verify: tests pass ✅.

- [ ] Done

### Task 12: Final Integration — Build & visual verification

1. Run full build: `cd peluqueria-client && npm run build`.
2. Run all tests: `cd peluqueria-client && npm test`.
3. Visual check in browser at `http://localhost:3000`.
4. Verify: build succeeds ✅, all tests pass ✅.

- [ ] Done
