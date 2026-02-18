# Client Portal Completion
>
> Goal: Implement functional Barbershop Profile and Appointment History pages with proper backend integration.
> Architecture: Spring Boot (Backend) + React (Frontend) + TDD

### Task 1: Backend - Add Slug to Enterprise

1. Write failing test in `EnterpriseServiceTest.java` for `findBySlug`.
2. Modify `Enterprise.java` to include `slug` field.
3. Update `EnterpriseRepository.java` to add `Optional<Enterprise> findBySlug(String slug)`.
4. Implement `findBySlug` in `EnterpriseService.java`.
5. Run tests: `cd peluqueria-api && ./mvnw test -Dtest=EnterpriseServiceTest`.
6. Verify: tests pass ✅.
7. `git commit` + `/checkpoint`.

### Task 2: Backend - Public Enterprise API

1. Write failing test in `PublicControllerTest.java` (create new) for `GET /api/public/enterprises/:slug`.
2. Create/Update `PublicController.java` to expose `findBySlug` endpoint publicly.
3. Run tests: `cd peluqueria-api && ./mvnw test -Dtest=PublicControllerTest`.
4. Verify: tests pass ✅.
5. `git commit` + `/checkpoint`.

### Task 3: Backend - Enhanced Appointment Response

1. Write failing test in `AppointmentServiceTest.java` asserting `enterpriseId`, `enterpriseName`, `enterpriseSlug` in response.
2. Update `AppointmentResponse.java` DTO.
3. Update `AppointmentService.java` mapper logic to populate new fields.
4. Run tests: `cd peluqueria-api && ./mvnw test -Dtest=AppointmentServiceTest`.
5. Verify: tests pass ✅.
6. `git commit` + `/checkpoint`.

### Task 4: Frontend - Types & API Client

1. Update `types/Enterprise.ts` (or similar) to include `slug`.
2. Update `types/Appointment.ts` to include enterprise details.
3. Implement `getEnterpriseBySlug` and `getMyAppointments` in `services/api.ts` (or relevant service file).
4. Create test `services/api.test.ts` (mocking fetch) to verify correct endpoint calls.
5. Run tests: `cd peluqueria-client && npm test services/api.test.ts`.
6. Verify: tests pass ✅.
7. `git commit` + `/checkpoint`.

### Task 5: Frontend - Barbershop Profile Page (Structure)

1. Create `test/pages/BarbershopProfile.test.tsx` (failing render test).
2. Create `pages/BarbershopProfile.tsx` (using `useParams` for slug).
3. Implement fetching logic (using service from Task 4).
4. Render basic info (Name, Description).
5. Run tests: `cd peluqueria-client && npm test BarbershopProfile.test.tsx`.
6. Verify: tests pass ✅.
7. `git commit` + `/checkpoint`.

### Task 6: Frontend - Barbershop Profile Components (Services & Workers)

1. Create `test/components/ServicesList.test.tsx` and `test/components/WorkersGrid.test.tsx`.
2. Implement `components/profile/ServicesList.tsx`.
3. Implement `components/profile/WorkersGrid.tsx`.
4. Integrate into `BarbershopProfile.tsx`.
5. Run tests: `cd peluqueria-client && npm test`.
6. Verify: tests pass ✅.
7. `git commit` + `/checkpoint`.

### Task 7: Frontend - Appointment History Page

1. Create `test/pages/AppointmentHistory.test.tsx` (failing render test).
2. Create `pages/AppointmentHistory.tsx`.
3. Implement fetching logic (using `getMyAppointments`).
4. Render list of appointments (Past & Upcoming tabs).
5. Run tests: `cd peluqueria-client && npm test AppointmentHistory.test.tsx`.
6. Verify: tests pass ✅.
7. `git commit` + `/checkpoint`.

### Task 8: Manual Verification & Cleanup

1. Start full stack (`npm run dev` + `mvn spring-boot:run`).
2. Navigate to `http://localhost:5173/b/test-slug`.
3. Verify Profile loads.
4. Navigate to `http://localhost:5173/citas`.
5. Verify History loads.
6. Run all tests: `npm test && cd ../peluqueria-api && ./mvnw test`.
7. `git commit` + `/checkpoint`.
