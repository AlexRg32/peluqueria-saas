# Plan: Fixing Production Image URLs and Persistence
>
> Goal: Fix hardcoded localhost URLs and implement persistent storage for production.
> Architecture: Storage abstraction with local and Supabase implementations.

## Foundation

- [x] **Task 1: Update StorageService Interface** — `peluqueria-api/src/main/java/com/peluqueria/service/StorageService.java`
  - What: Add `getPublicUrl(String filename)` method to the interface.
  - Verify: Interface compiles.
- [x] **Task 2: Update application.properties** — `peluqueria-api/src/main/resources/application.properties`
  - What: Add `app.api.base-url` property.
  - Verify: Property exists.
- [x] **Task 3: Update FileSystemStorageService** — `peluqueria-api/src/main/java/com/peluqueria/service/FileSystemStorageService.java`
  - What: Implement `getPublicUrl` using `app.api.base-url`.
  - Verify: Method returns correct URL in tests/local.

## Core

- [x] **Task 4: Implement SupabaseStorageService** — `peluqueria-api/src/main/java/com/peluqueria/service/SupabaseStorageService.java`
  - What: New class implementing `StorageService` for Supabase uploads.
  - Verify: Class compiles.
- [x] **Task 5: Create StorageConfig** — `peluqueria-api/src/main/java/com/peluqueria/config/StorageConfig.java`
  - What: New configuration class to conditionally load `FileSystemStorageService` or `SupabaseStorageService` based on a property (e.g. `app.storage.type`).
  - Verify: Correct bean is loaded in each profile.
- [x] **Task 6: Update ServiceOfferingController** — `peluqueria-api/src/main/java/com/peluqueria/controller/ServiceOfferingController.java`
  - What: Replace hardcoded URL with `storageService.getPublicUrl(filename)`.
  - Verify: URLs are generated dynamically.

## Integration & Polish

- [x] **Task 7: Verify Multi-environment Config** — `peluqueria-api/src/main/resources/application.properties` & env vars.
  - What: Ensure `app.storage.type` defaults to `local`.
  - Verify: Local still works as intended.
