# Client Portal Completion
>
> Goal: Implement functional Barbershop Profile and Appointment History pages with proper backend integration.
> Architecture: Spring Boot (Backend) + React (Frontend) + TDD

### Task 1: Backend - Add Slug to Enterprise

1. [x] Write failing test in `EnterpriseServiceTest.java` for `findBySlug`.
2. [x] Modify `Enterprise.java` to include `slug` field.
3. [x] Update `EnterpriseRepository.java` to add `Optional<Enterprise> findBySlug(String slug)`.
4. [x] Implement `findBySlug` in `EnterpriseService.java`.
5. [x] Run tests: `cd peluqueria-api && ./mvnw test -Dtest=EnterpriseServiceTest`.
6. [x] Verify: tests pass ✅.
7. [x] `git commit` + `/checkpoint`.

### Task 2: Backend - Public Enterprise API

1. [x] Write failing test in `PublicControllerTest.java` (create new) for `GET /api/public/enterprises/:slug`.
2. [x] Create/Update `PublicController.java` to expose `findBySlug` endpoint publicly.
3. [x] Run tests: `cd peluqueria-api && ./mvnw test -Dtest=PublicControllerTest`.
4. [x] Verify: tests pass ✅.
5. [x] `git commit` + `/checkpoint`.

### Task 3: Backend - Enhanced Appointment Response

1. [x] Write failing test in `AppointmentServiceTest.java` asserting `enterpriseId`, `enterpriseName`, `enterpriseSlug` in response.
2. [x] Update `AppointmentResponse.java` DTO.
3. [x] Update `AppointmentService.java` mapper logic to populate new fields.
4. [x] Run tests: `cd peluqueria-api && ./mvnw test -Dtest=AppointmentServiceTest`.
5. [x] Verify: tests pass ✅.
6. [x] `git commit` + `/checkpoint`.

### Task 4: Frontend - Types & API Client

1. [x] Update `types/Enterprise.ts` (or similar) to include `slug`.
2. [x] Update `types/Appointment.ts` to include enterprise details.
3. [x] Implement `getEnterpriseBySlug` and `getMyAppointments` in `services/api.ts` (or relevant service file).
4. [x] Create test `services/api.test.ts` (mocking fetch) to verify correct endpoint calls.
5. [x] Run tests: `cd peluqueria-client && npm test services/api.test.ts`.
6. [x] Verify: tests pass ✅.
7. [x] `git commit` + `/checkpoint`.

### Task 5: Frontend - Barbershop Profile Page (Structure)

1. [x] Create `test/pages/BarbershopProfile.test.tsx` (failing render test).
2. [x] Create `pages/BarbershopProfile.tsx` (using `useParams` for slug).
3. [x] Implement fetching logic (using service from Task 4).
4. [x] Render basic info (Name, Description).
5. [x] Run tests: `cd peluqueria-client && npm test BarbershopProfile.test.tsx`.
6. [x] Verify: tests pass ✅.
7. [x] `git commit` + `/checkpoint`.

### Task 6: Frontend - Barbershop Profile Components (Services & Workers)

1. [x] Fetch real services for the enterprise through public API.
2. [x] Fetch real workers for the enterprise through public API.
3. [x] Render services list with prices and categories.
4. [x] Render team members with icons.
5. [x] Improve UI/UX with premium aesthetics and responsive design.
6. [x] Verify: manually tested and working ✅.
7. [x] `git commit` + `/checkpoint`.

### Task 7: Frontend - Appointment History Page

1. [x] Create `test/pages/AppointmentHistory.test.tsx` (failing render test).
2. [x] Create `pages/AppointmentHistory.tsx`.
3. [x] Implement fetching logic (using `getMyAppointments`).
4. [x] Render list of appointments (Past & Upcoming tabs).
5. [x] Run tests: `cd peluqueria-client && npm test AppointmentHistory.test.tsx`.
6. [x] Verify: tests pass ✅.
7. [x] `git commit` + `/checkpoint`.

### Task 8: Manual Verification & Cleanup

1. [x] Start full stack (`npm run dev` + `mvn spring-boot:run`).
2. [x] Navigate to `http://localhost:5173/b/barberia-paco`.
3. [x] Verify Profile loads with real services and employees.
4. [x] Navigate to `http://localhost:5173/citas`.
5. [x] Verify History loads with upcoming/past appointments.
6. [x] Run all tests: `npm test && cd ../peluqueria-api && ./mvnw test`.
7. [x] `git commit` + `/checkpoint`.
