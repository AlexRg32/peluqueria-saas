# Design: Documentation and API Contract Update

## Architecture Overview
>
> This is a documentation update to reflect the latest state of the monolithic `peluqueria-saas` app, ensuring existing `.md` files match the codebase perfectly, and adding an exhaustive `10-api-contract.md`.

## Target Files to Update/Create

- `docs/00-index.md`: Add a link to the new API contract document.
- `docs/04-backend.md`: Remove the duplicate API Endpoints section and reference `10-api-contract.md` instead. Ensure other details (Flyway, JPA) remain correct.
- `docs/10-api-contract.md`: Extract all API endpoints from the `controller` package and document them extensively (Method, Path, Auth, Purpose).

## API Contracts Structure

| Controller | Base Path |
|------------|-----------|
| `AuthController` | `/auth` |
| `AppointmentController` | `/api/appointments` |
| `CustomerController` | `/api/customers` |
| `DashboardController` | `/api/dashboard` |
| `EnterpriseController` | `/api/enterprises` |
| `PublicController` | `/api/public` |
| `ServiceOfferingController`| `/api/services` |
| `UserController` | `/api/users` |
| `WorkingHourController` | `/api/working-hours` |

## Dependencies

- N/A (Standard Markdown documentation update).
