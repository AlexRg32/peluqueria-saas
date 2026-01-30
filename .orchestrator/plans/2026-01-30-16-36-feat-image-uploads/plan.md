# Implementation Plan: Image Uploads

## 1. Backend Infrastructure

- [x] **Storage Service**: Create `peluqueria-api/src/main/java/com/peluqueria/service/StorageService.java` (Interface) and `FileSystemStorageService.java` (Implementation).
  - Implement `store(MultipartFile)` using UUID naming.
  - Implement `delete(String filename)`.
  - Implement `init()` to create directory.
- [x] **Config**: Update `peluqueria-api/src/main/java/com/peluqueria/config/WebConfig.java` to expose `/uploads/**`.
- [x] **Initializer**: Update `DataInitializer` or main Application to call `storageService.init()`.

## 2. Backend Logic

- [x] **Controller Update**: Refactor `ServiceOfferingController.createServiceOffering`.
  - Change signature to accept `@RequestPart("service") String serviceJson` and `@RequestPart("image") MultipartFile image`.
  - Parse JSON to Object manually (ObjectMapper).
  - Store image, set URL in object, save object.

## 3. Frontend Infrastructure

- [x] **Service Update**: Update `peluqueria-client/src/services/serviceOfferingService.ts`.
  - Refactor `create` to use `FormData`.

## 4. Frontend Components

- [x] **Modal Update**: Update `peluqueria-client/src/components/services/CreateServiceModal.tsx`.
  - Validations (File type/size).
  - UI for File Input.

## 5. Verification

- [x] **Manual Test**: Upload an image, verify it appears in `uploads/` folder and loads in the browser.
