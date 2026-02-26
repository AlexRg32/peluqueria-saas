# Design: Stabilization

## Architecture Overview

This is a maintenance task. No architectural changes are made to the business logic.

## File Structure

- `peluqueria-api/src/main/java/com/peluqueria/model/ServiceOffering.java` (Modified)
- `peluqueria-api/pom.xml` (Modified)
- `peluqueria-client/src/pages/AppointmentHistoryPage.test.tsx` (Modified)

## Testing Strategy

- **Unit**: Verify that `ServiceOffering` build output is correct and `deleted` defaults to `false`.
- **Integration**: Run `./mvnw test` and `npm run test` to verify zero failures.
- **Lints**: Check for zero Lombok warnings during compilation.
