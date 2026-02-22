# Design: JPA Global Auditing

## Architecture Overview
>
> Introduces a Base Entity class to automatically track creation and modification timestamps (`created_at`, `updated_at`) and auditing users (`created_by`, `updated_by`). It hooks into Spring Data JPA through `@EntityListeners(AuditingEntityListener.class)`.

## Data Model

| Entity | Key Fields Added | Relationships |
|--------|-----------|---------------|
| `AppUser` | `createdAt`, `updatedAt`, `createdBy`, `updatedBy` | N/A |
| `Enterprise` | `createdAt`, `updatedAt`, `createdBy`, `updatedBy` | N/A |
| `Appointment` | `createdAt`, `updatedAt`, `createdBy`, `updatedBy` | N/A |
| `Customer` | `createdAt`, `updatedAt`, `createdBy`, `updatedBy` | N/A |
| `ServiceOffering`| `createdAt`, `updatedAt`, `createdBy`, `updatedBy` | N/A |
| `WorkingHours` | `createdAt`, `updatedAt`, `createdBy`, `updatedBy` | N/A |

## API Contracts

N/A (Invisible to external HTTP consumers, handled completely inside the data access layer via Spring Data JPA mappings unless DTOs are mapped to expose them).

## File Structure

- `src/main/resources/db/migration/V2__add_audit_columns.sql`
- `src/main/java/com/peluqueria/model/AuditableEntity.java`
- `src/main/java/com/peluqueria/config/JpaAuditingConfig.java`
- (Modified) `com.peluqueria.model.AppUser`
- (Modified) `com.peluqueria.model.Enterprise`
- (Modified) `com.peluqueria.model.Appointment`
- (Modified) `com.peluqueria.model.Customer`
- (Modified) `com.peluqueria.model.ServiceOffering`
- (Modified) `com.peluqueria.model.WorkingHours`
- (Modified) `com.peluqueria.PeluqueriaApiApplication` (If needed, typically we use a configuration class).

## Dependencies

- Uses existing `spring-boot-starter-data-jpa` and `spring-boot-starter-security`.

## Testing Strategy

- Unit: N/A
- Integration: Add an integration test `JpaAuditingIntegrationTest` to verify that saving an entity auto-fills the `createdAt` and `createdBy` fields depending on the Security context (Or at least run the existing test suite to ensure the new columns and migrations don't break existing inserts/updates).
