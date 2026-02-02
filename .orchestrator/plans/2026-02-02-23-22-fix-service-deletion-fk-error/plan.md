# Plan - Implement Soft Delete for Services

Reverting from hard delete to soft delete to preserve historical appointment data.

## Tasks

- [x] **Backend - Update Model**: Add `deleted` field to `ServiceOffering`.
- [x] **Backend - Update Repository**: Add `findByEnterpriseIdAndDeletedFalse` to `ServiceOfferingRepository`.
- [x] **Backend - Update Service**:
  - [x] Update `deleteService` to set `deleted = true`.
  - [x] Update `getAllServicesByEnterpriseId` to use `findByEnterpriseIdAndDeletedFalse`.
- [x] **Backend - Cleanup**: Remove `deleteByServiceId` from `AppointmentRepository`.
- [x] **Backend - Exception Handling**: Keep the `DataIntegrityViolationException` handler as a safety net.

## Implementation Details

### 1. ServiceOffering.java

Add `private boolean deleted = false;`.

### 2. ServiceOfferingRepository.java

Add `List<ServiceOffering> findByEnterpriseIdAndDeletedFalse(Long enterpriseId);`.

### 3. ServiceOfferingService.java

Update `deleteService` and `getAllServicesByEnterpriseId`.

### 4. AppointmentRepository.java

Remove `deleteByServiceId` and specific annotations added for it.
