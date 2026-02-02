# Investigation: Bulk Data Seeder Implementation

## Current State

- `DataSeeder.java` provides minimal bootstrap data (3 enterprises, ~7 employees, 6 services).
- No automated customer or appointment generation currently exists.
- The database relies on manual entry for testing large datasets.

## Requirements

- Populate all existing enterprises with:
  - More services (different categories).
  - More employees (Users with `Role.EMPLEADO`).
  - Many customers (`Customer` entity, optionally linked to `User` with `Role.CLIENTE`).
  - Large volume of appointments (linking employees, services, and customers).
- Randomized but realistic data (names, phone numbers, prices, dates).
- Should be repeatable or run on demand.

## Proposed Solution

- Add `datafaker` dependency to `pom.xml` for realistic data generation.
- Create a `BulkDataSeeder` component (or update existing one) that:
  - Iterates through all existing enterprises.
  - Generates ~5-10 services per enterprise.
  - Generates ~3-5 employees per enterprise.
  - Generates ~50-100 customers per enterprise.
  - Generates ~200-500 appointments per enterprise distributed across the last 30 days and next 30 days.
- Use a flag or profile (e.g., `-Dseed.bulk=true`) to trigger the bulk seeding, avoiding accidental population in production-like environments (though this is local dev for now).

## Risk Assessment

- Database growth: Generating thousands of records might slow down queries if indexes are missing.
- Duplicate data: Ensure we don't duplicate unique fields (emails).
- Foreign Key Constraints: Must follow proper order of creation (Enterprise -> Service/Employee/Customer -> Appointment).
