# Design: Bulk Data Seeder

## Data Generation Strategy

We will use `DataFaker` to generate:

- **Services**: Random names like "Corte Degradado", "Tinte", "Lavado", etc. Prices between 10-50. Durations: 15, 30, 45, 60 mins.
- **Employees**: Realistic names, emails based on enterprise name.
- **Customers**: Randomized names, phones, and emails.
- **Appointments**: Randomly assigned to:
  - A date within [-30 days, +15 days].
  - An available service from the enterprise.
  - An available employee from the enterprise.
  - A customer from the enterprise.
  - Status: `COMPLETED` for past, `PENDING` or `CONFIRMED` for future.

## Implementation Details

1. **Dependency**: Add `net.datafaker:datafaker:2.4.0` to `pom.xml`.
2. **Component**: `BulkDataSeeder` implementing `CommandLineRunner`.
3. **Logic Flow**:

    ```java
    for (Enterprise e : enterprises) {
        // Create 10 services if < 5 exist
        // Create 5 employees if < 3 exist
        // Create 100 customers if < 10 exist
        // Create 300 appointments
    }
    ```

4. **Safety**: Only run if a specific environment variable or system property `SEED_BULK=true` is set, OR check if appointments are empty.

## Model Relationships

- `Appointment` belongs to `Enterprise`, `Customer`, `User` (employee), and `ServiceOffering`.
- `Customer` belongs to `Enterprise` and optionally a `User`.
- `User` (employee) belongs to `Enterprise`.
- `ServiceOffering` belongs to `Enterprise`.
