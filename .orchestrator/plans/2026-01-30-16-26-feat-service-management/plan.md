# Implementation Plan: Service Management

## 1. Backend Security

- [x] **Secure Endpoints**: In `peluqueria-api/src/main/java/com/peluqueria/controller/ServiceOfferingController.java`, add `@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")` to `createServiceOffering` and `deleteService`.

## 2. Frontend Infrastructure

- [x] **Create API Service**: Create `peluqueria-client/src/services/serviceOfferingService.ts` to handle Axios/fetch requests for Services (GET, POST, DELETE).

## 3. Frontend Components

- [x] **Create ServiceCard**: Implement `peluqueria-client/src/components/services/ServiceCard.tsx`.
  - Purpose: Display individual service details.
  - Props: `service`, `onDelete`.
- [x] **Create Modal**: Implement `peluqueria-client/src/components/services/CreateServiceModal.tsx`.
  - Purpose: Form to add new service.
  - Fields: Name, Description, Price, Duration, Category, ImageURL.

## 4. Frontend Page

- [x] **Update Services Page**: Refactor `peluqueria-client/src/pages/Services.tsx`.
  - Fetch services on load.
  - Use Grid layout.
  - Render `ServiceCard`s.
  - Add "Create Service" button triggering the Modal.

## 5. Verification

- [x] **Manual Test**: Verify Admin can create/delete.
- [x] **Manual Test**: Verify non-admin cannot create (API returns 403).
