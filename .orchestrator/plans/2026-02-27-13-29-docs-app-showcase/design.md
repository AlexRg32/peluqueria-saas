# Design: App Showcase Documentation

## Documentation Layout
The document will be located at `docs/11-app-showcase.md`. It will use a structured approach:
- **Header**: Visual Overview.
- **Section 1: Marketplace (Public)**: Homepage and Search.
- **Section 2: Professional Profile**: Landing page for a barbershop.
- **Section 3: Admin Experience**:
  - Analytics Dashboard.
  - Interactive Calendar.
  - Customer CRM.
  - Service Management.
  - Employee Management.
- **Section 4: Client Experience**:
  - My Appointments.
  - Booking Flow.

## Screenshot Capture Strategy
1. **Resolution**: 1920x1080.
2. **Naming Convention**: `screenshot-[page-name]-[role].png`.
3. **Storage**: `docs/assets/showcase/`.

## Data Preparation
- Activate `BulkDataSeeder` by uncommenting `@Component`.
- Use `Faker` to generate realistic Spanish names and addresses.
- Ensure at least 50 customers and 200 appointments are generated for visual density.

## File Structure Changes
- `docs/11-app-showcase.md`: New file.
- `docs/assets/showcase/`: Directory for images.
- `peluqueria-api/src/main/java/com/peluqueria/config/BulkDataSeeder.java`: Activate.
