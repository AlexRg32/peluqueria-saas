# Design Document - Backend Refactor

## Architecture Patterns

- **Constructor Injection**: All controllers and services will use `@RequiredArgsConstructor` and `private final` fields.
- **DTO-Only API**: All public API endpoints will accept and return DTOs.
- **Service-Only Logic**: Business logic, file path resolution, and entity-to-dto conversion will happen in Services or Mappers.
- **Mappers**: Dedicated mapper classes to handle conversions.

## New DTOs Needed

- `EnterpriseResponse`: To replace returning `Enterprise` entity.
- `ServiceOfferingRequest`: To replace `ServiceOffering` entity in `@RequestPart`.
- `ServiceOfferingResponse`: To replace returning `ServiceOffering` entity.

## Service Layer Enhancements

- `EnterpriseService`:
  - Add `getEmployeesByEnterpriseId(Long enterpriseId)` returning `List<UserResponse>`.
  - Update `findAll`, `findById`, `save`, `update` to return `EnterpriseResponse`.
- `ServiceOfferingService`:
  - Update `getAllServicesByEnterpriseId` to return `List<ServiceOfferingResponse>`.
  - Update `createServiceOffering` to handle image URL logic.
- `CustomerService`:
  - Create if not exists (currently using Repository in Controller).
  - Add `getCustomersByEnterprise(Long enterpriseId)` returning `List<CustomerResponse>`.

## Mapper Strategy

Manual mappers or MapStruct. For simplicity and according to the project size, I'll use manual mappers but as dedicated components.

## Exception Handling

Enhance `GlobalExceptionHandler` to handle:

- `ResourceNotFoundException`: Return 404.
- `BusinessException`: Return 400 with custom message.
- `AccessDeniedException`: Return 403.
