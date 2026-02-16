# Plan - Remodel Seeder for Portfolio

Remodel the data seeding process to provide a clean, comprehensive, and role-based test environment for the portfolio project.

## Tasks

- [ ] Create `DatabaseCleanupService` or native query reset logic <!-- id: 0 -->
- [ ] Implement `DataSeeder` with a manual flag trigger (e.g., -Dseed.portfolio=true) <!-- id: 1 -->
- [ ] Implement portfolio roles and rich data without console logs <!-- id: 2 -->
- [ ] Verify persistence when flag is NOT set <!-- id: 3 -->
- [ ] Document how to run the manual seeder <!-- id: 4 -->

## Implementation Details

### Cleanup Order

1. appointmentRepository.deleteAll()
2. workingHourRepository.deleteAll()
3. customerRepository.deleteAll()
4. serviceOfferingRepository.deleteAll()
5. userRepository.deleteAll()
6. enterpriseRepository.deleteAll()

### Seed Users

- **Admin**: `admin@peluqueria.com` / `password123`
- **Employee**: `trabajador@peluqueria.com` / `password123`
- **Client**: `cliente@peluqueria.com` / `password123`

### Data Variety

- Appointments: Past, Present, Future.
- Statuses: PENDING, CONFIRMED, COMPLETED, CANCELED, NO_SHOW.
- Services: Different categories, prices, and durations.
